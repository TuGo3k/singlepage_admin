'use client';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Typography, Button } from '@mui/material';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'event', headerName: 'Event', width: 200 },
  { field: 'date', headerName: 'Date', width: 150 },
  { field: 'description', headerName: 'Description', width: 300 },
  { field: 'category', headerName: 'Category', width: 130 },
];

const rows = [
  { id: 1, event: 'Company Founded', date: '2020-01-01', description: 'The beginning of our journey', category: 'Milestone' },
  { id: 2, event: 'First Product Launch', date: '2021-06-15', description: 'Launch of our flagship product', category: 'Product' },
];

export default function TimelinePage() {
  return (
    <Box sx={{ height: 400, width: '100%', p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h5" component="h1">
          Timeline Management
        </Typography>
        <Button variant="contained" color="primary">
          Add Timeline Event
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