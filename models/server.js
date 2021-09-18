const express = require('express');

class Server {
    constructor() {
        this.app = express();
        this.routes();
        this.listen();
    }

    routes() {
        this.app.get('/', (req, res) => {
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