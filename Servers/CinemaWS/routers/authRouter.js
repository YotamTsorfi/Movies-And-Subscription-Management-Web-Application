const express = require('express');
const jwt = require('jsonwebtoken');
const userBL = require('../BLL/userBL'); 
const usersFileBL = require('../BLL/usersFileBL');

const router = express.Router();

//http://localhost:4824/auth/login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Get the user from the database
    const user = await userBL.getUserByUsername(username);

    if (user.length == 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    const userObject = user[0];

    if (await userBL.validatePassword(userObject, password)) {
      
      //Gettting ipAddress as a private key        
        const RSA_PRIVATE_KEY = process.env.JWT_SECRET_KEY;
        const token = jwt.sign({ 
            username: user.username,
            userId: userObject._id.toString() }, 
             RSA_PRIVATE_KEY,
            { expiresIn: '1h' });


        const sessionTimeOut = 60; // 1 hour in minutes
        await usersFileBL.updateUserProperty(userObject._id, 'sessionTimeOut', sessionTimeOut);  

        res.json({ token: token, userId: userObject._id});
    } else {
      res.status(401).json({ message: 'Invalid password' });
    }
  } catch (err) {
    res.status(500).send(err);
  }
});



module.exports = router;
