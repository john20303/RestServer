const express = require('express');

class Server {
    constructor() {
        this.app = express();
        // middlewares
        this.middlewares();
        // Rutas 
        this.routes();
        this.listen();
    }

    middlewares() {
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.get('/api', (req, res) => {
            res.send('Hola, estamos en el server.js ;)');
        })
    }

    listen() {
        this.app.listen(process.env.PORT, () => {
            console.log(`Esta app esta corriendo en el puerto ${process.env.PORT}`);
        })
    }
}


module.exports = Server;