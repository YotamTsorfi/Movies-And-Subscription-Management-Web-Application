import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Link } from '@mui/material';
import  {loginUser}  from '../actions/userActions';

function Login() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (event) => {

    event.preventDefault();

    try {
      const loginSuccessful = await dispatch(loginUser(username, password));
      if (loginSuccessful) {
        navigate('/main');
        //console.log('Login successful');
      }
      else {
        setError('Failed to log in. Please try again.');
      }
    } catch (err) {
      setError('Failed to log in. Please try again.');
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <h2>Log-in Page</h2>
        <TextField
          label="User name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <Button type="submit" variant="contained">Login</Button>
      </form>
      {error && <Typography variant="body1" color="error">{error}</Typography>}
      <br />
      <Typography variant="body1">
        First time user? <Link href="/create-account">Create account</Link>
      </Typography>
    </div>
  );
}

export default Login;