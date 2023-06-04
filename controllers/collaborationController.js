const User = require('../models/User');
const { generateToken } = require('../utils/authentication');

async function registerUser(req, res) {
  try {
    // Extract user details from the request body
    const { name, email, password, githubUsername, experience, techStack } = req.body;

    // Validate user inputs (you can use a validation library like Joi or implement custom validation)

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: 'User already exists' });
    }

    // Create a new user instance
    const newUser = new User({
      name,
      email,
      password,
      githubUsername,
      experience,
      techStack
    });

    // Save the new user to the database
    await newUser.save();

    // Generate a JWT token for authentication
    const token = generateToken(newUser);

    // Return a success response with the token
    res.status(201).json({ message: 'User registered successfully', token });
  } catch (error) {
    // Handle any errors that occur during registration
    res.status(500).json({ error: 'Registration failed' });
  }
}

async function loginUser(req, res) {
  try {
    // Extract user credentials from the request body
    const { email, password } = req.body;

    // Validate user inputs (you can use a validation library like Joi or implement custom validation)

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if the provided password matches the user's password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    // Generate a JWT token for authentication
    const token = generateToken(user);

    // Return a success response with user details and token
    res.json({ message: 'Login successful', user, token });
  } catch (error) {
    // Handle any errors that occur during login
    res.status(500).json({ error: 'Login failed' });
  }
}

async function getUserProfile(req, res) {
  try {
    // Extract the user ID from the request parameters or authentication token
    const userId = req.params.id; // or req.user.id if using authentication middleware

    // Fetch the user profile from the database
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Return the user profile
    res.json({ user });
  } catch (error) {
    // Handle any errors that occur during profile retrieval
    res.status(500).json({ error: 'Failed to retrieve user profile' });
  }
}

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
};
