'use client';
import { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Typography, Button } from '@mui/material';
import StoryModal from '@/components/modals/StoryModal';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'title', headerName: 'Гарчиг', width: 200 },
  { field: 'content', headerName: 'Агуулга', width: 300 },
  { field: 'author', headerName: 'Зохиогч', width: 150 },
  { field: 'publishDate', headerName: 'Нийтлэсэн Огноо', width: 180 },
];

const rows = [
  { id: 1, title: 'Бидний Аялал', content: 'Бид хэрхэн эхэлсэн...', author: 'Болд Бат', publishDate: '2024-01-01' },
  { id: 2, title: 'Компанийн Үнэт Зүйлс', content: 'Бидний итгэл үнэмшил...', author: 'Сараа Дорж', publishDate: '2024-01-02' },
];

export default function StoryPage() {
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  return (
    <Box sx={{ height: 400, width: '100%', p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h5" component="h1">
          Түүх Удирдлага
        </Typography>
        <Button 
          variant="contained" 
          color="primary"
          onClick={handleOpenModal}
        >
          Шинэ Түүх Нэмэх
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
