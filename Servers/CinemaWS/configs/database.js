const mongoose = require("mongoose");

const connectDB = () => {
  mongoose
    .connect(process.env.CONNECTING_STRING)
    .then(() => console.log("Connected to usersdb on Atlas!"))
    .catch((error) => console.log(error));
};

module.exports = connectDB;
