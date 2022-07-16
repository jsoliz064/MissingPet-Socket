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

