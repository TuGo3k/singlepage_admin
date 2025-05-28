'use client';
import { Box, Typography } from '@mui/material';

export default function Home() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Удирдлагын самбар руу тавтай морил
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Контент удирдахын тулд зүүн талын цэснээс сонголтоо хийнэ үү.
      </Typography>
    </Box>
  );
}
