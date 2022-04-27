const axios = require('axios');
const { MessageEmbed } = require('discord.js');
const UserModel = require('../models/UserModel');

async function run(score, name) {
	const response = await axios.get('http://143.110.226.4:3000/recentScores');
	const scores = response.data;
	const filtered = scores.filter(el => el.score == score);
	console.log(filtered[0]);
	let valid = true;
	
	let message = '';
	
	if(!filtered.length) {
		message = 'No scores found.';
		valid = false;
	}
	else if(filtered.length > 1) {
		message = 'Multiple scores found. Try getting a different more unique score.';
		valid = false;
	}
	else {
		await UserModel.query().update({
			username: name
		})
		.where('androidId', filtered[0].androidId);
		message = 'You have claimed an account.';
	}
		
	const exampleEmbed = new MessageEmbed()
		.setColor('#0099ff')
		.setTitle('Claim')
		.setDescription(message)
	
	return { valid: valid, embed: exampleEmbed };
}

module.exports = run;