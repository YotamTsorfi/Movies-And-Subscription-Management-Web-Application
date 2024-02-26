import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import MoviesWatched from './MoviesWatched';
//import SubscribeMovie from './SubscribeMovie';

function Member({ member }) {

    const nevigate = useNavigate();
   

    const handleEdit = () => {
        nevigate(`/edit-member/${member._id}`);
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:4321/members/${member._id}`);
            // Refresh the page after successful deletion
            window.location.reload();
        } catch (error) {
            console.error(`Error deleting member with id ${member._id}`, error);
        }
    };

    return (
        <div style={{ border: '3px solid black', marginBottom: '20px' , width:'500px'}}>
            <h2>{member.Name}</h2>
            Email: {member.Email} 
            <br/>
            City: {member.City}
            <br/>
            {/* Render other member details here */}
            <button onClick={handleEdit}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
            <br/>        
            <MoviesWatched memberId={member._id} />           
        </div>
    );
}

export default Member;