'use client';
import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  IconButton,
} from '@mui/material';
import { CloudUpload, Close } from '@mui/icons-material';

export default function StoryModal({ open, handleClose }) {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: '',
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
        background: 'linear-gradient(to right, #2c3e50, #3498db)',
        color: 'white',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        Share Your Story
        <IconButton size="small" onClick={handleClose} sx={{ color: 'white' }}>
          <Close />
        </IconButton>
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent sx={{ mt: 2 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Story Title"
              fullWidth
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Enter an engaging title"
            />
            <TextField
              label="Author"
              fullWidth
              required
              value={formData.author}
              onChange={(e) => setFormData({ ...formData, author: e.target.value })}
            />
            <TextField
              label="Story Content"
              fullWidth
              multiline
              rows={6}
              required
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              placeholder="Share your story here..."
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
            />
            <Button
              component="label"
              variant="outlined"
              startIcon={<CloudUpload />}
              sx={{ mt: 1 }}
            >
              Upload Story Image
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
              />
            </Button>
            {formData.image && (
              <Box sx={{ mt: 2 }}>
                <p>Selected file: {formData.image.name}</p>
              </Box>
            )}
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={handleClose} variant="outlined" color="secondary">
            Cancel
          </Button>
          <Button 
            type="submit" 
            variant="contained" 
            sx={{ 
              background: 'linear-gradient(to right, #2c3e50, #3498db)',
              '&:hover': {
                background: 'linear-gradient(to right, #243444, #2980b9)'
              }
            }}
          >
            Publish Story
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
} 