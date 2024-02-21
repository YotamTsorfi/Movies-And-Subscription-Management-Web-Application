// EditMovie.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { TextField, Button, Typography } from '@mui/material';
import axios from 'axios';

function EditMovie() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(`http://localhost:4321/movies/${id}`);
        setMovie(response.data);
      } catch (error) {
        console.error('Error fetching movie', error);
      }
    };

    fetchMovie();
  }, [id]);

  const handleInputChange = (event) => {
    let { name, value } = event.target;

    if (name === 'Genres') {
      value = value.split(',').map(genre => genre.trim());
    }

    if (name === 'Premiered') {
      value = new Date(value);
    }

    setMovie({
      ...movie,
      [name]: value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`http://localhost:4321/movies/${id}`, movie);
      alert('Movie updated successfully');
    } catch (error) {
      console.error('Error updating movie', error);
    }
  };

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h4" component="h1" gutterBottom>
        Edit Movie: {movie.Name}
      </Typography>
      <TextField style={{ width: '500px' }} label="Name" name="Name" value={movie.Name} onChange={handleInputChange} />
      <br />
      <TextField style={{ width: '500px' }} label="Genres" name="Genres" value={movie.Genres.join(', ')} onChange={handleInputChange} />
      <br />
      <TextField style={{ width: '500px' }}  label="Image URL" name="Image" value={movie.Image} onChange={handleInputChange} />
      <br />      
      <TextField style={{ width: '500px' }}
        label="Premiered"
        name="Premiered"
        value={new Date(movie.Premiered).toLocaleDateString('en-GB')}
        onChange={handleInputChange}
      />
      <br />
      <Button variant="contained" color="primary" type="submit">
        Save
      </Button>
    </form>
  );
}

export default EditMovie;