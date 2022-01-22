const client = require('nekos.life');
const config = require('../../config.json');
const neko = new client();
const Discord = require("discord.js");
module.exports = {
  name: "hug",
  category: "Fun",
  description: "hug someone",
  usage: "[command]+[user]",
  timeout: 5000,
  author: "[Hajrudin]",
  run: async(client, message, args) => {
    const member = message.mentions.members.last();
    if (!member) {
      const kogatagovat = new Discord.MessageEmbed() 
            .setAuthor(`${client.user.username} | ${config.uzrecica}` , client.user.displayAvatarURL())
            .setDescription(`:x: - ${message.author} who do you want to hug??`)
            .setColor('RED')
            .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL())

            return message.channel.send(kogatagovat);
    }
    let url = await neko.sfw.hug()
    const embed = new Discord.MessageEmbed()
    .setColor(`${config.botboja}`)
    .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL())
    .setDescription(`<@${member.user.id}>, you got a hug from ${message.author.username} 😍 uwwuu`)
    .setImage(url.url) 
    message.channel.send(embed)
  }
}