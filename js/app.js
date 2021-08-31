window.onload = function()
{
    btnRegistrar = document.getElementById("btnRegistrar");
    ingreso = document.getElementById("ingreso");
    registro = document.getElementById("registro");
    txtCorreo = document.getElementById("correoR");
    txtNombre = document.getElementById("nombreR");
    txtContrasena = document.getElementById("contrasenaR");
    txtConfirmacion = document.getElementById("confirmacionR");
    txtFecha = document.getElementById("fechaR");
    btnRegistro = document.getElementById("btnRegistro");
    correo = document.getElementById('correo');
    contrasena=document.getElementById('contrasena');
    principal = document.getElementById("principal");
    nombreP = document.getElementById("nombreP");
    correoM= document.getElementById("correoM");
    mensajeM=document.getElementById("mensajeM");
    enMensa = document.getElementById("enMensa");
    redactar=document.getElementById("redactar");
    photo = document.getElementById("photo");
    camara = document.getElementById("camara");
    localStorage.setItem("login", 1);
    localStorage.setItem("nombre", "Mauricio");
    localStorage.setItem("correo", "mau@gmail.com");

    if(localStorage.getItem("login") !=="1"){
        ingreso.style.display = "block";
        principal.style.display="none";
        redactar.style.display="none";
        document.getElementById("camara").style.display="none";
    }else{
        ingreso.style.display = "none";
        principal.style.display="block";
        redactar.style.display="block";
        nombre = localStorage.getItem("nombre");
        correo = localStorage.getItem("correo");
        document.getElementById("nombreP").innerHTML = nombre;
        leerM();
    }

}
btnRegistrar.addEventListener("click", function() 
{
    ingreso.style.display = "none";
    registro.style.display = "block";
});
btnRegistro.addEventListener("click", function() 
{
    if(txtCorreo.value ==""){
        alert("El correo no puede quedar vacio");
        txtCorreo.classList.add("errorCampo");
        return false;
    }
    else{
        txtCorreo.classList.remove("errorCampo");
    }

    if(txtNombre.value ==""){
        alert("Nombre vacio");
        txtNombre.classList.add("errorCampo");
        return false;
    }
    else{
        txtNombre.classList.remove("errorCampo");
    }

    if( txtContrasena.value==""){
        alert("Contraseña vacia");
        txtContrasena.classList.add("errorCampo");
        return false;
    }
    else{
        txtContrasena.classList.remove("errorCampo");
    }

    if(txtConfirmacion.value==""){
        alert("Confirmacion vacia");
        txtConfirmacion.classList.add("errorCampo");
        return false;
    }
    else{
        txtConfirmacion.classList.remove("errorCampo");
    }

    if(txtFecha.value==""){
        alert("la fecha no puede quedar vacia");
        txtFecha.classList.add("errorCampo");
        return false;
    }
    else{
        txtFecha.classList.remove("errorCampo");
    }

    if(txtContrasena.value !== txtConfirmacion.value){
    alert("Las contraseñas no coinciden");
    return false;
    }
    let datos =new FormData();
    datos.append("correoR", txtCorreo.value);
    datos.append("nombreR", txtNombre.value);
    datos.append("contrasenaR", txtContrasena.value);
    datos.append("fechaR", txtFecha.value);

    fetch("http://motos.orgfree.com/registro.php" ,{
        method: 'POST',
        body: datos
    })
    .then(function(reponse){
        if(reponse.ok){
            alert("Usuario registrado");
        }else{
            alert("Ocurrio un error al registrarse")
            console.log(reponse);
        }
    })

    .catch(function(err){
        alert("Ocurrio un error")
        console.log(err)
    });
    
});
ingresar.addEventListener("click",function(){
    if(correo.value ==""){
        alert("El correo no puede quedar vacio");
        correo.classList.add("errorCampo");
        return false;
    }
    else{
        correo.classList.remove("errorCampo");
    }
    if(contrasena.value ==""){
        alert("El la contraseña no puede quedar vacio");
        contrasena.classList.add("errorCampo");
        return false;
    }
    else{
        contrasena.classList.remove("errorCampo");
    }
    let datos =new FormData();
    datos.append("correo", correo.value);
    datos.append("contrasena", contrasena.value);
    fetch("http://motos.orgfree.com/ingreso.php",{
        method: 'POST',
        body: datos
    })
    .then(function(response){
       return response.json();
    })
    .then(function(data){
        if(data.error == "contrasena"){
        alert("Contraseña incorrecta");
        }else{
            nombre =data.nombre;
            correo =data.correo;
            ingreso.style.display="none";
            principal.style.display="block";
            nombreP.innerHTML =nombre;
            localStorage.setItem("login", 1);
            localStorage.setItem("nombre", nombre);
            localStorage.setItem("correo", correo);
            leerM();
        }
    })
    .catch(function(err){
        alert("Ocurrio un error");
        console.log(err);
    });
});

function abrirBarra(){
document.getElementById("barraMenu").style.width="250px";
}
function cerrarBarra(){
document.getElementById("barraMenu").style.width="0";
}

enMensa.addEventListener("click", function(){
    if(correoM.value ==""){
        alert("Para quien va el mensaje no puede queda vacio");
        correoM.classList.add("errorCampo");
        return false;
    }
    else{
        correoM.classList.remove("errorCampo");
    }
    if(mensajeM.value ==""){
        alert("El mensaje no puede quedar vacio");
        mensajeM.classList.add("errorCampo");
        return false;
    }
    else{
        mensajeM.classList.remove("errorCampo");
    }
    let datos =new FormData();
    datos.append("correoM", correoM.value);
    datos.append("mensajeM", mensajeM.value);

    fetch("http://motos.orgfree.com/registrarMensaje.php",{
        method: 'POST',
        body: datos
    })
    .then(function(response){
        if(response.ok){
            alert("Mensaje enviado correctamente");
        }else{
            alert("Ocurrio un error al enviar el mensaje");
            console.log(response);
        }
    })
    .catch(function(err){
        alert("Ocurrio un error");
        console.log(err);
    });
});

function leerM(){
    let datosLM =new FormData();
    datosLM.append("correoUsuario", correo);

    fetch("http://motos.orgfree.com/leerMensajes.php",{
        method: 'POST',
        body: datosLM
    })

    .then(function(response){
       return response.json();
    })
    .then(function(data){
        for(let x=0; x < data.length; x++){
            document.getElementById("mensajes").innerHTML=
            document.getElementById("mensajes").innerHTML + data[x].mensaje + "<br>" 
            + data[x].fechahora + "<br>";

        }
    })

    .catch(function(err){
        alert("Ocurrio un error");
        console.log(err);
    });
}

function tomarFoto(){
    redactar.style.display="none";
    document.getElementById("mensajes").style.display="none";
    camara.style.display="block";
    cerrarBarra();
}

document.getElementById("open").addEventListener("click", function(){
    camera.click();
});

camera.addEventListener("change", function(e){
    ruta =URL.createObjectURL(e.target.files[0]);
        obtenerLugar();
        photo.src = ruta;
        if(obtenerSO()== "iOS"){
        let link = document.createElement('A');
        link.download = "test.png";
        // link.href = photo.toDataURL("image/png").replace("image/png", "image/octet-stream");
        link.href=ruta;
        link.click();
        alert("Foto Capturada");
        }



});

function cerrarSesion(){
    cerrarBarra();
    localStorage.removeItem("nombre");
    localStorage.removeItem("correo");
    localStorage.setItem("login", 0);

    redactar.style.display = "none";
    document.getElementById("principal").style.display = "none";
    document.getElementById("mensajes").style.display = "none";
    document.getElementById("camara").style.display = "none";
    document.getElementById("ingreso").style.display = "block";
}

function mensajes(){
    redactar.style.display= "block"
    document.getElementById("mensajes").style.display="block";
    document.getElementById("camara").style.display="none";
    cerrarBarra();
}
function obtenerSO(){
    let so = null;
    let platform= window.navigator.platform,
        iosPlatforms = ['iPhone', 'iPad', 'iPod'];
        if(iosPlatforms.includes(platform)){
            so= 'iOS';
        }
}
function obtenerLugar(){
coordenadas = {lat: 0, lon:0};
navigator.geolocation.getCurrentPosition(function(position){
    coordenadas ={lat: position.coords.latitude, lon:position.coords.longitude}
    fetch("https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=" + coordenadas.lat +"&lon="+ coordenadas.lon)
    .then(response=> response.json())
    .then(data=>{
        document.getElementById("lugar").value=data.address.country + "" + data.address.state;
    })
    .catch(error =>{
        console.log(error);
        coordenadas= {lat: 0, lon:0};
    });
});
}
mapa.addEventListener('click', function(){
window.open("http://openstreetmap.org/?mlat=" + coordenadas.lat + "&mlon=" + coordenadas.lon + "&zoom=20");
});

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('../sw.js').then( () => {
        console.log('Service Worker Registered')
      });
    });
  }
