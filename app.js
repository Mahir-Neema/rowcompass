const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const userRoutes = require('./routes/userRoutes');
const CollabRoutes = require('./routes/CollabRoutes');
const addProjectRoutes = require('./routes/addProjectRoutes');
app.use('/api/users', userRoutes);
app.use('/api/collaborations', CollabRoutes);
app.use('/api/projects', addProjectRoutes); // Use the new route file for adding a project

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

// Connect to the database
mongoose
  .connect('mongodb+srv://mahirneema6:N5xKAjBsmXAPSJeq@cluster1.evpa69u.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('Connected to the database');
    // Start the server after successful database connection
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Failed to connect to the database', error);
  });
