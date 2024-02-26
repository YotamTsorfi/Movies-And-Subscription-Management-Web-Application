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

module.exports = { getSubscriptions, getMemberSubscriptions, addSubscription, updateSubscription, deleteSubscription };