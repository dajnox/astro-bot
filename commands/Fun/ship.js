const Discord = require('discord.js');
const config = require('../../config.json');

module.exports = {
    name: "ship",
    category: "Fun",
    description: "How much of a simp are you?",
    usage: "[command | user]",
    author: "[Hajrudin]",
    run: async(client, message, args) => {
        const mentionedMember = message.mentions.users.last()
        if (!mentionedMember) {
            const kogatagovat = new Discord.MessageEmbed() 
            .setAuthor(`${client.user.username} | ${config.uzrecica}` , client.user.displayAvatarURL())
            .setDescription(`:x: - ${message.author} please mention a user!`)
            .setColor('RED')
            .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL())
            
            return message.channel.send(kogatagovat);
        } 
        const simpr8 = Math.floor(Math.random() * 100) + 0;
        const embed = new Discord.MessageEmbed()
        .setColor(`${config.botboja}`)
        .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL())
           .setTitle(`Simp r8 machine`)
           .setDescription(`:shrimp: - ${mentionedMember} is ${simpr8}% simp`)
           
           message.channel.send(embed)
    }
}