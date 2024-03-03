const mongoose = require('mongoose');

const connectDB = () => {
    mongoose
      .connect('mongodb+srv://tsorfy:J5MpX7g0tFbn8BmN@subscriptionsdb.lc6ilua.mongodb.net/SubscriptionsDB?retryWrites=true&w=majority&appName=UsersDB', { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => console.log('Connected to SubscriptionsDB on Atlas!'))
      .catch((error) => console.log(error));
};

module.exports = connectDB;