const { MessageEmbed } = require('discord.js');
const config = require('../../config.json');


module.exports = {
    name: "update",
    aliases: ["vers"],
    category: "Bot",
    description: "Send updates of bot",
    timeout: 10000,
    usage: "[ver]",
    author: "[Hajrudin]",
    run: async (client, message, args) => {
        const embed = new MessageEmbed()
            .setAuthor(`${client.user.username} | ${config.uzrecica}` , client.user.displayAvatarURL())
            .setThumbnail(client.user.displayAvatarURL())
            .setTitle('Bot updates')
            .setColor(`${config.botboja}`)
            .setImage(`${config.botinfo}`)
            .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL())
            .setDescription(`š± - Bot version is: \`${config.version}\` \nš - Version status: \`${config.versstatus}\` \nš§ - Last update: \`${config.vlastupdate}\`\n āāāāāāāāāāāāāāāāāāāāā \nš - Update details: \` ${config.descofupdate}\``)
            
        await message.channel.send(embed)
    }
}