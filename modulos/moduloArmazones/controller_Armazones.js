/* global Swal */

let indexarmazoneseleccionado;
let indiceAnterior = 0;
let armazones = [];
let txtIdArmazon;
let txtIdProducto;
let txtNombre;
let txtPrecioCompra;
let txtPrecioVenta;
let txtEstatus;
let txtMarca;
let txtModelo;
let txtExistencias;
let txtColor;
let txtDimensiones;
let txtDescripcion;
let imgArmazon;
let inputFileArmazon = null;

cargarModuloCatalogoArmazon();


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

    let url = "../api/armazon/getAll?filtro";

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

export function cargarModuloCatalogoArmazon() {
    document.getElementById('btnCatalogo').classList.remove("btn-light");
    document.getElementById('btnCatalogo').classList.add("btn-primary");
    document.getElementById('btnAgregar').classList.remove("btn-primary");
    document.getElementById('btnAgregar').classList.add("btn-light");
    document.getElementById('btnModificar').classList.remove("btn-primary");
    document.getElementById('btnModificar').classList.add("btn-light");
    document.getElementById('btnAgregar').classList.remove("disabled");
    document.getElementById('btnModificar').classList.add("disabled");
    document.getElementById('btnEliminar').classList.add("disabled");
    indexarmazoneseleccionado = 0;
    indiceAnterior = 0;

    fetch("moduloArmazones/moduloRegistroArmazones/view_CatalogoArmazones.html")
            .then(
                    function (response) {
                        return response.text();
                    }
            )
            .then(
                    function (html) {
                        document.getElementById("contenedor-modulo").innerHTML = html;
                        refrescarTabla();
                        $('#txtBuscarArmazones').on('keyup', function () {
                            $('#tblArmazonesHead').DataTable()
                                    .search(this.value)
                                    .draw();
                        });

                    }
            );
}

function tablaDataTable(data) {
    $(document).ready(function () {
        $('#tblArmazonesHead').DataTable({
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

export function cargarModuloRegistroArmazon() {
    document.getElementById('btnCatalogo').classList.remove("btn-primary");
    document.getElementById('btnCatalogo').classList.add("btn-light");
    document.getElementById('btnAgregar').classList.remove("btn-light");
    document.getElementById('btnAgregar').classList.add("btn-primary");
    document.getElementById('btnModificar').classList.remove("btn-primary");
    document.getElementById('btnModificar').classList.add("btn-light");

    fetch("moduloArmazones/moduloRegistroArmazones/view_RegistroArmazones.html")
            .then(
                    function (response) {
                        return response.text();
                    }
            )
            .then(
                    function (html) {
                        document.getElementById("contenedor-modulo").innerHTML = html;
                        inputFileArmazon = document.getElementById('inputFileImageArmazon');
                        inputFileArmazon.onchange = function (evt) {
                            subirFoto(inputFileArmazon);
                        };
                    }
            );
}

export function cargarModuloModificarArmazon() {
    document.getElementById('btnCatalogo').classList.remove("btn-primary");
    document.getElementById('btnCatalogo').classList.add("btn-light");
    document.getElementById('btnModificar').classList.remove("btn-light");
    document.getElementById('btnModificar').classList.add("btn-primary");
    fetch("moduloArmazones/moduloRegistroArmazones/view_ModificarArmazones.html")
            .then(
                    function (response) {
                        return response.text();
                    }
            )
            .then(
                    function (html) {
                        document.getElementById("contenedor-modulo").innerHTML = html;
                        leerDatos();
                        inputFileArmazon = document.getElementById('inputFileImageArmazon');
                        inputFileArmazon.onchange = function (evt) {
                            subirFoto(inputFileArmazon);
                        };
                    }
            );
}

export function boton() {
    document.getElementById("btnAgregar").classList.remove("disabled");
    document.getElementById("btnModificar").classList.add("disabled");
    document.getElementById("btnEliminar").classList.add("disabled");

}

export function save() {
    let datos = null;
    let params = null;

    let armazon = new Object();
    armazon.producto = new Object();

    if (validar()) {
    } else {
        if (document.getElementById("txtIdArmazon").value.trim().length < 1) {
            armazon.idArmazon = 0;
            armazon.producto.idProducto = 0;
        } else {
            armazon.idArmazon = parseInt(document.getElementById("txtIdArmazon").value);
            armazon.producto.idProducto = parseInt(document.getElementById("txtIdProducto").value);
        }

        if (document.getElementById("txtPrecioV").value > document.getElementById("txtPrecioC").value) {

            //Datos de Producto
            armazon.producto.nombre = document.getElementById("txtNombre").value;
            armazon.producto.marca = document.getElementById("txtMarca").value;
            armazon.producto.precioCompra = document.getElementById("txtPrecioC").value;
            armazon.producto.precioVenta = document.getElementById("txtPrecioV").value;
            armazon.producto.existencias = document.getElementById("txtExistencias").value;

            //Datos de Armazon
            armazon.modelo = document.getElementById("txtModelo").value;
            armazon.color = document.getElementById("txtColor").value;
            armazon.dimensiones = document.getElementById("txtDimensiones").value;
            armazon.descripcion = document.getElementById("txtDescripcion").value;
            armazon.fotografia = document.getElementById("txtaBase64").value;

            datos = {
                datosArmazon: JSON.stringify(armazon)
            };

            params = new URLSearchParams(datos);

            fetch("../api/armazon/save?",
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
                        document.getElementById("txtIdArmazon").value = data.idArmazon;
                        document.getElementById("txtIdProducto").value = data.idProducto;

                        Swal.fire('', 'Datos del armazon actualizados correctamente!', 'success');
                        clean();
                        cargarModuloCatalogoArmazon();
                    });
        } else {

            notificacion("error", "El precio de compra no puede ser menor al de venta!");

        }
    }
}

export function loadTabla(data) {
    let cuerpo = "";
    let estatusLetra = "";

    armazones = data;

    armazones.forEach(function (armazon) {
        if (armazon.producto.estatus === 1) {
            estatusLetra = "Activo";
        } else {
            estatusLetra = "Inactivo";
        }
        let registro =
                '<tr id="' + armazones.indexOf(armazon) + '"class="" onclick="moduloArmazones.selectArmazon(' + armazones.indexOf(armazon) + ');">' +
                '<td>' + armazon.producto.nombre + '</td>' +
                '<td>' + armazon.producto.marca + '</td>' +
                '<td>' + armazon.modelo + '</td>' +
                '<td>' + armazon.color + '</td>' +
                '<td>' + armazon.producto.codigoBarras + '</td>' +
                '<td>' + '<img class="rounded mx-auto d-block" style="width: 52px; height: 52px" src="data:image/png;base64,' + armazon.fotografia + '">' + '</td>' +
                '<td>' + armazon.producto.precioCompra + '</td>' +
                '<td>' + armazon.producto.precioVenta + '</td>' +
                '<td>' + armazon.producto.existencias + '</td>' +
                '<td>' + estatusLetra + '</td></tr>';
        cuerpo += registro;
    });
    document.getElementById("tblArmazon").innerHTML = cuerpo;
}

export function selectArmazon(index) {
    document.getElementById("btnModificar").classList.remove("disabled");
    document.getElementById("btnEliminar").classList.remove("disabled");
    document.getElementById("btnAgregar").classList.add("disabled");


    txtIdArmazon = armazones[index].idArmazon;
    txtIdProducto = armazones[index].producto.idProducto;
    txtNombre = armazones[index].producto.nombre;
    txtPrecioCompra = armazones[index].producto.precioCompra;
    txtPrecioVenta = armazones[index].producto.precioVenta;
    txtEstatus = armazones[index].producto.estatus;
    txtMarca = armazones[index].producto.marca;
    txtExistencias = armazones[index].producto.existencias;
    txtModelo = armazones[index].modelo;
    txtColor = armazones[index].color;
    txtDimensiones = armazones[index].dimensiones;
    txtDescripcion = armazones[index].descripcion;
    imgArmazon = armazones[index].fotografia;
    indexarmazoneseleccionado = index;

    if (indexarmazoneseleccionado === index) {
        document.getElementById(indiceAnterior).classList.remove('bg-info');
        document.getElementById(indiceAnterior).classList.remove('text-light');
        document.getElementById(indexarmazoneseleccionado).classList.add('bg-info');
        document.getElementById(indexarmazoneseleccionado).classList.add('text-light');

        if (indiceAnterior === indexarmazoneseleccionado) {
            document.getElementById("btnAgregar").classList.remove('disabled');
            document.getElementById("btnEliminar").classList.add('disabled');
            document.getElementById("btnModificar").classList.add('disabled');
            document.getElementById(indexarmazoneseleccionado).classList.remove('bg-info');
            document.getElementById(indexarmazoneseleccionado).classList.remove('text-light');
            indiceAnterior = 0;
            indexarmazoneseleccionado = 0;
        }
        indiceAnterior = indexarmazoneseleccionado;
    }
}

export function clean() {
    document.getElementById("txtNombre").value = "";
    document.getElementById("txtPrecioC").value = "";
    document.getElementById("txtPrecioV").value = "";
    document.getElementById("txtMarca").value = "";
    document.getElementById("txtModelo").value = "";
    document.getElementById("txtExistencias").value = "";
    document.getElementById("txtColor").value = "";
    document.getElementById("txtDimensiones").value = "";
    document.getElementById("txtDescripcion").value = "";

    document.getElementById("txtNombre").focus();
    indexarmazoneseleccionado = 0;
}

export function cleanQuestion() {
    Swal.fire({
        title: 'Estás seguro de limpiar el formulario?',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: 'Limpiar',
        denyButtonText: `Cancelar`
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire('Limpiados!', '', 'success');
            document.getElementById("txtNombre").value = "";
            document.getElementById("txtPrecioC").value = "";
            document.getElementById("txtPrecioV").value = "";
            document.getElementById("txtMarca").value = "";
            document.getElementById("txtModelo").value = "";
            document.getElementById("txtExistencias").value = "";
            document.getElementById("txtColor").value = "";
            document.getElementById("txtDimensiones").value = "";
            document.getElementById("txtDescripcion").value = "";
            document.getElementById("imgFoto").src = "../recursos/defaultImage.png";

            document.getElementById("txtNombre").focus();
            indexarmazoneseleccionado = 0;
        } else if (result.isDenied) {
            Swal.fire('No se limpio el formulario!', '', 'info');
        }
    });

}

export function leerDatos(index) {
    //Lee los datos
    document.getElementById("txtIdArmazon").value = txtIdArmazon;
    document.getElementById("txtIdProducto").value = txtIdProducto;
    document.getElementById("txtNombre").value = txtNombre;
    document.getElementById("txtPrecioC").value = txtPrecioCompra;
    document.getElementById("txtPrecioV").value = txtPrecioVenta;
    document.getElementById("txtMarca").value = txtMarca;
    document.getElementById("txtModelo").value = txtModelo;
    document.getElementById("txtExistencias").value = txtExistencias;
    document.getElementById("txtColor").value = txtColor;
    document.getElementById("txtDimensiones").value = txtDimensiones;
    document.getElementById("txtDescripcion").value = txtDescripcion;



    document.getElementById("txtaBase64").value = imgArmazon;
    document.getElementById('imgFoto').src = "data:image/png;base64," + imgArmazon;


    document.getElementById("txtNombre").focus();
}

export function showImageInputDialog() {
    document.getElementById('inputFileImageArmazon').click();
}

export function subirFoto(objetoInputFile) {
    if (objetoInputFile.files && objetoInputFile.files[0])
    {
        //Declaramos el lector de archivos
        let reader = new FileReader();

        //Agregamos un oyente al lector del arcvhivo para que
        //en cuanto el usuario cargue una imagen, esta se lea
        //y se convierta en una cadena de Base64

        reader.onload = function (e)
        {
            let fotoB64 = e.target.result;
            document.getElementById('imgFoto').src = fotoB64;
            document.getElementById('txtaBase64').value = fotoB64.substring(fotoB64.indexOf(",") + 1, fotoB64.length);

        };

        //Leemos el archivo que selecciono el usuario y lo
        //metemos allá
        reader.readAsDataURL(objetoInputFile.files[0]);
    }
}

export function deleteArmazon() {
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

            datos = {
                idProducto: txtIdProducto
            };

            params = new URLSearchParams(datos);


            fetch("../api/armazon/delete?",
                    {
                        method: "PUT",
                        body: params
                    });
            cargarModuloCatalogoArmazon();
        } else if (result.isDenied) {
            Swal.fire('Se cancelo la eliminación!', '', 'info');
        }
    });
}

function validar() {

    if (document.getElementById('txtNombre').value === "" && document.getElementById('txtPrecioC').value === "" &&
            document.getElementById('txtPrecioV').value === "" && document.getElementById('txtMarca').value === "" &&
            document.getElementById('txtColor').value === "" && document.getElementById('txtExistencias').value === "" &&
            document.getElementById('txtDimensiones').value === "" && document.getElementById('txtDescripcion').value === "") {
        notificacion("error", "Debes rellenar los campos!");
        return true;
    }

    if (document.getElementById('txtNombre').value === "") {
        notificacion("error", "No puedes tener el nombre vacio!");
        return true;
    }
    if (document.getElementById('txtPrecioC').value === "") {
        notificacion("error", "No puedes tener el precio de compra vacio!");
        return true;
    }
    if (document.getElementById('txtPrecioV').value === "") {
        notificacion("error", "No puedes tener el precio de venta vacio!");
        return true;
    }
    if (document.getElementById('txtMarca').value === "") {
        notificacion("error", "No puedes tener la marca vacia!");
        return true;
    }
    if (document.getElementById('txtModelo').value === "") {
        notificacion("error", "No puedes tener el modelo vacio!");
        return true;
    }
    if (document.getElementById('txtColor').value === "") {
        notificacion("error", "No puedes tener el color vacio!");
        return true;
    }
    if (document.getElementById('txtExistencias').value === "") {
        notificacion("error", "No puedes tener las existencias vacias!");
        return true;
    }
    if (document.getElementById('txtDimensiones').value === "") {
        notificacion("error", "No puedes tener las dimensiones vacio!");
        return true;
    }
    if (document.getElementById('txtDescripcion').value === "") {
        notificacion("error", "No puedes tener la descripcion vacia!");
        return true;
    }

    if (document.getElementById('txtaBase64').value === "") {
        notificacion("error", "Tienes que subir una imagen!");
        return true;
    }
    return false;
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

function notificacionActualización() {
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Se ha modificado correctamente!',
        showConfirmButton: false,
        timer: 1500
    });
}

function notificacionAñadir() {
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Se ha añadido correctamente!',
        showConfirmButton: false,
        timer: 1500
    });
}

function notificacion(type, messaje) {
    Swal.fire({
        position: 'center',
        icon: type,
        title: messaje,
        showConfirmButton: false,
        timer: 1500
    });
}
