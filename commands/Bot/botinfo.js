const { MessageEmbed } = require('discord.js');
const { version } = require('discord.js');
const config = require('../../config.json');
const os = require('os');

    module.exports = {
        name:"botinfo",
        category: "Bot",
        description: "Send detailed info about the client",
        timeout: 10000,
        usage: "[command]",
        author: "[Hajrudin]",
        run: async (client, message, args) => {
            const embed = new MessageEmbed()
                .setAuthor(`${client.user.username} | ${config.uzrecica}` , client.user.displayAvatarURL())
                .setThumbnail(client.user.displayAvatarURL())
                .setTitle('Bot Informations')
                .setColor(`${config.botboja}`)
                .setImage(`${config.botinfo}`)
                .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL())
                .addFields(
                    {
                        name: '👨‍💻 Bot creator',
                        value: `\`${message.client.users.cache.get(require('../../config.json').Admin)?.tag}\``,
                        inline: true
                    },
                    {
                        name: '📱 Servers',
                        value: `\`Serving ${client.guilds.cache.size} servers.\``,
                        inline: true
                    },
                    {
                        name: '📊 Channels',
                        value: `\`Serving ${client.channels.cache.size} channels.\``,
                        inline: true
                    },
                    {
                        name: '👥 Users',
                        value: `\`Serving ${client.users.cache.size} users.\``,
                        inline: true
                    },
                    {
                        name: '<:computer:879379500322922507> ARCH',
                        value: `\`${os.arch()}\``,
                        inline: true
                    },
                    {
                        name: '<:computer:879379500322922507> Platform',
                        value: `\`${os.platform()}\``,
                        inline: true
                    },
                    {
                        name: '⚙️ CPU',
                        value: `\`\`\`md\n${os.cpus().map(i => `${i.model}`)[0]}\`\`\``,
                        inline: true
                    },
                )   
            await message.channel.send(embed)
        }
    }