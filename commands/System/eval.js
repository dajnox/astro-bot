const Discord = require('discord.js');
const { inspect } = require("util")

module.exports = {
    name: "eval",
    category: "System",
    description: "Evaluates a JS string",
    usage: "[command] + [text]",
    author: "[CuSO4-c3c,Hiyoriii,Hellsnakes]",
    run: async (client, message, args) => {
        let command = args.slice(0).join(" ")
        if (message.author.id !== require('../../config.json').Admin) {
            const nemapermisije = new Discord.MessageEmbed()
            .setAuthor(`${client.user.username} | Simple - flexible bot` , client.user.displayAvatarURL())
            .setColor('RED')
            .setDescription(`:x: - ${message.author} insufficient permission for this command!!`)
            .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL())
            return message.channel.send(nemapermisije);
        }
        if(!command)
         return message.channel.send("Usage: [command] + [text]")
        try{
            let evaled = eval(command)
            const embed = new Discord.MessageEmbed()
            .setTitle("<:icon:878934851913384006> Evaluated")
            .addField("Input", `\`\`\`${command}\`\`\``)
            .addField("Output", `\`\`\`js\n${inspect(evaled, { depth: 0})}\`\`\``)  
            .addField("Type Of", `\`\`\`${typeof(evaled)}\`\`\``)
            message.channel.send(embed)
        } catch  (error) {
            const embed = new Discord.MessageEmbed()
            .setTitle("Error")
            .addField("Error", `${error}`)
          message.channel.send(embed)
      }
   }
}