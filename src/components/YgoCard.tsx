import React, { useEffect, useState } from 'react';
import { Card, CardMedia, CardContent, Typography, Box, Skeleton, CardActionArea } from '@mui/material';
import { supabase } from '../supabaseClient';
import type { YgoCardData } from '../types';

interface YgoCardProps {
  card: YgoCardData;
  onClick: (card: YgoCardData) => void;
}

export const YgoCard: React.FC<YgoCardProps> = ({ card, onClick }) => {
  const [localUrl, setLocalUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function loadImage() {
      try {
        const { data } = await supabase.from('cards').select('local_image_url').eq('id', card.id).maybeSingle();
        if (data?.local_image_url) {
          if (isMounted) { setLocalUrl(data.local_image_url); setLoading(false); }
          return;
        }
        const { data: fnData, error: fnError } = await supabase.functions.invoke('cache-ygo-image', { body: { cardId: card.id } });
        if (!fnError && fnData?.url && isMounted) {
          setLocalUrl(fnData.url);
        }
      } catch (err) {
        console.error('Error loading image:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    loadImage();
    return () => { isMounted = false; };
  }, [card.id]);

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: 'background.paper', transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.02)' } }}>
      <CardActionArea onClick={() => onClick(card)} sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
        <Box sx={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2 }}>
          {loading ? (
            <Skeleton variant="rectangular" width="100%" height="100%" sx={{ borderRadius: 1 }} />
          ) : (
            <CardMedia component="img" image={localUrl || ''} alt={card.name} sx={{ height: '100%', objectFit: 'contain' }} />
          )}
        </Box>
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography variant="h6" noWrap title={card.name}>{card.name}</Typography>
          <Typography variant="body2" color="text.secondary">{card.type}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
