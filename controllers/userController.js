const User = require('../models/User');
const bcrypt = require('bcrypt');

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

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      githubUsername,
      experience,
      techStack
    });

    // Save the new user to the database
    await newUser.save();

    // Return a success response
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    // Handle any errors that occur during registration
    console.log(error);
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

    // Check if the provided password matches the user's hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    // Return a success response with user details or JWT token for authentication
    res.json({ message: 'Login successful', user: user });
  } catch (error) {
    // Handle any errors that occur during login
    console.log(error);
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
