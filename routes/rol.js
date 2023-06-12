const {Router} = require('express');
const { check } = require('express-validator');

const { validarCampos, validarJWT } = require('../middlewares');

const { getAllRol, getRol, getRolporProyecto, crearRol, actualizarRol, eliminarRol } = require('../controllers/rol');
const { rolPorID, rolExiste } = require('../helpers/db-validations');

const router = Router();

router.get('/', validarJWT, getAllRol);

router.get('/:id', [
    validarJWT,
    check('id').custom(rolPorID),
    check('id', 'No es un ID valido').isMongoId(),
    validarCampos
], getRol);

router.get('/listadoRoles/:id', [
    validarJWT,
    check('id', 'No es un ID valido').isMongoId(),
    validarCampos
], getRolporProyecto);


router.post('/', [
    validarJWT,
    check('rol').custom(rolExiste),
    validarCampos
], crearRol);

router.put('/:id', [
    validarJWT,
    check('id').custom(rolPorID),
    validarCampos
], actualizarRol);

router.delete('/:id', [
    validarJWT,
    check('rol').custom(rolPorID),
], eliminarRol);

module.exports = router;