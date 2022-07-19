const fotos=require('../controllers/fotos');
const mascotas=require('../controllers/mascotas');
const resultados=require('../controllers/resultados');
const notificaciones=require('../controllers/notificaciones');

const socketController = async( socket = new Socket(), io ) => {

    if (socket.handshake.headers['x-token']){
        console.log('Cliente Autorizado Conectado',socket.handshake.headers['x-token']);
        const uid=socket.handshake.headers['x-token'];
        socket.join( uid );
    }else{
        console.log("no token")
        socket.disconnect();
    }

    socket.on('emitir',(token)=> {
        if (token){
            console.log(token);
            socket.to( token ).emit( 'usuario-conectado');
        }
    });

    
    socket.on('nuevo-post',(payload)=>{
        console.log("nuevo post");
        if (payload) {
            socket.to( payload.user_token ).emit('post',payload);
        }
    })

    socket.on('new-comment',(payload)=>{
        console.log("nuevo comentario");
        console.log(payload);
        if (payload){
            /* notificaciones.crear(payload)
            .then(result=>callback(result))
            .catch(err=>callback(err)) */
            socket.to( payload.user_token ).emit('new_notification',payload);
        }
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
    });
    
    socket.on('getmascotasfoto',(callback)=>{
        fotos.mascotasfoto()
        .then(result=>callback(result))
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

