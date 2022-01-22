const Discord = require('discord.js')
const config = require('../../config.json');

module.exports = {
    name: "gay",
    category: "Fun",
    description: "How gay are you?",
    usage: "[command | user]",
    author: "[Hajrudin]",
    run: async(client, message, args) => {
        const mentionedMember = message.mentions.users.last()
        if (!mentionedMember) {
            const kogatagovat = new Discord.MessageEmbed() 
            .setAuthor(`${client.user.username} | ${config.uzrecica}` , client.user.displayAvatarURL())
            .setDescription(`:x: - ${message.author} please mention a user who is gay!`)
            .setColor('RED')
            .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL())

            return message.channel.send(kogatagovat);
        }
        const gayr8 = Math.floor(Math.random() * 100) + 0;
        const embed = new Discord.MessageEmbed()
           .setTitle(`Gayr8 Machine`)
           .setDescription(`:rainbow_flag: - ${mentionedMember} is ${gayr8}% gay`)
           .setColor(`${config.botboja}`)
           .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL())
           message.channel.send(embed)
    }
}