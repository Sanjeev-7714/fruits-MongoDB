require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'https://fruits-mongo-db.vercel.app'], // Fixed Vercel URL by removing trailing slash
  methods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization', 'Origin', 'Accept']
}));

// Handle preflight requests
app.options('*', cors());

// Add explicit header for CORS (backup solution)
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (origin === 'https://fruits-mongo-db.vercel.app') {
    res.header('Access-Control-Allow-Origin', origin);
  }
  next();
});
app.use(express.json());

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/fruits-database';
mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define Fruit Schema
const fruitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Fruit = mongoose.model('Fruit', fruitSchema);

// API Routes
app.get('/api/fruits', async (req, res) => {
  try {
    const fruits = await Fruit.find().sort({ createdAt: -1 });
    res.json(fruits);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/fruits', async (req, res) => {
  try {
    const { name } = req.body;
    
    if (!name) {
      return res.status(400).json({ message: 'Fruit name is required' });
    }
    
    const newFruit = new Fruit({ name });
    const savedFruit = await newFruit.save();
    
    res.status(201).json(savedFruit);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete('/api/fruits/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid fruit ID' });
    }
    
    const deletedFruit = await Fruit.findByIdAndDelete(id);
    
    if (!deletedFruit) {
      return res.status(404).json({ message: 'Fruit not found' });
    }
    
    res.json({ message: 'Fruit deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});