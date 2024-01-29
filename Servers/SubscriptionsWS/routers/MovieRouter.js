const movieBL = require("../BLL/movieBL");
const express = require("express");
const router = express.Router();

router.route("/").get(async function (req, res) {
  try {
    let movies = await movieBL.getMovies();
    res.json(movies);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.route("/:id").get(async function (req, res) {
  try {
    let id = req.params.id;
    let movie = await movieBL.getMovieById(id);
    res.json(movie);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.route("/").post(async function (req, res) {
  try {
    let obj = req.body;
    let status = await movieBL.createMovie(obj);
    res.json(status);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.route("/:id").put(async function (req, res) {
  try {
    let id = req.params.id;
    let obj = req.body;

    let updatedMovie = await movieBL.updateMovie(id, obj);
    res.json(updatedMovie);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.route("/:id").delete(async function (req, res) {
  try {
    let id = req.params.id;
    let status = await movieBL.deleteMovie(id);
    res.json(status);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
