const movieBL = require("../BLL/movieBL");
const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");

router.route("/").get(verifyToken, async function (req, res) {
  try {
    let movies = await movieBL.getMovies();
    res.json(movies);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.route("/:id").get(verifyToken, async function (req, res) {
  try {
    let id = req.params.id;
    let movie = await movieBL.getMovieById(id);
    res.json(movie);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.route("/").post(verifyToken, async function (req, res) {
  try {
    let obj = req.body;
    let newMovie = await movieBL.createMovie(obj);
    res.json(newMovie);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.route("/:id").put(verifyToken, async function (req, res) {
  try {
    let id = req.params.id;
    let obj = req.body;

    let updatedMovie = await movieBL.updateMovie(id, obj);
    res.json(updatedMovie);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.route("/:id").delete(verifyToken, async function (req, res) {
  try {
    let id = req.params.id;
    let status = await movieBL.deleteMovie(id);
    res.json(status);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
