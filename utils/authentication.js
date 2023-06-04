const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Generate JWT token
function generateToken(user) {
  const payload = {
    id: user._id,
    email: user.email
    // Add any additional user data you want to include in the token
  };

  const options = {
    expiresIn: '1d' // Set the token expiration time as per your requirements
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, options);
  return token;
}

// Middleware to protect routes
async function protectRoute(req, res, next) {
  // Extract the token from the request headers, query parameters, or cookies
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    // Verify and decode the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch the user associated with the token
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Attach the user object to the request for further use
    req.user = user;

    // Proceed to the next middleware or route
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
}

module.exports = {
  generateToken,
  protectRoute
};
