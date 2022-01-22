const { MessageEmbed } = require('discord.js')
const config = require('../../config.json');

module.exports = {
    name: "botguild",
    category: "Bot",
    description: "Botguild",
    usage: "[command]",
    author: "[Hajrudin]",
    run: async (client, message, args) => {
        if (message.author.id !== require('../../config.json').Admin) {
            const nemapermisije = new Discord.MessageEmbed()
            .setAuthor(`${client.user.username} | ${config.uzrecica}` , client.user.displayAvatarURL())
            .setColor('RED')
            .setDescription(`:x: - ${message.author} insufficient permission for this command!!`)
            .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL())
            return message.channel.send(nemapermisije);
        }
            
        const guilds = client.guilds.cache
        .sort((a, b) => b.memberCount - a.memberCount)
        .first(50);
        const description = guilds.map((guild, index) => {
           return `${index+1}) ${guild.name}: ${guild.memberCount} members`
        }).join('\n')
        message.channel.send(
            new MessageEmbed()
            .setAuthor(`${client.user.username} | ${config.uzrecica}` , client.user.displayAvatarURL())
            .setTitle(`Top 50 servers`)
            .setThumbnail(client.user.displayAvatarURL())
            .setColor(`${config.botboja}`)
            .setDescription(description)
            .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL())
        )
    }
}
