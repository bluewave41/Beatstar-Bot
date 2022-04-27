const { MessageEmbed } = require('discord.js');
const axios = require('axios');

async function run() {
	const response = await axios.post('http://143.110.226.4:7000/api/leaderboard/getPage', { page: 1 });
	
	let description = '';
	
	for(var x=0;x<response.data.length;x++) {
		const name = response.data[x].username ? response.data[x].username : response.data[x].androidId;
		description += `${x+1}: ${name} - ${response.data[x].totalMedalCount} medals\n`;
	}
	
	const exampleEmbed = new MessageEmbed()
		.setColor('#0099ff')
		.setTitle('Leaderboard')
		.setDescription(description)
	
	return exampleEmbed;
}

module.exports = run;