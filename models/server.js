const express = require('express');
require('dotenv').config();
class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        // Middlewares
        this.middlewares();



        // Rutas de mi aplicación
        this.routes();
    }

    middlewares(){
        // Directorio público
        this.app.use(express.static('public'));
    }

    routes(){
        this.app.get('/', (req, res) => {
            res.send('Hola Mundo');
        });
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', process.env.PORT);
        });
    }
}


module.exports = Server;