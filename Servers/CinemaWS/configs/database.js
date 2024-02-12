const mongoose = require('mongoose');

//mongoose.set("strictQuery", false);
const connectDB = () => {
    mongoose
      .connect('mongodb://localhost:27017/UsersDB')
      .then(() => console.log('Connected to UsersDB!'))
      .catch((error) => console.log(error));
  };


module.exports = connectDB;