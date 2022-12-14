/* global Swal */
   let getUser = sessionStorage.getItem("userID");

$(window).on("load", function () {
    setTimeout(function () {
        $(".spinner-wrapper").fadeOut("slow");
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



        let token = sessionStorage.getItem("userToken");
        if (token === null) {
            Toast.fire({
                icon: 'error',
                title: 'Tienes que identificarte!'
            });
            let tryLogin = 0;
            tryLogin++;
            intento = sessionStorage.setItem("tryLogin", tryLogin);
            window.location.href = "../index.html";

        } else {
            sessionStorage.getItem("userID");
        }

        Toast.fire({
            icon: 'success',
            title: 'Bienvenido ' + getUser + '!'
        });
    }, 500);
});



function cerrarSesion() {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    });

    swalWithBootstrapButtons.fire({
        title: '¿Estás seguro de cerrar sesión?',
        text: "",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, cerrar!',
        cancelButtonText: 'No, cancelar!',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            swalWithBootstrapButtons.fire(
                    'Cerrando Sesión!'
                    );
            sessionStorage.removeItem("userID");
            sessionStorage.removeItem("userToken");
            window.location.href = "../index.html";
        } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
                ) {
            swalWithBootstrapButtons.fire(
                    'Cancelado',
                    'Tu sesión se mantuvo abierta!.',
                    );
        }
    });
}


if (sessionStorage.getItem("userID") === getUser) {

    user = '<img src="../recursos/menu/user.png" style="height: 1.5em; margin-right: .5em;">' + getUser;
    document.getElementById("loggin-id").innerHTML = user;
    
} else {
    tryLogin = 1;
    intento = sessionStorage.setItem("tryLogin", tryLogin);
    window.location.href = "../index.html";
}
