let indexaccesorioseleccionado;
let indiceAnterior = 0;

let accesorios = [];
cargarModuloCatalogoAccesorios();

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

export function refrescarTabla() {
    console.log("Refrescando tabla...");
    let url = "../api/accesorio/getAll";

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

export function cargarModuloCatalogoAccesorios() {
    document.getElementById('btnCatalogo').classList.remove("btn-light");
    document.getElementById('btnCatalogo').classList.add("btn-primary");
    document.getElementById('btnAgregar').classList.remove("btn-primary");
    document.getElementById('btnAgregar').classList.add("btn-light");
    document.getElementById('btnModificar').classList.remove("btn-primary");
    document.getElementById('btnModificar').classList.add("btn-light");
    document.getElementById('btnAgregar').classList.remove("disabled");
    document.getElementById('btnModificar').classList.add("disabled");
    document.getElementById('btnEliminar').classList.add("disabled");
    indexaccesorioseleccionado = 0;
    indiceAnterior = 0;

    fetch("moduloAccesorios/moduloRegistroAccesorios/view_CatalogoAccesorios.html")
            .then(
                    function (response) {
                        return response.text();
                    }
            )
            .then(
                    function (html) {
                        document.getElementById("contenedor-modulo").innerHTML = html;
                        refrescarTabla();
                        $('#txtBuscarAccesorio').on('keyup', function () {
                            $('#tblAccesorioHead').DataTable()
                                    .search(this.value)
                                    .draw();
                        });
                    }
            );
}


function tablaDataTable(data) {
    $(document).ready(function () {
        $('#tblAccesorioHead').DataTable({
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

export function cargarModuloRegistroAccesorios() {
    document.getElementById('btnCatalogo').classList.remove("btn-primary");
    document.getElementById('btnCatalogo').classList.add("btn-light");
    document.getElementById('btnAgregar').classList.remove("btn-light");
    document.getElementById('btnAgregar').classList.add("btn-primary");
    document.getElementById('btnModificar').classList.remove("btn-primary");
    document.getElementById('btnModificar').classList.add("btn-light");

    fetch("moduloAccesorios/moduloRegistroAccesorios/view_RegistroAccesorios.html")
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


export function cargarModuloModificarAccesorios() {
    document.getElementById('btnCatalogo').classList.remove("btn-primary");
    document.getElementById('btnCatalogo').classList.add("btn-light");
    document.getElementById('btnModificar').classList.remove("btn-light");
    document.getElementById('btnModificar').classList.add("btn-primary");
    fetch("moduloAccesorios/moduloRegistroAccesorios/view_ModificarAccesorios.html")
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



export function addAccesorio() {
    Swal.fire({
        title: 'Estás seguro de guardar los cambios?',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: 'Guardar',
        denyButtonText: `No Guardar`,
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            Swal.fire('Ops...!', '', 'error')
            let  nombre,
                    precio_c,
                    precio_v,
                    precio_cObtenido,
                    precio_vObtenido,
                    marca,
                    existencias;



            nombre = document.getElementById("txtNombre").value;
            precio_cObtenido = document.getElementById("txtPrecioC").value;
            precio_vObtenido = document.getElementById("txtPrecioV").value;
            marca = document.getElementById("txtMarca").value;
            existencias = document.getElementById("txtExistencias").value;

            precio_c = "$" + precio_cObtenido;
            precio_v = "$" + precio_vObtenido;

            if (nombre === "" && marca === "" && precio_cObtenido === "" && precio_vObtenido === "" && existencias === "") {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'No puedes tener los campos vacíos!',
                    showConfirmButton: false,
                    timer: 1500
                })
            } else if (nombre === "") {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'No puedes tener el Nombre vacío!',
                    showConfirmButton: false,
                    timer: 1500
                })
            } else if (marca === "") {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'No puedes tener la Marca vacío!',
                    showConfirmButton: false,
                    timer: 1500
                })
            } else if (precio_cObtenido === "") {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'No puedes tener el Precio de Compra vacío!',
                    showConfirmButton: false,
                    timer: 1500
                })
            } else if (precio_vObtenido === "") {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'No puedes tener el Precio de Venta vacío!',
                    showConfirmButton: false,
                    timer: 1500
                })
            } else if (existencias === "") {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'No puedes tener las Existencias vacías!',
                    showConfirmButton: false,
                    timer: 1500
                })
            } else {
                //form.submit();
                let accesorio = {};

                accesorio.nombre = nombre;
                accesorio.precio_c = precio_c;
                accesorio.precio_v = precio_v;
                accesorio.marca = marca;
                accesorio.existencias = existencias;
                accesorio.estatus = "Activo";

                accesorios.push(accesorio);
                clean();
                notificacionAñadir();
            }

        } else if (result.isDenied) {
            Swal.fire('Los cambios no se guardaron', '', 'info');
        }
    });


}
export function save() {
    let datos = null;
    let params = null;

    let accesorio = new Object();
    accesorio.producto = new Object();

    if (document.getElementById("txtIdAccesorio").value.trim().length < 1) {
        accesorio.idAccesorio = 0;
        accesorio.producto.idProducto = 0;

    } else {
        accesorio.idAccesorio = parseInt(document.getElementById("txtIdAccesorio").value);
        accesorio.producto.idProducto = parseInt(document.getElementById("txtIdProducto").value);
    }

    //Se guardan en los atributos los valores de los inputs
    accesorio.producto.nombre = document.getElementById("txtNombre").value;
    accesorio.producto.precioCompra = document.getElementById("txtPrecioC").value;
    accesorio.producto.precioVenta = document.getElementById("txtPrecioV").value;
    accesorio.producto.marca = document.getElementById("txtMarca").value;
    accesorio.producto.existencias = document.getElementById("txtExistencias").value;
    accesorio.producto.codigoBarras = document.getElementById("txtCodigoBarras").value;
//
//    let precio_c = "$" + precio_cObtenido;
//    let precio_v = "$" + precio_vObtenido;
    //Variable

    datos = {
        datosAccesorio: JSON.stringify(accesorio)
    };


    params = new URLSearchParams(datos);

    fetch("../api/accesorio/save?",
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
                document.getElementById("txtIdAccesorio").value = data.idAccesorio;
                document.getElementById("txtIdProducto").value = data.idProducto;
                document.getElementById("txtCodigoBarras").value = data.codigoBarras;
                Swal.fire('', 'Datos del accesorio actualizados correctamente!', 'success');
                clean();
                cargarModuloCatalogoAccesorios();
            });
}

export function loadTabla(data) {
    let cuerpo = "";
    accesorios = data;
    accesorios.forEach(function (accesorio) {
        let registro =
                '<tr id="' + accesorios.indexOf(accesorio) + '"class="" onclick="moduloAccesorios.selectAccesorio(' + accesorios.indexOf(accesorio) + ');">' +
                '<td>' + accesorio.producto.nombre + '</td>' +
                '<td>' + accesorio.producto.marca + '</td>' +
                '<td>' + accesorio.producto.precioCompra + '</td>' +
                '<td>' + accesorio.producto.precioVenta + '</td>' +
                '<td>' + accesorio.producto.existencias + '</td>' +
                '<td>' + accesorio.producto.estatus + '</td></tr>';
        cuerpo += registro;
    });
    document.getElementById("tblAccesorio").innerHTML = cuerpo;
}

let txtIdAccesorio;
let txtIdProducto;
let txtCodigoBarras;

let txtNombre;
let txtPrecioC;
let txtPrecioV;
let txtEstatus;
let txtMarca;
let txtModelo;
let txtExistencias;


export function selectAccesorio(index) {
    document.getElementById("btnModificar").classList.remove("disabled");
    document.getElementById("btnEliminar").classList.remove("disabled");
    document.getElementById("btnAgregar").classList.add("disabled");
    if (accesorios[index].producto.estatus === 1) {
        document.getElementById('btnEliminar').classList.remove("disabled");

    } else {
        document.getElementById('btnEliminar').classList.add("disabled");
        document.getElementById('btnAgregar').classList.remove("disabled");
    }

    txtIdAccesorio = accesorios[index].idAccesorio;
    txtIdProducto = accesorios[index].producto.idProducto;
    txtCodigoBarras = accesorios[index].producto.codigoBarras;

    txtNombre = accesorios[index].producto.nombre;
    txtPrecioC = accesorios[index].producto.precioCompra;
    txtPrecioV = accesorios[index].producto.precioVenta;
    txtEstatus = accesorios[index].producto.estatus;
    txtMarca = accesorios[index].producto.marca;
    txtExistencias = accesorios[index].producto.existencias;
    indexaccesorioseleccionado = index;

    if (indexaccesorioseleccionado === index) {
        document.getElementById(indiceAnterior).classList.remove('bg-info');
        document.getElementById(indiceAnterior).classList.remove('text-light');
        document.getElementById(indexaccesorioseleccionado).classList.add('bg-info');
        document.getElementById(indexaccesorioseleccionado).classList.add('text-light');

        if (indiceAnterior === indexaccesorioseleccionado) {
            document.getElementById("btnAgregar").classList.remove('disabled');
            document.getElementById("btnEliminar").classList.add('disabled');
            document.getElementById("btnModificar").classList.add('disabled');
            document.getElementById(indexaccesorioseleccionado).classList.remove('bg-info');
            document.getElementById(indexaccesorioseleccionado).classList.remove('text-light');
            indiceAnterior = 0;
            indexaccesorioseleccionado = 0;
        }
        indiceAnterior = indexaccesorioseleccionado;
    }


}


//sirve para limpiar 
export function clean() {

    document.getElementById("txtNombre").value = "";
    document.getElementById("txtMarca").value = "";
    document.getElementById("txtPrecioC").value = "";
    document.getElementById("txtPrecioV").value = "";
    document.getElementById("txtExistencias").value = "";

    document.getElementById("txtNombre").focus();
    indexaccesorioseleccionado = 0;

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
            document.getElementById("txtMarca").value = "";
            document.getElementById("txtPrecioC").value = "";
            document.getElementById("txtPrecioV").value = "";
            document.getElementById("txtExistencias").value = "";


            document.getElementById("txtNombre").focus();
            indexaccesorioseleccionado = 0;
        } else if (result.isDenied) {
            Swal.fire('No se limpio el formulario!', '', 'info')
        }
    })

}

export function leerDatos(index) {
//    let newPrecioC1 = txtPrecioC;
//    let newPrecioC2 = newPrecioC1.slice(1);
//
//    let newPrecioV1 = txtPrecioV;
//    let newPrecioV2 = newPrecioV1.slice(1);

    //Lee los datos

    document.getElementById("txtIdAccesorio").value = txtIdAccesorio;
    document.getElementById("txtIdProducto").value = txtIdProducto;
    document.getElementById("txtCodigoBarras").value = txtCodigoBarras;

    document.getElementById("txtNombre").value = txtNombre;
    document.getElementById("txtPrecioC").value = txtPrecioC;
    document.getElementById("txtPrecioV").value = txtPrecioV;
    document.getElementById("txtMarca").value = txtMarca;
    document.getElementById("txtExistencias").value = txtExistencias;
    document.getElementById("txtNombre").focus();
}



export function updateAccesorio() {
    Swal.fire({
        title: 'Estás seguro de guardar los cambios?',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: 'Guardar',
        denyButtonText: `No Guardar`,
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            Swal.fire('Ops...!', '', 'error')

            let  nombre,
                    precio_c,
                    precio_v,
                    precio_cObtenido,
                    precio_vObtenido,
                    marca,
                    existencias,
                    estatus;



            nombre = document.getElementById("txtNombre").value;
            precio_cObtenido = document.getElementById("txtPrecioC").value;
            precio_vObtenido = document.getElementById("txtPrecioV").value;
            marca = document.getElementById("txtMarca").value;
            existencias = document.getElementById("txtExistencias").value;
            ;

            precio_c = "$" + precio_cObtenido;
            precio_v = "$" + precio_vObtenido;
            if (nombre === "" && marca === "" && precio_cObtenido === "" && precio_vObtenido === "" && existencias === "") {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'No puedes tener los campos vacíos!',
                    showConfirmButton: false,
                    timer: 1500
                })
            } else if (nombre === "") {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'No puedes tener el Nombre vacío!',
                    showConfirmButton: false,
                    timer: 1500
                })
            } else if (marca === "") {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'No puedes tener la Marca vacío!',
                    showConfirmButton: false,
                    timer: 1500
                })
            } else if (precio_cObtenido === "") {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'No puedes tener el Precio de Compra vacío!',
                    showConfirmButton: false,
                    timer: 1500
                })
            } else if (precio_vObtenido === "") {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'No puedes tener el Precio de Venta vacío!',
                    showConfirmButton: false,
                    timer: 1500
                })
            } else if (existencias === "") {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'No puedes tener las Existencias vacías!',
                    showConfirmButton: false,
                    timer: 1500
                })
            } else {
                let accesorio = {};

                accesorio.nombre = nombre;
                accesorio.precio_c = precio_c;
                accesorio.precio_v = precio_v;
                accesorio.marca = marca;
                accesorio.existencias = existencias;
                accesorio.estatus = txtEstatus;

                accesorios[indexaccesorioseleccionado] = accesorio;
                clean();
                notificacionActualización();
            }

        } else if (result.isDenied) {
            Swal.fire('Los cambios no se guardaron', '', 'info')
        }
    })


}

export function deleteAccesorio() {
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


            console.log(txtIdProducto);

            datos = {
                idProducto: txtIdProducto
            };

            params = new URLSearchParams(datos);


            fetch("../api/accesorio/delete?",
                    {
                        method: "PUT",
                        body: params
                    });
            cargarModuloCatalogoAccesorios();
        } else if (result.isDenied) {
            Swal.fire('Se cancelo la eliminación!', '', 'info');
        }
    });
}

fetch("moduloAccesorios/data_Accesorios.json")
        .then(response => {
            return response.json();
        })
        .then(function (jsondata) {
            accesorios = jsondata;
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

