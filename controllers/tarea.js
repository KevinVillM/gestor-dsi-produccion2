const {response} = require('express');
const Tarea = require('../models/tarea');

const getTareas = async (req, res = response) => {
    const tareas = await Tarea.find({estado: true}).populate('asignados', 'nombre -_id').populate('proyecto', 'nombre');
    const numeroTareas = await Tarea.countDocuments({estado: true});
    res.json({
        msg: `Tareas obtenidas ${numeroTareas}`,
        tareas
    });
}

const getUnaTarea = async (req, res = response) => {
    const {id} = req.params;
    const {estado, nombre, descripcion, create_date, ending_date, asignados, proyecto, estado_Tarea} = await Tarea.findById(id);

    if (!estado) {
        return res.status(400).json({
            msg: 'La tarea no existe'
        });
    }
    res.json({
        nombre,
        descripcion,
        create_date,
        ending_date,
        asignados,
        proyecto,
        estado_Tarea
    });
}

const crearTarea = async (req, res = response) => {
    const {_id, ...resto} = req.body;
    //Populate el nombre del proyecto y el nombre del usuario
    const tarea =await new Tarea(resto);
    await tarea.save();
    res.json({
        msg: `Tarea ${tarea.nombre} creada`,
        
    });
}

const actualizarTarea = async (req, res = response) => {
    const {id} = req.params;
    const {nombre, descripcion, asignado, ending_date,create_date} = req.body;
    const tarea = await Tarea.findByIdAndUpdate(id, {nombre, descripcion, asignado, ending_date,create_date});
    res.json({
        tarea
    });
}

const eliminarTarea = async (req, res = response) => {
    const {id} = req.params;
    const tarea = await Tarea.findByIdAndUpdate(id, {estado: false});
    const numeroTareas = await Tarea.countDocuments({estado: true});
    res.json({
        msg: `Tarea ${tarea.nombre} eliminada, quedan ${numeroTareas} tareas`
    });
}   

module.exports = {
    getTareas,
    getUnaTarea,
    crearTarea,
    actualizarTarea,
    eliminarTarea
}
