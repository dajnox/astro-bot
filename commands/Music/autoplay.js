const Discord = require('discord.js');
const config = require('../../config.json');

module.exports = {
	name: "autoplay",
    aliases: ["ap"],
    category: "Music",
	description: "Enable or disable autoplay",
    timeout: 3000,
    usage: "[command]",
    author: "[CuSO4-c3c,Hiyoriii,Hellsnakes]",
    run : async(client, message, args) => {
		if(!message.member.voice.channel)  {
            const morasucukanal = new Discord.MessageEmbed()
            .setAuthor(`${client.user.username} | ${config.uzrecica}` , client.user.displayAvatarURL())
            .setColor('RED')
            .setImage(`${config.musicbotslika}`)
            .setDescription(`:x: - ${message.author} please join a voice channel!`)
            .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL())
            return message.channel.send(morasucukanal)
        }
        let queue = client.distube.getQueue(message);
        if (message.member.guild.me.voice.channel.id !== message.member.voice.channel.id) {
            const nijeistikanal = new Discord.MessageEmbed()
            .setAuthor(`${client.user.username} | ${config.uzrecica}` , client.user.displayAvatarURL())
            .setColor('RED')
            .setImage(`${config.musicbotslika}`)
            .setDescription(`:x: - ${message.author} you are not on the same voice channel as me!`)
            .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL())
            return message.channel.send(nijeistikanal)
        }
        if (!queue) {
            const queueError = new Discord.MessageEmbed()
            .setAuthor(`${client.user.username} | ${config.uzrecica}` , client.user.displayAvatarURL())
            .setColor(`${config.botboja}`)
            .setImage(`${config.musicbotslika}`)
            .setDescription(`:x: - ${message.author} there is Nothing Playing`)
            .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL())
            return message.channel.send(queueError)
        }
		let mode = client.distube.toggleAutoplay(message);
		return message.reply("set autoplay mode to `" + (mode ? "On" : "Off") + "`");
	}
}