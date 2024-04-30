
import React from 'react';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';

function ModalWindow({ open, handleClose, imageURL }) {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Large Image</DialogTitle>
      <DialogContent>
        <img src={imageURL} alt="Large" className="modal-image" /> {/* Добавим класс для изображения */}
      </DialogContent>
    </Dialog>
  );
}

export default ModalWindow;

