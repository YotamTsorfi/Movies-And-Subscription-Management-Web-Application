const userBL = require("../BLL/userBL");
const express = require("express");
const router = express.Router();

router.route("/").get(async function (req, res) {
  try {
    let users = await userBL.getUsers();
    res.json(users);
  } catch (err) {
    res.status(500).send(err);
  }
});

//TODO: Change to post, and send username and password in the body
// (sensitive data should not be sent in the URL)
router.route("/:username").get(async function (req, res) {
  try {
    let username = req.params.username;
    let user = await userBL.getUserByUsername(username);
    res.json(user);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.route("/").post(async function (req, res) {
  try {
    let obj = req.body;
    let status = await userBL.createUser(obj);
    res.json(status);
  } catch (err) {
    res.status(500).send(err);
  }
});


//TODO: Might not be the best idea to send the password.
router.route("/:username").put(async function (req, res) {
  try {
    let username = req.params.username;
    let obj = req.body;

    let updatedUser = await userBL.updateUser(username, obj);
    res.json(updatedUser);
  } catch (err) {
    res.status(500).send(err);
  }
});

//TODO: might need to change the function to use the username instead of the id
router.route("/:id").delete(async function (req, res) {
  try {
    let id = req.params.id;
    let status = await userBL.deleteUser(id);
    res.json(status);
  } catch (err) {
    res.status(500).send(err);
  }
});

//http://localhost:4824/users/register
router.post('/register', async (req, res) => {
  try {
      const { username, password } = req.body;
      await userBL.registerUser(username, password);
      res.status(201).send({ message: 'User registered successfully' });
  } catch (err) {
      res.status(500).send({ error: err.message });
  }
});
module.exports = router;
