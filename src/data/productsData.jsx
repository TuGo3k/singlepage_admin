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

export { columns, rows }; 
