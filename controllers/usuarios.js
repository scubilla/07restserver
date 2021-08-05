// no le ve a res porlo que no tengo status y demas , entocnes se desectructura express
const { response } = require('express');



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

const usuariosPost = (req, res = response) => {
    
    // body vienen del request, se debe limpiar, desestructurar
    // para usar solo lo q se necesita
    const { nombre, edad } = req.body;
    //const body = req.body;
    
    
    res.json({
        msg:'post API - usuarios post',
        nombre,
        edad
        //body
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