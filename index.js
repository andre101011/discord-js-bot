const { Client, Collection } = require("discord.js");
const config = require("./config.json");
const prefix = config.prefix;
const client = new Client();

const fs = require("fs");
client.commands = new Collection();
const commandFiles = fs
  .readdirSync("./commands/")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

client.on("ready", () => {
  client.user.setStatus("online");
  client.user.setUsername(`ServidorsiñoBot`);
  console.log(`The bot is now ` + client.user.presence.status + `!`);
});

client.on("message", (message) => {
  //Message is ignored if it does not start with the prefix or was sent by other bot
  if (!message.content.startsWith(prefix) || message.author.bot) return;
  //Leaves prefix out of the message and separates words into an array
  const args = message.content.slice(prefix.length).split(" ");
  //Picks the first element of the array (first word) and sets it to lowercase
  const command = args.shift().toLowerCase();

  if (command === "ping") {
    client.commands.get("ping").execute(message, args);
  } else if (command === "role") {
    client.commands.get("roleSwitch").execute(message, args);
  } else if (command === "clear") {
    client.commands.get("clear").execute(message, args);
  } else if (command === "help") {
    client.commands.get("help").execute(message, args);
  } else {
    message.channel.send("No entiendo inglés we jaja");
  }
});

client.login(config.token);
