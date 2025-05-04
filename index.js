const express = require('express');

const card_database = require('./database/card_database.json');

const app = express();
const PORT = 4000;

app.use(express.json());

app.get('/', (req, res) => {
	res.send('Weclome.');
});
app.listen(PORT, () => {
	console.log(`Server running at http://localhost:${PORT}`);
});

const rarity_weight = {
	common: 6,
	uncommon: 4,
	rare: 2,
	legendary: 1,
	mythic: 1
}

app.get('/random', (req, res) => {

	const max = (card_database.common.length * rarity_weight.common) +
		(card_database.uncommon.length * rarity_weight.uncommon) +
		(card_database.rare.length * rarity_weight.rare) +
		(card_database.legendary.length * rarity_weight.legendary) +
		(card_database.mythic.length * rarity_weight.mythic)

	const ran = Math.Random() * max;

	let card_index = 0;
	let array = "common"
	if (ran < card_database.common.length * rarity_weight.common) {

		card_index = Math.floor(ran / rarity_weight.common)
		array = "common"

	}else if (ran < card_database.uncommon.length * rarity_weight.uncommon) {

		card_index = Math.floor(ran / rarity_weight.uncommon)
		card_index = card_index - card_database.common.length
		array = "uncommon"	

	}else if (ran < card_database.rare.length * rarity_weight.rare) {
		card_index = Math.floor(ran / rarity_weight.rare)
		card_index = card_index - card_database.common.length - card_database.uncommon.length
		array = "rare"	

	} else if (ran < card_database.legendary.length * rarity_weight.legendary) {
		card_index = Math.floor(ran / rarity_weight.legendary)
		card_index = card_index - card_database.common.length - card_database.uncommon.length - card_database.rare.length
		array = "legendary"

	} else if (ran < card_database.mythic.length * rarity_weight.mythic) {
		card_index = Math.floor(ran / rarity_weight.legendary)
		card_index = card_index - card_database.common.length - card_database.uncommon.length - card_database.rare.length - card_database.legendary.length
		array = "mythic"
	}



	const card = card_database["mythic"][card_index]
	console.log(card)
	const imgBuffer = Buffer.from(card.image, 'base64');


	res.set('Content-Type', 'image/png'); // or image/jpeg, etc.
	res.send(imgBuffer);
});