const express = require('express');
require('dotenv').config();
const { dbConnection } = require('../database/configDB');
const cors = require('cors');


class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.path = {
            usuariosPath: '/api/usuarios',
            usuarioAuthPath: '/api/auth',
            proyestosPath: '/api/proyectos'
        }

        // Conectar a base de datos
        this.conectarDB();

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();
    }

    async conectarDB(){
        await dbConnection();
    }

    middlewares(){
        // Cors
        this.app.use(cors());

        // Lectura y parseo del body
        this.app.use(express.json());

        // Directorio público
        this.app.use(express.static('public'));

    }

    routes(){
        this.app.use(this.path.usuariosPath, require('../routes/usuario'));
        this.app.use(this.path.usuarioAuthPath, require('../routes/auth'));
        this.app.use(this.path.proyestosPath, require('../routes/proyectos'));
    }



    listen(){
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', process.env.PORT);
        });
    }
}


module.exports = Server;