import React, { useEffect, useState, useCallback } from 'react';
import { Grid, Container, Typography, TextField, InputAdornment, Button, Box, CircularProgress } from '@mui/material';
import { Search } from 'lucide-react';
import { YgoCard } from './YgoCard';
import { CardDetailsModal } from './CardDetailsModal';
import type { YgoCardData } from '../types';

export const CardList: React.FC = () => {
  const [cards, setCards] = useState<YgoCardData[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [selectedCard, setSelectedCard] = useState<YgoCardData | null>(null);
  
  const limit = 20;

  const fetchCards = useCallback(async (reset: boolean = false, currentSearch: string = '') => {
    setLoading(true);
    try {
      const currentOffset = reset ? 0 : offset;
      let url = `https://db.ygoprodeck.com/api/v7/cardinfo.php?num=${limit}&offset=${currentOffset}`;
      
      if (currentSearch) {
        url += `&fname=${encodeURIComponent(currentSearch)}`;
      }

      const res = await fetch(url);
      const data = await res.json();
      
      if (data.error) {
        if (reset) setCards([]);
        setHasMore(false);
      } else {
        const newCards = data.data || [];
        setCards(prev => reset ? newCards : [...prev, ...newCards]);
        setHasMore(newCards.length === limit);
        setOffset(reset ? limit : currentOffset + limit);
      }
    } catch (err) {
      console.error("Failed to fetch cards", err);
    } finally {
      setLoading(false);
    }
  }, [offset]);

  // Initial load
  useEffect(() => {
    fetchCards(true, '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchCards(true, searchTerm);
  };

  return (
    <Container sx={{ py: 4, display: 'flex', flexDirection: 'column', gap: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
        <Typography variant="h4" component="h1" sx={{ color: 'primary.main', fontWeight: 'bold' }}>
          Yu-Gi-Oh! Explorer
        </Typography>
        <Box component="form" onSubmit={handleSearch} sx={{ width: { xs: '100%', md: '400px' } }}>
          <TextField
            fullWidth
            placeholder="Search cards by name..."
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Search size={20} />
                  </InputAdornment>
                ),
              },
            }}
          />
        </Box>
      </Box>

      <Grid container spacing={3}>
        {cards.map(card => (
          <Grid key={card.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <YgoCard card={card} onClick={setSelectedCard} />
          </Grid>
        ))}
      </Grid>

      {cards.length === 0 && !loading && (
        <Typography color="text.secondary" sx={{ py: 8, textAlign: 'center' }} component="div">
          No cards found.
        </Typography>
      )}

      {hasMore && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={() => fetchCards(false, searchTerm)}
            disabled={loading}
            size="large"
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Load More'}
          </Button>
        </Box>
      )}

      <CardDetailsModal card={selectedCard} onClose={() => setSelectedCard(null)} />
    </Container>
  );
};
