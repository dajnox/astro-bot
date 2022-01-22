const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js')
const config = require('../../config.json');

module.exports = {
    name: 'covid19',
    category: "Utility",
    description: "Covid19 search",
    usage: "[command] + [countries] | all",
    author: "[Hajrudin]",
    run: async (client, message, args) => {
        const countries = args.join(" ");
        if (!args[0]) {
            const embed = new MessageEmbed()
            .setAuthor(`${client.user.username} | ${config.uzrecica}` , client.user.displayAvatarURL())
            .setDescription(`:x: - ${message.author} usage: \`covid19 <country or all>\``)
            .setColor('RED')
            .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL())

            message.channel.send(embed);
        }
        if (args[0] === "all") {
            const url = `https://disease.sh/v3/covid-19/all`
            let response
            response = await fetch(url).then(res => res.json())
            const embed = new MessageEmbed()
            .setAuthor(`${client.user.username} | ${config.uzrecica}` , client.user.displayAvatarURL())
                .setTitle(`Worldwide COVID-19 Stats 🌎`)
                .setThumbnail(`https://i.imgur.com/dJ52ckG.jpg`)
                .addField('Total Cases', response.cases.toLocaleString())
                .addField('Total Deaths', response.deaths.toLocaleString())
                .addField('Total Recovered', response.recovered.toLocaleString())
                .addField('Active Cases', response.active.toLocaleString())
                .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL())
                .addField('Critical Cases', response.critical.toLocaleString())
                .addField('Todays Deaths', response.todayDeaths.toLocaleString())
                .addField('Today Recoveries', response.todayRecovered.toLocaleString())
            message.channel.send(embed)
        } else {
            const url = `https://disease.sh/v3/covid-19/countries/${encodeURIComponent(countries)}`
            let response
            response = await fetch(url).then(res => res.json())
            try {
                const embed = new MessageEmbed()
                .setAuthor(`${client.user.username} | ${config.uzrecica}` , client.user.displayAvatarURL())
                .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL())
                    .setTitle(`COVID-19 Stats for **${countries}**`)
                    .setThumbnail(response.countryInfo.flag)
                    .addField('Total Cases', response.cases.toLocaleString())
                    .addField('Total Deaths', response.deaths.toLocaleString())
                    .addField('Total Recovered', response.recovered.toLocaleString())
                    .addField('Active Cases', response.active.toLocaleString())
                    .addField('Critical Cases', response.critical.toLocaleString())
                    .addField('Todays Deaths', response.todayDeaths.toLocaleString())
                    .addField('Today Recoveries', response.todayRecovered.toLocaleString())
                message.channel.send(embed)
            } catch {
                message.channel.send('Country not found')
            }
        }
    }
}
