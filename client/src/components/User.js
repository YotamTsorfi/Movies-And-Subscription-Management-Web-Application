// User.js
import React, { useState, useEffect } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { logoutUser } from '../actions/userActions';
import { useDispatch } from 'react-redux';
const apiUrl = process.env.REACT_APP_CINEMA_API_URL;

function User({ user, refreshUsers }) {
  const dispatch = useDispatch();
  const token = useSelector(state => state.user.token);
  const navigate = useNavigate();
  const [createdDate, setCreatedDate] = useState('N/A');
  const [permissions, setPermissions] = useState(['N/A']);

  useEffect(() => {
    if(user["Created Date"] !== "N/A" ){
      const dateObject = new Date(user["Created Date"]);    
      const create_date = dateObject.toISOString().split('T')[0];
      setCreatedDate(create_date);
    }

    if(user.Permissions !== "N/A"){
      const permissionsString = user.Permissions.join(", ");
      setPermissions(permissionsString);
    }

  }, [user]);

  const handleEdit = () => {
    // Redirect to the Edit User page
    navigate(`/edit-user/${user["Id"]}`);
  };

  const handleDelete = async () => {
    // Delete the user
    try {
      //const response = await axios.delete(`http://localhost:4824/combinedData/${user.Id}`, {
      const response = await axios.delete(`${apiUrl}/combinedData/${user.Id}`, {
        headers: { "x-access-token": token }
      });
      if (response.status === 200) {
        console.log(`User ${user["User Name"]} deleted successfully`);
        // Refresh the users list
        refreshUsers();
      }
    } catch (error) {
      console.error(`Error deleting user ${user["User Name"]}`, error);
      dispatch(logoutUser());
      navigate("/login");
    }
  };

  return (
    <Box sx={{ marginBottom: '20px', border: '1px solid #000', borderRadius: '5px', padding: '10px', width: 'fit-content' }}>
      <Typography variant="body1" fontWeight="10px">Name: {user.Name}</Typography>
      <Typography variant="body1" fontWeight="10px">Username: {user["User Name"]}</Typography>
      <Typography variant="body1" fontWeight="10px">Session time out: {user["Session time out"]}</Typography>
      <Typography variant="body1" fontWeight="10px">Created Date: {createdDate}</Typography>
      <Typography variant="body1" fontWeight="10px">Permissions: {permissions}</Typography>
      <Button onClick={handleEdit}>Edit</Button>
      <Button onClick={handleDelete}>Delete</Button>
    </Box>
  );
}

export default User;