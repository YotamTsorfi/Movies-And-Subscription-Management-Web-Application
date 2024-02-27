import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Movie = ({ movie, handleDelete, subscriptions }) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/edit-movie/${movie._id}`);
  };

  return (
    <div style={{ border: '3px solid black', marginBottom: '20px' , width:'500px'}}>       
        {movie.Name}, {new Date(movie.Premiered).getFullYear()}
        <br/>
        Genres: {movie.Genres.join(', ')}
        <br/>        
        <div style={{ display: 'flex' }}>
          <img src={movie.Image} alt={movie.Name} style={{ width: '20%' }} />
          <div style={{ border: '1px solid black', padding: '10px', width: '50%' }}>
            <strong>Subscriptions watched:</strong>
            <ul>
              {subscriptions.map(subscription => (
                <li key={subscription.MemberId}>
                  <Link to={`/edit-member/${subscription.MemberId}`}>
                    {subscription.MemberName}
                  </Link>, 
                  {new Date(subscription.date).toLocaleDateString()}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <br/>
        <button onClick={handleEdit}>Edit</button>
        <button onClick={()=> handleDelete(movie._id)}>Delete</button>
        <br/>        
    </div>
  );

};

export default Movie;