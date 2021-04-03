// const roleIds = require('../../roles.json');


module.exports = {
	name: 'roleSwitch',
	description: 'this is a testRole command!',
	execute(message, args) {

		let targetUser = message.member;

		// if command contains a target user
		if(args[args.length - 1].includes('@')) {
			targetUser = message.guild.member(message.mentions.users.first());
			args.pop();
		}

		const desiredRole = args.join(' ').toLowerCase();
		// console.log('desired role: ' + desiredRole);
		// console.log('target user: ' + targetUser);
		// message.channel.send('Se quieren cambiar los roles de <@' + targetUser.id + '>');


		if (desiredRole === 'admin') {return message.reply(' I\'m sorry, I don\'t mess with these people');}
		if (desiredRole === 'mod' && !message.member.roles.cache.some((r) => r.name.toLowerCase() === 'admin')) {
			return message.reply('Only admins can set mods');
		}

		if (desiredRole === undefined || desiredRole.length == 0) {return message.reply(' Please type the role you want. Ex: role DJ');}


		const newRole = message.guild.roles.cache.find((r) => r.name.toLowerCase() === desiredRole);
		if (newRole == undefined) {
			return message.reply('i don\'t know this role ');
		}

		if (message.member.roles.cache.some((r) => r.name.toLowerCase() === 'admin' || r.name.toLowerCase() === 'mod')) {
			if (message.member.roles.cache.some((r) => r.name === newRole.name)) {
				console.log(newRole.id);
				// eslint-disable-next-line no-unused-vars
				targetUser.roles.remove(newRole).catch(error =>{
					return message.reply('Sorry, I couldn\'t remove this role ');
				},
				);
				return message.channel.send(
					' I got your back ' + targetUser.nickname + `, I've removed the role ${newRole.name}`,
				);
			}
			else {
				// eslint-disable-next-line no-unused-vars
				targetUser.roles.add(newRole).catch(error =>{
					return message.reply('Sorry, I couldn\'t add this role ');
				},
				);
				return message.channel.send(' There you go ' + targetUser.nickname + `, now you have the role ${newRole.name}`);
			}
		}
		// else {
		// 	return message.reply(' You don\'t have the roles needed to execute this command');
		// }


		process.on('unhandledRejection', (error) => {
			console.error('Error', error.message);
			return message.reply(' Sorry, I can\'t set this role now');
		});
	},
};
