const {Pool}  = require('pg')
const { database } = require('./keys');
const pool = new Pool(database)

pool.connect((err, client)=>{
    if (err) {
        console.error(err);
    }
    if (client) client.release()
    console.log('DB esta conectada')
    return;
})

module.exports=pool;


/* const mysql = require('mysql');
//para las promesas
const { promisify } = require('util');

const { database } = require('./keys');

const pool = mysql.createPool(database);

pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Database connection fue cerrada.');
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('Database has to many connections');
        }
        //fue rechazada
        if (err.code === 'ECONNREFUSED') {
            console.error('Database connection fue rechazada');
        }
    }

    if (connection) connection.release();
    console.log('DB esta conectada');

    return;
});

// Promisify Pool Querys
pool.query = promisify(pool.query);

module.exports = pool; */