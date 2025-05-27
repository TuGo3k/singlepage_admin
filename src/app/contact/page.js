'use client';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Typography, Button } from '@mui/material';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'name', headerName: 'Name', width: 150 },
  { field: 'email', headerName: 'Email', width: 200 },
  { field: 'subject', headerName: 'Subject', width: 200 },
  { field: 'message', headerName: 'Message', width: 300 },
  { field: 'status', headerName: 'Status', width: 130 },
];

const rows = [
  { id: 1, name: 'John Doe', email: 'john@example.com', subject: 'General Inquiry', message: 'I would like to know more...', status: 'New' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', subject: 'Support Request', message: 'Need help with...', status: 'Responded' },
];

export default function ContactPage() {
  return (
    <Box sx={{ height: 400, width: '100%', p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h5" component="h1">
          Contact Management
        </Typography>
        <Button variant="contained" color="primary">
          Export Messages
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