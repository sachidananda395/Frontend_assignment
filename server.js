// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Initialize Express app
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname)); // serve index.html

// Connect to MongoDB (local or Atlas)
mongoose.connect('mongodb://localhost:27017/myDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  _id: String,
  mobile: String,
  gender: String,
  address: String
});
const User = mongoose.model('User', userSchema);

// CREATE - Save to MongoDB
app.post('/users', (req, res) => {
  const user = new User(req.body); // Create a new User from the request body
  user.save() // Save to MongoDB
    .then(savedUser => res.json(savedUser))
    .catch(err => res.status(500).json({ error: 'Error saving user' }));
});

// READ - Get all users from MongoDB
app.get('/users', (req, res) => {
  User.find() // Fetch all users
    .then(users => res.json(users))
    .catch(err => res.status(500).json({ error: 'Error fetching users' }));
});

// UPDATE - Update a user in MongoDB
app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  User.findByIdAndUpdate(id, req.body, { new: true }) // Find and update the user
    .then(updatedUser => res.json(updatedUser))
    .catch(err => res.status(500).json({ error: 'Error updating user' }));
});

// DELETE - Delete a user from MongoDB
app.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  User.findByIdAndDelete(id) // Find and delete the user
    .then(() => res.json({ success: true }))
    .catch(err => res.status(500).json({ error: 'Error deleting user' }));
});

// Start server
app.listen(3000, () => {
  console.log('🚀 Server running at http://localhost:3000');
});