// Header.js
import React from 'react';
import { useSelector } from 'react-redux';

function Header() {
  // Use Redux's useSelector hook to access the current user from the state
  const username = useSelector(state => state.user.username);

  return (
    <header>
      { username && <p> Welcome, {username}! </p> }
    </header>
  );
}

export default Header;