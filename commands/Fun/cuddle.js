const client = require('nekos.life');
const neko = new client();
const Discord = require("discord.js");
const config = require('../../config.json');

module.exports = {
  name: "cuddle",
  category: "Fun",
  description: "cuddle someone",
  usage: "[command]+[user]",
  author: "[Hajrudin]",
  timeout: 5000,
  run: async(client, message, args) => {
    const member = message.mentions.members.last();
    if (!member) {
      const kogatagovat = new Discord.MessageEmbed() 
        .setAuthor(`${client.user.username} | ${config.uzrecica}` , client.user.displayAvatarURL())
        .setDescription(`:x: - ${message.author} who do you want to cuddle?? :/`)
        .setColor('RED')
        .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL())

        return message.channel.send(kogatagovat);
    }
    let url = await neko.sfw.cuddle()
    const embed = new Discord.MessageEmbed()
    .setColor(`${config.botboja}`)
    .setDescription(`<@${member.user.id}>, you got a cuddle from **${message.author.username}** uwwiiii (=；ェ；=) 🥰`)
    .setImage(url.url) 
    .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL())
    message.channel.send(embed)
  }
}