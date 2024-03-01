import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteMember } from '../actions/membersActions';
import MoviesWatched from './MoviesWatched';

function Member({ member }) {    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const token = useSelector(state => state.user.token);
   
    const handleEdit = () => {
        navigate(`/edit-member/${member._id}`);
    };

    const handleDelete = () => {
        dispatch(deleteMember(member._id, token));        
        window.location.reload();
      };

    return (
        <div style={{ border: '3px solid black', marginBottom: '20px' , width:'500px'}}>
            <h2>{member.Name}</h2>
            Email: {member.Email} 
            <br/>
            City: {member.City}
            <br/>
            <button onClick={handleEdit}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
            <br/>        
            <MoviesWatched memberId={member._id} />           
        </div>
    );
}

export default Member;