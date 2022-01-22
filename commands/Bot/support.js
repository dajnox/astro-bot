const Discord = require("discord.js");
const disbut = require('discord-buttons');
const config = require('../../config.json');

module.exports = {
    name: 'support',
    category: "Bot",
    aliases: ["supp"],
    description: "support for bot",
    timeout: 5000,
    usage: "[command]",
    author: "[Hajrudin]",
    run: async (client, message, args) => {
       const embed = new Discord.MessageEmbed()
       .setColor(`${config.botboja}`)
       .setThumbnail(client.user.displayAvatarURL())
       .setAuthor(`${client.user.username} | ${config.uzrecica}` , client.user.displayAvatarURL())
        .setTitle("Support panel")
        .setThumbnail(client.user.displayAvatarURL())
        .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL())
        .addField(`📩 Hajrudin business e-mail`,`\`hajrudin@arteoncloud.com\``)
        const button = new disbut.MessageButton()
  .setStyle('url')
  .setURL('https://discord.gg/vXXY9MzvS5') 
  .setLabel('Discord server') 
  const button2 = new disbut.MessageButton()
  .setStyle('url')
  .setURL('https://www.instagram.com/softicc.h') 
  .setLabel('Instagram') 
  const button3 = new disbut.MessageButton()
  .setStyle('url')
  .setURL('https://github.com/dajnox') 
  .setLabel('Github') 
  let row = new disbut.MessageActionRow()
        .addComponent(button)
        .addComponent(button2)
        .addComponent(button3)
message.channel.send("", { embed: embed, components: row })
    }
}