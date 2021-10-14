const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    img: {
        type: String
    },
    rol: {
        type: String,
        required: true,
        emun: ['ADMIN_ROLE','USER_ROLE']
    },
    estado: {
        type: Boolean,
        default: false
    },
    google: {
        type: Boolean,
        default: false
    }    
});

// para eliminar version y pass m sobreescribiremos el metodo to json
// usar funcion normal, potque se usara THIS referencia a la instancia, no usar funcion de flecha
// quitar ambos y cargar en usuario u otro nombre

UsuarioSchema.methods.toJSON = function() {
    const { __v, password, ...usuario } = this.toObject();
    return usuario;
}




// exportar el nombre de la coleccion o tabla, y luego el esquema
module.exports = model( 'Usuario', UsuarioSchema );

