import React from 'react';
import { useNavigate } from 'react-router-dom';
// import SubscriptionWatched from './SubscriptionsWatched';

const Movie = ({ movie, handleDelete, subscriptions }) => {
  const nevigate = useNavigate();

  //const movieSubscriptions = subscriptions.filter(subscription => subscription.movieId === movie._id);
  

  const handleEdit = () => {
    nevigate(`/edit-movie/${movie._id}`);
  };

  return (
    <div style={{ border: '3px solid black', marginBottom: '20px' , width:'500px'}}>
       
        {movie.Name}, {new Date(movie.Premiered).getFullYear()}
        <br/>
        Genres: {movie.Genres.join(', ')}
        <br/>
        
        <img src={movie.Image} alt={movie.Name} style={{ width: '20%' }} />
        {/* <SubscriptionWatched movieId={movie._id} /> */}
        <br/>
        <button onClick={handleEdit}>Edit</button>
        <button onClick={()=> handleDelete(movie._id)}>Delete</button>
        <br/>        
        
    </div>
  );

};

export default Movie;