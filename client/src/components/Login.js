import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Link } from '@mui/material';
import  {loginUser}  from '../actions/userActions';

function Login() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token, error } = useSelector(state => state.user);

  useEffect(() => {
    if (token) {
      navigate('/main');
    }
  }, [token, navigate]);

  const handleLogin = (event) => {
    event.preventDefault();
    dispatch(loginUser(username, password));
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