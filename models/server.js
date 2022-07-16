const express = require('express');
const { socketController } = require('../sockets/controller');
const pool = require('../database/configpg');

class Server {

    constructor() {
        this.app  = express();
        this.port = process.env.PORT;
        this.server = require('http').createServer( this.app );
        this.io     = require('socket.io')( this.server );

        this.paths = {
            usuarios:   '/api/users',
            sala:     '/api/salas',
            users_salas: '/api/userssalas'
        }

        // Conectar a base de datos
        this.conectarDB();

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();

        // Sockets
        this.sockets();
    }

    async conectarDB() {
        await pool;
    }

    middlewares() {
        this.app.use( express.json() );
        // Directorio Público
        this.app.use( express.static('public') );
    }

    routes() {
        //this.app.use( this.paths.sala, require('../routes/sala'));
        //this.app.use( this.paths.usuarios, require('../routes/usuarios'));
        //this.app.use( this.paths.users_salas, require('../routes/userssalas'));
        // Mis Rutas
        this.app.use( '/api/login', require('../routes/auth'));

    }
    sockets() {
        this.io.on('connection', ( socket ) => socketController(socket, this.io ) )
    }

    listen() {
        this.server.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port );
        });
    }

}

module.exports = Server;
