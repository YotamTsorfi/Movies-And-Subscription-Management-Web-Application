// AllMovies.js
import React, { useEffect, useState, useMemo , useCallback} from 'react';
import axios from 'axios';
import Movie from './Movie';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setMovies, deleteMovie, removeMovie } from '../actions/movieActions';
import { setSubscriptions } from '../actions/subscriptionActions';

function AllMovies() {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { movieId } = useParams(); 

  const movies = useSelector((state) => state.movie.movies);
  const subscriptions = useSelector((state) => state.subscriptions);

  const fetchMovies = useCallback(async () => {
      try {    
        const response = await axios.get('http://localhost:4321/movies');
        dispatch(setMovies(response.data));      
      } catch (error) {
        setError(error.message);
      }
  }, [dispatch]);

  const fetchSubscriptions = useCallback(async () => {
    const response = await axios.get('http://localhost:4321/subscriptions');
    dispatch(setSubscriptions(response.data));
  }, [dispatch]);

  useEffect(() => {
    if (movies.length === 0) {
      fetchMovies();
    }
    fetchSubscriptions();
  }, [fetchMovies, fetchSubscriptions, movies.length]);

  // useEffect(() => {
  //   movies.forEach(movie => {
  //     if (!movie._id) {
  //       dispatch(removeMovie(movie));
  //     }
  //   });
  // }, [dispatch, movies]);

  const handleSearch = () => {
    const filtered = movies.filter(movie => movie.Name.toLowerCase().includes(searchTerm.toLowerCase()));
    //setFilteredMovies(filtered);
    dispatch(setMovies(filtered));
  };

  const displayedMovies = useMemo(() => {
    return movies.filter(movie => (!movieId || movie._id === movieId));
  }, [movies, movieId]);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:4321/movies/${id}`);
      if (response.status === 200) {
        // Wait for fetchData to complete before continuing
        //await fetchMovies();
        dispatch(deleteMovie(id));
      }
    } catch (error) {
      console.error(`Error deleting movie with id ${id}`, error);
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div style={{ border: '3px solid black', marginBottom: '20px' , width:'800px'}}>
    <h3>All Movies</h3>
    Find Movie: <input type="text" name="search" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
    <button onClick={handleSearch}>Find</button>
    <button onClick={() => navigate('/main')}>Main</button>
        {displayedMovies.map(movie => (
        <Movie 
          key={movie._id} 
          movie={movie} 
          subscriptions={subscriptions} 
          handleDelete={handleDelete} 
          />
        ))}
    </div>

  );
}

export default AllMovies;