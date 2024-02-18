const express = require("express");
const rateLimit = require("express-rate-limit");

//Routers
const userRouter = require("./routers/UserRouter");
const userFileRouter = require('./routers/UsersFileRouter');
const permissionsFileRouter = require('./routers/permissionsFileRouter');
const authRouter = require("./routers/authRouter");
const combinedDataRouter = require("./routers/CombinedDataRouter");


const app = express();
const connectDB = require('./configs/database');
const cors = require("cors");
const path = require("path");

const port = 4824;

connectDB();

app.use(cors());
app.use(express.json());

// Enable rate limiting
// const limiter = rateLimit({
//   windowMs: 20 * 60 * 1000, // 15 minutes
//   max: 300 // limit each IP to 100 requests per windowMs
// });

//app.use(limiter);

//TODO: needs to update Users.json with user's from DB (using just user _id, the rest of the fields:
//firstName, lastName, createdDate, sessionTimeOut.
// will be insert differently)
//Might use a utils folder for it (like in SubscriptionsWS), might do it when create/update a user.
//DB just hold an hash pass and username and _id.

//http://localhost:4824/users
app.use("/users", userRouter);

//http://localhost:4824/usersfile
app.use("/usersfile", userFileRouter);

//http://localhost:4824/permissionsfile
app.use("/permissionsfile", permissionsFileRouter);

//http://localhost:4824/auth/
app.use("/auth", authRouter);

//http://localhost:4824/combinedData
app.use("/combinedData", combinedDataRouter);

app.use(express.static(path.join(__dirname, "public")));

app.listen(port, () => {
    console.log(`App is listening at http://localhost:${port}`);
  });
 
  