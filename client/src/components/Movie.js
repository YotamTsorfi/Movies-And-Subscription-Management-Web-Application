import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

// import SubscriptionWatched from './SubscriptionsWatched';

const Movie = ({ movie, handleDelete }) => {
  const nevigate = useNavigate();

  const allSubscriptions = useSelector(state => state.subscription.subscriptions);
  //TODO: const members = useSelector(state => state.member.members);

    // Filter the subscriptions for the current movie
    const movieSubscriptions = allSubscriptions.filter(subscription =>
    subscription.Movies.some(m => m.movieId === movie._id)
  );
  
  
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

        {/* {movieSubscriptions.map(subscription => {
          // Find the member for this subscription
          const member = members.find(member => member._id === subscription.MemberId);

          return (
            <div key={subscription._id}>
              Member: {member ? member.name : 'Unknown'}
              <br/>
              Subscribe Date: {new Date(subscription.date).toLocaleDateString()}
            </div>
          );
        })} */}

        <br/>
        <button onClick={handleEdit}>Edit</button>
        <button onClick={()=> handleDelete(movie._id)}>Delete</button>
        <br/>        
        
    </div>
  );

};

export default Movie;