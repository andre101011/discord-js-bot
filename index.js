const { Client, Collection } = require('discord.js');
const client = new Client();

require('dotenv').config();
// "process.env" accesses the environment variables for the running node process. PREFIX is the environment variable you defined in your .env file
const prefix = process.env.PREFIX;
const token = process.env.CLIENT;
console.log(prefix);

// process.env.NODE_ENV allows you to get the environment the node process is in
const ver = process.env.NODE_ENV;

const fs = require('fs');
client.commands = new Collection();
const commandFiles = fs
	.readdirSync('./commands/')
	.filter((file) => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.on('ready', () => {
	client.user.setStatus('online');
	client.user.setUsername('ServidorsiñoBot');
	console.log('The bot is now ' + client.user.presence.status + '!');
	console.log(`Logged in as ${client.user.tag}!`);

	if (ver === 'production') {
		client.user.setActivity('Production babyyyy', { type: 'STREAMING' });
	}
	else {
		client.user.setActivity('in code land', { type: 'PLAYING' });
	}
	console.log('Entorno:' + ver);
});

client.on('message', (message) => {
	// Message is ignored if it does not start with the prefix or was sent by other bot
	if (!message.content.startsWith(prefix) || message.author.bot) return;
	// Leaves prefix out of the message and separates words into an array
	const args = message.content.slice(prefix.length).split(' ');
	// Picks the first element of the array (first word) and sets it to lowercase
	const command = args.shift().toLowerCase();
	if (command == '') return;

	if (command === 'ping') {
		message.channel.send('Pong!');
	}
	else if (command === 'role') {
		client.commands.get('roleSwitch').execute(message, args);
	}
	else if (command === 'clear') {
		client.commands.get('clear').execute(message, args);
	}
	else if (command === 'help') {
		client.commands.get('help').execute(message, args);
	}
	else {
		message.channel.send(
			`No entiendo inglés we jaja. Si necesitas ayuda escribe ${prefix}help`,
		);
	}
});

// Here you can login the bot. It automatically attempts to login the bot with the environment variable you set for your bot token (either "CLIENT_TOKEN" or "DISCORD_TOKEN")
client.login(token);
