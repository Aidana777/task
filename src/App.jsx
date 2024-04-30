// src/App.js
import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import ModalWindow from './components/ModalWindow/ModalWindow';

function App() {
  const [data, setData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [error, setError] = useState(null); // Состояние для ошибок

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch('https://jsonplaceholder.typicode.com/photos')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        return response.json();
      })
      .then(data => setData(data))
      .catch(error => {
        console.error('Error fetching data:', error);
        setError(error.message);
      });
  };

  const handleOpenModal = (url) => {
    setSelectedImage(url);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'title', headerName: 'Title', width: 300, cellClassName: 'title-column' },
    { field: 'url', headerName: 'URL', width: 300, cellClassName: 'url-column' },
    {
      field: 'thumbnailUrl',
      headerName: 'Thumbnail',
      width: 200,
      renderCell: (params) => (
        <img
          src={params.value}
          alt="Thumbnail"
          className="thumbnail-image" 
          onClick={() => handleOpenModal(params.row.thumbnailUrl)}
        />
      ),
      cellClassName: 'thumbnail-column'
    },
  ];

  return (
    <div style={{ height: 400, width: '100%' }}>
      {error && <div className="error-message">{error}</div>} 
      <DataGrid rows={data} columns={columns} pageSize={5} />
      <ModalWindow open={openModal} handleClose={handleCloseModal} imageURL={selectedImage} />
    </div>
  );
}

export default App;
