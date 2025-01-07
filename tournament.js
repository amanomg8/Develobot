const { SlashCommandBuilder } = require('discord.js');

let users = []

let selectedUsers = [];

module.exports = {
	data: new SlashCommandBuilder()
		.setName('tournament')
		.setDescription('will pair two random users together depending on the number of users chosen')
        .addIntegerOption(option =>
            option.setName('numberofusers')
                .setDescription('The amount of users that will be found')
                .setRequired(true)),
                
        async execute(interaction) {

        guild = interaction.guild;
        const allUsersCollection = await guild.members.fetch();
        let usersCollection = []
        let numberOfRealUsers = 0;

        let numberOfUsers = interaction.options.getInteger('numberofusers');
        let numberOfUsersForCheck = 0;

        allUsersCollection.forEach((member) => {
            if (member.user.bot) {
            } else {
                numberOfUsersForCheck++
            }
        });

        if (numberOfUsers>numberOfUsersForCheck){
            await interaction.reply("Input is greater than the amount of users in this server. Input something below or equal to " + numberOfUsersForCheck.toString() + ".");
        }else{
            const collectAllUsers = (numberOfUsersVar) => {
                allUsersCollection.forEach((member) => {
                    if (member.user.bot) {
                    } else {
                        usersCollection.push(member)
                        numberOfRealUsers++
                    }
                });

                const displayNames = usersCollection.map((user) => user.displayName);

                displayNames.forEach((displayName) => {
                    users.push(displayName);
                });
        }

        let numbersUsed = [];
        
        const collectRandomUsers = (numberOfUsersVar) => {
            for (let i = 0; i<numberOfUsersVar; i++) {
                const rNumber = Math.floor(Math.random() * users.length);
                if (numbersUsed.includes(rNumber) || selectedUsers.includes(users[rNumber])){
                    i--
                }else{
                    numbersUsed.push(rNumber);
                    const user = users[rNumber];
                    selectedUsers.push(user);
                }
            }
        }

        const printAllInArray = (arrayOfChoice) => {
            let listOfUsers = "";
            for (let i = 0; i<arrayOfChoice.length; i = i+2) {
                const user1 = arrayOfChoice[i];
                const user2 = arrayOfChoice[i+1];
                if (listOfUsers != "" && user2 != undefined){
                    const currentI = i+1
                    listOfUsers = listOfUsers + currentI.toString() + ". " + user1 + " vs. " + user2 + "\n";
                }
                if (listOfUsers == ""){
                    listOfUsers = "1. " + user1 +" vs. " + user2 + "\n";
                }
            }
            return listOfUsers;
        }

        if (numberOfUsers>=selectedUsers.length && numberOfUsers!= 0){
            collectAllUsers(numberOfUsers);
            collectRandomUsers(numberOfUsers);
            await interaction.reply(printAllInArray(selectedUsers));
        }else{
            await interaction.reply("Input is not valid. Number must be greater than 0.");
        }

		//await interaction.reply(printAllInArray(selectedUsers));

        users = [];
        selectedUsers = [];
        listOfUsers = ""
        }
	},
};