// desestructuramos de expres
const { Router } = require('express');
const { check } = require('express-validator');
// quiero usar mi esquema por eso lo importo
const Role = require('../models/role');

const { validarCampos } = require('../controllers/middlewares/validar-campos');

const { usuariosGet,
        usuariosPut,
        usuariosPost,
        usuariosDelete } = require('../controllers/usuarios');
const role = require('../models/role');

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
    //check('rol', 'No es un rol valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    
    //  ** VALIDACION DE ROL CONTRA BD 
    // evaluar el rol, erificar por curston, recibe el valor, pero validado pr si vienen vacio
    // y se evaluara de todas formas, si existe rol sera igual a algait de buscar uno 
    // en donde el nombre del rol sea igual al rol que estoy enviando
    // si existe, esta grabado, sino, tiraar un trow new error personaliado que lo atrapa el custom
    check('rol').custom( async(rol = '') => {
      const existeRol = await Role.findOne({ rol });
      // usar express validator
      if ( !existeRol ) {         
        throw new Error('El rol ${ rol } no esta registrado en la BD');
      }
    }),
    
    // colocar al ultimo el midleware validar campos para revisar los checks
    validarCampos
  ], usuariosPost );

  // delete    
router.delete('/', usuariosDelete );

// exportarlo para usar
module.exports = router;
