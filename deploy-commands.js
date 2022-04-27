require('dotenv').config({ path: '.env' });
const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const commands = [
	new SlashCommandBuilder().setName('leaderboard').setDescription('Shows the top leaderboard.'),
	new SlashCommandBuilder().setName('info').setDescription('Show your info.'),
	new SlashCommandBuilder().setName('claim').setDescription('Claim your account')
		.addNumberOption(option => option.setName('score').setDescription('Your score on a recent beatmap').setRequired(true))
		.addStringOption(option => option.setName('username').setDescription('The name you want to show on the leaderboard').setRequired(true))
]
.map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(process.env.token);

rest.put(Routes.applicationGuildCommands(process.env.clientId, process.env.guildId), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);