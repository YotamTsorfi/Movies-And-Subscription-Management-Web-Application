// Users.js
import React, { useState, useEffect, useCallback }  from 'react';
import axios from 'axios';
import { Box, Typography, Button } from '@mui/material';
import User from './User';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../actions/userActions';
import { useSelector } from 'react-redux';
const apiUrl = process.env.REACT_APP_CINEMA_API_URL;

function Users() {  
  const token = useSelector(state => state.user.token);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fetchUsers = useCallback(async () => { 
    try {
      //const response = await axios.get('http://localhost:4824/combinedData', {
      const response = await axios.get(`${apiUrl}/combinedData`, {
        headers: { "x-access-token": token }      
      });
      if (response.status === 200) {        
        setUsers(response.data);
      }
    }
    catch (error) {
      console.error('Error getting users', error);
      dispatch(logoutUser);
      navigate("/login");
    }
  }, [token, navigate, dispatch]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);



  const handleLogout = () => {
    dispatch(logoutUser()); 
    navigate('/login');
  }

  return (
    <Box sx={{ marginBottom: '20px', border: '1px solid #9c27b0', borderRadius: '5px', padding: '10px', width: 'fit-content' }}>
      <Typography variant="h4">Users</Typography>
      <Button variant="contained" color="primary" onClick={() => navigate('/manage-users')}>Manage Users</Button>
      <Button variant="contained" style={{ backgroundColor: '#ff0000' }} onClick={() => navigate('/add-user')}>Add User</Button>
      <Button variant="contained" color="secondary" onClick={handleLogout}>Log Out</Button>
      {users.map((user, index) => (
        <User key={index} user={user} refreshUsers={fetchUsers} />
      ))}
    </Box>
  );
}

export default Users;