// desestructuramos de expres
const { Router } = require('express');

const { usuariosGet,
        usuariosPut,
        usuariosPost,
        usuariosDelete } = require('../controllers/usuarios');

const router = Router();

// get    // traer usuariosGet de contrlllers
router.get('/', usuariosGet );

 // put  
router.put('/', usuariosPut );

  // post    
router.post('/', usuariosPost );

  // delete    
router.delete('/', usuariosDelete );

// exportarlo para usar
module.exports = router;
