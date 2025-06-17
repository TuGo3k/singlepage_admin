const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'title', headerName: 'Title', width: 200 },
  { field: 'author', headerName: 'Author', width: 150 },
  { field: 'category', headerName: 'Category', width: 150 },
  { field: 'publishDate', headerName: 'Publish Date', width: 180 },
  { field: 'status', headerName: 'Status', width: 130 },
];

const rows = [
  { id: 1, title: 'First Blog Post', author: 'John Doe', category: 'Technology', publishDate: '2024-01-01', status: 'Published' },
  { id: 2, title: 'Second Blog Post', author: 'Jane Smith', category: 'Business', publishDate: '2024-01-02', status: 'Draft' },
];

export { columns, rows }; 