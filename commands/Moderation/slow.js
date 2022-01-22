const Discord = require('discord.js');

module.exports = {
    name: 'slow',
    category: "Moderation",
    description: "Sets Slowmode for a Channel",
    usage: "[command]+ [time]",
    author: "[Hajrudin]",
    run: async (client, message, args) => {
        if (!message.member.permissions.has("MANAGE_MESSAGES")) {
            const nemapermisije = new Discord.MessageEmbed()
            .setAuthor(`${client.user.username} | Simple - flexible bot` , client.user.displayAvatarURL())
            .setColor('RED')
            .setDescription(`:x: - ${message.author} insufficient permission for this command!!`)
            .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL())
            return message.channel.send(nemapermisije);
        }
        String.prototype.toHHMMSS = function () {
            var sec_num = parseInt(this, 10);
            var hours   = Math.floor(sec_num / 3600);
            var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
            var seconds = sec_num - (hours * 3600) - (minutes * 60);
            if (hours   < 10) {hours   = "0"+hours;}
            if (minutes < 10) {minutes = "0"+minutes;}
            if (seconds < 10) {seconds = "0"+seconds;}
            return hours+':'+minutes+':'+seconds;
        }
        const time = args[0];
        if(!time) { 
            const korsisti = new Discord.MessageEmbed()
            .setAuthor(`${client.user.username} | Simple - flexible bot` , client.user.displayAvatarURL())
            .setColor('RED')
            .setDescription(`:x: - ${message.author} usage: \`slow <time>\` (numbers in seconds)`)
            .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL())
            return message.channel.send(korsisti);
        }
        if(isNaN(time)) { 
            const invalid = new Discord.MessageEmbed()
            .setAuthor(`${client.user.username} | Simple - flexible bot` , client.user.displayAvatarURL())
            .setColor('RED')
            .setDescription(`:x: - ${message.author} **${time}** Invalid time!!! \`slowmode <time>\``)
            .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL())
            return message.channel.send(invalid);
        
        
        }
        message.channel.setRateLimitPerUser(time)
        message.channel.send(`Slowmode is enabled ${message.channel} restricted to sending one message per \`${time.toHHMMSS()}\` interval and \`slowmode 0\` disables current channel slowmode!`);
    }
}