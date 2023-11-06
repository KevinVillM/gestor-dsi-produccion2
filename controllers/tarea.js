const {response} = require('express');
const Tarea = require('../models/tarea');
const {actualizarPorcentaje} = require('../controllers/proyecto');
const Notificacion = require('../models/notificacion');


const estadistica = async (req, res = response) => {
//devuelve la cantidad de tareas que tiene un proyecto en proceso, finalizado y no iniciado
    const {id} = req.params;
    const tareas = await Tarea.find({estado: true, proyecto: id}).populate('asignados', 'nombre _id');
    const cantidadTareas = tareas.length;
    const tareasEnProceso = await Tarea.find({estado: true, proyecto: id, estado_Tarea: 'En proceso'}).populate('asignados', 'nombre _id');
    const cantidadTareasEnProceso = tareasEnProceso.length;
    const tareasFinalizadas = await Tarea.find({estado: true, proyecto: id, estado_Tarea: 'Finalizado'}).populate('asignados', 'nombre _id');
    const cantidadTareasFinalizadas = tareasFinalizadas.length;
    const tareasPendientes = await Tarea.find({estado: true, proyecto: id, estado_Tarea: 'No iniciado'}).populate('asignados', 'nombre _id');
    const cantidadTareasPendientes = tareasPendientes.length;
    res.json({
        msg: 'get API - controlador',
        cantidadTareas,
        cantidadTareasEnProceso,
        cantidadTareasFinalizadas,
        cantidadTareasPendientes
    });
}


const getTareas = async (req, res = response) => {
    let tareas = await Tarea.find({estado: true}).populate('asignados', 'nombre -_id').populate('proyecto', 'nombre');
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

const getTareasPorProyecto = async (req, res = response) => {
    const {id} = req.params;
    const tareas = await Tarea.find({estado: true, proyecto: id}).populate('asignados', 'nombre _id img').populate('proyecto', 'nombre');
    const numeroTareas = await Tarea.countDocuments({estado: true, proyecto: id});
    res.json({
        msg: `Tareas obtenidas ${numeroTareas}`,
        tareas
    });
}

//Funcion que recibe una fecha en formato dd-mm-aaaa y la devuelve en formato date de mongo
const formatearFecha = (fecha) => {
    var partesFecha = fecha.split("/");
    var dia = partesFecha[0];
    var mes = partesFecha[1] - 1; // Restamos 1 al mes, ya que en JavaScript los meses van de 0 a 11
    var anio = partesFecha[2];
    var fecha = new Date(anio, mes, dia);
    console.log(fecha);
    return fecha;
}

const crearTarea = async (req, res = response) => {
    const {_id, ...resto} = req.body;

    const tarea =await new Tarea(resto);
    await tarea.save();


    try {
        actualizarPorcentaje(resto.proyecto);
    } catch (error) {
        console.log(error);
    }

    //Crear una notificacion para el asignado de la tarea

    try {
        const notificacion =await new Notificacion({titulo: `Nueva tarea asignada: ${resto.nombre}`, descripcion: resto.descripcion, fecha: resto.create_date, usuario: resto.asignados, proyecto: resto.proyecto, tarea: tarea._id});
        await notificacion.save();
    } catch (error) {
        console.log(error);
    }
  
    res.json({
        msg: `Tarea ${tarea.nombre} creada`,
        tarea
    });
}

const actualizarTarea = async (req, res = response) => {
    const {id} = req.params;
    const {nombre, descripcion, asignado, ending_date,create_date, estado_Tarea} = req.body;

    const tarea = await Tarea.findByIdAndUpdate(id, {nombre, descripcion, asignado, ending_date,create_date, estado_Tarea});

        //actualizar porcentaje de avance del proyecto
        try {
            actualizarPorcentaje(tarea.proyecto);
        } catch (error) {
            console.log("El metodo devulvio un:///////////////////"+error);
        }
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
    getTareasPorProyecto,
    estadistica
}
