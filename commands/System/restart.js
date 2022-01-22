module.exports = {
    name: "restart",
    category: "System",
    description: "Restart the Bot",
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
                await message.channel.send('Restarting...')
                console.log()
                console.log('Restarting...')
                process.exit(2)
            }
        } catch (e) {
            console.error('An unexpected error expected:', e)
        }
    }
}