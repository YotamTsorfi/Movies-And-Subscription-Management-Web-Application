// AllMovies.js
import React, { useEffect, useState } from 'react';
import { List, Typography, TextField, Button } from '@mui/material';
import axios from 'axios';
import Movie from './Movie';
import { useNavigate } from 'react-router-dom';

function AllMovies() {

  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);
  const nevigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:4321/movies');
      setMovies(response.data);
      setFilteredMovies(response.data);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:4321/movies/${id}`);
      if (response.status === 200) {
        // Wait for fetchData to complete before continuing
        await fetchData();
      }
    } catch (error) {
      console.error(`Error deleting movie with id ${id}`, error);
    }
  };

  const handleSearch = () => {
    setFilteredMovies(movies.filter(movie => movie.Name.toLowerCase().includes(searchTerm.toLowerCase())));
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <Typography variant="h4" component="h1" gutterBottom>
        All Movies
      </Typography>
      <TextField label="Search" variant="outlined" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
      <Button variant="contained" color="primary" onClick={() => nevigate('/add-movie')}>
        Add Movie
      </Button>
      <Button variant="contained" color="primary" onClick={handleSearch}>
        Find
      </Button>
      <List component="nav">
        {filteredMovies.map(movie => (
          <Movie key={movie._id} movie={movie} handleDelete={handleDelete} />
        ))}
      </List>
    </div>
  );
}

export default AllMovies;