const express = require('express');
const SubscriptionBLL = require('../BLL/SubscribeMovieBL')
const MovieBLL = require('../BLL/movieBL')
const router = express.Router();

// Get all subscriptions for a member
router.get('/:memberId', async (req, res) => {
    try {
        const subscriptions = await SubscriptionBLL.getMemberSubscriptions(req.params.memberId);
        res.json(subscriptions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create a new subscription for a member
// router.post('/:memberId', async (req, res) => {
//     try {
//         console.log('req.body', req.body);
//         console.log('req.params.memberId', req.params.memberId);
//         const newSubscription = await SubscriptionBLL.updateSubscription(req.params.memberId, req.body);
//         res.status(201).json(newSubscription);
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// });

// // Update a subscription for a member
// router.put('/:memberId', async (req, res) => {
//     try {
//         const updatedSubscription = await SubscriptionBLL.updateSubscription(req.params.memberId, req.body.Movies);
//         res.json(updatedSubscription);
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// });

router.route('/create')
    .post(async (req, res) => {
        const { memberId, movieId, date } = req.body;
        const newSubscription = {
            MemberId: memberId,
            Movies: [{ movieId, date }]
        };
        const result = await SubscriptionBLL.addSubscription(newSubscription);
        return res.json(result);
    });

router.route('/update/:memberId')
    .post(async (req, res) => {
        const { memberId } = req.params;
        const { movieId, date } = req.body;
        const updatedSubscription = {
            $push: { Movies: { movieId, date } }
        };
        const result = await SubscriptionBLL.updateSubscription(memberId, updatedSubscription);
        return res.json(result);
    });


// Delete a subscription for a member
router.delete('/:memberId', async (req, res) => {
    try {
        const deletedSubscription = await SubscriptionBLL.deleteSubscription(req.params.memberId);
        res.json(deletedSubscription);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get all movies that a member has not watched
router.get('/unwatched/:memberId', async (req, res) => {
    try {
        const memberSubscriptions = await SubscriptionBLL.getMemberSubscriptions(req.params.memberId);
        let watchedMovieIds = [];
        if (memberSubscriptions.length > 0) {
            watchedMovieIds = memberSubscriptions[0].Movies.map(movie => movie.movieId._id.toString());
        }
        const unwatchedMovies = await MovieBLL.getUnwatchedMovies(watchedMovieIds);
        res.json(unwatchedMovies);
    } catch (error) {
        console.error('Error fetching unwatched movies', error);
        res.status(500).send('Error fetching unwatched movies');
    }
});

module.exports = router;