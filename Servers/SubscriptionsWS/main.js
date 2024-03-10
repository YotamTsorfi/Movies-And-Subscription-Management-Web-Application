const express = require("express");
const memberRouter = require("./routers/MemberRouter");
const movieRouter = require("./routers/MovieRouter");
const memberWSRouter = require('./routers/memberWSRouter');
const movieWSRouter = require('./routers/moviesWSRouter');
const subscribeMovieRouter = require('./routers/SubscribeMovieRouter');
const { populateDatabase } = require("./utils/dataPopulationModule");

const app = express();
const connectDB = require('./configs/database');

const cors = require("cors");
const path = require("path");

//const { log } = require('console');

const port = 4321;

connectDB();
//After connect to the database we can start the server and call the populateDatabase funcion.
populateDatabase().catch((err) => console.log(err));


app.use(cors());
app.use(express.json());

//http://localhost:4321/members
app.use("/members", memberRouter);
app.use("/movies", movieRouter);
app.use('/membersWS', memberWSRouter);
app.use('/moviesWS', movieWSRouter);
app.use('/subscriptions', subscribeMovieRouter);


app.use(express.static(path.join(__dirname, "public")));
app.use(express.static('build'));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});


app.listen(port, '0.0.0.0', () => {
  console.log(`App is listening at http://localhost:${port}`);
});