const { Schema, model} = require('mongoose');

const UsuarioSchema = Schema({
    username : {
        type: String,
        required: true,
        unique: true
    },
    online : {
        type: Boolean,
        default: false
    },
});

UsuarioSchema.method('toJSON', function () {
    const { __v, _id, ...object} = this.toObject(); 
    object.uid = _id;
    return object;
});

module.exports = model('Usuario', UsuarioSchema);