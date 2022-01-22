const Discord = require('discord.js');
const config = require('../../config.json');

module.exports = {
    name: "stop",
    aliases: ["st"],
    category: "Music",
    description: "stops playing a song!",
    timeout: 3000,
    usage: "[command]",
    author: "[Hajrudin]",
    run: async (client, message, args) => {
        if (!message.member.voice.channel)
            return message.reply('Please join a voice channel!');
        let queue = client.distube.getQueue(message);
        if (message.member.guild.me.voice.channel.id !== message.member.voice.channel.id) {
            return message.reply('You are not on the same voice channel as me!');
        }
        if (!queue) {
            const queueError = new Discord.MessageEmbed()
            .setAuthor(`${client.user.username} | ${config.uzrecica}` , client.user.displayAvatarURL())
        .setColor(`${config.botboja}`)
        .setImage(`${config.musicbotslika}`)
                .setDescription("There is Nothing Playing")
                
            return message.channel.send(queueError)
        }
        await client.distube.stop(message)
        await message.react('⏹');
    }
}