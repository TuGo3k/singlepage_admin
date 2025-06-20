'use client';
import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
} from '@mui/material';
import { CloudUpload } from '@mui/icons-material';

export default function HeaderModal({ open, handleClose }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'active',
    image: null,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ 
        background: 'linear-gradient(to right, #1e3c72, #2a5298)',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        gap: 1
      }}>
        Шинэ Гарчиг Нэмэх
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent sx={{ mt: 2 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Гарчиг"
              fullWidth
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
            <TextField
              label="Тайлбар"
              fullWidth
              multiline
              rows={4}
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
            <FormControl fullWidth>
              <InputLabel>Төлөв</InputLabel>
              <Select
                value={formData.status}
                label="Төлөв"
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              >
                <MenuItem value="active">Идэвхтэй</MenuItem>
                <MenuItem value="inactive">Идэвхгүй</MenuItem>
                <MenuItem value="draft">Ноорог</MenuItem>
              </Select>
            </FormControl>
            <Button
              component="label"
              variant="outlined"
              startIcon={<CloudUpload />}
              sx={{ mt: 1 }}
            >
              Гарчгийн зураг оруулах
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
              />
            </Button>
            {formData.image && (
              <Box sx={{ mt: 2 }}>
                <p>Сонгосон файл: {formData.image.name}</p>
              </Box>
            )}
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={handleClose} variant="outlined" color="secondary">
            Болих
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Хадгалах
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
} 
