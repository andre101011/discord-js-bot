const roleIds = require("../roles.json");

module.exports = {
  name: "roleSwitch",
  description: "this is a testRole command!",
  execute(message, args) {
    if (args[0] === "admin")
      return message.reply(` I'm sorry, I don't mess with these people`);

    console.log(args);
    if (args === undefined || args.length == 0)
      return message.reply(` Please type the role you want. Ex: role DJ`);

    const newRole = message.guild.roles.cache.find((r) => r.name === args[0]);
    if (newRole == undefined) {
      return message.reply(` I don't know this role`);
    }

    if (message.member.roles.cache.some((r) => r.name === "Admin")) {
      if (message.member.roles.cache.some((r) => r.name === newRole.name)) {
        console.log(newRole.id);

        message.member.roles.remove(newRole);
        message.reply(
          ` I got your back, I've removed the role ${newRole.name}`
        );
      } else {
        message.member.roles.add(newRole);
        message.reply(` There you go, now you have the role ${newRole.name}`);
      }
    } else {
      message.reply(` You don't have the roles needed to execute this command`);
    }

    process.on("unhandledRejection", (error) => {
      console.error("Error", error.message);
      message.reply(` Sorry, I can't set this role now`);
    });
  },
};
