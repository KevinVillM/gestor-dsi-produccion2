const Proyecto = require('../models/proyecto');
const Rol = require('../models/rol');
const Usuario = require('../models/usuario');
const Tarea = require('../models/tarea');


const esRolValido = async(rol) => {
    const existeRol = await Rol.findOne({rol})
    if(!existeRol){
        throw new Error(`El rol ${rol} no es valido`)
    }
}

    const emailExiste = async(email) => {
        const existeEmail = await Usuario.findOne({email});
        if(existeEmail){
            throw new Error(`El correo ${email} ya está registrado`)
        }
    }

    const emailNoExiste = async(email) => {
        const emailNoExiste = await Usuario.findOne({email});
        if(!email){
            throw new Error(`El correo ${email} no está registrado`)
        }
    }

const usuarioPorID = async(id) => {
    const existeUsuario = await Usuario.findById(id);
    if(!existeUsuario){
        throw new Error(`El usuario con ${id} no existe`)
    }
}

const proyectoPorID = async(id) => {
    const proyecto = await Proyecto.findById(id);
    if(!proyecto){
        throw new Error(`El proyecto con ${id} no existe`)
    }
}

const tareaPorID = async(id) => {
    const tarea = await Tarea.findById(id);
    if(!tarea){
        throw new Error(`La tarea con ${id} no existe`)
    }
}

const rolPorID = async(id) => {
    const rol = await Rol.findById(id);
    if(!rol){
        throw new Error(`El rol con ${id} no existe`)
    }
}

//validar si el rol ya existe
const rolExiste = async(rol) => {
    const existeRol = await Rol.findOne({rol});
    if(existeRol){
        throw new Error(`El rol ${rol} ya existe`)
    }
}

module.exports = {
    esRolValido,
    emailExiste,
    usuarioPorID,
    proyectoPorID,
    tareaPorID,
    emailNoExiste,
    rolPorID,
    rolExiste
}