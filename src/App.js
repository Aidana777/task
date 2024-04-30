// src/App.js
import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import ModalWindow from './components/ModalWindow/ModalWindow';

function App() {
  const [data, setData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/photos')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'title', headerName: 'Title', width: 300 },
    { field: 'url', headerName: 'URL', width: 300 },
    { field: 'thumbnailUrl', headerName: 'Thumbnail', width: 200, renderCell: (params) => <img src={params.value} alt="Thumbnail" onClick={() => handleOpenModal(params.row.thumbnailUrl)} /> },
  ];

  const handleOpenModal = (url) => {
    setSelectedImage(url);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={data} columns={columns} pageSize={5} />
      <ModalWindow open={openModal} handleClose={handleCloseModal} imageURL={selectedImage} />
    </div>
  );
}

export default App;