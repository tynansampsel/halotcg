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
    //const common_count = await Card.aggregate([ { $project: { itemCount: { $size: "$common" } } }   ]);


    const card = await Card.aggregate([
      { $project: { common: { $slice: ["$common", { $size: "$common" }] } } }, // Make sure the common array is selected
      { $unwind: "$common" }, // Unwind the common array
      { $sample: { size: 1 } }, // Randomly pick one card
      { $project: { _id: 0, common: 1 } } // Optionally exclude _id from the result
    ]);
    //const randomCard = await Card.common.findOne().skip(common_count);

 
    res.json(card); // Sends back the item counts for each document
  } catch (err) {
    console.error('Error  count:', err);
    res.status(500).json({ error: 'Failed to random' });
  }
});

app.get('/api/randoms', async (req, res) => {
  try {


    const count = await Card.aggregate([
      { 
        $project: {
          itemCount: { $size: "$items" }
        }
      }
    ]);
    res.json(result); // Sends back the item counts for each document
    //const count = await Card.common.countDocuments();
    //const randomIndex = Math.floor(Math.random() * count);
    //const randomCard = await Card.common.findOne().skip(randomIndex);

    //const imgBuffer = Buffer.from(cards[0].image, 'base64');

    // Set the proper content type (adjust as needed)
    // const data = {
      //   image_url
      // }
    //res.set('Content-Type', 'image/png'); // or image/jpeg, etc.
    //res.send(imgBuffer);
    //res.json(randomCard);
  } catch (err) {
    console.error('Error  count:', err);
    res.status(500).json({ error: 'Failed to random' });
  }
});


// Helper function to randomly select an array based on weighted probabilities
function getRandomArray() {
  const weights = [2, 1.2, 0.8, 0.4, 0.1]; // Modify the weights as needed
  const totalWeight = weights.reduce((sum, weight) => sum + weight, 0); // Normalize the weights
  const rand = Math.random() * totalWeight; // Generate a random number up to the total weight
  let cumulativeWeight = 0;

  for (let i = 0; i < weights.length; i++) {
    cumulativeWeight += weights[i];
    if (rand < cumulativeWeight) {
      return i; // Return index of the selected array
    }
  }

  return 0; // Default to common if something goes wrong
}

app.get('/random-card', async (req, res) => {
  try {
    const cards = [];
    // Fetch 10 random cards from any of the 5 arrays
    for (let i = 0; i < 1; i++) {
      const selectedArrayIndex = getRandomArray(); // Randomly select an array based on weight
      const card = await Card.aggregate([
        { 
          $project: { 
            selectedArray: `$${["common", "uncommon", "rare", "legendary", "mythic"][selectedArrayIndex]}` 
          } 
        },
        { $unwind: "$selectedArray" },
        { $sample: { size: 1 } }, // Get 1 random card from the selected array
        { $project: { _id: 0, selectedArray: 1 } }
      ]);

      if (card.length > 0) {
        cards.push(card[0].selectedArray); // Add the selected card to the result
      } else {
        console.log('No card found in array', ["common", "uncommon", "rare", "legendary", "mythic"][selectedArrayIndex]);
      }
    }

    if (cards.length > 0) {
      res.json(cards); // Return the array of 10 random cards
    } else {
      res.status(404).json({ message: 'No cards found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/random-card-img', async (req, res) => {
  try {
    const cards = [];
    // Fetch 10 random cards from any of the 5 arrays
    for (let i = 0; i < 1; i++) {
      const selectedArrayIndex = getRandomArray(); // Randomly select an array based on weight
      const card = await Card.aggregate([
        { 
          $project: { 
            selectedArray: `$${["common", "uncommon", "rare", "legendary", "mythic"][selectedArrayIndex]}` 
          } 
        },
        { $unwind: "$selectedArray" },
        { $sample: { size: 1 } }, // Get 1 random card from the selected array
        { $project: { _id: 0, selectedArray: 1 } }
      ]);

      if (card.length > 0) {
        cards.push(card[0].selectedArray); // Add the selected card to the result
      } else {
        console.log('No card found in array', ["common", "uncommon", "rare", "legendary", "mythic"][selectedArrayIndex]);
      }
    }

    const imgBuffer = Buffer.from(cards[0].image, 'base64');


    res.set('Content-Type', 'image/png'); // or image/jpeg, etc.

    res.send(imgBuffer);
    //res.json(randomCard);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});