'use client';
import { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Typography, Button } from '@mui/material';
import StoryModal from '@/components/modals/StoryModal';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'title', headerName: 'Title', width: 200 },
  { field: 'content', headerName: 'Content', width: 300 },
  { field: 'author', headerName: 'Author', width: 150 },
  { field: 'publishDate', headerName: 'Publish Date', width: 180 },
];

const rows = [
  { id: 1, title: 'Our Journey', content: 'How we started...', author: 'John Doe', publishDate: '2024-01-01' },
  { id: 2, title: 'Company Values', content: 'What we believe in...', author: 'Jane Smith', publishDate: '2024-01-02' },
];

export default function StoryPage() {
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  return (
    <Box sx={{ height: 400, width: '100%', p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h5" component="h1">
          Story Management
        </Typography>
        <Button 
          variant="contained" 
          color="primary"
          onClick={handleOpenModal}
        >
          Add New Story
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
      <StoryModal open={openModal} handleClose={handleCloseModal} />
    </Box>
  );
} 