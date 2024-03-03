const mongoose = require('mongoose');

const connectDB = () => {
    mongoose
      .connect('mongodb+srv://tsorfy:J5MpX7g0tFbn8BmN@subscriptionsdb.lc6ilua.mongodb.net/UsersDB?retryWrites=true&w=majority&appName=UsersDB')
      .then(() => console.log('Connected to SubscriptionsDB on Atlas!'))
      .catch((error) => console.log(error));
};

module.exports = connectDB;