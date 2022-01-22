const Discord = require('discord.js');

module.exports = {
    name: "announcement",
    category: "Moderation",
    description: "announcement",
    usage: "[COMMAND] + [Channel] + [Text]",
    author: "[Hajrudin]",
    run: async (client, message, args) => {
        if (!message.member.permissions.has('ADMINISTRATOR')) {
            const nemapermisije = new Discord.MessageEmbed()
            .setAuthor(`${client.user.username} | Simple - flexible bot` , client.user.displayAvatarURL())
            .setColor('RED')
            .setDescription(`:x: - ${message.author} insufficient permission for this command!!`)
            .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL())
            return message.channel.send(nemapermisije);
        }
        const channel = message.mentions.channels.first()
        if (!args.length) {
            const korsisti = new Discord.MessageEmbed()
            .setAuthor(`${client.user.username} | Simple - flexible bot` , client.user.displayAvatarURL())
            .setColor('RED')
            .setDescription(`:x: - ${message.author} koristi: **announcement #channel <text>**`)
            .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL())
            return message.channel.send(korsisti);
        } 
        if (!channel) {
            const tagajkanal = new Discord.MessageEmbed()
            .setAuthor(`${client.user.username} | Simple - flexible bot` , client.user.displayAvatarURL())
            .setColor('RED')
            .setDescription(`:x: - ${message.author} specify A Channel To Send This Announcement`)
            .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL())
            return message.channel.send(tagajkanal);
        } else {
            let announce = args.slice(1).join(" ")
            if(!announce) return message.channel.send(`Please Specify What Do You Want To Announce`)
            const embed = new Discord.MessageEmbed()
            .setTitle(`🔰 Announcement 🔰`)
            .setAuthor(`${client.user.username} | Simple - flexible bot` , client.user.displayAvatarURL())
            .setDescription(`${announce}`)
            .setFooter("Sent by:"+ message.author.username +'#'+ message.author.discriminator)
            .setColor("#011244")
            channel.send(embed)
            channel.send(`@everyone`).then(m => m.delete())
        }
    }
}