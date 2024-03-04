const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  const token = req.headers['x-access-token'];
  const RSA_PRIVATE_KEY = req.socket.remoteAddress;
  
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
    
    req.userId = decoded.id;
    next();
  });
}

module.exports = verifyToken;