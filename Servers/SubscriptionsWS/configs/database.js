// const mongoose = require('mongoose');

// //mongoose.set("strictQuery", false);
// const connectDB = () => {
//     mongoose
//       .connect('mongodb://localhost:27017/SubscriptionsDB')
//       .then(() => console.log('Connected to SubscriptionsDB!'))
//       .catch((error) => console.log(error));
//   };


// module.exports = connectDB;



const mongoose = require('mongoose');

const connectDB = async () => {
    const uri = "mongodb+srv://tsorfy:J5MpX7g0tFbn8BmN@usersdb.lc6ilua.mongodb.net/SubscriptionsDB?retryWrites=true&w=majority&appName=UsersDB";
    
    try {
        const connection = await mongoose.connect(uri);
        console.log('Connected to MongoDB Atlas!');

    } catch (error) {
        console.log(error);
    }
};

module.exports = connectDB;