import Discord from 'discord.js';
import addTeam from './commands/addTeam.js';
import dotenv from 'dotenv';
import db from './config/db.js';
import joinTeam from './commands/joinTeam.js';
import deleteTeam from './commands/deleteTeam.js';
const client = new Discord.Client();
dotenv.config();
db();
const prefix = '.';

client.on('ready', () => {
	console.log(`loggedin as ${client.user.tag}`);
});

client.on('message', (msg) => {
	if (msg.author.bot) return;
	if (msg.channel.name === 'create-team')
		if (msg.content.startsWith(prefix)) {
			const [CMD_name, ...args] = msg.content
				.trim()
				.substring(prefix.length)
				.split(/\s+/);

			// if (msg.author.username !== 'bitoffabyte') {
			// 	msg.channel.send(`Fuck you @${msg.author.username}`);
			// 	return;
			// }
			console.log(CMD_name);
			if (CMD_name === 'help') {
				console.log('sd');
				msg.channel.send({
					embed: {
						color: 3447003,
						title: 'Commands:',
						fields: [
							{
								name: '.team create <team_name>',
								value:
									'- Creates your team.\n- Team name should be one worded!',

								inline: false,
							},
							{
								name: '.add <team_name> @member',
								value:
									'- Adds members to your team\n- Add one member at a time!\n- Only team leader can add members',
								inline: false,
							},
							{
								name: '.delete <team_name>',
								value:
									'- Deletes team\n- Only team leader can delete team!',
								inline: false,
							},
						],
					},
				});
			}
			if (CMD_name === 'team') {
				// create team
				// console.log(args);
				// console.log(msg.guild.client);
				addTeam(msg, args);
			}
			if (CMD_name === 'add') {
				joinTeam(msg, args, client);
			}
			if (CMD_name === 'hi') {
				const b = msg.author.id;
				msg.channel.send(`Hi @${msg.author} How are you?`);
			}
			if (CMD_name === 'rr') {
				if (msg.author.id == '668689189247909898')
					msg.channel.send(
						`https://tenor.com/view/rick-astley-rick-roll-dancing-dance-moves-gif-14097983`
					);
				else {
					msg.channel.send(`I'm sorry! Are you Rick Ashtley?`);
				}
			}
			if (CMD_name === 'delete') {
				deleteTeam(msg, args);
			}
		}
});

client.login(process.env.TOKEN);
