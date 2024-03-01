const userBL = require("../BLL/userBL");
const express = require("express");
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');

//http://localhost:4824/users/username
router.route("/:username").get(async function (req, res) {
  try {
    const username = req.params.username;
    const user = await userBL.getUserByUsername(username);
    
    if (user.length > 0) {
      res.json({ userId: user[0]._id });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
    res.status(500).send(err);
  }
});
    

router.route("/:id").delete(verifyToken, async function (req, res) {
  try {
    const id = req.params.id;
    const status = await userBL.deleteUser(id);
    res.json(status);
  } catch (err) {
    res.status(500).send(err);
  }
});


//http://localhost:4824/users/register-existing
router.post('/register-existing', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await userBL.getUserByUsername(username);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    await userBL.updateUserPassword(username, password);
    res.status(201).send({ message: 'Existing user registered successfully' });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});



module.exports = router;
