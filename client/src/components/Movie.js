import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const Movie = ({ movie, handleDelete }) => {
  const nevigate = useNavigate();

  const handleEdit = () => {
    nevigate(`/edit-movie/${movie._id}`);
  };

  return (
    <Card style={{ border: '1px solid black', marginBottom: '20px' }}>
      <CardContent>
        <Typography variant="h5" component="h2">
          {movie.Name}, {new Date(movie.Premiered).getFullYear()}
        </Typography>
        <Typography color="textSecondary">
          Genres: {movie.Genres.join(', ')}
        </Typography>
        <div style={{ width: '100px' }}>
          <img src={movie.Image} alt={movie.Name} style={{ width: '100%' }} />
        </div>
        <Button variant="contained" color="primary" onClick={handleEdit}>
          Edit
        </Button>
        <Button variant="outlined" color="secondary" onClick={() => handleDelete(movie._id)}>
          Delete
        </Button>
      </CardContent>
    </Card>
  );
};

export default Movie;