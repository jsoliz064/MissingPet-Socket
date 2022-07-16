let socket=io();

let divfotos=document.getElementById("divfotos");
let padre=document.getElementById("padre");
let divfotoperdido=document.getElementById("divfotoperdido");

let perdidos=[];
let i=0;
let resultado=[];

socket.on('connect', () => {
   console.log('conectado')
   socket.emit('nuevo-post')
});

socket.on('post',()=>{
   console.log('nuevo post')
   divfotos.innerHTML="";
   socket.emit('perdidos',(callback)=>{
      console.log('perdidos',callback);
      perdidos=callback;
      let i=0;
      cargarfotoperdido(perdidos[i]);
   });
   socket.emit('reportados',(callback)=>{
      console.log('reportados',callback);
      cargarfotos(callback);
   })
});

socket.on('reporte',($mascota)=>{
   cargarfotoperdido($mascota[0]);
})

function siguiente(){
   clear();
   i++;
   if (i==perdidos.length){
      i=0;
   }
   cargarfotoperdido(perdidos[i]);
}

function cargarfotoperdido($foto){
   divfotoperdido.innerHTML="";
   var div = document.createElement("div");
   div.innerHTML=`<div class="card-body">
                     <img class="card-img-top" src="http://localhost/swproyectofinal/public${$foto.url}" alt="Card image cap" style="width: 50%;">
                     <h3 class="card-title text-uppercase">
                           ${$foto.nombre}
                     </h3>
                     <p>raza: ${$foto.raza} </p>
                     <button onclick="enviarResultado()" class="btn btn-primary">Enviar resultado</button>
                  </div>`;
   div.setAttribute('class',"card text-center");
   divfotoperdido.appendChild(div);
}

function cargarfotos(array) {
   for (let i = 0; i <array.length; i++) {
      var div = document.createElement("div");
      div.innerHTML=`<div class="card text-center">
                        <div class="card-body">
                           <img class="card-img-top" src="http://localhost/swproyectofinal/public${array[i].url}" alt="Card image cap" style="width: 80%;">
                           <h4 class="card-title text-uppercase">
                           ${array[i].nombre}
                           </h4>
                           <p>raza: ${array[i].raza}</p>
                        </div>
                     </div>`;
      div.setAttribute('class',"col-md-2");
      div.setAttribute("id",array[i].id);
      div.addEventListener("click",function(){cargar(array[i])});
      divfotos.appendChild(div);
   }
}

function cargar(elemento){
   let pos = resultado.indexOf(elemento);
   if (pos !== -1){
      document.getElementById(elemento.id).style.border="none";
      resultado.splice(pos, 1)
   }else{
      document.getElementById(elemento.id).style.border="3px red solid";
      resultado.push(elemento);
   }
}

function enviarResultado(){
   if (resultado.length>0){
      socket.emit('resultado',perdidos[i],resultado);
      siguiente();
   }
}

function clear(){
   for (var i = 0; i <resultado.length; i++){
      document.getElementById(resultado[i].id).style.border="none"
   }
   resultado=[];
}