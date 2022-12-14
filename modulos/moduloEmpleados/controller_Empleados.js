/* global Swal */

//Variables generales para el indice del array
let indexempleadoSeleccionado;
let indiceAnterior = 0;

//Se declara el objeto vacío
let empleados = [];
//Se carga el modulo de catalogo (esto para iniciar con el catalogo cargado)
cargarModuloCatalogoEmpleados();
//Variables para generacion de codigo
let ApellidoMaternoCodigo = "";
let ApellidoMaterno = "";
let ApellidoMaternoX = "";
let segundo = "";

//Función FETCH para cargar el catalogo de Empleados
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



export function inicializar() {
    //setDetalleVisible(true);
    refrescarTabla();
}



//Función para refrescarTabla con BaseDeDatos
export function refrescarTabla() {
    let url = "../api/empleado/getAll";

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
                loadTabla(data);
                tablaDataTable(data);
            });
}

export function cargarModuloCatalogoEmpleados() {
    document.getElementById('btnCatalogo').classList.remove("btn-light");
    document.getElementById('btnCatalogo').classList.add("btn-primary");
    document.getElementById('btnAgregar').classList.remove("btn-primary");
    document.getElementById('btnAgregar').classList.add("btn-light");
    document.getElementById('btnModificar').classList.remove("btn-primary");
    document.getElementById('btnModificar').classList.add("btn-light");
    document.getElementById('btnAgregar').classList.remove("disabled");
    document.getElementById('btnModificar').classList.add("disabled");
    document.getElementById('btnEliminar').classList.add("disabled");
    indexempleadoSeleccionado, indiceAnterior = 0;

    fetch("moduloEmpleados/moduloRegistroEmpleados/view_CatalogoEmpleado.html")
            .then(
                    function (response) {
                        return response.text();
                    }
            )
            .then(
                    function (html) {
                        document.getElementById("contenedor-modulo").innerHTML = html;
                        refrescarTabla();
                        $('#txtBuscarEmpleado').on('keyup', function () {
                            $('#tblEmpleadosHead').DataTable()
                                    .search(this.value)
                                    .draw();
                        });
                    });
}

function tablaDataTable(data) {
    $(document).ready(function () {
        $('#tblEmpleadosHead').DataTable({
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


//Se crea la función de cargar tabla
function loadTabla(data) {
    let cuerpo = "";

    empleados = data;

    empleados.forEach(function (empleado) {
        let registro =
                '<tr id="' + empleados.indexOf(empleado) + '"class="" onclick="moduloEmpleado.selectEmpleado(' + empleados.indexOf(empleado) + ');">' +
                '<td>' + empleado.persona.nombre + '</td>' +
                '<td>' + empleado.persona.apellidoPaterno + " " + empleado.persona.apellidoMaterno + '</td>' +
                '<td>' + empleado.persona.genero + '</td>' +
                '<td>' + empleado.persona.cp + '</td>' +
                '<td>' + empleado.persona.telMovil + '</td>' +
                '<td>' + empleado.persona.email + '</td>' +
                '<td>' + empleado.usuario.rol + '</td>' +
                '<td>' + empleado.estatus + '</td></tr>';
        '<td>' + empleado.usuario + '</td></tr>';
        '<td>' + empleado.password + '</td></tr>';
        cuerpo += registro;
    });
    document.getElementById("tblEmpleados").innerHTML = cuerpo;
}







//Función FETCH para cargar el Registro de Empleados
export function cargarModuloRegistroEmpleados() {
    document.getElementById('btnCatalogo').classList.remove("btn-primary");
    document.getElementById('btnCatalogo').classList.add("btn-light");
    document.getElementById('btnAgregar').classList.remove("btn-light");
    document.getElementById('btnAgregar').classList.add("btn-primary");
    document.getElementById('btnModificar').classList.remove("btn-primary");
    document.getElementById('btnModificar').classList.add("btn-light");
    fetch("moduloEmpleados/moduloRegistroEmpleados/view_RegistroEmpleado.html")
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

//Función FETCH para cargar el Actualización de Empleados
export function cargarModuloModificarEmpleados() {
    document.getElementById('btnCatalogo').classList.remove("btn-primary");
    document.getElementById('btnCatalogo').classList.add("btn-light");
    document.getElementById('btnModificar').classList.remove("btn-light");
    document.getElementById('btnModificar').classList.add("btn-primary");
    document.getElementById('btnAgregar').classList.remove("btn-primary");
    document.getElementById('btnAgregar').classList.add("btn-light");
    fetch("moduloEmpleados/moduloRegistroEmpleados/view_ModificarEmpleado.html")
            .then(
                    function (response) {
                        return response.text();
                    }
            )
            .then(
                    function (html) {
                        document.getElementById("contenedor-modulo").innerHTML = html;
                        leerDatos(); //Aquí carga los datos para que cuando se abra la pagina de modificar, tenga los datos seleccionados

                    }
            );
}

//Aquí se habilitan y deshabilitan los botones correspondientes
export function boton() {
    document.getElementById("btnAgregar").classList.remove("disabled");
    document.getElementById("btnModificar").classList.add("disabled");
    document.getElementById("btnEliminar").classList.add("disabled");
    document.getElementById("txtBuscarEmpleado").value = "";
    document.getElementById("txtBuscarEmpleado").focus();
}

//Función para obtener numeros aleatorios
export function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}


//Función para añadir Empleado
export function addEmpleado() {
    Swal.fire({
        title: 'Estás seguro de guardar los cambios?',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: 'Guardar',
        denyButtonText: `No Guardar`
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            Swal.fire('Oops.. Ha ocurrido un error!', '', 'error');
            //Atributos
            let numero_unico_empleado,
                    //Datos personales
                    nombre,
                    apellido_paterno,
                    apellido_materno,
                    fechaNacimiento,
                    genero,
                    rfc,
                    //Datos de ubicacion
                    calle,
                    numeroCalle,
                    colonia,
                    cp,
                    ciudad,
                    entidad,
                    //Datos de contacto
                    telefono,
                    telefono_movil,
                    correo_electronico,
                    //Datos de usuario
                    usuario,
                    password,
                    //Variable
                    rfcCantidad;

            //Se guardan en los atributos los valores de los inputs
            numero_unico_empleado = document.getElementById("txtNumUnico").value;
            nombre = document.getElementById("txtNombre").value;
            apellido_paterno = document.getElementById("txtApePaterno").value;
            apellido_materno = document.getElementById("txtApeMaterno").value;
            fechaNacimiento = document.getElementById("txtFechaNacimiento").value;
            genero = document.getElementById("txtGenero").value;
            rfc = document.getElementById("txtRfc").value;

            //Datos de ubicacion
            calle = document.getElementById("txtCalle").value;
            numeroCalle = document.getElementById("txtNumeroCalle").value;
            colonia = document.getElementById("txtColonia").value;
            cp = document.getElementById("txtCP").value;
            ciudad = document.getElementById("txtCiudad").value;
            entidad = colonia = document.getElementById("txtEstado").value;


            //Datos de contacto
            telefono = document.getElementById("txtTelefono").value;
            telefono_movil = document.getElementById("txtMovil").value;
            correo_electronico = document.getElementById("txtCorreo").value;

            //Datos de usuario
            usuario = document.getElementById("txtUsuario").value;
            password = document.getElementById("txtPassword").value;

            //Variable
            rfcCantidad = rfc.length;
            if (nombre === "" && apellido_paterno === "" && apellido_materno === "" && rfc === "" && telefono === "" &&
                    telefono_movil === "" && usuario === "" && password === "" && correo_electronico === "") {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'No puedes tener los campos vacíos!',
                    showConfirmButton: false,
                    timer: 1500
                });

            } else if (nombre === "") {
                document.getElementById("txtNombre").classList.add("error");
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'No puedes tener el Nombre o más campos vacíos!',
                    showConfirmButton: false,
                    timer: 1500
                });

            } else if (apellido_paterno === "") {
                document.getElementById("txtNombre").classList.remove("error");
                document.getElementById("txtApePaterno").classList.add("error");
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'No puedes tener el Apellido Paterno o más campos vacíos!',
                    showConfirmButton: false,
                    timer: 1500
                });

            } else if (rfc === "") {
                document.getElementById("txtRfc").classList.add("error");
                document.getElementById("txtApePaterno").classList.remove("error");
                document.getElementById("txtNombre").classList.remove("error");
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'No puedes tener el RFC vacío!',
                    showConfirmButton: false,
                    timer: 1500
                });

            } else if (rfcCantidad <= 13) {
                if (rfc.length < 13) {
                    document.getElementById("txtRfc").disabled = false;
                    document.getElementById("txtNombre").classList.remove("error");
                    document.getElementById("txtApePaterno").classList.remove("error");
                    document.getElementById("txtRfc").classList.add("error");
                    Swal.fire({
                        position: 'center',
                        icon: 'error',
                        title: 'Te faltan caracteres en el RFC!',
                        showConfirmButton: false,
                        timer: 1500
                    });

                } else if (rfc.length === 13) {
                    document.getElementById("txtRfc").disabled = false;
                    document.getElementById("txtRfc").classList.remove("error");
                    document.getElementById("txtNombre").classList.remove("error");
                    document.getElementById("txtApePaterno").classList.remove("error");
                    if (telefono.length <= 10) {
                        document.getElementById("txtTelefono").disabled = false;
                        document.getElementById("txtTelefono").classList.remove("error");
                        if (telefono_movil === "") {
                            document.getElementById("txtMovil").classList.add("error");
                            Swal.fire({
                                position: 'center',
                                icon: 'error',
                                title: 'No puedes tener el Telefono Movil vacío!',
                                showConfirmButton: false,
                                timer: 1500
                            });
                        } else if (telefono_movil.length <= 10) {
                            if (telefono_movil.length < 10) {
                                document.getElementById("txtMovil").disabled = false;
                                document.getElementById("txtMovil").classList.add("error");
                                Swal.fire({
                                    position: 'center',
                                    icon: 'error',
                                    title: 'Te faltan números en el Telefono Movil!',
                                    showConfirmButton: false,
                                    timer: 1500
                                });
                            } else {
                                document.getElementById("txtMovil").disabled = false;
                                document.getElementById("txtMovil").classList.remove("error");
                                if (usuario === "") {
                                    document.getElementById("txtUsuario").classList.add("error");
                                    Swal.fire({
                                        position: 'center',
                                        icon: 'error',
                                        title: 'No puedes tener el Usuario  vacío!',
                                        showConfirmButton: false,
                                        timer: 1500
                                    });
                                } else if (password === "") {
                                    document.getElementById("txtUsuario").classList.remove("error");
                                    document.getElementById("txtPassword").classList.add("error");
                                    Swal.fire({
                                        position: 'center',
                                        icon: 'error',
                                        title: 'No puedes tener la Contraseña vacía!',
                                        showConfirmButton: false,
                                        timer: 1500
                                    });
                                } else if (correo_electronico === "") {
                                    document.getElementById("txtPassword").classList.remove("error");
                                    document.getElementById("txtCorreo").classList.add("error");
                                    Swal.fire({
                                        position: 'center',
                                        icon: 'error',
                                        title: 'No puedes tener el Correo Electronico vacío!',
                                        showConfirmButton: false,
                                        timer: 1500
                                    });
                                } else {
                                    document.getElementById("txtCorreo").classList.remove("error");
                                    document.getElementById("txtRfc").classList.remove("error");
                                    document.getElementById("txtTelefono").classList.remove("error");
                                    document.getElementById("txtMovil").classList.remove("error");
                                    //GENERA LA CLAVE UNICA DE CLIENTE
                                    let ApellidoPaterno = document.getElementById("txtApePaterno").value;
                                    let primero = ApellidoPaterno.substring(0, 2).toUpperCase();
                                    let ApellidoMaternoCodigo = document.getElementById("txtApeMaterno").value;
                                    if (ApellidoMaternoCodigo === "") {
                                        ApellidoMaternoX = "X";
                                        segundo = ApellidoMaternoX;
                                    } else {
                                        segundo = ApellidoMaternoCodigo.substring(0, 1);
                                    }
                                    let fecha = Math.floor(Date.now() / 1000);
                                    let final = primero + segundo + fecha;


                                    if (txtTelefono === "") {
                                        telefono = "X";
                                    }

                                    //Guarda los datos de los atributos en Empleado
                                    let empleado = {};
                                    //Datos personales
                                    empleado.numero_unico_empleado = final;
                                    empleado.nombre = nombre;
                                    empleado.apellido_paterno = apellido_paterno;
                                    empleado.apellido_materno = apellido_materno;
                                    empleado.genero = genero;
                                    empleado.fechanacimiento = fechaNacimiento;
                                    empleado.rfc = rfc;

                                    //Datos ubicación
                                    empleado.calle = calle;
                                    empleado.numerocalle = numeroCalle;
                                    empleado.calle = calle;
                                    empleado.colonia = colonia;
                                    empleado.cp = cp;
                                    empleado.ciudad = ciudad;
                                    empleado.entidad = entidad;

                                    //Datos de contacto
                                    empleado.telefono = telefono;
                                    empleado.telefono_movil = telefono_movil;
                                    empleado.correo_electronico = correo_electronico;

                                    //Datos de usuario
                                    empleado.usuario = usuario;
                                    empleado.password = password;

                                    //Datos extra
                                    empleado.estatus = "Activo";
                                    //Añade al array el Empleado
                                    empleados.push(empleado);
                                    clean();
                                    notificacionAñadir();
                                }
                            }

                        }
                    }
                }
            }
        } else if (result.isDenied) {
            Swal.fire('Los cambios no se guardaron', '', 'info');
        }
    });


}



export function save() {
    let datos = null;
    let params = null;

    let empleado = new Object();
    empleado.usuario = new Object();
    empleado.persona = new Object();



    if (document.getElementById("txtIdEmpleado").value.trim().length < 1) {
        empleado.idEmpleado = 0;
        empleado.persona.idPersona = 0;
        empleado.usuario.idUsuario = 0;
    } else {
        empleado.idEmpleado = parseInt(document.getElementById("txtIdEmpleado").value);
        empleado.persona.idPersona = parseInt(document.getElementById("txtIdPersona").value);
        empleado.usuario.idUsuario = parseInt(document.getElementById("txtIdUsuario").value);
    }

    //Se guardan en los atributos los valores de los inputs
    empleado.persona.nombre = document.getElementById("txtNombre").value;
    empleado.persona.apellidoPaterno = document.getElementById("txtApePaterno").value;
    empleado.persona.apellidoMaterno = document.getElementById("txtApeMaterno").value;
    empleado.persona.genero = document.getElementById("txtGenero").value;
    empleado.persona.fechaNacimiento = document.getElementById("txtFechaNacimiento").value;

    //Datos de ubicacion
    empleado.persona.calle = document.getElementById("txtCalle").value;
    empleado.persona.numero = document.getElementById("txtNumeroCalle").value;
    empleado.persona.colonia = document.getElementById("txtColonia").value;
    empleado.persona.cp = document.getElementById("txtCP").value;
    empleado.persona.ciudad = document.getElementById("txtCiudad").value;
    empleado.persona.estado = document.getElementById("txtEstado").value;


    //Datos de contacto
    empleado.persona.telCasa = document.getElementById("txtTelefono").value;
    empleado.persona.telMovil = document.getElementById("txtMovil").value;
    empleado.persona.email = document.getElementById("txtCorreo").value;
    empleado.persona.rfc = document.getElementById("txtRfc").value;

    //Datos de usuario
    empleado.usuario.nombre = document.getElementById("txtUsuario").value;
    empleado.usuario.contrasenia = document.getElementById("txtPassword").value;
    empleado.usuario.rol = document.getElementById("txtRol").value;
    empleado.numeroUnico = document.getElementById("txtNumUnico").value;

    //Variable


    datos = {
        datosEmpleado: JSON.stringify(empleado)
    };


    params = new URLSearchParams(datos);

    fetch("../api/empleado/save?",
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
                document.getElementById("txtIdEmpleado").value = data.idEmpleado;
                document.getElementById("txtIdUsuario").value = data.idUsuario;
                document.getElementById("txtIdPersona").value = data.idPersona;
                document.getElementById("txtNumUnico").value = data.usuario.numeroUnico;

                Swal.fire('', 'Datos del empleado actualizados correctamente!', 'success');
                clean();
                cargarModuloCatalogoEmpleados()
            });
}


//Se guardan en variables lo que seleccione en el catálogo para despues usarlo en el FETCH de modificar
//Variables ID'S

let txtIdEmpleado;
let txtIdPersona;
let txtIdUsuario;


//Variables de persona
let txtNumUnico;
let txtNombre;
let txtApellido_Paterno;
let txtApellido_Materno;
let txtGenero;
let txtFecha_Nacimiento;
let txtRFC;

//Variables de ubicacion
let txtCalle;
let txtNumeroCalle;
let txtColonia;
let txtCP;
let txtCiudad;
let txtEstado;

//Variables de contacto
let txtTelefono;
let txtTelefono_Movil;
let txtCorreo;

//Variables de usuario
let txtUsuario;
let txtPassword;
let txtRol;
//Variable de estatus
let txtEstatus;

//Se crea la función de seleccionar los datos


export function selectEmpleado(index) {
    document.getElementById("btnModificar").classList.remove("disabled");
    document.getElementById("btnEliminar").classList.remove("disabled");
    document.getElementById("btnAgregar").classList.add("disabled");
    if (empleados[index].estatus === "Activo") {
    }
//Guarda en las variables que definimnos arriba con el INDICE que obtenemos al clickear una fila
    //Datos personales

    //Imprimimos el dato

    txtIdEmpleado = empleados[index].idEmpleado;
    txtIdPersona = empleados[index].persona.idPersona;
    txtIdUsuario = empleados[index].usuario.idUsuario;

    txtNumUnico = empleados[index].numeroUnico;
    txtNombre = empleados[index].persona.nombre;
    txtApellido_Paterno = empleados[index].persona.apellidoPaterno;
    txtApellido_Materno = empleados[index].persona.apellidoMaterno;
    txtGenero = empleados[index].persona.genero;
    txtFecha_Nacimiento = empleados[index].persona.fechaNacimiento;
    txtRFC = empleados[index].persona.rfc;

    //Datos de ubicacion
    txtCalle = empleados[index].persona.calle;
    txtNumeroCalle = empleados[index].persona.numero;
    txtColonia = empleados[index].persona.colonia;
    txtCP = empleados[index].persona.cp;
    txtCiudad = empleados[index].persona.ciudad;
    txtEstado = empleados[index].persona.estado;


    //Datos de contacto
    txtTelefono = empleados[index].persona.telCasa;
    txtTelefono_Movil = empleados[index].persona.telMovil;
    txtCorreo = empleados[index].persona.email;


    //Datos de usuario
    txtUsuario = empleados[index].usuario.nombre;
    txtPassword = empleados[index].usuario.contrasenia;
    txtRol = empleados[index].usuario.rol;

    //Dato de estatus
    txtEstatus = empleados[index].estatus;



    //Dato de indice
    indexempleadoSeleccionado = index;


    if (indexempleadoSeleccionado === index) {
        document.getElementById(indiceAnterior).classList.remove('bg-info');
        document.getElementById(indiceAnterior).classList.remove('text-light');
        document.getElementById(indexempleadoSeleccionado).classList.add('bg-info');
        document.getElementById(indexempleadoSeleccionado).classList.add('text-light');

        if (indiceAnterior === indexempleadoSeleccionado) {
            document.getElementById("btnAgregar").classList.remove('disabled');
            document.getElementById("btnEliminar").classList.add('disabled');
            document.getElementById("btnModificar").classList.add('disabled');
            document.getElementById(indexempleadoSeleccionado).classList.remove('bg-info');
            document.getElementById(indexempleadoSeleccionado).classList.remove('text-light');
            indiceAnterior = 0;
            indexempleadoSeleccionado = 0;
        }
        indiceAnterior = indexempleadoSeleccionado;
    }
}
//Función para vacíar los atributos de agregar y modificar
export function clean() {
    document.getElementById("txtNumUnico").value = "";
    document.getElementById("txtNombre").value = "";
    document.getElementById("txtApePaterno").value = "";
    document.getElementById("txtApeMaterno").value = "";
    document.getElementById("txtTelefono").value = "";
    document.getElementById("txtMovil").value = "";
    document.getElementById("txtCorreo").value = "";
    document.getElementById("txtUsuario").value = "";
    document.getElementById("txtPassword").value = "";
    document.getElementById("txtRfc").value = "";
    document.getElementById("txtCalle").value = "";
    document.getElementById("txtColonia").value = "";
    document.getElementById("txtNumeroCalle").value = "";
    document.getElementById("txtCP").value = "";
    document.getElementById("txtCiudad").value = "";
    document.getElementById("txtEstado").value = "";
    document.getElementById("txtRol").value = "";
    document.getElementById("txtFechaNacimiento").value = "";

    document.getElementById("txtNombre").focus();
    indexempleadoSeleccionado = 0;
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
            document.getElementById("txtUsuario").value = "";
            document.getElementById("txtPassword").value = "";
            document.getElementById("txtRfc").value = "";
            document.getElementById("txtCalle").value = "";
            document.getElementById("txtColonia").value = "";
            document.getElementById("txtNumeroCalle").value = "";
            document.getElementById("txtCP").value = "";
            document.getElementById("txtCiudad").value = "";
            document.getElementById("txtEstado").value = "";
            document.getElementById("txtRol").value = "";
            document.getElementById("txtFechaNacimiento").value = "";

            document.getElementById("txtNombre").focus();
            indexempleadoSeleccionado = 0;
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
            document.getElementById("txtNumUnico").value = "";
            document.getElementById("txtNombre").value = "";
            document.getElementById("txtApePaterno").value = "";
            document.getElementById("txtApeMaterno").value = "";
            document.getElementById("txtTelefono").value = "";
            document.getElementById("txtMovil").value = "";
            document.getElementById("txtCorreo").value = "";
            document.getElementById("txtUsuario").value = "";
            document.getElementById("txtPassword").value = "";
            document.getElementById("txtRfc").value = "";
            document.getElementById("txtCalle").value = "";
            document.getElementById("txtColonia").value = "";
            document.getElementById("txtNumeroCalle").value = "";
            document.getElementById("txtCP").value = "";
            document.getElementById("txtCiudad").value = "";
            document.getElementById("txtEstado").value = "";
            document.getElementById("txtRol").value = "";
            document.getElementById("txtFechaNacimiento").value = "";

            document.getElementById("txtNombre").focus();
            indexempleadoSeleccionado = 0;
        } else if (result.isDenied) {
            Swal.fire('No se limpio el formulario!', '', 'info');
        }
    });
}


//Función para leer datos al cambiar de CATALOGO a MODIFICAR
export function leerDatos(index) {
//Lee los datos de las variables declaras globalmente

    //Inserta datos de ID'S
    document.getElementById("txtIdEmpleado").value = txtIdEmpleado;
    document.getElementById("txtIdPersona").value = txtIdPersona;
    document.getElementById("txtIdUsuario").value = txtIdUsuario;

    //Inserta datos de persona
    document.getElementById("txtNombre").value = txtNombre;
    document.getElementById("txtApePaterno").value = txtApellido_Paterno;
    document.getElementById("txtApeMaterno").value = txtApellido_Materno;
    document.getElementById("txtGenero").value = txtGenero;
    document.getElementById("txtFechaNacimiento").value = txtFecha_Nacimiento;
    document.getElementById("txtRfc").value = txtRFC;

    //Inserta datos de ubicación
    document.getElementById("txtCalle").value = txtCalle;
    document.getElementById("txtNumeroCalle").value = txtNumeroCalle;
    document.getElementById("txtColonia").value = txtColonia;
    document.getElementById("txtCP").value = txtCP;
    document.getElementById("txtCiudad").value = txtCiudad;
    document.getElementById("txtEstado").value = txtEstado;

    //Inserta datos de contacto
    document.getElementById("txtTelefono").value = txtTelefono;
    document.getElementById("txtMovil").value = txtTelefono_Movil;
    document.getElementById("txtCorreo").value = txtCorreo;

    //Inserta datos de usuario
    document.getElementById("txtUsuario").value = txtUsuario;
    document.getElementById("txtPassword").value = txtPassword;
    document.getElementById("txtRol").value = txtRol;
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
}


//Borra el empleado (cambia de activo a inactivo, PERO ANTES pregunta si está seguro)
export function deleteEmpleado() {
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
            swalWithBootstrapButtons.fire(
                    'Eliminado!',
                    'Tú registro se ha eliminado.',
                    'success'
                    );
            //ESTO ES LO UNICO QUE SE CAMBIA LO DEMÁS ES LA NOTIFICACIÓN, title, text , icon
            //Aquí la función del empleado en el indice y reemplaza su estatus a inactivo y carga la tabla

            datos = {
                idEmpleado: txtIdEmpleado
            };

            params = new URLSearchParams(datos);


            fetch("../api/empleado/delete?",
                    {
                        method: "PUT",
                        body: params
                    });
            cargarModuloCatalogoEmpleados();
        } else if (result.isDenied) {
            Swal.fire('Se cancelo la eliminación!', '', 'info');
        }
    });
}

//Notificación de Eliminación
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
function notificacionActualizacion() {
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


function validar() {
    let  nombre,
            apellido_paterno,
            apellido_materno,
            genero,
            rfc,
            telefono,
            telefono_movil,
            usuario,
            password,
            rol,
            correo_electronico;
    //Se guardan en los atributos los valores de los inputs
    nombre = document.getElementById("txtNombre").value;
    apellido_paterno = document.getElementById("txtApePaterno").value;
    apellido_materno = document.getElementById("txtApeMaterno").value;
    telefono = document.getElementById("txtTelefono").value;
    telefono_movil = document.getElementById("txtMovil").value;
    usuario = document.getElementById("txtUsuario").value;
    password = document.getElementById("txtPassword").value;
    correo_electronico = document.getElementById("txtCorreo").value;
    rfc = document.getElementById("txtRfc").value;
    if (nombre === "") {
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'No puedes tener el nombre vacío!',
            showConfirmButton: false,
            timer: 1500
        });

    } else if (apellido_paterno === "") {
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'No puedes tener el apellido vacío!',
            showConfirmButton: false,
            timer: 1500
        });

    } else if (apellido_materno === "") {
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'No puedes tener el Apellido Paterno vacío!',
            showConfirmButton: false,
            timer: 1500
        });

    } else if (usuario === "") {
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'No puedes tener el Usuario  vacío!',
            showConfirmButton: false,
            timer: 1500
        });

    } else if (password === "") {
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'No puedes tener la Contraseña vacío!',
            showConfirmButton: false,
            timer: 1500
        });

    } else if (correo_electronico === "") {
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'No puedes tener el Correo Electronico vacío!',
            showConfirmButton: false,
            timer: 1500
        });

    } else if (rfc === "") {
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'No puedes tener el RFC vacío!',
            showConfirmButton: false,
            timer: 1500
        });
    }
}

