import React, { useEffect, useState } from 'react';
import { Card, CardMedia, CardContent, Typography, CircularProgress, Box } from '@mui/material';
import { supabase } from '../supabaseClient';
import type { YgoCardData } from '../types';

interface YgoCardProps {
  card: YgoCardData;
}

export const YgoCard: React.FC<YgoCardProps> = ({ card }) => {
  const [localUrl, setLocalUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadImage() {
      try {
        // 1. Check DB for existing URL
        const { data } = await supabase
          .from('cards')
          .select('local_image_url')
          .eq('id', card.id)
          .maybeSingle();

        if (data?.local_image_url) {
          setLocalUrl(data.local_image_url);
          setLoading(false);
          return;
        }

        // 2. Invoke Edge Function if missing
        const { data: fnData, error: fnError } = await supabase.functions.invoke('cache-ygo-image', {
          body: { cardId: card.id },
        });

        if (!fnError && fnData?.url) {
          setLocalUrl(fnData.url);
        }
      } catch (err) {
        console.error('Error loading image:', err);
      } finally {
        setLoading(false);
      }
    }
    loadImage();
  }, [card.id]);

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: 'background.paper' }}>
      <Box sx={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {loading ? (
          <CircularProgress />
        ) : (
          <CardMedia component="img" image={localUrl || ''} alt={card.name} sx={{ height: '100%', objectFit: 'contain' }} />
        )}
      </Box>
      <CardContent>
        <Typography variant="h6" noWrap>{card.name}</Typography>
        <Typography variant="body2" color="text.secondary">{card.type}</Typography>
      </CardContent>
    </Card>
  );
};
