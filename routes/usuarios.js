// desestructuramos de expres
const { Router } = require('express');
const { check } = require('express-validator');
// quiero usar mi esquema por eso lo importo
//const Role = require('../models/role');    va a helpers

const { validarCampos } = require('../controllers/middlewares/validar-campos');
const { esRoleValido, emailExiste, existeUsuarioPorID } = require('../helpers/db-validators');

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

// hacemos un middleware check para validar que el "id" indicado sea el de mongo
// usamos ismongoid? con el check
// luego se coloca la funcion validar campos
router.put('/:id',[
  check('id', 'No es un ID valido').isMongoId(),
  // aora crear un custo para llamar a existeUsuarioporID
  check('id').custom(existeUsuarioPorID), 
  check('rol').custom( esRoleValido ),
  validarCampos
], usuariosPut );



  // post    
  // hacer validaciones de checkeo del express validator antes de enviar el post
  // hacer un check por cada campo del body . cargarlos en un arreglo
  // como segundo arg se envian los midd check, varios usar arreglo
router.post('/',[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(), 
    check('password', 'El password debe ser mayor a 6 letras').isLength({ min: 6}),
    //check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom( emailExiste ),

    //check('rol', 'No es un rol valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    
    //  ** VALIDACION DE ROL CONTRA BD 
    // evaluar el rol, erificar por curston, recibe el valor, pero validado pr si vienen vacio
    // y se evaluara de todas formas, si existe rol sera igual a algait de buscar uno 
    // en donde el nombre del rol sea igual al rol que estoy enviando
    // si existe, esta grabado, sino, tiraar un trow new error personaliado que lo atrapa el custom
    
    // cortamos la funcion yla llevamos a helpers   ******
/*     check('rol').custom( async(rol = '') => {
      const existeRol = await Role.findOne({ rol });
      // usar express validator
      if ( !existeRol ) {         
        throw new Error('El rol ${ rol } no esta registrado en la BD');
      }
    }),
 */
    check('rol').custom( esRoleValido ),

    
    // colocar al ultimo el midleware validar campos para revisar los checks
    validarCampos
  ], usuariosPost );

  // delete    
router.delete('/', usuariosDelete );

// exportarlo para usar
module.exports = router;
