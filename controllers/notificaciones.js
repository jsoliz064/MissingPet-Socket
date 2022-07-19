const pool = require('../database/configpg');


const crear=(payload)=>{
    console.log('creando notificacion')
    return new Promise((resolve,reject)=>{
            pool.query(`INSERT INTO notifications (user_id,post_id,tipo,estado) SELECT users.user_id,posts.post_id FROM users JOIN posts ON posts.user_id = users.user_id WHERE posts.post_token=${payload.postToken})`, function(err,result){
                if (err){
                    reject(err);
                }else{
                    resolve(payload);
                }
            });
        });
}

module.exports ={
    crear,
}