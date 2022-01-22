module.exports = {
    name: "shutdown",
    category: "System",
    description: "Shutdown the Bot",
    usage: "[command]",
    author: "[CuSO4-c3c,Hiyoriii,Hellsnakes]",
    run: async (client, message, args) => {
        try {
            if (message.author.id !== require('../../config.json').Admin) {
                const nemapermisije = new Discord.MessageEmbed()
            .setAuthor(`${client.user.username} | Simple - flexible bot` , client.user.displayAvatarURL())
            .setColor('RED')
            .setDescription(`:x: - ${message.author} insufficient permission for this command!!`)
            .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL())
            return message.channel.send(nemapermisije);
            } else {
                await message.channel.send('Shutting down...')
                console.log()
                console.log('Shutting down...')
                process.exit(0)
            }
        } catch (e) {
            console.error('An unexpected error expected:', e)
        }
    }
}