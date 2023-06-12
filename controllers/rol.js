const {response} = require('express');
const Rol = require('../models/rol');


const getAllRol = async (req, res = response) => {
    const roles = await Rol.find({estado: true});

    res.json({
        msg: 'get todos los roles - controlador',
        roles
    });
}



const getRol = async (req, res = response) => {
    const {id} = req.params;
    const {estado, ...resto} = await Rol.findById(id);

    if (!estado) {
        return res.status(400).json({
            msg: 'El rol no existe'
        });
    }
    res.json({
        msg: 'get un rol - controlador',
        resto
    });
    
}

const getRolporProyecto = async (req, res = response) => {
    const {id} = req.params;
    const roles = await Rol.find({estado: true, proyecto: id});

    res.json({
        msg: 'get roles por proyecto - controlador',
        roles
    });

}

const crearRol = async (req, res = response) => {
    const {_id, ...resto} = req.body;
    const rol = new Rol(resto);
    await rol.save();

    res.json({
        msg: 'Rol creado correctamente',
        rol
    });
    
}

const actualizarRol = async (req, res = response) => {
    const {id} = req.params;
    const {_id, ...resto} = req.body;
    const rol = await Rol.findByIdAndUpdate(id, resto);

    res.json({
        msg: 'Rol actualizado correctamente',
        rol
    });

}

const eliminarRol = async (req, res = response) => {
    const {id} = req.params;
    const rol = await Rol.findByIdAndUpdate(id, {estado: false});

    res.json({
        msg: 'Rol eliminado correctamente',
        rol
    });

}   

module.exports = {
    getAllRol,
    getRol,
    getRolporProyecto,
    crearRol,
    actualizarRol,
    eliminarRol
}
