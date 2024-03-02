// const mongoose = require('mongoose');

// //mongoose.set("strictQuery", false);
// const connectDB = () => {
//     mongoose
//       .connect('mongodb://localhost:27017/UsersDB')
//       .then(() => console.log('Connected to UsersDB!'))
//       .catch((error) => console.log(error));
//   };


// module.exports = connectDB;

const mongoose = require('mongoose');

const connectDB = () => {
    
    const uri = "mongodb+srv://tsorfy:J5MpX7g0tFbn8BmN@usersdb.lc6ilua.mongodb.net/UsersDB?retryWrites=true&w=majority&appName=UsersDB";
    
    mongoose
      .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => console.log('Connected to UsersDB on MongoDB Atlas!'))
      .catch((error) => console.log(error));
};

module.exports = connectDB;