const mongoose = require('mongoose')

const musicSchema = new mongoose.Schema({
    artist: {
        type: String,
        required: [true, 'Artist name required']
    },
    album:{
        type: String,
        required: [true, 'Album name required']
    },
    song:{
        type: String,
        required: [true, 'Song name required']
    },
    genre:{
        type: String,
        required: [true, 'Genre required']
    },
    explicit:{
        type:Boolean,
        default: false
    }
})

const  Music = mongoose.model('Music', musicSchema)

module.exports =  Music;

