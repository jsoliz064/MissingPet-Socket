const fotos=require('../controllers/fotos');
const mascotas=require('../controllers/mascotas');
const resultados=require('../controllers/resultados');

const socketController = async( socket = new Socket(), io ) => {

    socket.on('nuevo-post',()=>{
        socket.broadcast.emit('post');
    })

    socket.on('perdidos',(callback)=>{
        fotos.perdidos()
        .then(result=>callback(result))
        .catch(err=>callback(err))
    });
    socket.on('reportados',(callback)=>{
        fotos.reportados()
        .then(result=>callback(result))
        .catch(err=>callback(err))
    });

    socket.on('resultado',(perdido,resultado)=>{
        for(var i=0;i<resultado.length;i++){
            const res=resultado[i];
            resultados.crear(perdido.id,res.id)
            .then(result=>{
                socket.to(perdido.user_token).emit('resultados')
                socket.to(res.user_token).emit('resultados')
            })
            .catch(err=>console.log(err))
        }
    });

    socket.on('getmascotas',(callback)=>{
        mascotas.all()
        .then(result=>socket.broadcast.emit('mascotas', result))
        .catch(err=>callback(err))
    })

    socket.on('report',(id)=>{
        fotos.get(id)
        .then(result=>socket.broadcast.emit('reporte',result))
        .catch(err=>console.error(err))
    })



}

module.exports = {
    socketController
}

