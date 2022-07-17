let socket=io( {
    extraHeaders: {
        'x-token': "2"
    }
 });
let selectmascotas=document.getElementById("selectmascotas");

socket.on('connect', () => {
    console.log('conectado')
    socket.emit('getmascotas',(callback)=>{
        cargarmascotas(callback);
     })
 });

function cargarmascotas(mascotas){
    console.log(mascotas);
    for(var i=0; i< mascotas.length;i++){
        const html=`<option value="${mascotas[i].id}">${mascotas[i].nombre}</option>`;
        selectmascotas.innerHTML =selectmascotas.innerHTML+html;
    }
}

function reportar(){
    const mascota_id=selectmascotas.options[selectmascotas.selectedIndex].value;
    const id=parseInt(mascota_id);
    socket.emit('report',(id));
}

function emitir(){
    const token=document.getElementById('intoken').value;
    socket.emit('emitir',token);
    console.log(token);
}