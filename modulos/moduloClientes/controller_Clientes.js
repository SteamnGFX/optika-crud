/* global Swal */

//Variables generales para el indice del array
let indexClienteSeleccionado;
//Se declara el objeto vacío
let clientes = [];

let indiceAnterior = 0;
//Variables para generacion de codigo
let ApellidoMaternoCodigo = "";
let ApellidoMaterno = "";
let ApellidoMaternoX = "";
let segundo = "";
//Se carga el modulo de catalogo (esto para iniciar con el catalogo cargado)
loadClientCatalogModule();

//Función FETCH para cargar el catalogo de Cliente
export function loadClientCatalogModule() {
    document.getElementById('btnCatalogo').classList.remove("btn-light");
    document.getElementById('btnCatalogo').classList.add("btn-primary");
    document.getElementById('btnAgregar').classList.remove("btn-primary");
    document.getElementById('btnAgregar').classList.add("btn-light");
    document.getElementById('btnModificar').classList.remove("btn-primary");
    document.getElementById('btnModificar').classList.add("btn-light");
    document.getElementById('btnAgregar').classList.remove("disabled");
    document.getElementById('btnModificar').classList.add("disabled");
    document.getElementById('btnEliminar').classList.add("disabled");
    
    indexClienteSeleccionado = 0;
    indiceAnterior = 0;

    fetch("moduloClientes/moduloRegistroCliente/view_CatalogoCliente.html")
            .then(
                    function (response) {
                        return response.text();
                    }
            )
            .then(
                    function (html) {
                        document.getElementById("contenedor-modulo").innerHTML = html;
                        
                        refreshTable(); //Aquí carga los datos de la tabla de la función loadTabla

                        $('#txtBuscarCliente').on('keyup', function () {
                            $('#tblClientesHead').DataTable()
                                    .search(this.value)
                                    .draw();
                        });
                    });
}

//Función FETCH para cargar el Registro de Cliente
export function loadClientRegistrationModule() {
    document.getElementById('btnCatalogo').classList.remove("btn-primary");
    document.getElementById('btnCatalogo').classList.add("btn-light");
    document.getElementById('btnAgregar').classList.remove("btn-light");
    document.getElementById('btnAgregar').classList.add("btn-primary");
    document.getElementById('btnModificar').classList.remove("btn-primary");
    document.getElementById('btnModificar').classList.add("btn-light");

    fetch("moduloClientes/moduloRegistroCliente/view_RegistroCliente.html")
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

export function refreshTable() {
    let url = "../api/cliente/getAll";

    fetch(url)
            .then(response => {
                return response.json();
            })
            .then(function (data) {
                if (data.exception != null)
                {
                    Swal.fire('',
                            'Error interno del servidor. Intente nuevamente mas tarde',
                            'error');
                    return;
                }
                if (data.error != null)
                {
                    Swal.fire('', data.error, 'warning');
                    return;
                }
                if (data.errorsec != null)
                {
                    Swal.fire('', data.errorsec, 'error');
                    window.location.replace('../../index.html');
                    return;
                }

                loadTable(data);
                tableDataTable(data);
            });
}

export function save() {
    let datos = null;
    let params = null;

    let cliente = new Object();
    cliente.persona = new Object();
    
    //VALIDACION PARA INSERTAR O MODIFICAR
    if (document.getElementById("txtIdCliente").value.trim().length < 1) {
        cliente.idCliente           = 0;
        cliente.persona.idPersona   = 0;
    } else {
        cliente.idCliente           = parseInt(document.getElementById("txtIdCliente").value);
        cliente.persona.idPersona   = parseInt(document.getElementById("txtIdPersona").value);
    }

    //DATOS DE PERSONA
    cliente.persona.nombre          = document.getElementById("txtNombre").value;
    cliente.persona.apellidoPaterno = document.getElementById("txtApePaterno").value;
    cliente.persona.apellidoMaterno = document.getElementById("txtApeMaterno").value;
    cliente.persona.genero          = document.getElementById("txtGenero").value;
    cliente.persona.fechaNacimiento = document.getElementById("txtFechaNacimiento").value;
    cliente.persona.calle           = document.getElementById("txtCalle").value;
    cliente.persona.numero          = document.getElementById("txtNumeroCalle").value;
    cliente.persona.colonia         = document.getElementById("txtColonia").value;
    cliente.persona.cp              = document.getElementById("txtCp").value;
    cliente.persona.ciudad          = document.getElementById("txtCiudad").value;
    cliente.persona.estado          = document.getElementById("txtEstado").value;
    cliente.persona.telCasa         = document.getElementById("txtTelefono").value;
    cliente.persona.telMovil        = document.getElementById("txtMovil").value;
    cliente.persona.email           = document.getElementById("txtEmail").value;
    cliente.persona.rfc             = document.getElementById("txtRfc").value;

    //DATOS DE CLIENTE
    cliente.numeroUnico = "";
    cliente.estatus = 1;

    datos = {
        datosCliente: JSON.stringify(cliente)
    };

    params = new URLSearchParams(datos);

    fetch("../api/cliente/save?",
            {
                method: "POST",
                headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'},
                body: params
            })
            .then(response => {
                return response.json();
            })
            .then(function (data) {
                if (data.exception != null) {
                    Swal.fire('', 'Error interno del servidor. Intente nuevamente más tarde.', 'error');
                    return;
                }
                if (data.error != null) {
                    Swal.fire('', data.error, 'warning');
                    return;
                }
                if (data.errorperm != null) {
                    Swal.fire('', 'No tiene permiso para realizar esta acción.', 'warning');
                    return;
                }
                document.getElementById("txtIdCliente").value = data.idClient;
                document.getElementById("txtIdPersona").value = data.idPersona;

                Swal.fire('', 'Datos del cliente registrados correctamente', 'success');
                cleanFields();
                loadClientCatalogModule();
            });
}

function tableDataTable(data) {
    $(document).ready(function () {
        $('#tblClientesHead').DataTable({
            searching: true,
            select: false,
            retrieve: true,
            toggleable: false,
            info: false,
            data: data.data,
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

//Función FETCH para cargar el Actualización de Cliente
export function loadModuleModifyClients() {
    document.getElementById('btnCatalogo').classList.remove("btn-primary");
    document.getElementById('btnCatalogo').classList.add("btn-light");
    document.getElementById('btnModificar').classList.remove("btn-light");
    document.getElementById('btnModificar').classList.add("btn-primary");
    document.getElementById('btnAgregar').classList.remove("btn-primary");
    document.getElementById('btnAgregar').classList.add("btn-light");

    fetch("moduloClientes/moduloRegistroCliente/view_ModificarCliente.html")
            .then(
                    function (response) {
                        return response.text();
                    }
            )
            .then(
                    function (html) {
                        document.getElementById("contenedor-modulo").innerHTML = html;
                        readData();
                    }
            );
}

//Se crea la función de cargar tabla
export function loadTable(data) {

    let cuerpo = "";

    clientes = data;

    clientes.forEach(function (cliente) {
        let registro =
                '<tr id="' + clientes.indexOf(cliente) + '"class="" onclick="moduloCliente.selectClient(' + clientes.indexOf(cliente) + ');">' +
                '<td>' + cliente.persona.nombre + '</td>' +
                '<td>' + cliente.persona.apellidoPaterno + " " + cliente.persona.apellidoMaterno + '</td>' +
                '<td>' + cliente.persona.genero + '</td>' +
                '<td>' + cliente.persona.telMovil + '</td>' +
                '<td>' + cliente.persona.email + '</td>' +
                '<td>' + cliente.estatus + '</td></tr>';
        cuerpo += registro;
    });
    document.getElementById("tblClientes").innerHTML = cuerpo;

}

//Se guardan en variables lo que seleccione en el catálogo para despues usarlo en el FETCH de modificar
let txtIdCliente;
let txtIdPersona;
let txtNombre;
let txtApePaterno;
let txtApeMaterno;
let txtGenero;
let txtFechaNacimiento;
let txtCalle;
let txtNumero;
let txtColonia;
let txtCp;
let txtCiudad;
let txtEstado;
let txtTelefono;
let txtMovil;
let txtEmail;
let txtRfc;
let txtNumUnico;
let txtEstatus;

//Se crea la función de seleccionar los datos
export function selectClient(index) {
    document.getElementById("btnModificar").classList.remove("disabled");
    document.getElementById("btnEliminar").classList.remove("disabled");
    document.getElementById("btnAgregar").classList.add("disabled");

    txtIdCliente        = clientes[index].idCliente;
    txtIdPersona        = clientes[index].persona.idPersona;
    txtNombre           = clientes[index].persona.nombre;  
    txtApePaterno       = clientes[index].persona.apellidoPaterno;
    txtApeMaterno       = clientes[index].persona.apellidoMaterno;
    txtGenero           = clientes[index].persona.genero;
    txtFechaNacimiento  = clientes[index].persona.fechaNacimiento;
    txtCalle            = clientes[index].persona.calle;
    txtNumero           = clientes[index].persona.numero;
    txtColonia          = clientes[index].persona.colonia;
    txtCp               = clientes[index].persona.cp;
    txtCiudad           = clientes[index].persona.ciudad;
    txtEstado           = clientes[index].persona.estado;
    txtTelefono         = clientes[index].persona.telCasa;
    txtMovil            = clientes[index].persona.telMovil;
    txtEmail            = clientes[index].persona.email;
    txtRfc              = clientes[index].persona.rfc;
    txtNumUnico         = clientes[index].numeroUnico;
    txtEstatus          = clientes[index].estatus;

    indexClienteSeleccionado = index;


    if (indexClienteSeleccionado === index) {
        document.getElementById(indiceAnterior).classList.remove('bg-info');
        document.getElementById(indiceAnterior).classList.remove('text-light');
        document.getElementById(indexClienteSeleccionado).classList.add('bg-info');
        document.getElementById(indexClienteSeleccionado).classList.add('text-light');

        if (indiceAnterior === indexClienteSeleccionado) {
            document.getElementById("btnAgregar").classList.remove('disabled');
            document.getElementById("btnEliminar").classList.add('disabled');
            document.getElementById("btnModificar").classList.add('disabled');
            document.getElementById(indexClienteSeleccionado).classList.remove('bg-info');
            document.getElementById(indexClienteSeleccionado).classList.remove('text-light');
            indiceAnterior = 0;
            indexClienteSeleccionado = 0;
        }
        indiceAnterior = indexClienteSeleccionado;
    }
}
//Función para vacíar los atributos de agregar y modificar
export function cleanFields() {
    
    document.getElementById("txtNumUnico").value        = "";
    document.getElementById("txtNombre").value          = "";
    document.getElementById("txtApePaterno").value      = "";
    document.getElementById("txtApeMaterno").value      = "";
    document.getElementById("txtGenero").value          = "";
    document.getElementById("txtFechaNacimiento").value = "";
    document.getElementById("txtCalle").value           = "";
    document.getElementById("txtNumeroCalle").value     = "";
    document.getElementById("txtColonia").value         = "";
    document.getElementById("txtCp").value              = "";
    document.getElementById("txtCiudad").value          = "";
    document.getElementById("txtEstado").value          = "";
    document.getElementById("txtTelefono").value        = "";
    document.getElementById("txtMovil").value           = "";
    document.getElementById("txtEmail").value           = "";
    document.getElementById("txtRfc").value             = "";
    
    indexClienteSeleccionado = 0;
}

export function cleanQuestion() {
    Swal.fire({
        title: 'Estás seguro de limpiar el formulario?',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: 'Limpiar',
        denyButtonText: `Cancelar`
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            Swal.fire('Limpiados!', '', 'success');
            document.getElementById("txtNumUnico").value = "";
            document.getElementById("txtNombre").value = "";
            document.getElementById("txtApePaterno").value = "";
            document.getElementById("txtApeMaterno").value = "";
            document.getElementById("txtTelefono").value = "";
            document.getElementById("txtMovil").value = "";
            document.getElementById("txtCorreo").value = "";
            document.getElementById("txtRfc").value = "";

            document.getElementById("txtNombre").focus();
            indexClienteSeleccionado = 0;
        } else if (result.isDenied) {
            Swal.fire('No se limpio el formulario!', '', 'info');
        }
    });
}

export function cleanQuestionModify() {
    Swal.fire({
        title: 'Estás seguro de limpiar el formulario?',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: 'Limpiar',
        denyButtonText: `Cancelar`
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            Swal.fire('Eliminados!', '', 'success');
            document.getElementById("txtNombre").value = "";
            document.getElementById("txtApePaterno").value = "";
            document.getElementById("txtApeMaterno").value = "";
            document.getElementById("txtTelefono").value = "";
            document.getElementById("txtMovil").value = "";
            document.getElementById("txtCorreo").value = "";
            document.getElementById("txtRfc").value = "";

            document.getElementById("txtNombre").focus();
            indexClienteSeleccionado = 0;
        } else if (result.isDenied) {
            Swal.fire('No se limpio el formulario!', '', 'info');
        }
    });
}

//Función para leer datos al cambiar de CATALOGO a MODIFICAR
export function readData(index) {

    //Lee los datos
    document.getElementById("txtIdCliente").value       = txtIdCliente;
    document.getElementById("txtIdPersona").value       = txtIdPersona;
    document.getElementById("txtNombre").value          = txtNombre;
    document.getElementById("txtApePaterno").value      = txtApePaterno;
    document.getElementById("txtApeMaterno").value      = txtApeMaterno;
    document.getElementById("txtGenero").value          = txtGenero;
    document.getElementById("txtFechaNacimiento").value = txtFechaNacimiento;
    document.getElementById("txtCalle").value           = txtCalle;
    document.getElementById("txtNumeroCalle").value     = txtNumero;
    document.getElementById("txtColonia").value         = txtColonia;
    document.getElementById("txtCp").value              = txtCp;
    document.getElementById("txtCiudad").value          = txtCiudad;
    document.getElementById("txtEstado").value          = txtEstado;
    document.getElementById("txtTelefono").value        = txtTelefono;
    document.getElementById("txtMovil").value           = txtMovil;
    document.getElementById("txtEmail").value           = txtEmail;
    document.getElementById("txtRfc").value             = txtRfc;    
    document.getElementById("txtNumUnico").value        = txtNumUnico;
    
    document.getElementById("txtNombre").focus();
    //Llama a la función getHash
    getHash();
}

//Lee lo que está en txtNumUnico y lo encripta en SHA-256
export function getHash() {
    var hashInput = document.getElementById("txtNumUnico");
    var hash = new jsSHA(hashInput.value, "TEXT");
    var hashOutput = document.getElementById("txtNumUnico");
    hashOutput.value = hash.getHash("SHA-512", "HEX");
    //form.submit();
}

//Borra el cliente (cambia de activo a inactivo, PERO ANTES pregunta si está seguro)
export function deleteClient() {
    let params = null;
    let datos = null;

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    });

    Swal.fire({
        title: 'Estás seguro de eliminar?',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: 'Eliminar',
        denyButtonText: `Cancelar`
    }).then((result) => {
        if (result.isConfirmed) {                  
            
            datos = {
                idCliente: txtIdCliente
            };

            params = new URLSearchParams(datos);

            fetch("../api/cliente/delete?",
                    {
                        method: "PUT",
                        body: params
                    });
            
            loadClientCatalogModule();
            
            swalWithBootstrapButtons.fire(
                    'Eliminado!',
                    'Tú registro se ha eliminado.',
                    'success'
                    );
        } else if (result.isDenied) {
            Swal.fire('Se cancelo la eliminación!', '', 'info');
        }
    });
    
    
}

//Función para obtener numeros aleatorios
export function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function notificacionEliminacion() {
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Se ha eliminado correctamente!',
        showConfirmButton: false,
        timer: 1500
    });
}
//Notificación de Actualización
function notificacionActualización() {
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Se ha modificado correctamente!',
        showConfirmButton: false,
        timer: 1500
    });
}
//Notificación de Añadir
function notificacionAñadir() {
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Se ha añadido correctamente!',
        showConfirmButton: false,
        timer: 1500
    });
}
