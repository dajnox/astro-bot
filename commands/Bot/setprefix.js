const prefixSchema = require('../../schemas/prefixcustoms')
const Discord = require('discord.js');
const command = require('../../handlers/command');
const config = require('../../config.json');
module.exports = {
    name: 'setprefix',
    aliases : ["prefix"],
    category: "Bot",
    description: "set prefix bot",
    usage: "[command]",
    author: "[Hajrudin]",
     run: async (client, message, args) => {
        if (!message.member.permissions.has("MANAGE_MESSAGES")) {
            const nemapermisije = new Discord.MessageEmbed()
            .setAuthor(`${client.user.username} | ${config.uzrecica}` , client.user.displayAvatarURL())
            .setColor('RED')
            .setDescription(`:x: - ${message.author} insufficient permission for this command!!`)
            .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL())
            return message.channel.send(nemapermisije);
        }
        const pre = await args.join(" ")
        if(!pre) {
            const korsisti = new Discord.MessageEmbed()
            .setAuthor(`${client.user.username} | ${config.uzrecica}` , client.user.displayAvatarURL())
            .setColor('RED')
            .setDescription(`:x: - ${message.author} usage: \`setprefix <newprefix>\``)
            .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL())
            return message.channel.send(korsisti);
        }
    
        let data;
        try {
            data = await prefixSchema.findOne({
              Guild : message.guild.id,
            })
            if(!data) {
                let data = await prefixSchema.create({
                    Guild : message.guild.id,
                    Prefix : pre,
                })
                   data.save()
            } else {
                await prefixSchema.findOneAndUpdate({
                    Guild : message.guild.id,
                    Prefix : pre,
                })
            }
            let embed = new Discord.MessageEmbed()
                  .setColor('GREEN')
                  .setThumbnail(client.user.displayAvatarURL())
                  .setAuthor(`${client.user.username} | ${config.uzrecica}` , client.user.displayAvatarURL())
                    .setTitle(`Custom prefix has been set`)
                  .setDescription(`✅ - ${message.author} has been change prefix on *** \`${pre}\``)
                  .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL())
                
                   message.channel.send(embed)
        } catch (err) {
            console.log(err)
        }
    }
}
