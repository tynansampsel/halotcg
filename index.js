const express = require('express');
const app = express();
const PORT = 4000;

const mongoose = require('mongoose');

const mongoURI = 'mongodb+srv://tynansampsel:oFqiiHkMtnAdyVc5@cluster0.cnsksom.mongodb.net/main?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

app.use(express.json());

app.get('/', (req, res) => {
  res.send('API is running!');
});

app.get('/api/typea', (req, res) => {
  res.json({ message: 'HELLO' });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});


const Card = require('./models/Card.js');

app.get('/api/card', async (req, res) => {
  try {
    const cards = await Card.find(); // Get all cards
    console.log('Fetched cards:', cards);  // Log fetched cards
    //res.json(cards);

    const imgBuffer = Buffer.from(cards[0].image, 'base64');

    // Set the proper content type (adjust as needed)
    res.set('Content-Type', 'image/png'); // or image/jpeg, etc.
    // const data = {
    //   image_url
    // }
    res.send(imgBuffer);
  } catch (err) {
    console.error('Error fetching cards:', err);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

app.get('/api/random', async (req, res) => {
  try {

    const count = await Card.common.countDocuments();
    const randomIndex = Math.floor(Math.random() * count);
    const randomCard = await Card.common.findOne().skip(randomIndex);

    //const imgBuffer = Buffer.from(cards[0].image, 'base64');

    // Set the proper content type (adjust as needed)
    // const data = {
      //   image_url
      // }
    //res.set('Content-Type', 'image/png'); // or image/jpeg, etc.
    //res.send(imgBuffer);
    res.json(randomCard);
  } catch (err) {
    console.error('Error fetching cards:', err);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});