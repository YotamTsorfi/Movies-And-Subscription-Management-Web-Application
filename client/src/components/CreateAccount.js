import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Typography } from '@mui/material';
const apiUrlCinema = process.env.REACT_APP_CINEMA_API_URL;

function CreateAccount() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleCreate = async () => {
    try {
    //todo Need to change to post
      //const response = await axios.get('http://localhost:4824/users/' + username);
      const response = await axios.get(`${apiUrlCinema}/users/` + username);
      if (response.status === 200 && response.data.userId) {                
        // Store the password in the database at the same user
        //const registerResponse = await axios.post('http://localhost:4824/users/register-existing', {
        const registerResponse = await axios.post(`${apiUrlCinema}/users/register-existing`, {
            username: username,
            password: password
            });
        if (registerResponse.status === 201) {
            setError(null);            
            navigate('/login');
            }

      } else {
        setError('User creation failed');
      }
    } catch (error) {
      setError('User does not exist');
    }
  };

  return (
    <div>
      <Typography variant="h4">Create Account</Typography>
      <TextField
        label="User Name"
        value={username}
        onChange={(e) => { 
            setUsername(e.target.value); 
            setError(null);
        }}
        margin="normal"
      />
      <TextField
        type="password"
        label="Password"
        value={password}
        onChange={(e) => {
             setPassword(e.target.value);
             setError(null);            
            }}
        margin="normal"
      />
        <br />
      <Button variant="contained" color="primary" onClick={handleCreate}>
        Create
      </Button>
      {error && <Typography color="error">{error}</Typography>}
    </div>
  );
}

export default CreateAccount;