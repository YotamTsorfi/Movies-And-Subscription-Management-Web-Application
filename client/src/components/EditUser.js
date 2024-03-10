import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Checkbox, FormControlLabel } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserPermissions, logoutUser } from '../actions/userActions';

function EditUser() {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.userId);
  const token = useSelector(state => state.user.token);

  const navigate = useNavigate();
  const { id } = useParams();
  const [user, setUser] = useState({
    'Id': '',
    'User Name': '',
    'Name': '',
    'Session time out': '',
    'Created Date': '',
    'Permissions': [],
    'firstName': '',
    'lastName': '',
  });

  const [permissions, setPermissions] = useState({
    'View Subscriptions': false,
    'Create Subscriptions': false,
    'Delete Subscriptions': false,
    'Update Subscriptions': false,
    'View Movies': false,
    'Create Movies': false,
    'Delete Movies': false,
    'Update Movies': false,
  });


  useEffect(() => {
    // Fetch the user data when the component mounts
    const fetchUser = async () => {
      //const response = await axios.get(`http://localhost:4824/combinedData/${id}`, {
      const response = await axios.get(`${process.env.REACT_APP_CINEMA_API_URL}/combinedData/${id}`, {
        headers: { "x-access-token": token },  
      });
      const userData = response.data;
      setUser(userData);

      // Split the 'Name' into 'firstName' and 'lastName'
      const [firstName, lastName] = userData['Name'].split(' ');
      setUser({ ...userData, firstName, lastName });
        
      // Set the initial permissions based on the user data
      setPermissions(prevPermissions => ({
        ...prevPermissions,
        ...userData.Permissions.reduce((acc, permission) => ({ ...acc, [permission]: true }), {})
      }));
    };

    fetchUser();
  }, [id, token]);

  const handleInputChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;

    setPermissions(prevPermissions => {
      let newPermissions = { ...prevPermissions, [name]: checked };
  
      // Automatically check "View Subscriptions" if any subscription permission is checked
      if (['Create Subscriptions', 'Update Subscriptions', 'Delete Subscriptions'].includes(name) && checked) {
        newPermissions['View Subscriptions'] = true;
      }
      // Automatically check "View Movies" if any movie permission is checked
      if (['Create Movies', 'Update Movies', 'Delete Movies'].includes(name) && checked) {
        newPermissions['View Movies'] = true;
      }
  
      return newPermissions;
    });
  };

  const handleUpdate = async () => {
    // Update the user
    try {
      //const response = await axios.put(`http://localhost:4824/combinedData/${user.Id}`, { ...user, Permissions: permissions }, {
      const response = await axios.put(`${process.env.REACT_APP_CINEMA_API_URL}/combinedData/${user.Id}`, { ...user, Permissions: permissions }, {
        headers: { "x-access-token": token }
      });
      if (response.status === 200) {
        console.log(`User ${user["User Name"]} updated successfully`);     
        
        // If the currently logged-in user is being updated, update the permissions in the Redux store
        if (user.Id === userId) {
          dispatch(updateUserPermissions(permissions));
        }        

        navigate('/users');
      }
    } catch (error) {
      if (error.response) {
        console.error(`Error updating user ${user["User Name"]}`, error);
        dispatch(logoutUser);
        navigate("/login");
      }
    }
  };

  const handleCancel = () => {
    navigate('/users');
  };

  return (
    user && (
      <Box sx={{ marginBottom: '20px', border: '1px solid #000', borderRadius: '5px', padding: '10px', width: 'fit-content' }}>
        <TextField label="First Name: " name="firstName" value={user['firstName']} onChange={handleInputChange} />
        <br />
        <TextField label="Last Name: " name="lastName" value={user['lastName']} onChange={handleInputChange} />
        <br />
        <TextField label="Username: " name="User Name" value={user['User Name']} onChange={handleInputChange} />
        <br />
        <TextField label="Session Time Out (Minutes): " name="Session time out" value={user['Session time out']} onChange={handleInputChange} />
        <br />
        <TextField label="Created Date: " name="Created Date" value={user['Created Date']} InputProps={{ readOnly: true }} />
        <br />
        <h3>Permissions:</h3>
        <FormControlLabel control={<Checkbox name="View Subscriptions" checked={permissions['View Subscriptions']} onChange={handleCheckboxChange} />} label="View Subscriptions" />
        <br />
        <FormControlLabel control={<Checkbox name="Create Subscriptions" checked={permissions['Create Subscriptions']} onChange={handleCheckboxChange} />} label="Create Subscriptions" />
        <br />
        <FormControlLabel control={<Checkbox name="Delete Subscriptions" checked={permissions['Delete Subscriptions']} onChange={handleCheckboxChange} />} label="Delete Subscriptions" />
        <br />
        <FormControlLabel control={<Checkbox name="Update Subscriptions" checked={permissions['Update Subscriptions']} onChange={handleCheckboxChange} />} label="Update Subscriptions" />
        <br />
        <FormControlLabel control={<Checkbox name="View Movies" checked={permissions['View Movies']} onChange={handleCheckboxChange} />} label="View Movies" />
        <br />
        <FormControlLabel control={<Checkbox name="Create Movies" checked={permissions['Create Movies']} onChange={handleCheckboxChange} />} label="Create Movies" />
        <br />
        <FormControlLabel control={<Checkbox name="Delete Movies" checked={permissions['Delete Movies']} onChange={handleCheckboxChange} />} label="Delete Movies" />
        <br />
        <FormControlLabel control={<Checkbox name="Update Movies" checked={permissions['Update Movies']} onChange={handleCheckboxChange} />} label="Update Movie" />
        <br />
        <Button onClick={handleUpdate}>Update</Button>
        <Button onClick={handleCancel}>Cancel</Button>
      </Box>
    )
  );
}

export default EditUser;