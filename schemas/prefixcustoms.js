const mongoose = require('mongoose')

let Schema = new mongoose.Schema({
    Guild : String,
    Prefix : String, 
})

module.exports = mongoose.model('astro-custom-prefixs', Schema)