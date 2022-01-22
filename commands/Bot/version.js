const { MessageEmbed } = require('discord.js');
const config = require('../../config.json');


module.exports = {
    name: "version",
    aliases: ["vers"],
    category: "Bot",
    description: "Send detailed version of bot",
    timeout: 10000,
    usage: "[ver]",
    author: "[Hajrudin]",
    run: async (client, message, args) => {
        const embed = new MessageEmbed()
            .setAuthor(`${client.user.username} | ${config.uzrecica}` , client.user.displayAvatarURL())
            .setThumbnail(client.user.displayAvatarURL())
            .setTitle('Info of Bot version')
            .setColor(`${config.botboja}`)
            .setImage(`${config.botinfo}`)
            .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL())
            .setDescription(`📱 - Bot version is: \`${config.version}\` \n📊 - Version status: \`${config.versstatus}\` \n🔧 - Last update: \`${config.vlastupdate}\``)
            
        await message.channel.send(embed)
    }
}