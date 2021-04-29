import Discord from 'discord.js';
import Team from '../models/Team.js';

export default async function deleteTeam(msg, args) {
	if (args.length > 1) return;
	const teamName = args[0];
	var guild = msg.guild;
	try {
		console.log(msg.author.id);
		const team = await Team.find({ name: teamName });
		if (team.length === 0) {
			msg.channel.send('Team does not exist');
			return;
		}
		let full = false;
		let isOwner = false;
		let members = [];
		let roleID = null;
		let delTeam = null;
		for (let iteration = 0; iteration < team.length; iteration++) {
			console.log('asdasdas');
			console.log(team[iteration].owner.id, msg.author.id);
			if (team[iteration].owner.id === msg.author.id) {
				roleID = team[iteration].id;
				console.log(team[iteration].owner.id === msg.author.id);
				isOwner = true;
				if (team[iteration].members.length >= 3) {
					full = true;
				}
				members = team[iteration].members;
				delTeam = team[iteration];
				break;
			}
		}

		if (!isOwner) {
			msg.channel.send('Sorry you are not the owner of the team ');
			return;
		}
		let rolee = msg.guild.roles.cache.find((r) => r.id === roleID).delete();
		const vcid = delTeam.vcid;
		const tcid = delTeam.tcid;

		await Team.deleteOne(delTeam);
		console.log(msg.author, 'asd');
		msg.guild.channels.cache.get(vcid).delete();
		msg.guild.channels.cache.get(tcid).delete();
		let rolex = msg.guild.roles.cache.find((r) => r.name === 'inTeam');

		guild.members.cache.get(msg.author.id).roles.remove(rolex);
		members.map((i) => {
			guild.members.cache.get(i.id).roles.remove(rolex);
		});
		msg.channel.send('Team Deleted!');
	} catch (err) {
		console.log(err);
	}
}
// .delete <team_name>
