const {Router} = require('express');
const { check } = require('express-validator');

const { validarCampos, validarJWT } = require('../middlewares');

const { crearTarea, getTareas, actualizarTarea, eliminarTarea } = require('../controllers/tarea');
const { tareaPorID, proyectoPorID } = require('../helpers/db-validations');
const { getUnaTarea } = require('../controllers/tarea');

const router = Router();

router.get('/', validarJWT, getTareas);

router.get('/:id', [
    validarJWT,
    check('id').custom(tareaPorID),
    check('id', 'No es un ID valido').isMongoId(),
    validarCampos
], getUnaTarea);

router.post('/', [
    validarJWT,
    check('nombre', 'El nombre de la tarea es obligatorio').not().isEmpty(),
    check('descripcion', 'La descripción de la tarea es obligatoria').not().isEmpty(),
    check('proyecto', 'El proyecto de la tarea es obligatorio').not().isEmpty(),
    check('proyecto').custom(proyectoPorID),
    validarCampos
], crearTarea);

router.put('/:id', [
    validarJWT,
    check('id').custom(tareaPorID),
    validarCampos
], actualizarTarea);

router.delete('/:id', [
    validarJWT,
    check('id').custom(tareaPorID),
], eliminarTarea);

module.exports = router;