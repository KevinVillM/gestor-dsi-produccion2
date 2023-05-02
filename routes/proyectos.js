const {Router} = require('express');
const { check } = require('express-validator');

const { validarCampos, validarJWT } = require('../middlewares');

const { getProyectos, crearProyecto, actualizarProyecto, eliminarProyecto, getUnProyecto } = require('../controllers/proyecto');
const { proyectoPorID } = require('../helpers/db-validations');

const router = Router();

router.get('/', validarJWT, getProyectos);

router.get('/:id', [
    validarJWT,
    check('id').custom(proyectoPorID),
    check('id', 'No es un ID valido').isMongoId(),
    validarCampos
],getUnProyecto);

router.post('/', [
    validarJWT,
    check('nombre', 'El nombre del proyecto es obligatorio').not().isEmpty(),
    validarCampos
], crearProyecto);

router.put('/:id', [
    validarJWT,
    check('id').custom(proyectoPorID),
    validarCampos
], actualizarProyecto);

router.delete('/:id', validarJWT, eliminarProyecto);

module.exports = router;