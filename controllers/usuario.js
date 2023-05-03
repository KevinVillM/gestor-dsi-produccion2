const { response } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');


const usuariosGet = async (req, res = response) => {

    const usuarios = await Usuario.find({estado: true});

    res.json({
        msg: 'get API - controlador',
        usuarios
    });
}

const usuarioUnoGet = async (req, res = response) => {
    const {id} = req.params;
    const usuario = await Usuario.findById(id);
    res.json({
        msg: 'get API - controlador',
        usuario
    });
}

const usuariosPut = async(req, res = response) => {

    const id = req.params.id; 
    const {_id, password, email, google,...resto} = req.body;

    // TODO validar contra base de datos
    if(password){
        // Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);


    res.json({
        msg: 'put API - controlador',
        usuario
    });
}

const usuariosPost = async (req, res = response) => {
    const {google, ...allData} = req.body;
    const usuario = new Usuario(allData);

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();

    usuario.password = bcryptjs.hashSync(usuario.password, salt);

    await usuario.save();
    
    res.json({
        msg: 'post API - controlador',
        usuario
    });
}

const usuariosDelete = async(req, res = response) => {

    const {id} = req.params;
    const usuario = await Usuario.findByIdAndUpdate(id, {estado: false});

    const usuarioAutenticado = req.usuario;

    res.json({
        msg: 'delete API - controlador',
        usuario
    });
}




module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuarioUnoGet
}