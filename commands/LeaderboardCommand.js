const { MessageEmbed } = require('discord.js');
const axios = require('axios');

async function run() {
	const response = await axios.post('http://143.110.226.4:7000/api/leaderboard/getPage', { page: 1 });
	
	let description = '';
	
	for(var x=0;x<response.data.length;x++) {
		description += `${x+1}: ${response.data[x].androidId} - ${response.data[x].totalMedalCount} medals\n`;
	}
	
	console.log(description)
	
	/*{
      userId: 801,
      username: '',
      androidId: 'c57f06b2ac77ef58',
      gold: 1,
      platinum: 29,
      diamond: 123,
      perfect: 3,
      totalMedalCount: 155
    }*/
	
	const exampleEmbed = new MessageEmbed()
		.setColor('#0099ff')
		.setTitle('Leaderboard')
		.setDescription(description)
	
	return exampleEmbed;
}

module.exports = run;