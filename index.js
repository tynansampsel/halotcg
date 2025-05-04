const express = require('express');
const app = express();
const PORT = 4000;

const mongoose = require('mongoose');

const mongoURI = 'mongodb+srv://tynansampsel:oFqiiHkMtnAdyVc5@cluster0.cnsksom.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

app.use(express.json());

app.get('/api/typea', (req, res) => {
  res.json({ message: 'HELLO' });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
