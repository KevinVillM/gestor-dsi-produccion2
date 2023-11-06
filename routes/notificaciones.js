//Crear las rutas para las notificaciones

const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { validarJWT } = require('../middlewares/validar-jwt');

const { getNotificaciones, getNotificacionesLeidas, getNotificacionesProyecto, getNotificacionesTarea, postNotificacion, putNotificacion, deleteNotificacion, getNotificacionesUsuario } = require('../controllers/NotificacionController');

router.get('/', validarJWT, getNotificaciones);

router.get('/leidas', validarJWT, getNotificacionesLeidas);

router.get('/usuario/:usuario', validarJWT, getNotificacionesUsuario);

router.get('/proyecto/:proyecto', validarJWT, getNotificacionesProyecto);

router.get('/tarea/:tarea', validarJWT, getNotificacionesTarea);

router.post('/', validarJWT, postNotificacion);

router.put('/:id', validarJWT, putNotificacion);

router.delete('/:id', validarJWT, deleteNotificacion);

module.exports = router;