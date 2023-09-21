const {Router} = require('express');
const { usuariosGet,
        usuariosPut, 
        usuariosPost, 
        usuariosDelete, 
        usuarioUnoGet,
        usuarioPorEmailGet} = require('../controllers/usuario');

const { check } = require('express-validator');
const { esRolValido, emailExiste, usuarioPorID, emailNoExiste } = require('../helpers/db-validations');


const { validarJWT, esAdminRole, tieneRole, validarCampos } = require('../middlewares');

const router = Router();

router.get('/',usuariosGet);

router.get('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(usuarioPorID),
    validarCampos
],usuarioUnoGet);

router.get('/email/:email', [
    check('email', 'No es un email valido').isEmail(),
    check('email').custom(emailNoExiste),
    validarCampos
],usuarioPorEmailGet);

router.put('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(usuarioPorID),
    check('rol').custom(esRolValido),
    validarCampos
], usuariosPut);

router.post('/', [
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('password','El password debe ser de más de 6 letras').isLength({min: 6}),
    check('email').custom(emailExiste),
    check('email','El correo no  es valido').isEmail(),
    check('rol').custom(esRolValido),
    validarCampos
], usuariosPost);

router.delete('/:id',[    
    validarJWT,
    //esAdminRole,
    tieneRole('ADMIN_ROL', 'USER_ROL'),
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(usuarioPorID),
    validarCampos
], usuariosDelete);

module.exports = router;