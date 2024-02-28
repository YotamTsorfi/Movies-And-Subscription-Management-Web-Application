const {SubscriptionModel} = require('../models/subscriptionsModel');

const getSubscriptions = async () => {
    return await SubscriptionModel.find({});
};

const getMemberSubscriptions = async (id) => {
    return await SubscriptionModel.find({ MemberId: id }).populate('Movies.movieId');
};

const addSubscription = async (newSubscription) => {
    let subscription = new SubscriptionModel({
        MemberId: newSubscription.MemberId,
        Movies: newSubscription.Movies
    });
    return await subscription.save();
};

const updateSubscription = async (memberId, updatedSubscription) => {
    return await SubscriptionModel.findOneAndUpdate({ MemberId: memberId }, updatedSubscription, { new: true });
};

const deleteSubscription = async (id) => {
    return await SubscriptionModel.findByIdAndDelete(id);
};

const getSubscriptionsByMovie = async (movieId) => {
    const subscriptions = await SubscriptionModel.find({
        Movies: { $elemMatch: { movieId } }
    }).populate('MemberId', 'Name');

    return subscriptions.map(subscription => ({
        MemberId: subscription.MemberId._id,
        MemberName: subscription.MemberId.Name,
        date: subscription.Movies.find(movie => movie.movieId.toString() === movieId).date
    }));
};

const deleteSubscriptionByMemberId = async (memberId) => {
    try {
        const result = await SubscriptionModel.findOneAndDelete({ MemberId: memberId });
        return result;
    } catch (err) {
        throw err;
    }
}


const deleteMovieFromSubscriptions = async (movieId) => {
    try {
        const result = await SubscriptionModel.updateMany(
            {}, 
            { $pull: { Movies: { movieId: movieId } } }
        );
        return result;
    } catch (err) {
        throw err;
    }
}

module.exports = {deleteMovieFromSubscriptions, deleteSubscriptionByMemberId, getSubscriptionsByMovie, getSubscriptions, getMemberSubscriptions, addSubscription, updateSubscription, deleteSubscription };