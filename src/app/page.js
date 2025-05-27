'use client';
import { Box, Typography } from '@mui/material';

export default function Home() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Welcome to Admin Dashboard
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Select a section from the sidebar to manage your content.
      </Typography>
    </Box>
  );
}
