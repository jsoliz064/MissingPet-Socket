const pool = require('../database/configpg');

const crear=(pk,fk)=>{
    return new Promise((resolve,reject)=>{
        pool.query(`INSERT INTO resultados (post_id_pk,post_id_fk) VALUES(${pk},${fk})`, function(err,result){
            if (err){
                reject(err);
            }else{
                resolve(result);
            }
        });
    });
}

module.exports ={
    crear,
}