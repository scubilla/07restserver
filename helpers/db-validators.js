const Role = require('../models/role');
const Usuario = require('../models/usuario');
 
// traido de routes para uasr helper
const esRoleValido = async(rol = '') => {
    const existeRol = await Role.findOne({ rol });
    // usar express validator
    if ( !existeRol ) {         
      throw new Error(`El rol ${ rol } no esta registrado en la BD`);
    }
}    

// traido de routes para uasr helper
const emailExiste = async( correo = '') => {
    const existeEmail = await Usuario.findOne({ correo });
    // si existe usuario es error, se duplico y no se puede
    if ( existeEmail ) {  
        throw new Error(`El correo  ${ correo } ya esta registrado en la BD`);
    } 
}




module.exports = {
    esRoleValido,
    emailExiste
}
