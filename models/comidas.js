const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const comidasSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    'peso': {
        type: Number,
        required: true
    },
    'calorias': {
        type: Number,
        required: true
    },
    'proteina': {
        type: Number,
        required: true
    },
    'grasa': {
        type: Number,
        required: true
    },
    'carbohidratos': {
        type: Number,
        required: true
    },
    'fibra': {
        type: Number,
        required: true
    },
    'azucar': {
        type: Number,
        required: true
    },
    'sodio': {
        type: Number,
        required: true
    }
});

const Comidas = mongoose.model('Comidas', comidasSchema);

module.exports = Comidas;