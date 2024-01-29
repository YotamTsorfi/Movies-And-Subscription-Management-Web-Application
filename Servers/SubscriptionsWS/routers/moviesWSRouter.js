const express = require('express');
const moviesWSBLL = require('../BLL/moviesWSBLL');

const router = express.Router();

// http://localhost:4321/moviesWS
router.route('/').get(async (req, resp) => {
    const movies = await moviesWSBLL.getMovies();
    return resp.json(movies);
});

module.exports = router;