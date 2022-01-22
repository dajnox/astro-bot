const Discord = require('discord.js');
const config = require('../../config.json');

module.exports = {
    name: "play",
    aliases: ["p"],
    category: "Music",
    description: "play a song!",
    timeout: 3000,
    usage: "[command]+[url youtube|soundcloud] or [song name]",
    author: "[Hajrudin]",
    run: async (client, message, args) => {
        const queue = client.distube.getQueue(message)
        if (!message.member.voice.channel) {
            const morasucukanal = new Discord.MessageEmbed()
            .setAuthor(`${client.user.username} | ${config.uzrecica}` , client.user.displayAvatarURL())
            .setColor('RED')
            .setImage(`${config.musicbotslika}`)
            .setDescription(`:x: - ${message.author} please join a voice channel!`)
            .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL())
            return message.channel.send(morasucukanal)
        }
        if (queue)
            if (message.member.guild.me.voice.channel.id !== message.member.voice.channel.id) {
                const nijeistikanal = new Discord.MessageEmbed()
                .setAuthor(`${client.user.username} | ${config.uzrecica}` , client.user.displayAvatarURL())
                .setColor('RED')
                .setImage(`${config.musicbotslika}`)
                .setDescription(`:x: - ${message.author} you are not on the same voice channel as me!`)
                .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL())
                return message.channel.send(nijeistikanal)
            }
        const music = args.join(" ");
        if (!music) return message.reply("Please provide a song!");
        await client.distube.play(message, music)
    }
}
