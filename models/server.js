const express = require('express');
require('dotenv').config();
const { dbConnection } = require('../database/configDB');
const cors = require('cors');
const fileUpload = require('express-fileupload');


class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.path = {
            usuariosPath: '/api/usuarios',
            usuarioAuthPath: '/api/auth',
            proyestosPath: '/api/proyectos',
            tareasPath: '/api/tareas',
            uploadsPath: '/api/uploads',
            rolPath: '/api/rol',
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

                //Carga de archivos
                this.app.use(fileUpload({
                    useTempFiles : true,
                    tempFileDir : '/tmp/'
                }));

    }

    routes(){
        this.app.use(this.path.usuariosPath, require('../routes/usuario'));
        this.app.use(this.path.usuarioAuthPath, require('../routes/auth'));
        this.app.use(this.path.proyestosPath, require('../routes/proyectos'));
        this.app.use(this.path.tareasPath, require('../routes/tareas'));
        this.app.use(this.path.uploadsPath, require('../routes/uploads'));
        this.app.use(this.path.rolPath, require('../routes/rol'));
    }



    listen(){
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', process.env.PORT);
        });
    }
}


module.exports = Server;