module.exports = {
	name:'reactionrole',
	description:'sets up a reaction role message',

	async execute(message, args, Discord, client) {

		// id of roles channel
		const channel = '750481151814008923';
		const gamingRole = message.guild.roles.cache.find(role => role.name === 'Gaming');
		console.log('reaction roles module loaded');
		const gamingEmoji = '🎮';


		if (args[0] !== 'reregister') {
			const embed = new Discord.MessageEmbed()
				.setColor('#e42643')
				.setTitle('Elige un rol de notificaciones!')
				.setDescription('Cada uno de estos roles te permitirá estar al tanto de los eventos y acceder a salas diferentes: \n\n'
        + `${gamingEmoji}  - Para tener acceso a los juegos y eventos gaming`
        + '\n\n\n')
				.setImage('https://i.ibb.co/LgBvRpP/notificaciones-banner.png');

			const messageEmbed = await message.channel.send(embed);
			messageEmbed.react(gamingEmoji);
		}
		client.on('messageReactionAdd', async (reaction, user)=>{
			if (reaction.message.partial) await reaction.message.fetch();
			if (reaction.partial) await reaction.fetch();
			if(user.bot) return;
			if(!reaction.message.guild)return;

			if (reaction.message.channel.id == channel) {
				if (reaction.emoji.name === gamingEmoji) {
					await reaction.message.guild.members.cache.get(user.id).roles.add(gamingRole);
				}
			}
			else{
				return;
			}
		});
		client.on('messageReactionRemove', async (reaction, user)=>{
			if (reaction.message.partial) await reaction.message.fetch();
			if (reaction.partial) await reaction.fetch();
			if(user.bot) return;
			if(!reaction.message.guild)return;

			if (reaction.message.channel.id == channel) {
				if (reaction.emoji.name === gamingEmoji) {
					await reaction.message.guild.members.cache.get(user.id).roles.remove(gamingRole);
				}
			}
			else{
				return;
			}
		});

	},
};