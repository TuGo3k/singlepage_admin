'use client';
import { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Typography, Button } from '@mui/material';
import HeaderModal from '@/components/modals/HeaderModal';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'title', headerName: 'Title', width: 200 },
  { field: 'description', headerName: 'Description', width: 300 },
  { field: 'status', headerName: 'Status', width: 130 },
  { field: 'createdAt', headerName: 'Created At', width: 180 },
];

const rows = [
  { id: 1, title: 'Main Header', description: 'Welcome to our platform', status: 'Active', createdAt: '2024-01-01' },
  { id: 2, title: 'About Header', description: 'Learn about us', status: 'Active', createdAt: '2024-01-02' },
];

export default function HeaderPage() {
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  return (
    <Box sx={{ height: 400, width: '100%', p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h5" component="h1">
          Header Management
        </Typography>
        <Button 
          variant="contained" 
          color="primary"
          onClick={handleOpenModal}
        >
          Add New Header
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
      <HeaderModal open={openModal} handleClose={handleCloseModal} />
    </Box>
  );
} 