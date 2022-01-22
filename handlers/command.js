const { readdirSync } = require("fs");

const ascii = require("ascii-table");

let table = new ascii("Komande");
table.setHeading("Komanda", "Status");

module.exports = (client) => {
    readdirSync("./commands/").forEach(dir => {
        const commands = readdirSync(`./commands/${dir}/`).filter(file => file.endsWith(".js"));
    
        for (let file of commands) {
            let pull = require(`../commands/${dir}/${file}`);
    
            if (pull.name) {
                client.commands.set(pull.name, pull);
                table.addRow(file, 'Ucitana');
            } else {
                table.addRow(file, `error -> missing a help.name, or help.name is not a string.`);
                continue;
            }
    
            if (pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach(alias => client.aliases.set(alias, pull.name));
        }
    });
    console.log('\x1b[36m%s\x1b[0m',table.toString());
    console.log('\x1b[34m%s\x1b[0m',"Dobrodosli na Astro - Discord bot project")
	console.log('\x1b[34m%s\x1b[0m',"Prijavljujem Hajrudin Development");

}