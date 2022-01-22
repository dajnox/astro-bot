/*


              Astro™ Public Discord Bot

              Author: Hajrudin
              Credits: Harmonynos Team, Github

              Version: v1.0 (ALPHA)

              "Life could be a dream"

              Invite: https://dsc.gg/astro™



*/

const { Client, Collection, MessageEmbed, Message } = require("discord.js");
const { DiscordUNO } = require("discord-uno");
const fs = require("fs");
require('dotenv').config();
const childProcess = require('child_process')
const mongoose = require('mongoose');
const defaultconfig = {
  "autoUpdate": true,
  "token": "ODI0NjA5Mzk4ODU2MzUxNzg0.YFx3WQ.467LB6-v3jTBELcwrUqR-dG_B6M",
  "prefix": "as!",
  "Admin": "522762791619264533",
  "osuAPI": {
    "client_id": "",
    "client_secret": "",
    "typeof client_id": "number",
    "typeof client_secret": "string"
  },
  "mongoPath": "mongodb+srv://hajrudin:558712274468621@cluster0.c3wd0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  "youtubecookie": "",
  "oauthv2link": "",
  "loglevel": "message",
  "Vaild value for loglevel": "message / error / none"
}
if (!fs.existsSync('./config.json')) {
  console.log('[Config Handlers]', "config.json doesn't exists. Attemping to create a new one...")
  fs.writeFileSync('./config.json', JSON.stringify(defaultconfig, null, 4))
}
var config = JSON.parse(fs.readFileSync('./config.json').toString());

for (let a in defaultconfig) {
  if (config[a] == undefined) {
    console.log('[Config Handlers]', a, 'was not found in config.json. Adding with default value: ' + defaultconfig[a] + '...')
    config[a] = defaultconfig[a]
  }
  fs.writeFileSync('./config.json', JSON.stringify(config, null, 4))
}
var config = JSON.parse(fs.readFileSync('./config.json').toString());
const main = async () => {
  if (config.token != '') {
    const moment = require('moment');
    const ms = require('ms');
    const Timeout = new Collection();

    const client = new Client({
      disableEveryone: true
    });
    require('discord-buttons')(client);
    client.discordUNO = new DiscordUNO();
    client.commands = new Collection();
    client.aliases = new Collection();
    client.categories = fs.readdirSync("./commands/");
    fs.readdirSync('./handlers').forEach(handler => {
      require(`./handlers/${handler}`)(client);
    });
    client.on('ready', () => {
      console.log('\x1b[33m%s\x1b[0m', `Prijavljen sam kao ${client.user.tag}!`);
      setInterval(() => {
        const statuses = [
          `Astro™ | ${config.prefix}help`,
          `on ${client.guilds.cache.size} servers, with ${client.users.cache.size} users`,
          `${config.version} ${config.versstatus}`
        ]

        const status = statuses[Math.floor(Math.random() * statuses.length)]
        client.user.setActivity(status, { type: "LISTENING" })
      }, 10000)

      // Database Connect
      mongoose.connect(config.mongoPath, { useUnifiedTopology: true, useNewUrlParser: true })
        .then(() => console.log('\x1b[33m%s\x1b[0m', `Uspijesna konekcija na MongoDB`))
        .catch((error) => { console.log(error) });
    });
    const prefixSchema = require('./schemas/prefixcustoms')
    client.prefix = async function (message) {
      let custom;

      const data = await prefixSchema.findOne({ Guild: message.guild.id })
        .catch(err => console.log(err))

      if (data) {
        custom = data.Prefix;
      } else {
        custom = config.prefix;
      }
      return custom;
    }
    client.on("message", async message => {
      const prefixes = await client.prefix(message)
      if (message.content.includes(`<@!${config.Admin}>`)) if (!message.author.id == client.user.id) message.reply('Tag ad bo may cc dmm')
      if (message.content == `<@!${client.user.id}>` || message.content == `<@${client.user.id}>`) {
        message.channel.send(
          new MessageEmbed ()
          .setColor(`${config.botboja}`)
          .setThumbnail(client.user.displayAvatarURL())
          .setAuthor(`${client.user.username} | ${config.uzrecica}` , client.user.displayAvatarURL())
          .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL())
          .setTitle(`Heyy ${message.author.username}, I'm ${client.user.username}`)
          .setDescription(`Did you tag me? Okay, you definitely need help :) \n\n⚙️ My prefix is **${config.prefix}**\n⚙️ You can use ${config.prefix}help \n\nEnjoyyy !!`)
        )
        return
      } else {
        //if (!message.content.startsWith(config.prefix) && !message.content.startsWith(`<@!${client.user.id}>`) && message.content.includes(`<@!${client.user.id}>`)) return message.reply(`**Use ${prefixes}help to display all commands available.**`);
        //if (!message.content.startsWith(config.prefix) &&!message.content.startsWith(`<@${client.user.id}>`) && message.content.includes(`<@${client.user.id}>`)) return message.reply(`**Use ${prefixes}help to display all commands available.**`);
      }
      if (config.loglevel == 'message') {
        if (message.content.startsWith(prefixes) && message.content.startsWith(`<@!${client.user.id}>`)) {
          console.log('\x1b[32m%s\x1b[0m', `[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message.author.username} (${message.author.id}) issued command in ${message.channel.id}: ${message.content}`);
        } else {
          if (message.attachments.first() != undefined && message.content != '') {
            console.log('\x1b[32m%s\x1b[0m', `[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message.author.username} (${message.author.id}) messaged in ${message.channel.id}: ${message.content}`);
            console.log('\x1b[32m%s\x1b[0m', `[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message.author.username} (${message.author.id}) sent an attachment in ${message.channel.id}: ${message.attachments.first().url}`)
          } else if (message.attachments.first() != undefined && message.content == '') {
            console.log('\x1b[32m%s\x1b[0m', `[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message.author.username} (${message.author.id}) sent an attachment in ${message.channel.id}: ${message.attachments.first().url}`)
          } else if (message.attachments.first() == undefined && message.content != '') {
            console.log('\x1b[32m%s\x1b[0m', `[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message.author.username} (${message.author.id}) messaged in ${message.channel.id}: ${message.content}`);
          } else {
            if (message.embeds.length != 0) {
              let a = message.embeds[0]
              let embed = {}
              for (let b in a) {
                if (a[b] != null && (a[b] != [] && a[b].length != 0) && a[b] != {}) {
                  embed[b] = a[b]
                }
              }
              console.log('\x1b[32m%s\x1b[0m', `[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message.author.username} (${message.author.id}) sent an embed in ${message.channel.id}: ${JSON.stringify(embed, null, 2)}`)
            }
          }
        }
      }
      if (message.author.bot) return;
      if (!message.guild) return;
      //console.log(!message.content.startsWith(prefixes) && (!message.content.startsWith(`<@!${client.user.id}>` || !message.content.startsWith(`<@${client.user.id}>`))))
      if (!message.content.startsWith(prefixes)) {
        if (!message.content.startsWith(`<@!${client.user.id}>`))
          if (!message.content.startsWith(`<@${client.user.id}>`)) return;
      }
      if (!message.member) message.member = await message.guild.fetchMember(message);
      const args = message.content.trim().split(/ +/g);
      //console.log(args)
      var cmd;
      var a = args.shift();
      if (a == `<@!${client.user.id}>` || a == `<@${client.user.id}>`) {
        cmd = args[0]
        args.shift();
      } else {
        cmd = a.toLowerCase().replace(`<@!${client.user.id}>`, '').replace(`<@${client.user.id}>`, '').replace(prefixes, '');
      }
      //console.log(args,cmd)
      if (cmd.length === 0) return;
      let command = client.commands.get(cmd);
      if (!command) command = client.commands.get(client.aliases.get(cmd));
      if (command) {
        if (command.run != undefined) {
          if (Timeout.has(`${command.name}${message.author.id}`)) return message.channel.send(`You are on a \`${ms(Timeout.get(`${command.name}${message.author.id}`) - Date.now(), { long: true })}\` cooldown.`)
          command.run(client, message, args);
          Timeout.set(`${command.name}${message.author.id}`, Date.now() + command.timeout)
          setTimeout(() => {
            Timeout.delete(`${command.name}${message.author.id}`)
          }, command.timeout)
        } else return;
      }
    });
    const distube = require('distube');
    client.distube = new distube(client, { searchSongs: true, emitNewSongOnly: true, leaveOnEmpty: true, leaveOnFinish: true, updateYouTubeDL: false, youtubeCookie: config.youtubecookie })
    const status = (queue) => `Volume: \`${queue.volume}%\` | Loop: \`${queue.repeatMode ? queue.repeatMode == 2 ? "All Queue" : "This Song" : "Off"}\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``;
    client.distube
      .on("playSong", (message, queue, song) => {
        const embed = new MessageEmbed()
          .setAuthor(`${client.user.username} | ${config.uzrecica}` , client.user.displayAvatarURL())
          .setColor(`${config.botboja}`)
          .setImage(`${config.musicbotslika}`)
          .setTitle('<:headphones:879518595602841630> Started Playing')
          .setDescription(`[${song.name}](${song.url})`)
          .addField('**Song views:**', `\`${song.views}\``)
          .addField('**Song likes** 👍', `\`${song.likes}\``)
          .addField('**Song dislikes** 👎', `\`${song.dislikes}\``)
          .addField('**Song duration:**', `\`${song.formattedDuration}\``)
          .addField('**Song status**', status(queue))
          .setThumbnail(song.thumbnail)
        message.channel.send(embed)
      })
      .on('addSong', (message, queue, song) => {
        const embed = new MessageEmbed()
        .setAuthor(`${client.user.username} | ${config.uzrecica}` , client.user.displayAvatarURL())
        .setColor(`${config.botboja}`)
        .setImage(`${config.musicbotslika}`)
          .setTitle(`✅ Added song to queue`)
          .setDescription(`\`${song.name}\` - \`${song.formattedDuration}\` - Requested by ${song.user}`)
          
        message.channel.send(embed);
      })
      .on("playList", (message, queue, playlist, song) => {
        const embed = new MessageEmbed()
        .setAuthor(`${client.user.username} | ${config.uzrecica}` , client.user.displayAvatarURL())
        .setColor(`${config.botboja}`)
        .setImage(`${config.musicbotslika}`)
          .setTitle(`🎵 PlayList`)
          .setDescription(`Play \`${playlist.name}\` playlist (${playlist.songs.length} songs).\nRequested by: ${song.user}\nNow playing \`${song.name}\` - \`${song.formattedDuration}\`\n${status(queue)}`)
        message.channel.send(embed)
      })
      .on("addList", (message, queue, playlist) => {
        const embed = new MessageEmbed()
        .setAuthor(`${client.user.username} | ${config.uzrecica}` , client.user.displayAvatarURL())
        .setColor(`${config.botboja}`)
        .setImage(`${config.musicbotslika}`)
          .setTitle(`<:addsong:879518595665780746> Add list`)
          .setDescription(`Added \`${playlist.name}\` playlist (${playlist.songs.length} songs) to queue\n${status(queue)}`)
         
        message.channel.send(embed);
      })
      .on("searchResult", (message, result) => {
        let i = 0;
        const embed = new MessageEmbed()
          .setAuthor(`${client.user.username} | ${config.uzrecica}` , client.user.displayAvatarURL())
          .setThumbnail(client.user.displayAvatarURL())
          .setImage(`${config.musicbotslika}`)
          .setTitle('Choose an option from below')
          .setDescription(`${result.map(song => `**${++i}**. ${song.name} - \`${song.formattedDuration}\``).join("\n")}`)
          .setColor(`${config.botboja}`)
          .setFooter('*Enter anything else or wait 60 seconds to cancel*')
        message.channel.send(embed).then(embed => { embed.delete({ timeout: 61000 }) })
      })
      .on("searchCancel", (message) => message.channel.send(`***Searching canceled***`))
      .on('error', (message, e) => {
        message.channel.send(`An error encountered: ${e}`)
      })
      .on('empty', (message, queue) => {
        const nemanikog = new MessageEmbed()
            .setAuthor(`${client.user.username} | ${config.uzrecica}` , client.user.displayAvatarURL())
            .setColor(`${config.botboja}`)
            .setImage(`${config.musicbotslikakraj}`)
            .setDescription(`:information_source: - Channel is empty. I'm leaving the channel`)
            .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL())
            return message.channel.send(nemanikog)
      })
      .on('finish', (message, queue) => {
            const kraj = new MessageEmbed()
            .setAuthor(`${client.user.username} | ${config.uzrecica}` , client.user.displayAvatarURL())
            .setColor(`${config.botboja}`)
            .setImage(`${config.musicbotslikakraj}`)
            .setDescription(`:information_source: - No more song in queue. I'm leaving the channel. If you like our work, help with further development with a [donation.](https://www.patreon.com/astro1)`)
            .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL())
            return message.channel.send(kraj)
      })
      .on('initQueue', (queue) => {
        queue.autoplay = false;
        queue.volume = 50;
      });
    client.login(process.env.DISCORD_TOKEN);
  } else {
    console.error('[ERROR]', 'Please spectify a Discord bot token in config.json.')
    //eslint-disable-next-line no-unreachable
    process.exit(1)
  }
}
async function update() {
  if (config.autoUpdate == true) {
    if (fs.existsSync('./.git')) {
      //ensures that the bot was cloned by using git ./.git is in directory.
      console.log('[Updater]', 'Updating...')
      const child = childProcess.spawn('git', ['pull'])
      //ensure thats the bot run after update.
      child.on('close', async () => {
        //Ensuring thats new package are installed.
        console.log('[Updater]', 'Installing new package...')
        childProcess.execSync('npm i')
        console.log('[Updater]', 'Updated. Starting...')
        await main()
      })
    } else {
      console.log('[Updater]', './.git was not found in this directory. Skipping update...')
      await main()
    }
  } else {
    await main()
  }
}
update()
