// Require mongoose
const mongoose = require('mongoose'); // Require mongoose
mongoose.set('strictQuery', true); // Enable strict mode

// Create Schema
const MembersSchema = new mongoose.Schema(
  {
    Name: String,
    Email: String,
    City: String,
  },
  { versionKey: false }
);

const MoviesSchema = new mongoose.Schema(
  {
    Name: String,
    Genres: {
      type: [String], // the type of the field is an array of Strings
      required: true,
    },
    Image: String,
    Premiered: Date,
  },
  { versionKey: false }
);

const SubscriptionSchema = new mongoose.Schema(
  {
    MemberId: { type: mongoose.Schema.Types.ObjectId, ref: 'members' },
    Movies: [
      {
        movieId: { type: mongoose.Schema.Types.ObjectId, ref: 'movies' },
        date: Date,
        _id: false 
      },
    ],
  },
  { versionKey: false }
);

//Creating model objects
const MemberModel = mongoose.model('members', MembersSchema);
const MovieModel = mongoose.model('movies', MoviesSchema);
const SubscriptionModel = mongoose.model('subscriptions', SubscriptionSchema);

// Exporting our model objects
module.exports = {
  MemberModel,
  MovieModel,
  SubscriptionModel,
};

