const {response} = require('express');
const Tarea = require('../models/tarea');



//Cambiar el formato de date de mongo a formato dd/mm/aaaa
const cambiarFormatoFecha = (fecha) => {
    const fechaCreacion = new Date(fecha);
    const diaCreacion = fechaCreacion.getDate();
    const mesCreacion = fechaCreacion.getMonth(); // Restar 1 al mes
    const anioCreacion = fechaCreacion.getFullYear();
    const fechaCreacionFormateada = `${diaCreacion}/${mesCreacion + 1}/${anioCreacion}`; // Sumar 1 al mes al mostrarlo
    return fechaCreacionFormateada;
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

    //cambiar el formato de la fecha de creacion y de finalizacion
    const fechaCreacionFormateada = cambiarFormatoFecha(create_date);
    const fechaFinalizacionFormateada = cambiarFormatoFecha(ending_date);


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

    //validar formato de fecha dd/mm/aaaa verifica que cada parte este separada por /
    if (!resto.create_date.match(/^\d{1,2}\/\d{1,2}\/\d{4}$/) || !resto.ending_date.match(/^\d{1,2}\/\d{1,2}\/\d{4}$/)) {
        return res.status(400).json({
            msg: 'El formato de la fecha de creacion no es correcto'
        });
    }

    //Formatear la fecha de creacion y de finalizacion
    const fechaCreacion = formatearFecha(resto.create_date);
    const fechaFinalizacion = formatearFecha(resto.ending_date);
    resto.create_date = fechaCreacion;
    resto.ending_date = fechaFinalizacion;

    const tarea =await new Tarea(resto);
    await tarea.save();
    res.json({
        msg: `Tarea ${tarea.nombre} creada`,
        tarea
    });
}

const actualizarTarea = async (req, res = response) => {
    const {id} = req.params;
    const {nombre, descripcion, asignado, ending_date,create_date} = req.body;


        //validar formato de fecha dd/mm/aaaa verifica que cada parte este separada por /
        if (!resto.create_date.match(/^\d{1,2}\/\d{1,2}\/\d{4}$/) || !resto.ending_date.match(/^\d{1,2}\/\d{1,2}\/\d{4}$/)) {
            return res.status(400).json({
                msg: 'El formato de la fecha de creacion no es correcto'
            });
        }

    //Formatear la fecha de creacion y de finalizacion
    const fechaCreacion = formatearFecha(create_date);
    const fechaFinalizacion = formatearFecha(ending_date);
    create_date = fechaCreacion;
    ending_date = fechaFinalizacion;
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
