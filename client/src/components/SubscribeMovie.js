import React, { useEffect, useState } from 'react';
import axios from 'axios';

function SubscribeMovie({ memberId }) {
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState('');
    const [dateWatched, setDateWatched] = useState('');

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await axios.get(`http://your-api-url/members/${memberId}/unwatchedMovies`);
                setMovies(response.data);
            } catch (error) {
                console.error('Error fetching unwatched movies', error);
            }
        };

        fetchMovies();
    }, [memberId]);

    const handleSubscribe = async () => {
        try {
            await axios.post(`http://your-api-url/members/${memberId}/subscriptions`, {
                movieId: selectedMovie,
                dateWatched
            });
            // Refresh the page after successful subscription
            window.location.reload();
        } catch (error) {
            console.error('Error subscribing to movie', error);
        }
    };

    return (
        <div>
            <select value={selectedMovie} onChange={e => setSelectedMovie(e.target.value)}>
                {movies.map(movie => (
                    <option key={movie._id} value={movie._id}>{movie.title}</option>
                ))}
            </select>
            <input type="date" value={dateWatched} onChange={e => setDateWatched(e.target.value)} />
            <button onClick={handleSubscribe}>Subscribe</button>
        </div>
    );
}

export default SubscribeMovie;