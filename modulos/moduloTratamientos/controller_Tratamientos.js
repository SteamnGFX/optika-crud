let indextratamientoSeleccionado;
let tratamientos = [];
let indiceAnterior = 0;
cargarModuloCatalogoTratamiento();

function hideLoader() {
    $('#loading').hide();
    Swal.fire({
        position: 'top-center',
        title: "<span class='loader'></span>",
        showConfirmButton: false,
        timer: 1500,
        background: 'transparent'
    });
}
$(window).ready(hideLoader);


export function cargarModuloCatalogoTratamiento() {
    document.getElementById('btnCatalogo').classList.remove("btn-light");
    document.getElementById('btnCatalogo').classList.add("btn-primary");
    document.getElementById('btnAgregar').classList.remove("btn-primary");
    document.getElementById('btnAgregar').classList.add("btn-light");
    document.getElementById('btnModificar').classList.remove("btn-primary");
    document.getElementById('btnModificar').classList.add("btn-light");
    document.getElementById('btnAgregar').classList.remove("disabled");
    document.getElementById('btnModificar').classList.add("disabled");
    document.getElementById('btnEliminar').classList.add("disabled");
    indextratamientoSeleccionado = 0;
    indiceAnterior = 0;
    
    fetch("moduloTratamientos/moduloRegistroTratamiento/view_CatalogoTratamiento.html")
            .then(
                    function (response) {
                        return response.text();
                    }
            )
            .then(
                    function (html) {
                        document.getElementById("contenedor-modulo").innerHTML = html;
                        loadTabla();
                        var $rows = $('#tblTratamientos tr');
                        $('#txtBuscarTratamiento').keyup(function () {
                            var val = $.trim($(this).val()).replace(/ +/g, ' ').toLowerCase();
                            $rows.show().filter(function () {
                                var text = $(this).text().replace(/\s+/g, ' ').toLowerCase();
                                return !~text.indexOf(val);
                            }).hide();
                        });
                        $(document).ready(function () {
                            $('#tblTratamientoHead').DataTable({
                                searching: false,
                                retrieve: true,
                                toggleable: true,
                                info: false,
                                language: {
                                    "decimal": "",
                                    "emptyTable": "No hay datos que mostrar",
                                    "info": "Mostrando <b>_START_ </b>de <b>_END_</b> de total de <b> _TOTAL_</b> entradas",
                                    "infoEmpty": "Mostrado 0 de 0 a 0 entradas",
                                    "infoFiltered": "(filtered from _MAX_ total entries)",
                                    "infoPostFix": "",
                                    "thousands": ",",
                                    "lengthMenu": "Mostrando _MENU_ entradas",
                                    "loadingRecords": "Cargando...",
                                    "processing": "",
                                    "search": "Buscar:",
                                    "zeroRecords": "No se encontraron coincidencias",
                                    "paginate": {
                                        "first": "Primera",
                                        "last": "Ultima",
                                        "next": "Siguiente",
                                        "previous": "Anterior"
                                    },
                                    "aria": {
                                        "sortAscending": ":Activar para ordenar columna ascendente",
                                        "sortDescending": ": Activar para ordenar la columna descendente"
                                    }
                                }

                            });
                        });
                    }
            );
}



export function cargarModuloRegistroTratamiento() {
    document.getElementById('btnCatalogo').classList.remove("btn-primary");
    document.getElementById('btnCatalogo').classList.add("btn-light");
    document.getElementById('btnAgregar').classList.remove("btn-light");
    document.getElementById('btnAgregar').classList.add("btn-primary");
    document.getElementById('btnModificar').classList.remove("btn-primary");
    document.getElementById('btnModificar').classList.add("btn-light");

    fetch("moduloTratamientos/moduloRegistroTratamiento/view_RegistroTratamiento.html")
            .then(
                    function (response) {
                        return response.text();
                    }
            )
            .then(
                    function (html) {
                        document.getElementById("contenedor-modulo").innerHTML = html;

                    }
            );
}

export function cargarModuloModificarTratamiento() {
    document.getElementById('btnCatalogo').classList.remove("btn-primary");
    document.getElementById('btnCatalogo').classList.add("btn-light");
    document.getElementById('btnModificar').classList.remove("btn-light");
    document.getElementById('btnModificar').classList.add("btn-primary");
    fetch("moduloTratamientos/moduloRegistroTratamiento/view_ModificarTratamiento.html")
            .then(
                    function (response) {
                        return response.text();
                    }
            )
            .then(
                    function (html) {
                        document.getElementById("contenedor-modulo").innerHTML = html;
                        leerDatos();
                    }
            );
}

export function boton() {
    document.getElementById("btnAgregar").classList.remove("disabled");
    document.getElementById("btnModificar").classList.add("disabled");
    document.getElementById("btnEliminar").classList.add("disabled");

}

export function getRandomInt(max) {
    return Math.floor(Math.random() * max);


}



export function addTratamiento() {
    Swal.fire({
        title: 'Estás seguro de guardar los cambios?',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: 'Guardar',
        denyButtonText: `No Guardar`,
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            Swal.fire('Saved!', '', 'success')
            let  nombre,
                    precio_c,
                    precio_v,
                    precio_cObtenido,
                    precio_vObtenido;



            nombre = document.getElementById("txtNombre").value;
            precio_cObtenido = document.getElementById("txtPrecioC").value;
            precio_vObtenido = document.getElementById("txtPrecioV").value;

            precio_c = "$" + precio_cObtenido;
            precio_v = "$" + precio_vObtenido;

            if (nombre === "" && precio_cObtenido === "" && precio_vObtenido === "") {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'No puedes tener los campos vacíos!',
                    showConfirmButton: false,
                    timer: 1500
                })

            } else {
                //form.submit();
                let tratamiento = {};

                tratamiento.nombre = nombre;
                tratamiento.precio_c = precio_c;
                tratamiento.precio_v = precio_v;


                tratamiento.estatus = "Activo";
                tratamientos.push(tratamiento);
                clean();
                notificacionAñadir();
            }

        } else if (result.isDenied) {
            Swal.fire('Los cambios no se guardaron', '', 'info')
        }
    })



}

export function loadTabla() {
    let cuerpo = "";
    tratamientos.forEach(function (tratamiento) {
        let registro =
                '<tr id="' + tratamientos.indexOf(tratamiento) + '"class="" onclick="moduloTratamiento.selectTratamiento(' + tratamientos.indexOf(tratamiento) + ');">' +
                '<td>' + tratamiento.nombre + '</td>' +
                '<td>' + tratamiento.precio_c + '</td>' +
                '<td>' + tratamiento.precio_v + '</td>' +
                '<td>' + tratamiento.estatus + '</td></tr>';
        cuerpo += registro;
    });
    document.getElementById("tblTratamientos").innerHTML = cuerpo;
    document.getElementById(0).classList.add("d-none");
}


let txtNombre;
let txtPrecioC;
let txtPrecioV;
let txtEstatus;

export function selectTratamiento(index) {

    document.getElementById("btnModificar").classList.remove("disabled");
    document.getElementById("btnEliminar").classList.remove("disabled");
    document.getElementById("btnAgregar").classList.add("disabled");
    if (tratamientos[index].estatus === "Activo") {
        document.getElementById('btnEliminar').classList.remove("disabled");

    } else {
        document.getElementById('btnEliminar').classList.add("disabled");
        document.getElementById('btnAgregar').classList.remove("disabled");
    }

    txtNombre = tratamientos[index].nombre;
    txtPrecioC = tratamientos[index].precio_c;
    txtPrecioV = tratamientos[index].precio_v;
    txtEstatus = tratamientos[index].estatus;
    indextratamientoSeleccionado = index;

    if (indextratamientoSeleccionado === index) {
        document.getElementById(indiceAnterior).classList.remove('bg-info');
        document.getElementById(indiceAnterior).classList.remove('text-light');
        document.getElementById(indextratamientoSeleccionado).classList.add('bg-info');
        document.getElementById(indextratamientoSeleccionado).classList.add('text-light');

        if (indiceAnterior === indextratamientoSeleccionado) {
            document.getElementById("btnAgregar").classList.remove('disabled');
            document.getElementById("btnEliminar").classList.add('disabled');
            document.getElementById("btnModificar").classList.add('disabled');
            document.getElementById(indextratamientoSeleccionado).classList.remove('bg-info');
            document.getElementById(indextratamientoSeleccionado).classList.remove('text-light');
            indiceAnterior = 0;
            indextratamientoSeleccionado = 0;
        }
        indiceAnterior = indextratamientoSeleccionado;
    }
}


export function clean() {

    Swal.fire('Limpiados!', '', 'success')
    document.getElementById("txtNombre").value = "";
    document.getElementById("txtPrecioC").value = "";
    document.getElementById("txtPrecioV").value = "";

    document.getElementById("txtNombre").focus();
    indextratamientoSeleccionado = 0;

}

export function cleanQuestion() {
    Swal.fire({
        title: 'Estás seguro de limpiar el formulario?',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: 'Limpiar',
        denyButtonText: `Cancelar`,
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire('Limpiados!', '', 'success')
            document.getElementById("txtNombre").value = "";
            document.getElementById("txtPrecioC").value = "";
            document.getElementById("txtPrecioV").value = "";

            document.getElementById("txtNombre").focus();
            indextratamientoSeleccionado = 0;
        } else if (result.isDenied) {
            Swal.fire('No se limpio el formulario!', '', 'info')
        }
    })
}

export function leerDatos(index) {
    let newPrecioC1 = txtPrecioC;
    let newPrecioC2 = newPrecioC1.slice(1);

    let newPrecioV1 = txtPrecioV;
    let newPrecioV2 = newPrecioV1.slice(1);

    //Habilita las casillas
    document.getElementById("txtNombre").disabled = false;
    document.getElementById("txtPrecioC").disabled = false;
    document.getElementById("txtPrecioV").disabled = false;
    //Lee los datos
    document.getElementById("txtNombre").value = txtNombre;
    document.getElementById("txtPrecioC").value = newPrecioC2;
    document.getElementById("txtPrecioV").value = newPrecioV2;
    document.getElementById("txtNombre").focus();
}



export function updateTratamiento() {
    Swal.fire({
        title: 'Estás seguro de guardar los cambios?',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: 'Guardar',
        denyButtonText: `No Guardar`,
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            Swal.fire('Ops... Ha habido un problema!', '', 'error')

            let  nombre,
                    precio_c,
                    precio_v,
                    estatus,
                    precio_cObtenido,
                    precio_vObtenido;


            nombre = document.getElementById("txtNombre").value;
            precio_cObtenido = document.getElementById("txtPrecioC").value;
            precio_vObtenido = document.getElementById("txtPrecioV").value;
            precio_c = "$" + precio_cObtenido;
            precio_v = "$" + precio_vObtenido;
                            
            if (nombre === "" && precio_cObtenido === "" && precio_vObtenido === ""){
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'No puedes tener los campos vacíos!',
                    showConfirmButton: false,
                    timer: 1500
                })
            } else {
                let tratamiento = {};

                tratamiento.nombre = nombre;
                tratamiento.precio_c = precio_c;
                tratamiento.precio_v = precio_v;
                tratamiento.estatus = txtEstatus;
                tratamientos[indextratamientoSeleccionado] = tratamiento;
                clean();
                notificacionActualización();
            }


        } else if (result.isDenied) {
            Swal.fire('Los cambios no se guardaron', '', 'info')
        }
    })


}

export function deleteTratamiento() {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
        title: '¿Estás seguro?',
        text: "No podrás revertir esta acción!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, eliminalo!',
        cancelButtonText: 'No, cancelar!',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            swalWithBootstrapButtons.fire(
                    'Eliminado!',
                    'Tú registro se ha eliminado.',
                    'success'
                    );

            tratamientos[indextratamientoSeleccionado].estatus = "Inactivo";
            loadTabla();
        } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
                ) {
            swalWithBootstrapButtons.fire(
                    'Cancelado',
                    'Tú eliminación se ha cancelado!.',
                    'error'
                    );
        }
    });
}

fetch("moduloTratamientos/data_Tratamientos.json")
        .then(response => {
            return response.json();
        })
        .then(function (jsondata) {
            tratamientos = jsondata;
            loadTabla();
        }
        );

function notificacionEliminacion() {
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Se ha eliminado correctamente!',
        showConfirmButton: false,
        timer: 1500
    })
}

function notificacionActualización() {
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Se ha modificado correctamente!',
        showConfirmButton: false,
        timer: 1500
    })
}

function notificacionAñadir() {
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Se ha añadido correctamente!',
        showConfirmButton: false,
        timer: 1500
    })
}

