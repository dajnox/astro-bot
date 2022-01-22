const Discord = require('discord.js');
const config = require('../../config.json');

module.exports = {
    name: "join",
    category: "Music",
	description: "join voice channel",
    timeout: 3000,
    usage: "[command]",
    author: "[CuSO4-c3c,Hiyoriii,Hellsnakes]",
    run: async(client, message, args) => {
        const voiceChannel = message.member.voice.channel
        if (!voiceChannel) {
            const morasucukanal = new Discord.MessageEmbed()
            .setAuthor(`${client.user.username} | ${config.uzrecica}` , client.user.displayAvatarURL())
            .setColor('RED')
            .setImage(`${config.musicbotslika}`)
            .setDescription(`:x: - ${message.author} you Are Not In a Voice Channel!`)
            .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL())
            return message.channel.send(morasucukanal)
        }
        try {
            await voiceChannel.join().then(connection => {
                connection.voice.setSelfDeaf(true)
            })
        } catch(error) {
            const kanalerror = new Discord.MessageEmbed()
            .setAuthor(`${client.user.username} | ${config.uzrecica}` , client.user.displayAvatarURL())
            .setColor('RED')
            .setImage(`${config.musicbotslika}`)
            .setDescription(`:x: - ${message.author} there Was An Error Connecting To The Voice Channel: ${error}`)
            .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL())
            return message.channel.send(kanalerror)
        }
    }
}