const Discord = require("discord.js");
const config = require('../../config.json');

module.exports = {
    name: "avatar",
    aliases: ["av"],
    category: "Utility",
    description: "Get avatar user",
    usage: "[command | user] or [command]",
    author: "[Hajrudin]",
    run: async(client, message, args) => {

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === args.slice(0).join(' ') || x.user.username === args[0]) || message.member;

        if (!member.user.avatarURL) {
            const nemaavatar = new Discord.MessageEmbed() 
            .setAuthor(`${client.user.username} | ${config.uzrecica}` , client.user.displayAvatarURL())
            .setDescription(`:x: - ${message.author} that user does not have an avatar!!!`)
            .setColor('RED')
            .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL())

            return message.channel.send(nemaavatar);
        }

        const avatar = new Discord.MessageEmbed()
            .setTitle(`${member.user.username}'s Avatar`)
            .setAuthor(`${client.user.username} | ${config.uzrecica}` , client.user.displayAvatarURL())
            .setColor(`${config.botboja}`)
            .setImage(member.user.avatarURL())
            .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL())
            .setImage(member.user.displayAvatarURL({ dynamic: true, size: 2048 }))
            .setURL(member.user.avatarURL())
        message.channel.send(avatar)
    }
};