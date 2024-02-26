import React, { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addMovie } from '../actions/movieActions';

function AddMovie() {
    const nevigate = useNavigate();
    const dispatch = useDispatch();
    const [movie, setMovie] = useState({ Name: '', Genres: '', Image: '', Premiered: ''});

    const cancelAdd = () => {      
        nevigate('/movies');
        window.location.reload();
    }

    const handleSubmit = async (event) => {
      event.preventDefault();
    
      try {
        const response = await axios.post('http://localhost:4321/movies/', movie); 
        console.log('response.data: ', response.data); 

        const newMovie = {
          _id: response.data, 
          ...movie, 
        };

        dispatch(addMovie(newMovie));
        nevigate('/movies');
        window.location.reload();
      } catch (error) {            
        console.error('There was an error!', error);
      }
    };

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


    return (
        <form onSubmit={handleSubmit}>
        <Typography variant="h4" component="h1" gutterBottom>
          Add Movie: {movie.Name}
        </Typography>
        <TextField style={{ width: '500px' }} value={movie.Name} label="Name" name="Name" onChange={handleInputChange} />
        <br />
        <TextField style={{ width: '500px' }} value={movie.Genres} label="Genres" name="Genres"  onChange={handleInputChange} />
        <br />
        <TextField style={{ width: '500px' }} value={movie.Image}  label="Image URL" name="Image" onChange={handleInputChange} />
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
          Save
        </Button>
        <Button variant="outlined" color="primary" onClick={cancelAdd}>
          Cancel
        </Button>
      </form>
    );
}

export default AddMovie;