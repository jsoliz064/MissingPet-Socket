const pool = require('../database/configpg');

const all=()=>{
    return new Promise((resolve,reject)=>{
        pool.query('SELECT * FROM mascotas', function (err, result) {
            if (err){
                reject(err);
            }else{
                resolve(result.rows);
            }
        });
    });
}

module.exports ={
    all
}