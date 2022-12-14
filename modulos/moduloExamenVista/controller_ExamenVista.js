let indexExamenSeleccionado;
let examenes = [];
cargarModuloCatalogoExamenVista();

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


export function cargarModuloCatalogoExamenVista() {
    document.getElementById('btnCatalogo').classList.remove("btn-light");
    document.getElementById('btnCatalogo').classList.add("btn-primary");
    document.getElementById('btnAgregar').classList.remove("btn-primary");
    document.getElementById('btnAgregar').classList.add("btn-light");
    document.getElementById('btnModificar').classList.remove("btn-primary");
    document.getElementById('btnModificar').classList.add("btn-light");

    fetch("moduloExamenVista/moduloRegistroExamenVista/view_CatalogoExamenVista.html")
            .then(
                    function (response) {
                        return response.text();
                    }
            )
            .then(
                    function (html) {
                        document.getElementById("contenedor-modulo").innerHTML = html;
                        loadTablaEx();
                        var $rows = $('#tblCExamen tr');
                        $('#txtBuscarExamenC').keyup(function () {
                            var val = $.trim($(this).val()).replace(/ +/g, ' ').toLowerCase();
                            $rows.show().filter(function () {
                                var text = $(this).text().replace(/\s+/g, ' ').toLowerCase();
                                return !~text.indexOf(val);
                            }).hide();
                        });
                        $(document).ready(function () {
                            $('#tblCExamenHead').DataTable({
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

export function cargarModuloRegistroExamenVista() {
    document.getElementById('btnCatalogo').classList.remove("btn-primary");
    document.getElementById('btnCatalogo').classList.add("btn-light");
    document.getElementById('btnAgregar').classList.remove("btn-light");
    document.getElementById('btnAgregar').classList.add("btn-primary");
    document.getElementById('btnModificar').classList.remove("btn-primary");
    document.getElementById('btnModificar').classList.add("btn-light");

    fetch("moduloExamenVista/moduloRegistroExamenVista/view_RegistroExamenVista.html")
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

export function cargarModuloModificarExamenVista() {
    document.getElementById('btnCatalogo').classList.remove("btn-primary");
    document.getElementById('btnCatalogo').classList.add("btn-light");
    document.getElementById('btnModificar').classList.remove("btn-light");
    document.getElementById('btnModificar').classList.add("btn-primary");
    fetch("moduloExamenVista/moduloRegistroExamenVista/view_ModificarExamenVistaa.html")
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



export function agregarExamen() {
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
            let
                    fecha,
                    hora,
                    clave_Cliente,
                    esferaD,
                    esferaI,
                    cilindroD,
                    cilindroI,
                    ejeD,
                    ejeI,
                    distanciaD,
                    distanciaI;


            fecha = document.getElementById("detFecha").value;
            hora = document.getElementById("txtHora").value;
            clave_Cliente = document.getElementById("txtClave").value;
            esferaD = document.getElementById("txtEsferaD").value;
            esferaI = document.getElementById("txtEsferaI").value;
            cilindroD = document.getElementById("txtCilindroD").value;
            cilindroI = document.getElementById("txtCilindroI").value;
            ejeD = document.getElementById("txtEjeD").value;
            ejeI = document.getElementById("txtEjeI").value;
            distanciaD = document.getElementById("txtDistanciaD").value;
            distanciaI = document.getElementById("txtDistanciaI").value;

            let date = new Date();
            let horaActu = date.toLocaleTimeString();

            //form.submit();
            let examen = {};
            examen.fecha = fecha;
            examen.hora = horaActu;
            examen.clave_Cliente = clave_Cliente;
            examen.esferaD = esferaD;
            examen.esferaI = esferaI;
            examen.cilindroD = cilindroD;
            examen.cilindroI = cilindroI;
            examen.ejeD = ejeD;
            examen.ejeI = ejeI;
            examen.distanciaD = distanciaD;
            examen.distanciaI = distanciaI;
            examenes.push(examen);
            clean();
            notificacionAñadir();
        } else if (result.isDenied) {
            Swal.fire('Los cambios no se guardaron', '', 'info')
        }
    })


}

export function loadTablaEx() {
    let cuerpo = "";
    examenes.forEach(function (examen) {
        let registro =
                '<tr id="' + examenes.indexOf(examen) + '"class="" onclick="moduloExamenVista.seleccionarExamen(' + examenes.indexOf(examen) + ');">' +
                '<td>' + examen.fecha + '</td>' +
                '<td>' + examen.hora +
                '<td>' + examen.clave_Cliente + '</td>' +
                '<td>' + examen.esferaD + '</td>' +
                '<td>' + examen.esferaI + '</td>' +
                '<td>' + examen.cilindroD + '</td>' +
                '<td>' + examen.cilindroI + '</td>' +
                '<td>' + examen.ejeD + '</td>' +
                '<td>' + examen.ejeI + '</td>' +
                '<td>' + examen.distanciaD + '</td>' +
                '<td>' + examen.distanciaI + '</td></tr>';

        cuerpo += registro;
    });
    console.log(cuerpo);
    document.getElementById("tblCExamen").innerHTML = cuerpo;
    document.getElementById(0).classList.add("d-none");
}

let txtId;
let detFecha;
let txtHora;
let txtClave;
let txtEsferaD;
let txtEsferaI;
let txtCilindroD;
let txtCilindroI;
let txtEjeD;
let txtEjeI;
let txtDistanciaD;
let txtDistanciaI;

export function seleccionarExamen(index) {
    document.getElementById("btnModificar").classList.remove("disabled");
    document.getElementById("btnEliminar").classList.remove("disabled");
    document.getElementById("btnAgregar").classList.add("disabled");


    detFecha = examenes[index].fecha;
    txtHora = examenes[index].hora;
    txtClave = examenes[index].clave_Cliente;
    txtEsferaD = examenes[index].esferaD;
    txtEsferaI = examenes[index].esferaI;
    txtCilindroD = examenes[index].cilindroD;
    txtCilindroI = examenes[index].cilindroI;
    txtEjeD = examenes[index].ejeD;
    txtEjeI = examenes[index].ejeI;
    txtDistanciaD = examenes[index].distanciaD;
    txtDistanciaI = examenes[index].distanciaI;
    indexExamenSeleccionado = index;

    if (indexExamenSeleccionado === index) {
        document.getElementById(indiceAnterior).classList.remove('bg-info');
        document.getElementById(indiceAnterior).classList.remove('text-light');
        document.getElementById(indexExamenSeleccionado).classList.add('bg-info');
        document.getElementById(indexExamenSeleccionado).classList.add('text-light');

        if (indiceAnterior === indexExamenSeleccionado) {
            document.getElementById("btnAgregar").classList.remove('disabled');
            document.getElementById("btnEliminar").classList.add('disabled');
            document.getElementById("btnModificar").classList.add('disabled');
            document.getElementById(indexExamenSeleccionado).classList.remove('bg-info');
            document.getElementById(indexExamenSeleccionado).classList.remove('text-light');
            indiceAnterior = 0;
            indexExamenSeleccionado = 0;
        }
        indiceAnterior = indexExamenSeleccionado;
    }
}
let indiceAnterior = 0;


export function clean() {
    document.getElementById("detFecha").value = "";
    document.getElementById("txtHora").value = "";
    document.getElementById("txtClave").value = "";
    document.getElementById("txtEsferaD").value = "";
    document.getElementById("txtEsferaI").value = "";
    document.getElementById("txtCilindroD").value = "";
    document.getElementById("txtCilindroI").value = "";
    document.getElementById("txtEjeD").value = "";
    document.getElementById("txtEjeI").value = "";
    document.getElementById("txtDistanciaD").value = "";
    document.getElementById("txtDistanciaI").value = "";

    document.getElementById("detFecha").focus();
    indexExamenSeleccionado = 0;
}

export function leerDatos(index) {
    //Habilita las casillas

    document.getElementById("detFecha").disabled = false;
    document.getElementById("txtHora").disabled = false;
    document.getElementById("txtClave").disabled = false;
    document.getElementById("txtEsferaD").disabled = false;
    document.getElementById("txtEsferaI").disabled = false;
    document.getElementById("txtCilindroD").disabled = false;
    document.getElementById("txtCilindroI").disabled = false;
    document.getElementById("txtEjeD").disabled = false;
    document.getElementById("txtEjeI").disabled = false;
    document.getElementById("txtDistanciaD").disabled = false;
    document.getElementById("txtDistanciaI").disabled = false;
    //Lee los datos

    document.getElementById("detFecha").value = detFecha;
    document.getElementById("txtHora").value = txtHora;
    document.getElementById("txtClave").value = txtClave;
    document.getElementById("txtEsferaD").value = txtEsferaD;
    document.getElementById("txtEsferaI").value = txtEsferaI;
    document.getElementById("txtCilindroD").value = txtCilindroD;
    document.getElementById("txtCilindroI").value = txtCilindroI;
    document.getElementById("txtEjeD").value = txtEjeD;
    document.getElementById("txtEjeI").value = txtEjeI;
    document.getElementById("txtDistanciaD").value = txtDistanciaD;
    document.getElementById("txtDistanciaI").value = txtDistanciaI;
    document.getElementById("detFecha").focus();

}



export function actualizarExamen() {

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

            let
                    fecha,
                    hora,
                    clave_Cliente,
                    esferaD,
                    esferaI,
                    cilindroD,
                    cilindroI,
                    ejeD,
                    ejeI,
                    distanciaD,
                    distanciaI;


            fecha = document.getElementById("detFecha").value;
            hora = document.getElementById("txtHora").value;
            clave_Cliente = document.getElementById("txtClave").value;
            esferaD = document.getElementById("txtEsferaD").value;
            esferaI = document.getElementById("txtEsferaI").value;
            cilindroD = document.getElementById("txtCilindroD").value;
            cilindroI = document.getElementById("txtCilindroI").value;
            ejeD = document.getElementById("txtEjeD").value;
            ejeI = document.getElementById("txtEjeI").value;
            distanciaD = document.getElementById("txtDistanciaD").value;
            distanciaI = document.getElementById("txtDistanciaI").value;



            //form.submit();
            let examen = {};
            examen.fecha = fecha;
            examen.hora = hora;
            examen.clave_Cliente = clave_Cliente;
            examen.esferaD = esferaD;
            examen.esferaI = esferaI;
            examen.cilindroD = cilindroD;
            examen.cilindroI = cilindroI;
            examen.ejeD = ejeD;
            examen.ejeI = ejeI;
            examen.distanciaD = distanciaD;
            examen.distanciaI = distanciaI;
            examenes[indexExamenSeleccionado] = examen;
            clean();
            notificacionActualización();
        } else if (result.isDenied) {
            Swal.fire('Los cambios no se guardaron', '', 'info')
        }
    })


}

export function eliminarExamen() {
    (async () => {

        const {value: password} = await Swal.fire({
            title: 'Confirme su identidad',
            input: 'password',
            inputLabel: 'Ingrese la contraseña para confirmar y eliminar el registro',
            inputPlaceholder: 'Ingrese su contraseña',
            inputAttributes: {
                maxlength: 10,
                autocapitalize: 'off',
                autocorrect: 'off'
            }
        })

        if (password == "1234") {
            delete(examenes[indexExamenSeleccionado]);
            loadTablaEx();
            notificacionEliminacion();
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'La contraseña es incorrecta!',
            })
        }

    })()
}

fetch("moduloExamenVista/data_ExamenVista.json")
        .then(response => {
            return response.json();
        })
        .then(function (jsondata) {
            examenes = jsondata;
            console.log(examenes);
            loadTablaEx();
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

