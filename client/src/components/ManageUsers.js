import React from 'react';
import {  Link as RouterLink, useNavigate } from 'react-router-dom';
import { Button, List, ListItem, ListItemText, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../actions/userActions';


function ManageUsers() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logoutUser()); 
        navigate('/login');
      };

  return (
    <div>
      <Typography variant="h4" component="h1" gutterBottom>
         Manage Users Page
      </Typography>
      
      <List component="nav">
        <ListItem button component={RouterLink} to="/users">
          <ListItemText primary="Users" />
        </ListItem>
        <ListItem button component={RouterLink} to="/add-user">
          <ListItemText primary="Add User" />
        </ListItem>


      </List>

      <Button variant="contained" color="primary" onClick={() => navigate('/main')}>Main</Button>
      <Button variant="contained" color="primary" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
}

export default ManageUsers;