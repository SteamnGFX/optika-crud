//Variables generales para el indice del array

let indexSolucionSeleccionado;
let indiceAnterior = 0;

//Se declara el objeto vacío
let soluciones = [];
//Se carga el modulo de catalogo (esto para iniciar con el catalogo cargado)
cargarModuloCatalogoSoluciones();

//Función FETCH para cargar el catalogo de Soluciones
export function inicializar() {
    //setDetalleVisible(true);
    refrescarTabla();
}

//Función para refrescarTabla con BaseDeDatos
export function refrescarTabla() {
    let url = "../api/solucion/getAll";
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



export function cargarModuloCatalogoSoluciones() {
    document.getElementById('btnCatalogo').classList.remove("btn-light");
    document.getElementById('btnCatalogo').classList.add("btn-primary");
    document.getElementById('btnAgregar').classList.remove("btn-primary");
    document.getElementById('btnAgregar').classList.add("btn-light");
    document.getElementById('btnModificar').classList.remove("btn-primary");
    document.getElementById('btnModificar').classList.add("btn-light");
    document.getElementById('btnAgregar').classList.remove("disabled");
    document.getElementById('btnModificar').classList.add("disabled");
    document.getElementById('btnEliminar').classList.add("disabled");
    indexSolucionSeleccionado = 0;
    indiceAnterior = 0;

    fetch("moduloSoluciones/moduloRegistroSolucion/view_CatalogoSolucion.html")
            .then(
                    function (response) {
                        return response.text();
                    }
            )
            .then(
                    function (html) {
                        document.getElementById("contenedor-modulo").innerHTML = html;
                        refrescarTabla();
                        $('#txtBuscarSolucion').on('keyup', function () {
                            $('#tblSolucionesHead').DataTable()
                                    .search(this.value)
                                    .draw();
                        });
                        //  configureTableFilter(document.getElementById("txtBuscarSolucion"),document.getElementById("tblSolucionesHead"));

                    });
}


function tablaDataTable(data) {

    $(document).ready(function () {
        $('#tblSolucionesHead').DataTable({
            searching: true,
            retrieve: true,
            toggleable: true,
            info: false,
            data: data.data,

            language: {
                "decimal": " ",
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

    soluciones = data;

    soluciones.forEach(function (solucion) {
        let registro =
                '<tr id="' + soluciones.indexOf(solucion) + '"class="" onclick="moduloSoluciones.selectSolucion(' + soluciones.indexOf(solucion) + ');">' +
                '<td>' + solucion.producto.nombre + '</td>' +
                '<td>' + solucion.producto.marca + '</td>' +
                '<td>' + solucion.producto.precioCompra + '</td>' +
                '<td>' + solucion.producto.precioVenta + '</td>' +
                '<td>' + solucion.producto.existencias + '</td>' +
                '<td>' + solucion.producto.estatus + '</td></tr>';

        cuerpo += registro;
    });
    document.getElementById("tblSoluciones").innerHTML = cuerpo;
}

//Función FETCH para cargar el Registro de Soluciones
export function cargarModuloRegistroSoluciones() {
    document.getElementById('btnCatalogo').classList.remove("btn-primary");
    document.getElementById('btnCatalogo').classList.add("btn-light");
    document.getElementById('btnAgregar').classList.remove("btn-light");
    document.getElementById('btnAgregar').classList.add("btn-primary");
    document.getElementById('btnModificar').classList.remove("btn-primary");
    document.getElementById('btnModificar').classList.add("btn-light");

    fetch("moduloSoluciones/moduloRegistroSolucion/view_RegistroSolucion.html")
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

//Función FETCH para cargar el Actualización de Soluciones
export function cargarModuloModificarSoluciones() {
    document.getElementById('btnCatalogo').classList.remove("btn-primary");
    document.getElementById('btnCatalogo').classList.add("btn-light");
    document.getElementById('btnModificar').classList.remove("btn-light");
    document.getElementById('btnModificar').classList.add("btn-primary");
    fetch("moduloSoluciones/moduloRegistroSolucion/view_ModificarSolucion.html")
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


//Aquí se habilitan y deshabilitan los botones correspondientes
export function boton() {
    document.getElementById("btnAgregar").classList.remove("disabled");
    document.getElementById("btnModificar").classList.add("disabled");
    document.getElementById("btnEliminar").classList.add("disabled");

}

//Función para añadir Solucion
export function save() {
    let datos = null;
    let params = null;

    let solucion = new Object();
    solucion.producto = new Object();

    if (document.getElementById("txtIdSolucion").value.trim().length < 1) {
        solucion.idSolucion = 0;
        solucion.producto.idProducto = 0;
    } else {
        solucion.idSolucion = parseInt(document.getElementById("txtIdSolucion").value);
        solucion.producto.idProducto = parseInt(document.getElementById("txtIdProducto").value);
    }

    //Se guardan en los atributos los valores de los inputs

    solucion.producto.nombre = document.getElementById("txtNombre").value;
    solucion.producto.marca = document.getElementById("txtMarca").value;
    solucion.producto.precioCompra = document.getElementById("txtPrecioC").value;
    solucion.producto.precioVenta = document.getElementById("txtPrecioV").value;
    solucion.producto.existencias = document.getElementById("txtExistencia").value;

    datos = {
        datosSolucion: JSON.stringify(solucion)
    };

    params = new URLSearchParams(datos);

    fetch("../api/solucion/save?",
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
                document.getElementById("txtIdSolucion").value = data.idSolucion;
                document.getElementById("txtIdProducto").value = data.idProducto;


                Swal.fire('', 'Datos de la solucion actualizados correctamente', 'success');
                clean();
                cargarModuloCatalogoSoluciones();
            });
}

//Se guardan en variables lo que seleccione en el catálogo para despues usarlo en el FETCH de modificar
//Variables ID'S

let txtNombre;
let txtMarca;
let txtPrecioC;
let txtPrecioV;
let txtDescripcion;
let txtExistencia;
let txtEstatus;
let txtIdSolucion;
let txtIdProducto;
let txtCodigoBarras;

export function selectSolucion(index) {
    document.getElementById("btnModificar").classList.remove("disabled");
    document.getElementById("btnEliminar").classList.remove("disabled");
    document.getElementById("btnAgregar").classList.add("disabled");
    if (soluciones[index].estatus === "Activo") {

    }
    
    txtNombre = soluciones[index].producto.nombre;
    txtMarca = soluciones[index].producto.marca;
    txtPrecioC = soluciones[index].producto.precioCompra;
    txtPrecioV = soluciones[index].producto.precioVenta;
    txtExistencia = soluciones[index].producto.existencias;
    txtEstatus = soluciones[index].producto.estatus;
    txtIdSolucion = soluciones[index].idSolucion;
    txtIdProducto = soluciones[index].producto.idProducto;
    txtCodigoBarras = soluciones[index].producto.codigoBarras;
    indexSolucionSeleccionado = index;

    if (indexSolucionSeleccionado === index) {
        document.getElementById(indiceAnterior).classList.remove('bg-info');
        document.getElementById(indiceAnterior).classList.remove('text-light');
        document.getElementById(indexSolucionSeleccionado).classList.add('bg-info');
        document.getElementById(indexSolucionSeleccionado).classList.add('text-light');

        if (indiceAnterior === indexSolucionSeleccionado) {
            document.getElementById("btnAgregar").classList.remove('disabled');
            document.getElementById("btnEliminar").classList.add('disabled');
            document.getElementById("btnModificar").classList.add('disabled');
            document.getElementById(indexSolucionSeleccionado).classList.remove('bg-info');
            document.getElementById(indexSolucionSeleccionado).classList.remove('text-light');
            indiceAnterior = 0;
            indexSolucionSeleccionado = 0;
        }
        indiceAnterior = indexSolucionSeleccionado;
    }

}

export function clean() {
    document.getElementById("txtNombre").value = "";
    document.getElementById("txtMarca").value = "";
    document.getElementById("txtPrecioC").value = "";
    document.getElementById("txtPrecioV").value = "";
    document.getElementById("txtExistencia").value = "";

    document.getElementById("txtNombre").focus();
    indexSolucionSeleccionado = 0;


}

//sirve para limpiar 
export function cleanQuestion() {

    Swal.fire({
        title: 'Estás seguro de limpiar el formulario?',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: 'Limpiar',
        denyButtonText: `Cancelar`,
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            Swal.fire('Limpiados!', '', 'success')
            document.getElementById("txtNombre").value = "";
            document.getElementById("txtMarca").value = "";
            document.getElementById("txtPrecioC").value = "";
            document.getElementById("txtPrecioV").value = "";
            document.getElementById("txtExistencia").value = "";

            document.getElementById("txtNombre").focus();
            indexSolucionSeleccionado = 0;
        } else if (result.isDenied) {
            Swal.fire('No se limpio el formulario!', '', 'info')
        }
    })
}







export function leerDatos(index) {

    //Habilita las casillas

    document.getElementById("txtPrecioC").value = txtPrecioC;
    document.getElementById("txtPrecioV").value = txtPrecioV;
    document.getElementById("txtExistencia").value = txtExistencia;
    document.getElementById("txtIdSolucion").value = txtIdSolucion;
    document.getElementById("txtIdProducto").value = txtIdProducto;
    document.getElementById("txtCodigoBarras").value = txtCodigoBarras;
    //Lee los datos

    document.getElementById("txtNombre").value = txtNombre;
    document.getElementById("txtMarca").value = txtMarca;



    document.getElementById("txtNombre").focus();

}








//export function deleteSolucion() {
//    const swalWithBootstrapButtons = Swal.mixin({
//        customClass: {
//            confirmButton: 'btn btn-success',
//            cancelButton: 'btn btn-danger'
//        },
//        buttonsStyling: false
//    })
//
//    Swal.fire({
//        title: 'Estás seguro de eliminar?',
//        showDenyButton: true,
//        showCancelButton: false,
//        confirmButtonText: 'Eliminar',
//        denyButtonText: `Cancelar`,
//    }).then((result) => {
//        if (result.isConfirmed) {
//            swalWithBootstrapButtons.fire(
//                    'Eliminado!',
//                    'Tú registro se ha eliminado.',
//                    'success'
//                    );
//
//            soluciones[indexSolucionSeleccionado].estatus = "Inactivo";
//            loadTabla();
//        } else if (result.isDenied) {
//            Swal.fire('Se cancelo la eliminación!', '', 'info')
//        }
//    });
//}

//fetch("moduloSoluciones/data_Soluciones.json")
//        .then(response => {
//            return response.json();
//        })
//        .then(function (jsondata) {
//            soluciones = jsondata;
//            loadTabla();
//        }
//        );

//Borra el empleado (cambia de activo a inactivo, PERO ANTES pregunta si está seguro)
export function deleteSolucion() {
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

            //ESTO ES LO UNICO QUE SE CAMBIA LO DEMÁS ES LA NOTIFICACIÓN, title, text , icon
            //Aquí la función del empleado en el indice y reemplaza su estatus a inactivo y carga la tabla
            console.log(txtIdProducto);
            datos = {
                idProducto: txtIdProducto
            };

            params = new URLSearchParams(datos);


            fetch("../api/solucion/delete?",
                    {
                        method: "PUT",
                        body: params
                    });
            cargarModuloCatalogoSoluciones();
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

