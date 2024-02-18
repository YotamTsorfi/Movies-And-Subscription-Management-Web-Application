// Users.js
import React, { useState, useEffect }  from 'react';
import axios from 'axios';
import { Box, Typography, Button } from '@mui/material';
import User from './User';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../actions/userActions';

function Users() {  

  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axios.get('http://localhost:4824/combinedData');
        if (response.status === 200) {        
          setUsers(response.data);
        }
      }
      catch (error) {
        console.error('Error getting users', error);
      }
    }

    getUsers();
  }, []);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:4824/combinedData');
      if (response.status === 200) {        
        setUsers(response.data);
     //   console.log(response.data);
      }
    }
    catch (error) {
      console.error('Error getting users', error);
    }
  };

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