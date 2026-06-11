import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogTitle, IconButton, Typography, Box, Grid, Chip, Divider, Skeleton } from '@mui/material';
import { X } from 'lucide-react';
import type { YgoCardData } from '../types';
import { supabase } from '../supabaseClient';

interface CardDetailsModalProps {
  card: YgoCardData | null;
  onClose: () => void;
}

export const CardDetailsModal: React.FC<CardDetailsModalProps> = ({ card, onClose }) => {
  const [localUrl, setLocalUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!card) {
      setLocalUrl(null);
      return;
    }
    async function fetchUrl() {
      const { data } = await supabase.from('cards').select('local_image_url').eq('id', card!.id).maybeSingle();
      if (data?.local_image_url) setLocalUrl(data.local_image_url);
    }
    fetchUrl();
  }, [card]);

  if (!card) return null;

  return (
    <Dialog 
      open={!!card} 
      onClose={onClose} 
      maxWidth="md" 
      fullWidth 
      slotProps={{ 
        paper: { 
          sx: { bgcolor: 'background.default', backgroundImage: 'none' } 
        } 
      }}
    >
      <DialogTitle sx={{ m: 0, p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" component="div">{card.name}</Typography>
        <IconButton aria-label="close" onClick={onClose} sx={{ color: 'text.secondary' }}>
          <X />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers sx={{ p: { xs: 2, md: 4 } }}>
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 5 }}>
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
              {localUrl ? (
                <img src={localUrl} alt={card.name} style={{ maxWidth: '100%', maxHeight: '500px', objectFit: 'contain', borderRadius: '8px' }} />
              ) : (
                <Skeleton variant="rectangular" width={300} height={430} sx={{ borderRadius: 2 }} />
              )}
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 7 }}>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
              <Chip label={card.type} color="primary" variant="outlined" />
              <Chip label={card.race} color="secondary" variant="outlined" />
              {card.attribute && <Chip label={card.attribute} color="info" variant="outlined" />}
            </Box>
            
            {(card.atk !== undefined || card.def !== undefined || card.level !== undefined) && (
              <Box sx={{ display: 'flex', gap: 3, mb: 2, p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
                {card.level !== undefined && <Typography><strong>Level/Rank:</strong> {card.level}</Typography>}
                {card.atk !== undefined && <Typography><strong>ATK:</strong> {card.atk}</Typography>}
                {card.def !== undefined && <Typography><strong>DEF:</strong> {card.def}</Typography>}
              </Box>
            )}

            <Typography variant="h6" gutterBottom>Description</Typography>
            <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap', color: 'text.secondary', mb: 3 }}>
              {card.desc}
            </Typography>

            {card.card_prices && card.card_prices.length > 0 && (
              <>
                <Divider sx={{ my: 2 }} />
                <Typography variant="h6" gutterBottom>Market Prices</Typography>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  <Typography variant="body2">TCGPlayer: ${card.card_prices[0].tcgplayer_price}</Typography>
                  <Typography variant="body2">Cardmarket: €{card.card_prices[0].cardmarket_price}</Typography>
                </Box>
              </>
            )}
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};
