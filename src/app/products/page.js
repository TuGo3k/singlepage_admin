'use client';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Typography, Button } from '@mui/material';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'name', headerName: 'Product Name', width: 200 },
  { field: 'price', headerName: 'Price', width: 130 },
  { field: 'category', headerName: 'Category', width: 150 },
  { field: 'stock', headerName: 'Stock', width: 130 },
  { field: 'status', headerName: 'Status', width: 130 },
];

const rows = [
  { id: 1, name: 'Product A', price: '$99.99', category: 'Electronics', stock: 50, status: 'In Stock' },
  { id: 2, name: 'Product B', price: '$149.99', category: 'Accessories', stock: 30, status: 'Low Stock' },
];

export default function ProductsPage() {
  return (
    <Box sx={{ height: 400, width: '100%', p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h5" component="h1">
          Products Management
        </Typography>
        <Button variant="contained" color="primary">
          Add New Product
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