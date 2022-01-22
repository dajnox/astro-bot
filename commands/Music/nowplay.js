const Discord = require("discord.js");
const config = require('../../config.json');

module.exports = {
    name: "nowplay",
    aliases: ["np"],
    category: "Music",
    description: "Current song playing",
    timeout: 3000,
    usage: "[command]",
    author: "[Harmonynos Team]",
    run: async (client, message, args) => {
        if (!message.member.voice.channel) {
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
        const song = queue.songs[0]
        const embed = new Discord.MessageEmbed()
        .setAuthor(`${client.user.username} | ${config.uzrecica}` , client.user.displayAvatarURL())
        .setColor(`${config.botboja}`)
        .setImage(`${config.musicbotslika}`)
            .setTitle('<:headphones:879518595602841630> Now Playing')
            .setDescription(`[${song.name}](${song.url})`)
            .addField('**Views:**', song.views.toString())
            .addField('👍', song.likes.toString())
            .addField('👎', song.dislikes.toString())
            .setThumbnail(song.thumbnail)
            .addField('**Duration:**', `${queue.formattedCurrentTime} / ${song.formattedDuration}`)
            .addField('**Filter:**', queue.filter || "OFF")
            .addField('**Autoplay:**', `${queue.autoplay ? "On" : "Off"}`)
            .addField('**Volume:**', `${queue.volume}%`)
            .addField('***Requested by***:', song.user.toString())
        message.channel.send(embed)
    }
}
