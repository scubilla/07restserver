// no le ve a res porlo que no tengo status y demas , entocnes se desectructura express
const { response } = require('express');



const usuariosGet = (req, res = response) => {
    res.json({
        msg:'get API - usuarios get'
    });
 }

const usuariosPut = (req, res = response) => {
    res.json({
        msg:'put API - usuarios put'
    });
}

const usuariosPost = (req, res = response) => {
    
    // body vienen del request, se debe limpiar, desestructurar
    // para usar solo lo q se necesita
    const { nombre, edad } = req.body;
    
    res.json({
        msg:'post API - usuarios post',
        nombre,
        edad
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