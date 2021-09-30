// no le ve a res porlo que no tengo status y demas , entocnes se desectructura express
const { response } = require('express');
// requerir para encryptar
const bcryptjs = require('bcryptjs');


// secc 9 para grabar importamos el modelo. mayuscula xq es instancia
const Usuario = require('../models/usuario');


const usuariosGet = (req, res = response) => {

    // para manejar parametros desde el get 
    // const query = req.query;
    const { q, nombre = 'Sin nombre', apikey, page = 1, limit } = req.query;
    
    res.json({
        msg:'get API - usuarios get',
        q,
        nombre,
        apikey,
        page,
        limit
    });
 }

const usuariosPut = (req, res = response) => {

    // recuperar id agregado al put en routes , es una proo del requets
    // const id = req.params.id;    forma
    const { id }  = req.params;

    res.json({
        msg:'put API - usuarios put',
        // agregar id traido del put
        id
    });
}

// seccc 9 convertir el post a async
const usuariosPost = async (req, res = response) => {
    
    // body vienen del request, se debe limpiar, desestructurar
    // para usar solo lo q se necesita
    // canbiado por secc 9
    //const { nombre, edad } = req.body;
    //const body = req.body;  desetructuramos para se solo vaya lo q qremos
    const { nombre, correo, password, rol } = req.body;

    // secc9 crear instancia de usuario y se le envia el body
    //const usuario = new Usuario( body );
    // aora enviamos un objeto con la desestructuracion
    const usuario = new Usuario({ nombre, correo, password, rol });
    
    // antes de encrytar , verificar q existe el correo
   
    
   // encriptar la contraseña con 10 saltos, se toma el pass del obj ususario
   const salt = bcryptjs.genSaltSync(10);
   usuario.password = bcryptjs.hashSync( password, salt );
    
    // grabar en la BD
    await usuario.save();

    
    
    res.json({
        //msg:'post API - usuarios post',   QUITAR CUANDO YA GRABA
        //nombre,
        //edad
        //body
        // secc 9 enviar instancia de usuario
        usuario
    });
}
 
const usuariosDelete = (req, res = response) => {
    res.json({
        msg:'delete API - usuarios delete'
    });
}




 // no olvides exportalo y luego pegarlo en usuarios routes dsde donde se lo corto
 // para efectuar la llamada, se exportan mas de uno
 module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete
 }