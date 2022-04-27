require('dotenv').config({ path: '.env' });
const { Client, Intents } = require('discord.js');
const LeaderboardCommand = require('./commands/LeaderboardCommand');
const ClaimCommand = require('./commands/ClaimCommand');
const InfoCommand = require('./commands/InfoCommand');
const fs = require('fs').promises;
require('./lib/Database');
// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log('Ready');
});

client.on('interactionCreate', async interaction => {
	const { commandName } = interaction;
	console.log(interaction.options.get('score'));
	
	if(commandName == 'leaderboard') {
		await interaction.reply({ embeds: [await LeaderboardCommand()] });
	}
	if(commandName == 'claim') {
		//have they already claimed an account?
		try {
			const account = await fs.readFile(`./accounts/${interaction.user.id}.json`);
			await interaction.reply("You already have a linked account.");
		}
		catch(e) {
			const score = interaction.options.get('score').value;
			const name = interaction.options.get('username').value;
			const response = await ClaimCommand(score, name);
			if(response.valid) {
				await fs.writeFile(`./accounts/${interaction.user.id}.json`, JSON.stringify({ discordId: interaction.user.id, username: name }));
			}
			await interaction.reply({ embeds: [response.embed] });
		}
	}
	if(commandName == 'info') {
		try {
			const account = JSON.parse((await fs.readFile(`./accounts/${interaction.user.id}.json`)).toString());
			console.log(account);
			await interaction.reply({ embeds: [await InfoCommand(account.username)] });
		}
		catch(e) {
			console.log(e)
			await interaction.reply("You haven't linked an account. Do so with /claim");
		}
	}
})

// Login to Discord with your client's token
client.login(process.env.token);