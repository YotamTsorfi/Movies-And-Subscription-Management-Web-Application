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

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'USER_LOGOUT' }); 
  }, []);


  return (
    <Router>
      <Header />
        <Routes>
          <Route  path="/" element={<Login />} />
          <Route  path="/login" element={<Login />} />
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/main" element={<Main />} />
          <Route path="/manage-users" element={<ManageUsers />} />
          <Route path="/users/*" element={<Users />} />
          <Route path="/edit-user/:id" element={<EditUser />} />
          <Route path="/add-user" element={<AddUser />} />
        </Routes>    
    </Router>
  );
}

export default App;
