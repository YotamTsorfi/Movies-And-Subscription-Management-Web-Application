const { MovieModel } = require("../models/subscriptionsModel");

const getMovies = () => {
  return MovieModel.find().exec();
};

const getMovieById = (id) => {
  return MovieModel.findById(id).exec();
};

const createMovie = async (obj) => {
  try {
    let movie = new MovieModel({
      Name: obj.Name,
      Genres: obj.Genres,
      Image: obj.Image,
      Premiered: obj.Premiered,
    });

    await movie.save();

    return movie;
  } catch (err) {
    throw err;
  }
};

const updateMovie = (id, obj) => {
  return MovieModel.findByIdAndUpdate(
    id,
    {
      Name: obj.Name,
      Genres: obj.Genres,
      Image: obj.Image,
      Premiered: obj.Premiered,
    },
    { new: true }
  ).exec();
};

const updateSingleField = async (id, field, value) => {
  try {
    const updateObj = {};
    updateObj[field] = value;
    await MovieModel.findByIdAndUpdate(id, updateObj);
    return "Update successfully";
  } catch (err) {
    throw err;
  }
};

const deleteMovie = async (id) => {
  try {
    await MovieModel.findByIdAndDelete(id);
    return "Deleted successfully";
  } catch (err) {
    throw err;
  }
};


const getUnwatchedMovies = async (watchedMovieIds) => {
  try{
    const allMovies = await getMovies();    
    const unwatched = allMovies.filter(movie => !watchedMovieIds.includes(movie._id.toString()));
    return unwatched;
  }
  catch(err){
    throw err;
  }
};


module.exports = {
  getMovies,
  getMovieById,
  createMovie,
  updateMovie,
  updateSingleField,
  deleteMovie,
  getUnwatchedMovies,
};
