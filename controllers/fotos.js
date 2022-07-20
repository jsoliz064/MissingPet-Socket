const pool = require('../database/configpg');

/* const perdidos=()=>{
    return new Promise((resolve,reject)=>{
        //pool.query('SELECT fotos.url, razas.nombre as raza,mascotas.nombre as nombre,mascotas.size, mascotas.mascota_estado as estado FROM fotos JOIN mascotas ON fotos.mascota_id=mascotas.id JOIN razas ON razas.id=mascotas.raza_id WHERE fotos.orden=0', function (err, result) {
        pool.query('SELECT posts.id, users.user_token, posts.updated_at, fotos.url, razas.nombre as raza,mascotas.nombre as nombre,mascotas.size, mascotas.mascota_estado as estado FROM posts JOIN mascotas ON mascotas.id=posts.mascota_id JOIN razas ON razas.id=mascotas.raza_id JOIN fotos ON fotos.mascota_id=mascotas.id JOIN users ON users.id=posts.user_id WHERE fotos.orden=0 AND posts.tipo=true ORDER BY posts.updated_at DESC', function (err, result) {
        
            if (err){
                reject(err);
            }else{
                resolve(result.rows);
            }
        });
    });
} */
const perdidos=()=>{
    return new Promise((resolve,reject)=>{
        pool.query('SELECT * FROM `posts` WHERE id=1', function (err, result) {
            if (err){
                reject(err);
            }else{
                console.log('hola',result);
                resolve(result);
            }
        });
    });
}

/* const reportados=()=>{
    return new Promise((resolve,reject)=>{
        //pool.query('SELECT fotos.url, razas.nombre as raza,mascotas.nombre as nombre,mascotas.size, mascotas.mascota_estado as estado FROM fotos JOIN mascotas ON fotos.mascota_id=mascotas.id JOIN razas ON razas.id=mascotas.raza_id WHERE fotos.orden=0', function (err, result) {
        pool.query('SELECT posts.id, users.user_token, fotos.url, razas.nombre as raza,mascotas.nombre as nombre,mascotas.size, mascotas.mascota_estado as estado FROM posts JOIN mascotas ON mascotas.id=posts.mascota_id JOIN razas ON razas.id=mascotas.raza_id JOIN fotos ON fotos.mascota_id=mascotas.id JOIN users ON users.id=posts.user_id WHERE fotos.orden=0 AND posts.tipo=false', function (err, result) {
        
            if (err){
                reject(err);
            }else{
                resolve(result.rows);
            }
        });
    });
} */
const reportados=()=>{
    return new Promise((resolve,reject)=>{
        //pool.query('SELECT fotos.url, razas.nombre as raza,mascotas.nombre as nombre,mascotas.size, mascotas.mascota_estado as estado FROM fotos JOIN mascotas ON fotos.mascota_id=mascotas.id JOIN razas ON razas.id=mascotas.raza_id WHERE fotos.orden=0', function (err, result) {
        pool.query('SELECT * FROM `posts` WHERE id=1', function (err, result) {
        
            if (err){
                reject(err);
            }else{
                resolve(result);
            }
        });
    });
}

const get=(id)=>{
    return new Promise((resolve,reject)=>{
        pool.query(`SELECT fotos.url, razas.nombre as raza,mascotas.nombre as nombre,mascotas.size, mascotas.mascota_estado as estado FROM fotos JOIN mascotas ON fotos.mascota_id=mascotas.id JOIN razas ON razas.id=mascotas.raza_id WHERE mascotas.id=${id}`, function (err, result) {
            if (err){
                reject(err);
            }else{
                resolve(result);
            }
        });
    });
}

const mascotasfoto=()=>{
    return new Promise((resolve,reject)=>{
        //pool.query('SELECT fotos.url, razas.nombre as raza,mascotas.nombre as nombre,mascotas.size, mascotas.mascota_estado as estado FROM fotos JOIN mascotas ON fotos.mascota_id=mascotas.id JOIN razas ON razas.id=mascotas.raza_id WHERE fotos.orden=0', function (err, result) {
        pool.query('SELECT fotos.id, fotos.url FROM fotos JOIN mascotas ON mascotas.id=fotos.mascota_id', function (err, result) {
            if (err){
                reject(err);
            }else{
                resolve(result.rows);
            }
        });
    });
}

module.exports ={
    perdidos,reportados,get,mascotasfoto
}