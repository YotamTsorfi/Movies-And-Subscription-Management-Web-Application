import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Button, List, ListItem, ListItemText, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../actions/userActions';

function Main() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);
  const permissions = useSelector((state) => state.user.permissions);
  const isAdmin = useSelector((state) => state.user.isAdmin);
  
  const handleLogout = () => {
    dispatch(logoutUser()); 
    navigate('/login');
  };

  const handleMoviesClick = () => {
    if (permissions.includes('View Movies')) {
      navigate('/movies');
    } else {
      alert('You do not have permission to view movies.');
    }
  };

  const handleSubscriptionsClick = () => {
    if (permissions.includes('View Subscriptions')) {
      navigate('/subscriptions');
    } else {
      alert('You do not have permission to view subscriptions.');
    }
  };

  if (!token) {
    navigate('/login');
    return null;
  }
  
  return (
    <div>
      <Typography variant="h4" component="h1" gutterBottom>
        Main Page
      </Typography>
      <List component="nav">
        <ListItem button onClick={handleMoviesClick}>
          <ListItemText primary="Movies" />
        </ListItem>
        <ListItem button onClick={handleSubscriptionsClick}>
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