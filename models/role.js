// 1 de mongus necesito el esquema y el modelo para manejar la coleccion o tabla rol
// para luego hacer la validacion

const { Schema, model } = require('mongoose');

// 2 crear dentro del esquema en si cn los campos y tipo de dato

const RoleSchema = Schema({
    rol : {
        type: String,
        required: [true, 'El rol es obligatorio']
    }
});


// 3 exportar el modelo y ponerle un nombre

module.exports = model( 'Role', RoleSchema );
