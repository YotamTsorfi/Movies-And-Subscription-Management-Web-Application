const jwt = require('jsonwebtoken');
const usersFileBL = require('../BLL/usersFileBL');

function verifyToken(req, res, next) {
  const token = req.headers['x-access-token'];
  const RSA_PRIVATE_KEY = process.env.JWT_SECRET_KEY;
  //const RSA_PRIVATE_KEY = 'hardcoded-secret';
  
  if (!token) {
    return res.status(403).send({ auth: false, message: 'No token provided.' });
  }
  
  jwt.verify(token, RSA_PRIVATE_KEY, (err, decoded) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(401).send({ auth: false, message: 'Token expired.' });
      } else {
        return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
      }
    }
    
    req.userId = decoded.userId.toString();

    const currentTime = Math.floor(Date.now() / 1000); // current time in seconds
    const sessionTimeOut = Math.floor((decoded.exp - currentTime) / 60); //minutes

    usersFileBL.updateUserProperty(req.userId, 'sessionTimeOut', sessionTimeOut);

    next();
  });
}

module.exports = verifyToken;