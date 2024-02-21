import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Header from "./components/Header";
import Login from "./components/Login";
import CreateAccount from './components/CreateAccount';
import Main from './components/Main';
import ManageUsers from './components/ManageUsers';
import Users from './components/Users';
import EditUser from './components/EditUser';
import AddUser from './components/AddUser';
import Movies from './components/Movies';
import AllMovies from './components/AllMovies';
import Movie from './components/Movie';
import EditMovie from './components/EditMovie';
import AddMovie from './components/AddMovie';

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'USER_LOGOUT' }); 
  }, [dispatch]);


  return (
    <Router>
      <Header />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/main" element={<Main />} />
          <Route path="/manage-users" element={<ManageUsers />} />
          <Route path="/users/*" element={<Users />} />
          <Route path="/edit-user/:id" element={<EditUser />} />
          <Route path="/add-user" element={<AddUser />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/all-movies" element={<AllMovies />} />
          <Route path="/movie/:id" element={<Movie />} />
          <Route path="/edit-movie/:id" element={<EditMovie />} />
          <Route path="/add-movie" element={<AddMovie />} />
        </Routes>    
    </Router>
  );
}

export default App;
