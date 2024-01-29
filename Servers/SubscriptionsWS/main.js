const express = require("express");
const memberRouter = require("./routers/MemberRouter");
const movieRouter = require("./routers/MovieRouter");
const memberWSRouter = require('./routers/memberWSRouter');
const movieWSRouter = require('./routers/moviesWSRouter');
const { populateDatabase } = require("./utils/dataPopulationModule");

const app = express();
const connectDB = require('./configs/database');
require("./configs/database");

const cors = require("cors");
const path = require("path");

//const { log } = require('console');

const port = 4321;

connectDB();
//After connect to the database we can start the server and call the populateDatabase funcion.
populateDatabase().catch((err) => console.log(err));


app.use(cors());
app.use(express.json());

app.use("/members", memberRouter);
app.use("/movies", movieRouter);
app.use('/membersWS', memberWSRouter);
app.use('/moviesWS', movieWSRouter);


app.use(express.static(path.join(__dirname, "public")));

app.listen(port, () => {
  console.log(`App is listening at http://localhost:${port}`);
});
