import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function MoviesWatched({ memberId }) {

    const [memberSubscriptions, setMemberSubscriptions] = useState([]);
    const [showSubscribe, setShowSubscribe] = useState(false);
    
    const [unwatchedMovies, setUnwatchedMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState('');
    const [selectedDate, setSelectedDate] = useState('');

    const fetchSubscriptions = useCallback(async () => {
        try {
          const response = await axios.get(`http://localhost:4321/subscriptions//${memberId}`);
          setMemberSubscriptions(response.data);
        } catch (error) {
          console.error(`Error fetching subscriptions for member with id ${memberId}`, error);
        }
      }, [memberId]); // fetchSubscriptions is recreated only when memberId changes
      

    useEffect(() => {
        fetchSubscriptions();
    }, [fetchSubscriptions]);

    const fetchUnwatchedMovies = async () => {
        try {
            const response = await axios.get(`http://localhost:4321/subscriptions/unwatched/${memberId}`);
            setUnwatchedMovies(response.data);
        } catch (error) {
            console.error(`Error fetching unwatched movies for member with id ${memberId}`, error);
        }
    };

    const handleSubscribe = async () => {
        try {
            if (selectedMovie === ""  || !selectedDate) {
                console.error('Movie and date are required');
                return;
            }
            const url = memberSubscriptions.length > 0
                ? `http://localhost:4321/subscriptions/update/${memberId}`
                : `http://localhost:4321/subscriptions/create`;
    
            const response = await axios.post(url, {
                memberId,
                movieId: selectedMovie,
                date: selectedDate
            });
    
            if (response.status === 200) {
                fetchSubscriptions();
            } else {
                // Handle error
                console.error('Error subscribing to movie', response);
            }
        } catch (error) {
            console.error('Error subscribing to movie', error);
        }
    };


    return (
        <div style={{ border: '3px solid black', marginBottom: '20px' , width:'300px'}}>
            Movies Watched 
            <br/>   
            <button onClick={() => {
                setShowSubscribe(!showSubscribe);
                if (!showSubscribe) fetchUnwatchedMovies();
            }}>
                Subscribe to new movie
            </button>
            {showSubscribe && (
                <div>
                    <select onChange={(e) => setSelectedMovie(e.target.value)}>
                        <option value="">Select a movie</option>
                        {unwatchedMovies.map((movie) => (
                            <option key={movie._id} value={movie._id}>{movie.Name}</option>
                        ))}
                    </select>
                    <input type="date" onChange={(e) => setSelectedDate(e.target.value)} />
                    <button onClick={handleSubscribe}>Subscribe</button>
                </div>
            )}
            {memberSubscriptions.map(subscription => (
                subscription.Movies.map(movie => (
                    <div key={`${subscription._id}-${movie.movieId._id}`}>
                        <Link to={`/all-movies/${movie.movieId._id}`}>{movie.movieId.Name}</Link>                
                        , {new Date(movie.date).toLocaleDateString()}
                    </div>
                ))
            ))}
        </div>
    );
}

export default MoviesWatched;