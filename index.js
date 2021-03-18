const Discord = require("discord.js");
const config = require("./config.json");
const client = new Discord.Client();

client.on("ready", () => {
  client.user.setStatus("online");

  console.log(`The bot is now ` + client.user.presence.status + `!`);
});

client.on("message", (message) => {
  //Receiving message
  console.log(message.content);
  if (message.content === "ping") {
    message.reply("pong");
  }
  if (message.content === "hello") {
    message.channel.send(`Hello ${message.author}`);
  }
  if (message.content.includes(`!test`)) {
    message.channel.send(`I'm grad you're testing`);
  }
});

client.login(config.token);
