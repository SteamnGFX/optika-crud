/* global Swal */

$(window).on("load", function () {
    setTimeout(function () {
        $(".spinner-wrapper").fadeOut("slow");
    }, 500);
});

//Usuarios
let users = [];
let token = 0;

function login() {
//Carga los datos del la BD
    let user = document.getElementById('txtUser').value;
    let pass = document.getElementById('txtPass').value;
    fetch("api/login/access?user=" + user + "&pass=" + pass)
            .then(response => {
                return response.json();
            })
            .then(function (jsondata) {
                users = jsondata;

                let mensaje = users.error;


                if (mensaje === "Usuario/contraseña no son válidos!") {
                    document.getElementById("passMsg").innerHTML = "Usuario o Contraseña Incorrecta";
                    document.getElementById("passMsg").classList.add("txtError");
                } else {
                    let valUser = users[0].usuario.nombre;
                    let valPass = users[0].usuario.contrasenia;
                    if (user === valUser) {
                        if (pass === valPass) {

                            document.getElementById("passMsg").innerHTML = "";
                            let usuarioLogeado = users[0].persona.nombre + " " + users[0].usuario.rol;
                            token = getRandomInt(99999999999999999);
                            sessionStorage.setItem("userID", usuarioLogeado);
                            sessionStorage.setItem("userToken", token);
                            window.location.href = "modulos/home.html";
                        }
                    } else {
                        document.getElementById("passMsg").innerHTML = "Usuario o Contraseña Incorrecta";
                        document.getElementById("passMsg").classList.add("txtError");
                    }
                }


            }
            );
}


function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}


let tryLogin = sessionStorage.getItem("tryLogin");
if (tryLogin !== null) {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
        }
    });

    Toast.fire({
        icon: 'error',
        title: 'Tienes que identificarte para acceder al módulo!'
    });
    //Elimina el caché
    sessionStorage.removeItem("tryLogin");
}

var inputUser = document.getElementById("txtUser");
var inputPass = document.getElementById("txtPass");

inputUser.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        //Si ya tiene una contraseña entones va directamente a iniciar sesión
        if (document.getElementById('txtPass').value !== "") {
            login();
        } else {
            //Si no cambia el focus a la contraseña con enter
            document.getElementById("txtPass").focus();
        }
    }

});
//Metodo para pasar de contraseña a iniciar sesión con enter
inputPass.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        login();
    }
});




$(document).ready(function () {
                
    //Verifica si el check de mostrar la contraseña está activado
    $('#checkPass').change(function () {
        //Si está activado
        if ($(this).prop('checked')) {
            //Muestra la contraseña
            document.getElementById('txtPass').setAttribute("type", "text");
        } else {
            //Si está desactivado
            //Oculta la contraseña
            document.getElementById('txtPass').setAttribute("type", "password");
        }
    });
    //Verifica si el check de guardar credenciales está activado
    $('#checkSaveUser').change(function () {
        //Si está activado
        if ($(this).prop('checked')) {
            //Guarda el que está activado y guarda en el caché de session
            sessionStorage.setItem("saveData", true);

            //Guarda sus credenciales en el caché de session
            sessionStorage.setItem("saveUser", document.getElementById('txtUser').value);
            sessionStorage.setItem("savePass", document.getElementById('txtPass').value);

        } else {
            //Si no está activado borra sus credenciales
            sessionStorage.removeItem("saveData");
            sessionStorage.removeItem("saveUser");
            sessionStorage.removeItem("savePass");

        }
    });
    
    //Si está el check de guardar en el caché activado
    if (sessionStorage.getItem("saveData") === "true") {
        //Activa el check
        document.getElementById('checkSaveUser').checked = true;

        //Recupera la contraseña y usuario guardado en el caché de session
        document.getElementById('txtUser').value = sessionStorage.getItem("saveUser");
        document.getElementById('txtPass').value = sessionStorage.getItem("savePass");
    } else {
        //Si no, borra sus credenciales
        sessionStorage.removeItem("saveData");
        sessionStorage.removeItem("saveUser");
        sessionStorage.removeItem("savePass");
    }
    
    $('#txtUser').change(function(){
        document.getElementById('checkSaveUser').checked = false;
        //Si no, borra sus credenciales
        sessionStorage.removeItem("saveData");
        sessionStorage.removeItem("saveUser");
        sessionStorage.removeItem("savePass");
    });
});


