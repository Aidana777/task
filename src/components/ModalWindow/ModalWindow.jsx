
import React from 'react';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';

function ModalWindow({ open, handleClose, imageURL }) {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Large Image</DialogTitle>
      <DialogContent>
        <img src={imageURL} alt="Large" style={{ maxWidth: '100%' }} />
      </DialogContent>
    </Dialog>
  );
}

export default ModalWindow;
