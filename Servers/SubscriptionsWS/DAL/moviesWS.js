const axios = require('axios');

const getMovies = async () => {
    try {
        const movies = await axios.get('https://api.tvmaze.com/shows');
        return movies.data;
    } catch (err) {
        throw err;
    }
};


module.exports = {getMovies};