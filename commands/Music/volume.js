const Discord = require('discord.js');
const progressbar = require('string-progressbar');
const config = require('../../config.json');

module.exports = {
    name: "volume",
    category: "Music",
    aliases: ['v'],
    description: "Change the music player's volume.",
    timeout: 3000,
    usage: '[command]+[amount]',
    author: "[Hajrudin]",
    run: async (client, message, args) => {
        if (!message.member.voice.channel) {
            const morasucukanal = new Discord.MessageEmbed()
            .setAuthor(`${client.user.username} | ${config.uzrecica}` , client.user.displayAvatarURL())
            .setColor('RED')
            .setImage(`${config.musicbotslika}`)
            .setDescription(`:x: - ${message.author} please join a voice channel!`)
            .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL())
            return message.channel.send(morasucukanal)
        }
        let queue = client.distube.getQueue(message);
        if (message.member.guild.me.voice.channel.id !== message.member.voice.channel.id) {
            const nijeistikanal = new Discord.MessageEmbed()
            .setAuthor(`${client.user.username} | ${config.uzrecica}` , client.user.displayAvatarURL())
            .setColor('RED')
            .setImage(`${config.musicbotslika}`)
            .setDescription(`:x: - ${message.author} you are not on the same voice channel as me!`)
            .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL())
            return message.channel.send(nijeistikanal)
        }
        if (!queue) {
            const queueError = new Discord.MessageEmbed()
            .setAuthor(`${client.user.username} | ${config.uzrecica}` , client.user.displayAvatarURL())
            .setColor(`${config.botboja}`)
            .setImage(`${config.musicbotslika}`)
            .setDescription(`:x: - ${message.author} there is Nothing Playing`)
            .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL())
            return message.channel.send(queueError)
        }
        let amount = parseInt(args[0]);
        if (!amount) {
            message.channel.send()
            const podesivolumen = new Discord.MessageEmbed()
            .setAuthor(`${client.user.username} | ${config.uzrecica}` , client.user.displayAvatarURL())
            .setColor('RED')
            .setImage(`${config.musicbotslika}`)
            .setDescription(`:x: - ${message.author} please specify a volume.`)
            .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL())
        return message.channel.send(podesivolumen)
        };
        
        if (amount > 100) {
            message.channel.send()
            const nijemoguce = new Discord.MessageEmbed()
            .setAuthor(`${client.user.username} | ${config.uzrecica}` , client.user.displayAvatarURL())
            .setColor('RED')
            .setImage(`${config.musicbotslika}`)
            .setDescription(`:x: - ${message.author} please enter a valid number (between 1 and 100)`)
            .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL())
        return message.channel.send(nijemoguce)
            
        } else {
            client.distube.setVolume(message, amount);
            var total = 100;
            var current = amount;
            let bar = progressbar.splitBar(total, current, 27, "▬", "🔘")[0];
            
            message.channel.send(bar);
            const podesio = new Discord.MessageEmbed()
            .setAuthor(`${client.user.username} | ${config.uzrecica}` , client.user.displayAvatarURL())
            .setColor('GREEN')
            .setImage(`${config.musicbotslika}`)
            .setDescription(`✅ - ${message.author} is set the new volume to **${amount}%**.`)
            .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL())
            return message.channel.send(podesio)
        }
    }
}
