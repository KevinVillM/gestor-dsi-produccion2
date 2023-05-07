const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

const validarJWT = async(req, res, next) => {
    // x-token headers
    const token = req.header('x-token');
    if(!token){
        return res.status(401).json({
            msg: 'No hay token en la petición'
        });
    }
    try {
        const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY);


        // Leer el usuario que corresponde al uid
        const usuario = await Usuario.findById(uid);
        
        // Verificar si el uid tiene estado en true
        if(!usuario.estado){
            return res.status(401).json({
                msg: 'Token no válido - usuario con estado: false'
            });
        }

        
        if(!usuario){
            return res.status(401).json({
                msg: 'Token no válido - usuario no existe en DB'
            });
        }

        req.usuario = usuario;
        next();
    } catch (error) {
        console.log("Si atrapo el error"+ error);
        return res.status(401).json({
            msg: 'Token no válido'
        });
    }
}

module.exports = {
    validarJWT
}