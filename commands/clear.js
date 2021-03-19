const { admin, mod } = require("../roles.json");
module.exports = {
  name: "clear",
  description: "this is the clear command",
  async execute(message, args) {
    if (message.member.roles.cache.some((r) => r.name === "Admin")) {
      if (!args[0])
        return message.reply(
          "Please enter the amount of messages you want to clear"
        );

      if (isNaN(args[0])) return message.reply("Please type a real number");
      if (args[0] > 100)
        return message.reply("You can't delete more than 100 messages");
      if (args[0] < 1)
        return message.reply("You must delete at least 1 message");
      await message.channel.messages
        .fetch({ limit: args[0] })
        .then((messages) => {
          message.channel.bulkDelete(messages);
        });
    } else {
      message.reply(` You don't have the roles needed to execute this command`);
    }
  },
};
