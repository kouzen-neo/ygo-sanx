import React, { useState, useEffect } from 'react';
import { Drawer, Box, Typography, TextField, Autocomplete, IconButton, List, ListItem, Divider, Checkbox, FormControlLabel } from '@mui/material';
import { X } from 'lucide-react';

interface FilterSidebarProps {
  open: boolean;
  onClose: () => void;
  filters: { archetype: string | null; type: string | null };
  onFilterChange: (newFilters: { archetype: string | null; type: string | null }) => void;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({ open, onClose, filters, onFilterChange }) => {
  const [archetypes, setArchetypes] = useState<string[]>([]);

  useEffect(() => {
    fetch('https://db.ygoprodeck.com/api/v7/archetypes.php')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setArchetypes(data.map((a: { archetype_name: string }) => a.archetype_name));
        }
      })
      .catch(err => console.error('Failed to fetch archetypes', err));
  }, []);

  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <Box sx={{ width: 300, p: 3, display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">Filters</Typography>
          <IconButton onClick={onClose}><X /></IconButton>
        </Box>
        
        <Divider />

        <Box>
          <Typography variant="overline" color="primary">Archetype</Typography>
          <Autocomplete
            options={archetypes}
            renderInput={(params) => <TextField {...params} variant="standard" placeholder="Select archetype..." />}
            value={filters.archetype || null}
            onChange={(_, newValue) => onFilterChange({ ...filters, archetype: newValue })}
          />
        </Box>

        <Box>
          <Typography variant="overline" color="primary">Card Type</Typography>
          <List dense>
            {['Monster Card', 'Spell Card', 'Trap Card'].map((type) => (
              <ListItem key={type} disablePadding>
                <FormControlLabel
                  control={
                    <Checkbox 
                      size="small" 
                      checked={filters.type === type} 
                      onChange={() => onFilterChange({ ...filters, type: filters.type === type ? null : type })} 
                    />
                  }
                  label={type}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
    </Drawer>
  );
};
