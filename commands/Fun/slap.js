const client = require('nekos.life');
const neko = new client();
const config = require('../../config.json');
const Discord = require("discord.js");


module.exports = {
  name: "slap",
  category: "Fun",
  description: "slap someone",
  usage: "[command]+[user]",
  timeout: 5000,
  author: "[Hajrudin]",
  run: async(client, message, args) => {
    const member = message.mentions.members.first();
    if (!member) {
          const kogatagovat = new Discord.MessageEmbed() 
          .setAuthor(`${client.user.username} | ${config.uzrecica}` , client.user.displayAvatarURL())
          .setDescription(`:x: - ${message.author} who do you want to slap??`)
          .setColor('RED')
          .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL())
            
          return message.channel.send(kogatagovat);
    }
    let url = await neko.sfw.slap()
    const embed = new Discord.MessageEmbed()
    .setColor(`${config.botboja}`)
    .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL())
    .setDescription(`<@${member.user.id}>, you got a slap from ${message.author.username} ~(=^‥^)/`)
    .setImage(url.url) 
    message.channel.send(embed)
  }
}