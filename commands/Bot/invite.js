const { MessageEmbed } = require('discord.js')
const config = require('../../config.json');

module.exports = {
    name: "invite",
    category: "Bot",
    description: "invite",
    timeout: 10000,
    usage: "[command]",
    author: "[Hajrudin]",
    run: async (client, message, args) => {
        const config = require('../../config.json')
        if (config.oauthv2link == '') {
            return message.channel.send('Missing `oauthv2link` in config.json.')
        } else {
            if (!config.oauthv2link.toString().startsWith('https://discord.com/')) {
                return message.channel.send('Please provides a vaild OAuth2 link.')
            } else {
               
                message.channel.send(
                    new MessageEmbed()
                        .setAuthor(`${client.user.username} | ${config.uzrecica}` , client.user.displayAvatarURL())
                        .setTitle(`Invite bot to server`)
                        .setThumbnail(client.user.displayAvatarURL())
                        .setColor(`${config.botboja}`)
                        .setDescription(`My invite link is: ${config.oauthv2link}`)
                        .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL())
                )
            }
        }
    }
}
