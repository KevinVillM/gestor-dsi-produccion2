const {Router} = require('express');
const { check } = require('express-validator');

const { validarCampos, validarJWT } = require('../middlewares');

const { getProyectos, crearProyecto, actualizarProyecto, eliminarProyecto, getUnProyecto, getProyectosPorUsuarioCreador, getProyectosPorUsuarioColaborador, getProyectosPorUsuario, contarProyectosPorUsuario, contarProyectosEnProceso, contarProyectosFinalizados, contarProyectosPendientes, estadistica, getUsuariosColaboradores, getUnProyectoPorId } = require('../controllers/proyecto');
const { proyectoPorID } = require('../helpers/db-validations');

const router = Router();

router.get('/', validarJWT, getProyectos);

router.get('/:id', [
    validarJWT,
    check('id').custom(proyectoPorID),
    check('id', 'No es un ID valido').isMongoId(),
    validarCampos
],getUnProyecto);

router.get('/pro/:id', [
    validarJWT,
    check('id').custom(proyectoPorID),
    check('id', 'No es un ID valido').isMongoId(),
    validarCampos
],getUnProyectoPorId);

router.get('/listadoProyectos/:id', [
    validarJWT,
    check('id', 'No es un ID valido').isMongoId(),
    validarCampos
], getProyectosPorUsuario);

router.get('/creador/:id', [
    validarJWT,
    check('id', 'No es un ID valido').isMongoId(),
    validarCampos
], getProyectosPorUsuarioCreador);


router.get('/colaborador/:id', [
    validarJWT,
    check('id', 'No es un ID valido').isMongoId(),
    validarCampos
], getProyectosPorUsuarioColaborador);

router.post('/', [
    validarJWT,
    check('nombre', 'El nombre del proyecto es obligatorio').not().isEmpty(),
    validarCampos
], crearProyecto);

router.get('/colaboradores/:id', [
    validarJWT,
    check('id', 'No es un ID valido').isMongoId(),
    validarCampos
], getUsuariosColaboradores);

router.get('/estadistica/:id', [
    validarJWT,
    check('id', 'No es un ID valido').isMongoId(),
    validarCampos
], estadistica);

router.put('/:id', [
    validarJWT,
    check('id').custom(proyectoPorID),
    validarCampos
], actualizarProyecto);

router.delete('/:id', [
    validarJWT,
    check('id').custom(proyectoPorID),
], eliminarProyecto);

module.exports = router;