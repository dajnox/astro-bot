const Discord = require('discord.js');
const config = require('../../config.json');

module.exports = {
    name: 'ping',
    category: "Bot",
    description: "Returns latency and API ping",
    usage: "[command]",
    author: "[CuSO4-c3c,Hiyoriii,Hellsnakes]",
     run: async (client, message, args) => {
            let member = message.member;
            let embed = new Discord.MessageEmbed()
            .setAuthor(`${client.user.username} | ${config.uzrecica}` , client.user.displayAvatarURL())
            .setColor(`${config.botboja}`)
            .setTitle(`PONG! :ping_pong:`)
            .setThumbnail(client.user.displayAvatarURL())
            .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL())
            .addFields(
                {name: 'Latency', value: `\`${Date.now() - message.createdTimestamp}ms\``},
                {name: 'API Latency', value: `\`${Math.round(client.ws.ping)}ms\``},
            )
    message.channel.send({embed});
    }
}