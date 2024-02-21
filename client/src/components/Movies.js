import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Button, List, ListItem, ListItemText, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../actions/userActions';

function Movies() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser()); 
    navigate('/login');
  };

  return (
    <div>
      <Typography variant="h4" component="h1" gutterBottom>
        Movies
      </Typography>
      <List component="nav">
        <ListItem button component={RouterLink} to="/all-movies">
          <ListItemText primary="All Movies" />
        </ListItem>
        <ListItem button component={RouterLink} to="/add-movie">
          <ListItemText primary="Add movie" />
        </ListItem>
      </List>
      <Button variant="contained" color="primary" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
}

export default Movies;