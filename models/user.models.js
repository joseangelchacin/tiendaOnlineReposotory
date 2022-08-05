const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, 'El campo username es requerido'],
        minLength: [3, 'El campo username debe tener como minimo 3 caracteres'],
        maxLength: [16, 'El campo username debe tener como maximo 16 caracteres']
    },
    email: {
        type: String,
        match: ['/^[\w\-\.]+@([\w-]+\.)+[\w-]{2,4}$/', 'El formato de email no es correcto']
    },
    password: String,
    active: Boolean,
    role: String,
    products: [{ type: Schema.Types.ObjectId, ref: 'product' }]

});

module.exports = mongoose.model('user', userSchema);