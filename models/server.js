const express = require('express');
const cors = require('cors');



class Server {
    conn = require('../database/config');
    constructor() {
        this.app = express();
        this.apiUsuarios = '/api/usuarios'; // aqui solo declaramos la ruta como variable.
        this.conn();
        // middlewares
        this.middlewares();
        // Rutas 
        this.routes();
        this.listen();
    }

    middlewares() {
        this.app.use(express.static('public'));
        this.app.use(cors());
        this.app.use(express.json());
    }


    routes() {
        this.app.use(this.apiUsuarios, require('../routes/routes'));
    }
    listen() {
        this.app.listen(process.env.PORT, () => {
            console.log(`Esta app esta corriendo en el puerto ${process.env.PORT}`);
        })
    }
}


module.exports = Server;