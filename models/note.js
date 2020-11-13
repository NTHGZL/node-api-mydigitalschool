const mongoose = require('mongoose')
const {Schema } = mongoose

//Création du schéma
const NoteSchema = Schema({
    title:{
        type: String,
        required : true
    },
    description: {
        type : String,
        required: true
    },
    isEnabled: {
        type: Boolean,
        default : true
    },
    isFavorite: {
        type: Boolean,
        default : false
    }
})

//Export du modèle Mongoose basé sur le schéma crée précédemment 
module.exports = mongoose.model('Note', NoteSchema)