const admin = require('firebase-admin');

const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Extract token from the Authorization header
  if (!token) {
    return res.status(403).json({ error: 'No token provided.' });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    
    // Check for super-admin privilege
    if (decodedToken.role === 'superAdmin') { // assuming 'role' claim is set to 'superAdmin'
      next(); // user is a super-admin, proceed to the next middleware or route handler
    } else {
      res.status(403).json({ error: 'Access denied. Super-admin privileges required.' });
    }
  } catch (error) {
    res.status(401).json({ error: 'Invalid or expired token.' });
  }
};

module.exports = verifyToken;