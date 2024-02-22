import React from 'react';
import { Link } from 'react-router-dom';

function WatchedMovie({ member }) {
    return (
        <div>
            Movies watched by {member.Name}            
            {/* <Link to={`/movies/${movie._id}`}>{movie.title}</Link> */}
            {' watched on '}
            {/* {new Date(movie.dateWatched).toLocaleDateString()} */}
        </div>
    );
}

export default WatchedMovie;