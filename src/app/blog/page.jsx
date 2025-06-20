'use client';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Typography, Button } from '@mui/material';
import { columns, rows } from '@/data/blogData';

export default function BlogPage() {
  return (
    <Box sx={{ height: 400, width: '100%', p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h5" component="h1">
          Blog Management
        </Typography>
        <Button variant="contained" color="primary">
          Add New Post
        </Button>
      </Box>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
      />
    </Box>
  );
} 
