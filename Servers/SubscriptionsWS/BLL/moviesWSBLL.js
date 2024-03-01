const moviesWS = require('../DAL/moviesWS');

const getMovies = async () => {
    try {
        const movies = await moviesWS.getMovies();        
        return movies;
    } catch (err) {
        console.error('Failed to fetch movies', err);
        throw err;
    }
}


module.exports = {getMovies};