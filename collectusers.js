const { SlashCommandBuilder } = require('discord.js');

let users = []

let selectedUsers = [];

module.exports = {
	data: new SlashCommandBuilder()
		.setName('collect_random_users')
		.setDescription('Creates a list of random users on your server depending on the number you request')
        .addIntegerOption(option =>
            option.setName('numberofusers')
                .setDescription('The amount of users that will be found')
                .setRequired(true)),
                
        async execute(interaction) {

        guild = interaction.guild;
        const usersCollection = await guild.members.fetch();

        let numberOfUsers = interaction.options.getInteger('numberofusers');

        const collectAllUsers = (numberOfUsersVar) => {
            for (let i = 0; i<numberOfUsersVar; i++) {
                const displayNames = usersCollection.map((user) => user.displayName);

                displayNames.forEach((displayName) => {
                    users.push(displayName);
                });
            }
        }

        const collectRandomUsers = (numberOfUsersVar) => {
            for (let i = 0; i<numberOfUsersVar-1; i++) {
                const rNumber = Math.floor(Math.random() * users.length);
                const user = users[rNumber];
                selectedUsers.push(user);
            }

        }

        const printAllInArray = (arrayOfChoice) => {
            let listOfUsers = "";
            for (let i = 0; i<arrayOfChoice.length; i++) {
                const user = arrayOfChoice[i];
                
                if (listOfUsers == ""){
                    listOfUsers = "1. " + user;
                }
                if (listOfUsers != ""){
                    const currentI = i+2
                    listOfUsers = listOfUsers + "   " + currentI.toString() + ". " + user;
                }
            }
            return listOfUsers;
        }

        collectAllUsers(numberOfUsers);
        collectRandomUsers(numberOfUsers);

		await interaction.reply(printAllInArray(selectedUsers));

        users = [];
        selectedUsers = [];
        listOfUsers = ""
	},
};