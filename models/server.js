const express = require('express');
const cors = require('cors');


class Server {
    conn = require('../database/config');

    constructor() {
        this.app = express();

        //Endpoints
        this.apiUsuarios = '/api/usuarios'; // aqui solo declaramos la ruta como variable.
        this.auth = '/api/auth'; // este es nuestro endpoint del login!
        this.apiCategorias = '/api/categoria'; //Esta es la api de categorias
        this.conn();


        // Middlewares
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
        this.app.use(this.auth, require('../routes/auth'));
        this.app.use(this.apiUsuarios, require('../routes/usuario'));
        this.app.use(this.apiCategorias, require('../routes/categorias'));
    }

    listen() {
        this.app.listen(process.env.PORT, () => {
            console.log(`Esta app esta corriendo en el puerto ${process.env.PORT}`);
        })
    }
}


module.exports = Server;
