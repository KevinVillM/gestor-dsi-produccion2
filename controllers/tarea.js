const {response} = require('express');
const Tarea = require('../models/tarea');

const getTareas = async (req, res = response) => {
    const tareas = await Tarea.find({estado: true}).populate('asignados', 'nombre -_id').populate('proyecto', 'nombre');
    //Cambiar el formato de la fecha de creacion y de finalizacion de cada tarea
    tareas.forEach(tarea => {
        const fechaCreacion = new Date(tarea.create_date);
        const fechaFinalizacion = new Date(tarea.ending_date);
        const diaCreacion = fechaCreacion.getDate();
        const mesCreacion = fechaCreacion.getMonth() + 1;
        const anioCreacion = fechaCreacion.getFullYear();
        const diaFinalizacion = fechaFinalizacion.getDate();
        const mesFinalizacion = fechaFinalizacion.getMonth() + 1;
        const anioFinalizacion = fechaFinalizacion.getFullYear();
        const fechaCreacionFormateada = `${diaCreacion}/${mesCreacion}/${anioCreacion}`;
        const fechaFinalizacionFormateada = `${diaFinalizacion}/${mesFinalizacion}/${anioFinalizacion}`;
        tarea.create_date = fechaCreacionFormateada;
        tarea.ending_date = fechaFinalizacionFormateada;
    });
    const numeroTareas = await Tarea.countDocuments({estado: true});
    res.json({
        msg: `Tareas obtenidas ${numeroTareas}`,
        tareas
    });
}

const getUnaTarea = async (req, res = response) => {
    const {id} = req.params;
    const {estado, nombre, descripcion, create_date, ending_date, asignados, proyecto, estado_Tarea} = await Tarea.findById(id);

    //cambiar el formato de la fecha de creacion y de finalizacion
    const fechaCreacion = new Date(create_date);
    const fechaFinalizacion = new Date(ending_date);
    const diaCreacion = fechaCreacion.getDate();
    const mesCreacion = fechaCreacion.getMonth() + 1;
    const anioCreacion = fechaCreacion.getFullYear();
    const diaFinalizacion = fechaFinalizacion.getDate();
    const mesFinalizacion = fechaFinalizacion.getMonth() + 1;
    const anioFinalizacion = fechaFinalizacion.getFullYear();
    const fechaCreacionFormateada = `${diaCreacion}/${mesCreacion}/${anioCreacion}`;
    const fechaFinalizacionFormateada = `${diaFinalizacion}/${mesFinalizacion}/${anioFinalizacion}`;


    if (!estado) {
        return res.status(400).json({
            msg: 'La tarea no existe'
        });
    }
    res.json({
        nombre,
        descripcion,
        fechaCreacionFormateada,
        fechaFinalizacionFormateada,
        asignados,
        proyecto,
        estado_Tarea
    });
}

const getTareasPorProyecto = async (req, res = response) => {
    const {id} = req.params;
    const tareas = await Tarea.find({estado: true, proyecto: id}).populate('asignados', 'nombre _id').populate('proyecto', 'nombre');
    const numeroTareas = await Tarea.countDocuments({estado: true, proyecto: id});
    tareas.forEach(tarea => {
        const fechaCreacion = new Date(tarea.create_date);
        const fechaFinalizacion = new Date(tarea.ending_date);
        const diaCreacion = fechaCreacion.getDate();
        const mesCreacion = fechaCreacion.getMonth() + 1;
        const anioCreacion = fechaCreacion.getFullYear();
        const diaFinalizacion = fechaFinalizacion.getDate();
        const mesFinalizacion = fechaFinalizacion.getMonth() + 1;
        const anioFinalizacion = fechaFinalizacion.getFullYear();
        const fechaCreacionFormateada = `${diaCreacion}/${mesCreacion}/${anioCreacion}`;
        const fechaFinalizacionFormateada = `${diaFinalizacion}/${mesFinalizacion}/${anioFinalizacion}`;
        tarea.create_date = fechaCreacionFormateada;
        tarea.ending_date = fechaFinalizacionFormateada;
        console.log(fechaCreacionFormateada);
    });
    res.json({
        msg: `Tareas obtenidas ${numeroTareas}`,
        tareas
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
    eliminarTarea,
    getTareasPorProyecto
}
