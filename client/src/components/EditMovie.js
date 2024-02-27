// EditMovie.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { TextField, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateMovie } from '../actions/moviesActions';

function EditMovie() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const allMovies = useSelector(state => state.movies);
  const [movie, setMovie] = useState(null);
  
  useEffect(() => {
    const movieToEdit = allMovies.find(movie => movie._id === id);
    setMovie(movieToEdit);
  }, [id, allMovies]);

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

const handleSubmit = (event) => {
  event.preventDefault();
  dispatch(updateMovie(movie));
  navigate('/movies');
};

  const cancelEdit = () => {
    navigate('/movies');
    window.location.reload();
}

const formatDate = (date) => {
  if (!date || isNaN(Date.parse(date))) {
      return '';
  }

  const d = new Date(date);
  let month = '' + (d.getMonth() + 1);
  let day = '' + d.getDate();
  const year = d.getFullYear();

  if (month.length < 2) 
      month = '0' + month;
  if (day.length < 2) 
      day = '0' + day;

  return [year, month, day].join('-');
}

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
      <TextField
            style={{ width: '500px' }}
            value={formatDate(movie.Premiered)}
            label="Premiered"
            name="Premiered"
            type="date"
            InputLabelProps={{
                shrink: true,
            }}
            onChange={handleInputChange}
        />
      <br />
      <Button variant="contained" color="primary" type="submit">
        Update
      </Button>
      <Button variant="outlined" color="primary" onClick={cancelEdit}>
        Cancel
      </Button>
    </form>
  );
}

export default EditMovie;