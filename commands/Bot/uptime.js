const Discord = require("discord.js");
const config = require('../../config.json');

module.exports ={
    name: 'uptime',
    description: "Uptime the bot",
    category: "Bot",
    timeout: 5000,
    usage: "[command]",
    author: "[Hajrudin]",
     run: async (client, message, args) => {     
     let days = Math.floor(client.uptime / 86400000);
     let hours = Math.floor(client.uptime / 3600000) % 24;
     let minutes = Math.floor(client.uptime / 60000) % 60;
     let seconds = Math.floor(client.uptime / 1000) % 60;
     const uptimeembed = new Discord.MessageEmbed()
     .setThumbnail(client.user.displayAvatarURL())
     .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL())
       .setAuthor(`${client.user.username} | ${config.uzrecica}` , client.user.displayAvatarURL())
        .setTitle("Bot uptime")
     .setColor(`${config.botboja}`)
     .addField(':computer: UPTIME: ', ` \`${days}dys ${hours}hrs ${minutes}min ${seconds}sec\``, true)	    
     .setTimestamp(Date())
     message.channel.send(uptimeembed);
    }
}