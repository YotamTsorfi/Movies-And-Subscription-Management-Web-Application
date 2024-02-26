import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../actions/userActions';
import AllMovies from './AllMovies';
import AddMovie from './AddMovie';


function Movies() {
  const [menuOption, setMenuOption] = useState('All Movies');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleMenuChange = (option) => {
    setMenuOption(option);
  };
  
  const handleLogout = () => {
    dispatch(logoutUser()); 
    navigate('/login');
  };

  const resetMenuOption = () => {
    setMenuOption('All Movies');
  };

  return (
    <div style={{ border: '3px solid black', marginBottom: '20px' , width:'900px'}}> 
        <h3>Movies</h3>
        <button onClick={() => handleMenuChange('All Movies')}>All Movies</button>
        <button onClick={() => handleMenuChange('Add Movie')}>Add Movie</button>        
        <button onClick={handleLogout}>Log Out</button>
        <br/><br/>
        {menuOption === 'All Movies' && <AllMovies />}
        {menuOption === 'Add Movie' && <AddMovie resetMenuOption={resetMenuOption} />}
    </div>
);

}

export default Movies;