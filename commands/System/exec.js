const childProcess = require('child_process');
const { Admin } = require('../../config.json');

module.exports = {
  name: "exec",
  category: "System",
  description: "Executes a process command.",
  usage: "[command] + [process command]",
  author: "[CuSO4-c3c,Hiyoriii,Hellsnakes]",
  run: async (client, message, args) => {
    if(message.author.id !== Admin) {
      const nemapermisije = new Discord.MessageEmbed()
      .setAuthor(`${client.user.username} | Simple - flexible bot` , client.user.displayAvatarURL())
      .setColor('RED')
      .setDescription(`:x: - ${message.author} insufficient permission for this command!!`)
      .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL())
      return message.channel.send(nemapermisije);
    }
    
    if (!args[0])
    return message.channel.send('Usage [command] + [process command]');
     childProcess.exec(args.join(' '), {},
        (err, stdout, stderr) => {
            if (err) return message.channel.send('```' + err.message + '```');
            message.channel.send('```' + stdout + '```');
      })
   }    
}
