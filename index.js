const { Client, Collection } = require("discord.js");
const config = require("./config.json");
const prefix = config.prefix;
const client = new Client();
const adminRoleId = `750512239546728489`;
const fs = require("fs");
client.commands = new Collection();

client.on("ready", () => {
  client.user.setStatus("online");
  client.user.setUsername(`Mario Barajas`);
  console.log(`The bot is now ` + client.user.presence.status + `!`);
});

client.on("message", (message) => {
  //Message is ignored if it does not start with the prefix or was sent by other bot
  if (!message.content.startsWith(prefix) || message.author.bot) return;
  //Leaves prefix out of the message and separates words into an array
  console.log(`message.content = ` + message.content);
  const args = message.content.slice(prefix.length).split(" ");
  console.log(`message.content = ` + args);
  const command = args.shift().toLowerCase();

  if (command === "ping") {
    message.channel.send("pong");
  } else if (command === "negro") {
    message.channel.send("blanco");
  } else {
    message.channel.send("No entiendo inglés we jaja");
  }

  // //Role-dependent methods
  // if (message.member.roles.cache.has(adminRoleId)) {
  //   message.channel.send(`Los pasos prohibidos`);
  // }
});

client.login(config.token);
