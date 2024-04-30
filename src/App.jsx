// src/App.js
import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import ModalWindow from './components/ModalWindow/ModalWindow';


const API_KEY = "8c8e1a50-6322-4135-8875-5d40a5420d86";
const API_URL_POPULAR = "https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=1";

function App() {
  const [data, setData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [error, setError] = useState(null); // Состояние для ошибок

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch(API_URL_POPULAR, {
      headers: {
        'X-API-KEY': API_KEY
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        return response.json();
      })
      .then(data => {
        // Преобразуем данные, добавив уникальные id к каждой строке
        const rowsWithId = data.films.map((film, index) => ({
          ...film,
          id: film.filmId || index // Используем filmId, если он есть, или индекс, если нет
        }));
        setData(rowsWithId);
      })
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
    { field: 'nameRu', headerName: 'Title', width: 300, cellClassName: 'title-column' },
    { field: 'year', headerName: 'Year', width: 150 },
    {
      field: 'posterUrl',
      headerName: 'Poster',
      width: 200,
      renderCell: (params) => (
        <img
          src={params.value}
          alt="Poster"
          className="thumbnail-image" 
          onClick={() => handleOpenModal(params.row.posterUrl)}
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
