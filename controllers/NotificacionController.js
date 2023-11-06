//Crear los controllers para el modelo Notificacion

const Notificacion = require('../models/notificacion');
const Usuario = require('../models/usuario');
const Proyecto = require('../models/proyecto');
const Tarea = require('../models/tarea');
const usuario = require('../models/usuario');

const getNotificaciones = async (req, res) => {
    const notificaciones = await Notificacion.find({ usuario: req.uid, leida: false })
        .populate('usuario', 'nombre')
        .populate('proyecto', 'nombre')
        .populate('tarea', 'nombre');
    res.json({
        ok: true,
        notificaciones
    });
}

const getNotificacionesLeidas = async (req, res) => {
    const notificaciones = await Notificacion.find({ usuario: req.uid, leida: true })
        .populate('usuario', 'nombre')
        .populate('proyecto', 'nombre')
        .populate('tarea', 'nombre');
    res.json({
        ok: true,
        notificaciones
    });
}

//Get notificaciones por usuario
const getNotificacionesUsuario = async (req, res) => {
    const { usuario } = req.params;
    const notificaciones = await Notificacion.find({ usuario })
        .populate('usuario', 'nombre')
        .populate('proyecto', 'nombre')
        .populate('tarea', 'nombre');
    res.json(
        notificaciones
    );
}

const getNotificacionesProyecto = async (req, res) => {
    const { proyecto } = req.params;
    const notificaciones = await Notificacion.find({ usuario: req.uid, proyecto })
        .populate('usuario', 'nombre')
        .populate('proyecto', 'nombre')
        .populate('tarea', 'nombre');
    res.json({
        ok: true,
        notificaciones
    });
}

const getNotificacionesTarea = async (req, res) => {
    const { tarea } = req.params;
    const notificaciones = await Notificacion.find({ usuario: req.uid, tarea })
        .populate('usuario', 'nombre')
        .populate('proyecto', 'nombre')
        .populate('tarea', 'nombre');
    res.json({
        ok: true,
        notificaciones
    });
}

const postNotificacion = async (req, res) => {
    const { titulo, descripcion, fecha, usuario, proyecto, tarea } = req.body;
    const notificacion = new Notificacion({ titulo, descripcion, fecha, usuario, proyecto, tarea });
    await notificacion.save();
    res.json({
        ok: true,
        notificacion
    });
}

const putNotificacion = async (req, res) => {
    const { id } = req.params;
    const { titulo, descripcion, fecha, usuario, proyecto, tarea } = req.body;
    const notificacion = await Notificacion.findByIdAndUpdate(id, { titulo, descripcion, fecha, usuario, proyecto, tarea });
    res.json({
        ok: true,
        notificacion
    });
}

const deleteNotificacion = async (req, res) => {
    const { id } = req.params;
    const notificacion = await Notificacion.findByIdAndDelete(id);
    res.json({
        ok: true,
        notificacion
    });
}

const deleteNotificacionesUsuario = async (req, res) => {
    const { id } = req.params;
    const usuario = id;
    const notificaciones = await Notificacion.deleteMany({ usuario });
    res.json({
        ok: true,
        notificaciones
    });
}   

const deleteNotificacionesProyecto = async (req, res) => {
    const { proyecto } = req.params;
    const notificaciones = await Notificacion.deleteMany({ proyecto });
    res.json({
        ok: true,
        notificaciones
    });
}

const deleteNotificacionesTarea = async (req, res) => {
    const { tarea } = req.params;
    const notificaciones = await Notificacion.deleteMany({ tarea });
    res.json({
        ok: true,
        notificaciones
    });
}

const deleteNotificaciones = async (req, res) => {
    const notificaciones = await Notificacion.deleteMany();
    res.json({
        ok: true,
        notificaciones
    });
}

const deleteNotificacionesUsuarioProyecto = async (req, res) => {
    const { usuario, proyecto } = req.params;
    const notificaciones = await Notificacion.deleteMany({ usuario, proyecto });
    res.json({
        ok: true,
        notificaciones
    });
}

const deleteNotificacionesUsuarioTarea = async (req, res) => {
    const { usuario, tarea } = req.params;
    const notificaciones = await Notificacion.deleteMany({ usuario, tarea });
    res.json({
        ok: true,
        notificaciones
    });
}   

const deleteNotificacionesProyectoTarea = async (req, res) => {
    const { proyecto, tarea } = req.params;
    const notificaciones = await Notificacion.deleteMany({ proyecto, tarea });
    res.json({
        ok: true,
        notificaciones
    });
}


module.exports = {
    getNotificaciones,
    getNotificacionesLeidas,
    getNotificacionesProyecto,
    getNotificacionesTarea,
    postNotificacion,
    putNotificacion,
    deleteNotificacion,
    deleteNotificacionesUsuario,
    deleteNotificacionesProyecto,
    deleteNotificacionesTarea,
    deleteNotificaciones,
    deleteNotificacionesUsuarioProyecto,
    deleteNotificacionesUsuarioTarea,
    deleteNotificacionesProyectoTarea,
    getNotificacionesUsuario
}