import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function MoviesWatched({ memberId }) {

    const token = useSelector(state => state.user.token);
    const permissions = useSelector((state) => state.user.permissions);
    const [memberSubscriptions, setMemberSubscriptions] = useState([]);
    const [showSubscribe, setShowSubscribe] = useState(false);
    
    const [unwatchedMovies, setUnwatchedMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState('');
    const [selectedDate, setSelectedDate] = useState('');

    const fetchSubscriptions = useCallback(async () => {
        try {
          const response = await axios.get(`http://localhost:4321/subscriptions/${memberId}`,{
            headers: { 'x-access-token': token }          
          });
          setMemberSubscriptions(response.data);
        } catch (error) {
          console.error(`Error fetching subscriptions for member with id ${memberId}`, error);
        }
      }, [memberId, token]);
      

    useEffect(() => {
        fetchSubscriptions();
    }, [fetchSubscriptions]);

    const fetchUnwatchedMovies = async () => {
        try {
            const response = await axios.get(`http://localhost:4321/subscriptions/unwatched/${memberId}`,{
                headers: { 'x-access-token': token }
            });
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
                }, {
                    headers: { 'x-access-token': token }
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


    const handleSubscribeButton = () => {
        if (!permissions.includes('Create Subscriptions')) {
            alert('You do not have permission to subscribe to movies.');
        } else {
            setShowSubscribe(!showSubscribe);
            if (!showSubscribe) fetchUnwatchedMovies();
        }
    };

    return (
        <div style={{ border: '3px solid black', marginBottom: '20px' , width:'300px'}}>
            Movies Watched 
            <br/>   
            <button onClick={handleSubscribeButton}>
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