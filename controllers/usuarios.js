// no le ve a res porlo que no tengo status y demas , entocnes se desectructura express
const { response } = require('express');
// requerir para encryptar
const bcryptjs = require('bcryptjs');


// secc 9 para grabar importamos el modelo. mayuscula xq es instancia
const Usuario = require('../models/usuario');
const usuario = require('../models/usuario');



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

const usuariosPut = async (req, res = response) => {

    // recuperar id agregado al put en routes , es una proo del requets
    // const id = req.params.id;    forma
    const { id }  = req.params;

    // desestructurar para saber q no kiero actualizar
    const  { _id, password, google, correo, ...resto } = req.body; 

    // TODO validar contra base de datos
    // si password existe, deseo actualzar contraseña
    if ( password ) {
        // escriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt );
    }

    // luego de ecrptar, se actualiza el registro
    // busca por el id y actualiza todo lo q se encuentre en resto
    const usuario = await Usuario.findByIdAndUpdate( id, resto ); 

    res.json({
        msg:'put API - usuarios put',
        // agregar id traido del put
        //id   se cambia por usuario para mostrar todo
        usuario 
    });
}

// seccc 9 convertir el post a async
const usuariosPost = async (req, res = response) => {

    // confirmar los errores de los midlewares check, si nbo es vacio eviar 400 y el error
    // a rtaves de validation result
    // luego se corta cuando se crea la carptea middlewares 
    

    
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
    
    // antes de encrytar , verificar q existe el correo, buscara un objeto
    // mover a helpers. db validaciones 
    
    /* const existeEmail = await Usuario.findOne({ correo });
    // si existe email es error, se duplico y no se puede
    if ( existeEmail ) {  
        return res.status(400).json({       // se coloca return para salir
            msg: 'Ese correo ya existe!'
        });
    } */
   
    
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