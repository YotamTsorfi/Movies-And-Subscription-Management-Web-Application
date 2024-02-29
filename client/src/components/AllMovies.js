// AllMovies.js
import React, { useEffect, useState} from 'react';
import Movie from './Movie';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies, deleteMovie } from '../actions/moviesActions';
import { fetchSubscriptions } from '../actions/subscriptionsActions';
import { fetchMembers } from '../actions/membersActions';

function AllMovies() {
  const dispatch = useDispatch();
  const allMovies = useSelector(state => state.movies);
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]);
  const { movieId } = useParams(); 

  const permissions = useSelector((state) => state.user.permissions);
  const allSubscriptions = useSelector(state => state.subscriptions);
  const allMembers = useSelector(state => state.members);

  useEffect(() => {
    dispatch(fetchMovies());
    dispatch(fetchSubscriptions());
    dispatch(fetchMembers());
  }, [dispatch]);

  useEffect(() => {
    setMovies(allMovies);
  }, [allMovies]);

  useEffect(() => {
    if (movieId) {
      const movie = allMovies.find(movie => movie._id === movieId);
      setMovies(movie ? [movie] : []);
    }
  }, [movieId, allMovies]);

  const handleSearch = () => {
    const filteredMovies = allMovies.filter(movie =>
      movie.Name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setMovies(filteredMovies);
  };

  const handleDelete = (id) => {
    dispatch(deleteMovie(id));
  };

  return (
    <div style={{ border: '3px solid black', marginBottom: '20px' , width:'800px'}}>
      <h3>All Movies</h3>
      Find Movie: <input type="text" name="search" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
      <button onClick={handleSearch}>Find</button>

      {movies.map(movie => {
        const movieSubscriptions = allSubscriptions
          .filter(subscription => subscription.Movies.some(m => m.movieId === movie._id))
          .map(subscription => {            
            const member = allMembers.find(member => member._id === subscription.MemberId);
            const movieSubscription = subscription.Movies.find(m => m.movieId === movie._id);

            return {
              MemberId: subscription.MemberId,
              MemberName: member ? member.Name : 'Unknown',
              date: movieSubscription.date
            };
          });

        return (
          <Movie 
            key={movie._id} 
            movie={movie}         
            handleDelete={handleDelete} 
            subscriptions={movieSubscriptions}
            permissions={permissions} 
          />
        );
      })}
    </div>
  );


}

export default AllMovies;