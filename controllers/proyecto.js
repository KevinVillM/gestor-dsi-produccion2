const {response} = require('express');
const Proyecto = require('../models/proyecto');

const getProyectos = async (req, res = response) => {
    const proyectos = await Proyecto.find({estado: true}).populate('colaboradores', 'nombre -_id');
    res.json({
        msg: 'get API - controlador',
        proyectos
    });
}

const getUnProyecto = async (req, res = response) => {
    const {id} = req.params;
    const {nombre,descripcion, create_date, ending_date, colaboradores, estado} = await Proyecto.findById(id).populate('colaboradores', 'nombre -_id');

    if (!estado) {
        return res.status(400).json({
            msg: 'El proyecto no existe'
        });
    }
    res.json({
        msg: 'get API - controlador',
        nombre,
        descripcion,
        create_date,
        ending_date,
        colaboradores
    });
}

const crearProyecto = async (req, res = response) => {
    const {_id, ...resto} = req.body;
    const proyecto = new Proyecto(resto).populate('colaboradores', 'nombre');
    await proyecto.save();
    res.json({
        msg: 'post API - controlador',
        proyecto
    });
}

const actualizarProyecto = async (req, res = response) => {
    const {id} = req.params;
    const {nombre, descripcion, colaboradores, ending_date,create_date} = req.body;
    const proyecto = await Proyecto.findByIdAndUpdate(id, {nombre, descripcion, colaboradores, ending_date,create_date});
    res.json({
        msg: 'put API - controlador',
        proyecto
    });
}

const eliminarProyecto = async (req, res = response) => {
    const {id} = req.params;
    const proyecto = await Proyecto.findByIdAndUpdate(id, {estado: false});
    res.json({
        msg: 'delete API - controlador',
        proyecto
    });
}

module.exports = {
    getProyectos,
    getUnProyecto,
    crearProyecto,
    actualizarProyecto,
    eliminarProyecto
}