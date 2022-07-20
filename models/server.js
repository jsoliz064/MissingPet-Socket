const express = require('express');
const cors = require('cors');
const { socketController } = require('../sockets/controller');

const flash = require('connect-flash');
const session = require('express-session');
const MySQLStore = require('express-mysql-session');
const passport = require('passport');
const { database } = require('../database/keys');
//MYSQL
const pool = require('../database/configpg');

class Server {

    constructor() {
        this.app  = express();
        this.port = process.env.PORT;
        this.server = require('http').createServer( this.app );
        this.io     = require('socket.io')( this.server );

        this.paths = {
            ia:   '/api/ia',
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
        this.app.use( cors() );

        // Lectura y parseo del body
        this.app.use( express.json() );

        // Directorio Público
        this.app.use( express.json() );
        // Directorio Público
        this.app.use( express.static('public') );

        this.app.use(session({
            secret: 'msm',
            resave: false,
            saveUninitialized: false,
            store: new MySQLStore(database)
          }));
        this.app.use(flash());
        this.app.use(passport.initialize());
        this.app.use(passport.session());
    }

    routes() {
        //this.app.use( this.paths.ia, require('../controllers/ia'));
        //this.app.use( this.paths.usuarios, require('../routes/usuarios'));
        //this.app.use( this.paths.users_salas, require('../routes/userssalas'));
        // Mis Rutas

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
