// desestructuramos de expres
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../controllers/middlewares/validar-campos');

const { usuariosGet,
        usuariosPut,
        usuariosPost,
        usuariosDelete } = require('../controllers/usuarios');

const router = Router();

// get    // traer usuariosGet de contrlllers
router.get('/', usuariosGet );

 // put  
//router.put('/', usuariosPut );
// para tomar parametros y query
router.put('/:id', usuariosPut );

  // post    
  // hacer validaciones de checkeo del express validator antes de enviar el post
  // hacer un check por cada campo del body . cargarlos en un arreglo
  // como segundo arg se envian los midd check, varios usar arreglo
  router.post('/',[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(), 
    check('password', 'El password debe ser mayor a 6 letras').isLength({ min: 6}),
    check('correo', 'El correo no es valido').isEmail(),
    check('rol', 'No es un rol valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    // colocar al ultimo el midleware validar campos para revisar los checks
    validarCampos
  ], usuariosPost );

  // delete    
router.delete('/', usuariosDelete );

// exportarlo para usar
module.exports = router;
