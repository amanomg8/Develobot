const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('about')
		.setDescription('Replies with a description of the bot and its uses'),
	async execute(interaction) {
		await interaction.reply('Unfinished info');
	},
};