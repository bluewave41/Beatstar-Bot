const UserModel = require('../models/UserModel');
const { MessageEmbed } = require('discord.js');

async function run(username) {
	const user = await UserModel.query().select('gold', 'platinum', 'diamond', 'perfect', 'totalMedalCount')
		.findOne('username', username);
	
	const embed = new MessageEmbed()
		.setColor('#0099ff')
		.setTitle('Medals')
		.addField('Gold', user.gold.toString(), true)
		.addField('Platinum', user.platinum.toString(), true)
		.addField('Diamond', user.diamond.toString(), true)
		.addField('Perfect', user.perfect.toString(), true)
		.addField('Total', user.totalMedalCount.toString());
		
	return embed;
}

module.exports = run;