import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Button, List, ListItem, ListItemText, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../actions/userActions';

function Main() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isAdmin = useSelector((state) => state.user.isAdmin);
  
  const handleLogout = () => {
    dispatch(logoutUser()); 
    navigate('/login');
  };

  return (
    <div>
      <Typography variant="h4" component="h1" gutterBottom>
        Main Page
      </Typography>
      <List component="nav">
        <ListItem button component={RouterLink} to="/movies">
          <ListItemText primary="Movies" />
        </ListItem>
        <ListItem button component={RouterLink} to="/subscriptions">
          <ListItemText primary="Subscriptions" />
        </ListItem>
        {isAdmin && (
          <ListItem button component={RouterLink} to="/manage-users">
            <ListItemText primary="Users Management" />
          </ListItem>
        )}
      </List>
      <Button variant="contained" color="primary" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
}

export default Main;