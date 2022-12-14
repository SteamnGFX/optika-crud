/* global Swal */

let indexLenteCGSeleccionado;
let lentesCG = [];
let indexLenteCESeleccionado;
let lentesCE = [];
let indiceAnterior = 0;
let indiceAnteriorE = 0;
let inputFileLenteContactoEstetico = null;

cargarModuloCatalogoLentesCG();

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



export function cargarModuloCatalogoLentesCG() {

    document.getElementById('btnCatalogo').classList.remove("btn-light");
    document.getElementById('btnCatalogo').classList.add("btn-primary");
    document.getElementById('btnAgregar').classList.remove("btn-primary");
    document.getElementById('btnAgregar').classList.add("btn-light");
    document.getElementById('btnModificar').classList.remove("btn-primary");
    document.getElementById('btnModificar').classList.add("btn-light");
    document.getElementById('btnAgregar').classList.remove("disabled");
    document.getElementById('btnModificar').classList.add("disabled");
    document.getElementById('btnEliminar').classList.add("disabled");
    indexLenteCGSeleccionado = 0;
    indiceAnterior = 0;

    fetch("moduloLentesContacto/moduloRegistroLentesContacto/view_CatalogoLentesContactoG.html")
            .then(
                    function (response) {
                        return response.text();
                    }
            )
            .then(
                    function (html) {
                        document.getElementById("contenedor-modulo").innerHTML = html;
                        loadTabla();
                        var $rows = $('#tblLentesCG tr');
                        $('#txtBuscarLenteCG').keyup(function () {
                            var val = $.trim($(this).val()).replace(/ +/g, ' ').toLowerCase();
                            $rows.show().filter(function () {
                                var text = $(this).text().replace(/\s+/g, ' ').toLowerCase();
                                return !~text.indexOf(val);
                            }).hide();
                        });
                        $(document).ready(function () {
                            $('#tblLentesCGHead').DataTable({
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

export function cargarModuloCatalogoLentesCE() {
    document.getElementById('btnCatalogo').classList.remove("btn-light");
    document.getElementById('btnCatalogo').classList.add("btn-primary");
    document.getElementById('btnAgregar').classList.remove("btn-primary");
    document.getElementById('btnAgregar').classList.add("btn-light");
    document.getElementById('btnModificar').classList.remove("btn-primary");
    document.getElementById('btnModificar').classList.add("btn-light");
    document.getElementById('btnAgregar').classList.remove("disabled");
    document.getElementById('btnModificar').classList.add("disabled");
    document.getElementById('btnEliminar').classList.add("disabled");
    indexLenteCESeleccionado = 0;
    indiceAnterior = 0;

    fetch("moduloLentesContacto/moduloRegistroLentesContacto/view_CatalogoLentesContactoE.html")
            .then(
                    function (response) {
                        return response.text();
                    }
            )
            .then(
                    function (html) {
                        document.getElementById("contenedor-modulo").innerHTML = html;
                        refrescarTabla();
                        $('#txtBuscarLentesCE').on('keyup', function () {
                            $('#tblLentesCEHead').DataTable()
                                    .search(this.value)
                                    .draw();
                        });

                    }
            );
}


export function cargarModuloRegistroLentesCG() {
    document.getElementById('btnCatalogo').classList.remove("btn-primary");
    document.getElementById('btnCatalogo').classList.add("btn-light");
    document.getElementById('btnAgregar').classList.remove("btn-light");
    document.getElementById('btnAgregar').classList.add("btn-primary");
    document.getElementById('btnModificar').classList.remove("btn-primary");
    document.getElementById('btnModificar').classList.add("btn-light");

    fetch("moduloLentesContacto/moduloRegistroLentesContacto/view_RegistroLentesContactoG.html")
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

export function cargarModuloRegistroLentesCE() {
    document.getElementById('btnCatalogo').classList.remove("btn-light");
    document.getElementById('btnCatalogo').classList.add("btn-primary");
    document.getElementById('btnAgregar').classList.remove("btn-primary");
    document.getElementById('btnAgregar').classList.add("btn-light");
    document.getElementById('btnModificar').classList.remove("btn-primary");
    document.getElementById('btnModificar').classList.add("btn-light");
    document.getElementById('btnAgregar').classList.remove("disabled");
    document.getElementById('btnModificar').classList.add("disabled");
    document.getElementById('btnEliminar').classList.add("disabled");
    indexLenteCESeleccionado = 0;
    indiceAnterior = 0;


    fetch("moduloLentesContacto/moduloRegistroLentesContacto/view_RegistroLentesContactoE.html")
            .then(
                    function (response) {
                        return response.text();
                    }
            )
            .then(
                    function (html) {
                        document.getElementById("contenedor-modulo").innerHTML = html;
                        inputFileLenteContactoEstetico = document.getElementById('inputFileImageLenteContactoEstetico');
                        inputFileLenteContactoEstetico.onchange = function (evt) {
                            subirFotoE(inputFileLenteContactoEstetico);
                        };
                    }
            );
}

export function cargarModuloModificarLentesCG() {
    document.getElementById('btnCatalogo').classList.remove("btn-primary");
    document.getElementById('btnCatalogo').classList.add("btn-light");
    document.getElementById('btnModificar').classList.remove("btn-light");
    document.getElementById('btnModificar').classList.add("btn-primary");
    fetch("moduloLentesContacto/moduloRegistroLentesContacto/view_ModificarLentesContactoG.html")
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

export function cargarModuloModificarLentesCE() {
    document.getElementById('btnCatalogo').classList.remove("btn-primary");
    document.getElementById('btnCatalogo').classList.add("btn-light");
    document.getElementById('btnModificar').classList.remove("btn-light");
    document.getElementById('btnModificar').classList.add("btn-primary");
    fetch("moduloLentesContacto/moduloRegistroLentesContacto/view_ModificarLentesContactoE.html")
            .then(
                    function (response) {
                        return response.text();
                    }
                )
            .then(
             function (html) {
                        document.getElementById("contenedor-modulo").innerHTML = html;
                        leerDatosE();
                        inputFileLenteContactoEstetico = document.getElementById('inputFileImageLenteContactoEstetico');
                        inputFileLenteContactoEstetico.onchange = function (evt) {
                            subirFotoE(inputFileLenteContactoEstetico);
                        };
                    }
                      
            );
            
            ;
}

export function boton() {
    document.getElementById("btnAgregar").classList.remove("disabled");
    document.getElementById("btnModificar").classList.add("disabled");
    document.getElementById("btnEliminar").classList.add("disabled");

}


export function inicializar() {
    //setDetalleVisible(true);
    refrescarTabla();
}

export function refrescarTabla() {
    let url = "../api/lenteContacto/getAll";

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
                loadTablaE(data);
                tablaDataTable(data);
            });
}

function tablaDataTable(data) {
    $(document).ready(function () {
        $('#tblLentesCEHead').DataTable({
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


export function agregarLentesCG() {
    Swal.fire({
        title: 'Estás seguro de guardar los cambios?',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: 'Guardar',
        denyButtonText: `No Guardar`
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            Swal.fire('Ops...!', '', 'error');
            let
                    nombre,
                    marca,
                    color,
                    queratometria,
                    esferaD,
                    esferaI,
                    cilindroD,
                    cilindroI,
                    ejeD,
                    ejeI,
                    distanciaD,
                    distanciaI,
                    precioC,
                    precioV,
                    precioC_Obtenido,
                    precioV_Obtenido;

            nombre = document.getElementById("txtNombre").value;
            marca = document.getElementById("txtMarca").value;
            color = document.getElementById("txtColor").value;
            queratometria = document.getElementById("txtQueratometria").value;
            esferaD = document.getElementById("txtEsferaD").value;
            esferaI = document.getElementById("txtEsferaI").value;
            cilindroD = document.getElementById("txtCilindroD").value;
            cilindroI = document.getElementById("txtCilindroI").value;
            ejeD = document.getElementById("txtEjeD").value;
            ejeI = document.getElementById("txtEjeI").value;
            distanciaD = document.getElementById("txtDistanciaD").value;
            distanciaI = document.getElementById("txtDistanciaI").value;
            precioC_Obtenido = document.getElementById("txtPrecioC").value;
            precioV_Obtenido = document.getElementById("txtPrecioV").value;
            precioC = "$" + precioC_Obtenido;
            precioV = "$" + precioV_Obtenido;
            if (nombre === "" && marca === "" && color === "" && queratometria === "" && esferaD === "" && esferaI === "" && cilindroD === "" &&
                    cilindroI === "" && ejeD === "" && ejeI === "" && distanciaD === "" && distanciaI === "" && precioC_Obtenido === "" && precioV_Obtenido === "") {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'No puedes tener los campos vacíos!',
                    showConfirmButton: false,
                    timer: 1500
                });

            } else {
                //form.submit();
                let lenteCG = {};
                lenteCG.nombre = nombre;
                lenteCG.marca = marca;
                lenteCG.color = color;
                lenteCG.queratometria = queratometria;
                lenteCG.esferaD = esferaD;
                lenteCG.esferaI = esferaI;
                lenteCG.cilindroD = cilindroD;
                lenteCG.cilindroI = cilindroI;
                lenteCG.ejeD = ejeD;
                lenteCG.ejeI = ejeI;
                lenteCG.distanciaD = distanciaD;
                lenteCG.distanciaI = distanciaI;
                lenteCG.estatus = "Activo";
                lenteCG.precioC = precioC;
                lenteCG.precioV = precioV;
                lentesCG.push(lenteCG);
                clean();
                notificacionAñadir();
            }


        } else if (result.isDenied) {
            Swal.fire('Los cambios no se guardaron', '', 'info');
        }
    });

}



export function agregarLentesCE() {
    Swal.fire({
        title: 'Estás seguro de guardar los cambios?',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: 'Guardar',
        denyButtonText: `No Guardar`
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            Swal.fire('Ops...!', '', 'error');
            let
                    nombre,
                    marca,
                    color,
                    queratometria,
                    precioC,
                    precioV,
                    precioC_Obtenido,
                    precioV_Obtenido;

            nombre = document.getElementById("txtNombreE").value;
            marca = document.getElementById("txtMarcaE").value;
            color = document.getElementById("txtColorE").value;
            queratometria = document.getElementById("txtQueratometriaE").value;
            precioC_Obtenido = document.getElementById("txtPrecioC").value;
            precioV_Obtenido = document.getElementById("txtPrecioV").value;
            precioC = "$" + precioC_Obtenido;
            precioV = "$" + precioV_Obtenido;

            if (nombre === "" && marca === "" && color === "" && queratometria === "") {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'No puedes tener los Campos vacíos!',
                    showConfirmButton: false,
                    timer: 1500
                });
            } else if (nombre === "") {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'No puedes tener Nombre vacío!',
                    showConfirmButton: false,
                    timer: 1500
                });
            } else if (color === "") {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'No puedes tener Color vacío!',
                    showConfirmButton: false,
                    timer: 1500
                });
            } else if (marca === "") {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'No puedes tener Marca vacío!',
                    showConfirmButton: false,
                    timer: 1500
                });
            } else if (queratometria === "") {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'No puedes tener Queratometrai vacío!',
                    showConfirmButton: false,
                    timer: 1500
                });
            } else {
                let lenteCE = {};

                lenteCE.nombre = nombre;
                lenteCE.marca = marca;
                lenteCE.color = color;
                lenteCE.queratometria = queratometria;
                lenteCE.estatus = "Activo";
                lenteCE.precioC = precioC;
                lenteCE.precioV = precioV;
                lentesCE.push(lenteCE);
                clean();
                notificacionAñadir();

            }
            //form.submit();

        } else if (result.isDenied) {
            Swal.fire('Los cambios no se guardaron', '', 'info');
        }
    });



}

export function saveLE() {
    let datos = null;
    let params = null;

    let LenteEstetico = new Object();
    LenteEstetico.producto = new Object();

    if (document.getElementById("txtIdLenteEstetico").value.trim().length < 1) {
        LenteEstetico.idLenteContacto = 0;
        LenteEstetico.producto.idProducto = 0;
    } else {
        LenteEstetico.idLenteContacto = parseInt(document.getElementById("txtIdLenteEstetico").value);
        LenteEstetico.producto.idProducto = parseInt(document.getElementById("txtIdProducto").value);
    }

    //Datos de Producto
    LenteEstetico.producto.nombre = document.getElementById("txtNombreE").value;
    LenteEstetico.producto.marca = document.getElementById("txtMarcaE").value;
    LenteEstetico.producto.precioCompra = document.getElementById("txtPrecioCE").value;
    LenteEstetico.producto.precioVenta = document.getElementById("txtPrecioVE").value;
    LenteEstetico.producto.existencias = document.getElementById("txtExistenciaE").value;

    //Datos de Lente de Contacto Estetico
    LenteEstetico.color = document.getElementById("txtColorE").value;
    LenteEstetico.keratometria = document.getElementById("txtQueratometriaE").value;
    LenteEstetico.fotografia = document.getElementById("txtaBase64LenteCE").value;

    datos = {
        datosLenteContactoE: JSON.stringify(LenteEstetico)
    };


    params = new URLSearchParams(datos);

    fetch("../api/lenteContacto/save?",
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
                document.getElementById("txtIdLenteEstetico").value = data.idLenteContacto;
                document.getElementById("txtIdProducto").value = data.idProducto;

                Swal.fire('', 'Datos de lentes de contacto actualizados correctamente!', 'success');
                cleanE();
                cargarModuloCatalogoLentesCE()();
            });
}


export function deleteLenteCE() {
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
                idProducto: txtIdProductoE
            };

            params = new URLSearchParams(datos);


            fetch("../api/lenteContacto/delete?",
                    {
                        method: "PUT",
                        body: params
                    });
            cargarModuloCatalogoLentesCE();
        } else if (result.isDenied) {
            Swal.fire('Se cancelo la eliminación!', '', 'info');
        }
    });
    
}



export function loadTabla(data) {

    let cuerpo = "";
    lentesCG.forEach(function (lenteCG) {
        let registro =
                '<tr id="' + lentesCG.indexOf(lenteCG) + '"class="" onclick="moduloLentesCG.SeleccionarLenteCG(' + lentesCG.indexOf(lenteCG) + ');">' +
                '<td>' + lenteCG.nombre + '</td>' +
                '<td>' + lenteCG.marca +
                '<td>' + lenteCG.color +
                '<td>' + lenteCG.queratometria + '</td>' +
                '<td>' + "Foto" + '</td>' +
                '<td>' + lenteCG.precioC + '</td>' +
                '<td>' + lenteCG.precioV + '</td>' +
                '<td>' + lenteCG.esferaD + '</td>' +
                '<td>' + lenteCG.esferaI + '</td>' +
                '<td>' + lenteCG.cilindroD + '</td>' +
                '<td>' + lenteCG.cilindroI + '</td>' +
                '<td>' + lenteCG.ejeD + '</td>' +
                '<td>' + lenteCG.ejeI + '</td>' +
                '<td>' + lenteCG.distanciaD + '</td>' +
                '<td>' + lenteCG.distanciaI + '</td>' +
                '<td>' + lenteCG.estatus + '</td></tr>';
        cuerpo += registro;
    });
    document.getElementById("tblLentesCG").innerHTML = cuerpo;
}

export function loadTablaE(data) {
    lentesCE = data;
    let cuerpo = "";
    lentesCE.forEach(function (lenteCE) {
        let registro =
                '<tr id="' + lentesCE.indexOf(lenteCE) + '"class="" onclick="moduloLentesCE.SeleccionarLenteCE(' + lentesCE.indexOf(lenteCE) + ');">' +
                '<td>' + lenteCE.producto.nombre + '</td>' +
                '<td>' + lenteCE.producto.marca +
                '<td>' + lenteCE.color + '</td>' +
                '<td>' + lenteCE.keratometria + '</td>' +
                '<td>' + '<img class="rounded mx-auto d-block" style="width: 52px; height: 52px" src="data:image/png;base64,' + lenteCE.fotografia + '">' + '</td>' +
                '<td>' + lenteCE.producto.precioCompra + '</td>' +
                '<td>' + lenteCE.producto.precioVenta + '</td>' +
                '<td>' + lenteCE.producto.estatus + '</td></tr>';
        cuerpo += registro;
    });
    document.getElementById("tblLentesCE").innerHTML = cuerpo;


}

let txtMarca;
let txtNombre;
let txtColor;
let txtQueratometria;
let txtEsferaD;
let txtCilindroD;
let txtEjeD;
let txtDistanciaD;
let txtEsferaI;
let txtCilindroI;
let txtPrecioC;
let txtPrecioCE;
let txtPrecioV;
let txtPrecioVE;
let txtEjeI;
let txtDistanciaI;
let txtEstatus;
let txtMarcaE;
let txtNombreE;
let txtColorE;
let txtEstatusE;
let txtQueratometriaE;
let txtIdProductoE;
let txtIdLenteCE;
let txtFoto;
let txtFotoE;
let txtExistenciaE;

export function SeleccionarLenteCG(index) {
    document.getElementById("btnModificar").classList.remove("disabled");
    document.getElementById("btnEliminar").classList.remove("disabled");
    document.getElementById("btnAgregar").classList.add("disabled");
    if (lentesCG[index].estatus === "Activo") {
        document.getElementById('btnEliminar').classList.remove("disabled");

    } else {
        document.getElementById('btnEliminar').classList.add("disabled");
        document.getElementById('btnAgregar').classList.remove("disabled");
    }

    txtMarca = lentesCG[index].marca;
    txtNombre = lentesCG[index].nombre;
    txtColor = lentesCG[index].color;
    txtQueratometria = lentesCG[index].queratometria;
    txtEsferaD = lentesCG[index].esferaD;
    txtEsferaI = lentesCG[index].esferaI;
    txtCilindroD = lentesCG[index].cilindroD;
    txtCilindroI = lentesCG[index].cilindroI;
    txtEjeD = lentesCG[index].ejeD;
    txtEjeI = lentesCG[index].ejeI;
    txtDistanciaD = lentesCG[index].distanciaD;
    txtDistanciaI = lentesCG[index].distanciaI;
    txtEstatus = lentesCG[index].estatus;
    txtPrecioC = lentesCG[index].precioC;
    txtPrecioV = lentesCG[index].precioV;

    indexLenteCGSeleccionado = index;


    if (indexLenteCGSeleccionado === index) {
        document.getElementById(indiceAnterior).classList.remove('bg-info');
        document.getElementById(indiceAnterior).classList.remove('text-light');
        document.getElementById(indexLenteCGSeleccionado).classList.add('bg-info');
        document.getElementById(indexLenteCGSeleccionado).classList.add('text-light');

        if (indiceAnterior === indexLenteCGSeleccionado) {
            document.getElementById("btnAgregar").classList.remove('disabled');
            document.getElementById("btnEliminar").classList.add('disabled');
            document.getElementById("btnModificar").classList.add('disabled');
            document.getElementById(indexLenteCGSeleccionado).classList.remove('bg-info');
            document.getElementById(indexLenteCGSeleccionado).classList.remove('text-light');
            indiceAnterior = 0;
            indexLenteCGSeleccionado = 0;
        }
        indiceAnterior = indexLenteCGSeleccionado;
    }

}


export function SeleccionarLenteCE(index) {
    document.getElementById("btnModificar").classList.remove("disabled");
    document.getElementById("btnEliminar").classList.remove("disabled");
    document.getElementById("btnAgregar").classList.add("disabled");

    if (lentesCE[index].producto.estatus === 1) {
        document.getElementById('btnEliminar').classList.remove("disabled");

    } else {
        document.getElementById('btnEliminar').classList.add("disabled");
        document.getElementById('btnAgregar').classList.remove("disabled");
    }

    txtIdProductoE = lentesCE[index].producto.idProducto;
    txtIdLenteCE = lentesCE[index].idLenteContacto;
    txtMarcaE = lentesCE[index].producto.marca;
    txtNombreE = lentesCE[index].producto.nombre;
    txtColorE = lentesCE[index].color;
    txtQueratometriaE = lentesCE[index].keratometria;
    txtEstatusE = lentesCE[index].producto.estatus;
    txtPrecioCE = lentesCE[index].producto.precioCompra;
    txtPrecioVE = lentesCE[index].producto.precioVenta;
    txtExistenciaE = lentesCE[index].producto.existencias;
    txtFotoE = lentesCE[index].fotografia;
    indexLenteCESeleccionado = index;

    if (indexLenteCESeleccionado === index) {
        document.getElementById(indiceAnterior).classList.remove('bg-info');
        document.getElementById(indiceAnterior).classList.remove('text-light');
        document.getElementById(indexLenteCESeleccionado).classList.add('bg-info');
        document.getElementById(indexLenteCESeleccionado).classList.add('text-light');

        if (indiceAnterior === indexLenteCESeleccionado) {
            document.getElementById("btnAgregar").classList.remove('disabled');
            document.getElementById("btnEliminar").classList.add('disabled');
            document.getElementById("btnModificar").classList.add('disabled');
            document.getElementById(indexLenteCESeleccionado).classList.remove('bg-info');
            document.getElementById(indexLenteCESeleccionado).classList.remove('text-light');
            indiceAnterior = 0;
            indexLenteCESeleccionado = 0;
        }
        indiceAnterior = indexLenteCESeleccionado;
    }

}


export function clean() {
    document.getElementById("txtNombre").value = "";
    document.getElementById("txtMarca").value = "";
    document.getElementById("txtColor").value = "";
    document.getElementById("txtQueratometria").value = "";
    document.getElementById("txtEsferaD").value = "";
    document.getElementById("txtEsferaI").value = "";
    document.getElementById("txtCilindroD").value = "";
    document.getElementById("txtCilindroI").value = "";
    document.getElementById("txtEjeD").value = "";
    document.getElementById("txtEjeI").value = "";
    document.getElementById("txtDistanciaD").value = "";
    document.getElementById("txtDistanciaI").value = "";
    document.getElementById("txtPrecioC").value = "";
    document.getElementById("txtPrecioV").value = "";

    document.getElementById("txtNombre").focus();
    indexLenteCGSeleccionado = 0;

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
            document.getElementById("txtMarca").value = "";
            document.getElementById("txtColor").value = "";
            document.getElementById("txtQueratometria").value = "";
            document.getElementById("txtEsferaD").value = "";
            document.getElementById("txtEsferaI").value = "";
            document.getElementById("txtCilindroD").value = "";
            document.getElementById("txtCilindroI").value = "";
            document.getElementById("txtEjeD").value = "";
            document.getElementById("txtEjeI").value = "";
            document.getElementById("txtDistanciaD").value = "";
            document.getElementById("txtDistanciaI").value = "";
            document.getElementById("txtPrecioC").value = "";
            document.getElementById("txtPrecioV").value = "";

            document.getElementById("txtNombre").focus();
            indexLenteCGSeleccionado = 0;
        } else if (result.isDenied) {
            Swal.fire('No se limpio el formulario!', '', 'info');
        }
    });

}

export function cleanE() {
    document.getElementById("txtNombreE").value = "";
    document.getElementById("txtMarcaE").value = "";
    document.getElementById("txtColorE").value = "";
    document.getElementById("txtPrecioCE").value = "";
    document.getElementById("txtPrecioVE").value = "";
    document.getElementById("txtQueratometriaE").value = "";
    document.getElementById("txtExistenciaE").value = "";

}

export function cleanQuestionE() {

    Swal.fire({
        title: 'Estás seguro de limpiar el formulario?',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: 'Limpiar',
        denyButtonText: `Cancelar`
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire('Limpiados!', '', 'success');
            document.getElementById("txtNombreE").value = "";
            document.getElementById("txtMarcaE").value = "";
            document.getElementById("txtColorE").value = "";
            document.getElementById("txtPrecioC").value = "";
            document.getElementById("txtPrecioV").value = "";
            document.getElementById("txtQueratometriaE").value = "";



            document.getElementById("txtNombreE").focus();
            indexLenteCESeleccionado = 0;
        } else if (result.isDenied) {
            Swal.fire('No se limpio el formulario!', '', 'info');
        }
    });


}

export function leerDatos(index) {
    //Lee los datos
    document.getElementById("txtNombre").value = txtNombre;
    document.getElementById("txtMarca").value = txtMarca;
    document.getElementById("txtColor").value = txtColor;
    document.getElementById("txtQueratometria").value = txtQueratometria;
    document.getElementById("txtEsferaD").value = txtEsferaD;
    document.getElementById("txtEsferaI").value = txtEsferaI;
    document.getElementById("txtCilindroD").value = txtCilindroD;
    document.getElementById("txtCilindroI").value = txtCilindroI;
    document.getElementById("txtEjeD").value = txtEjeD;
    document.getElementById("txtEjeI").value = txtEjeI;
    document.getElementById("txtDistanciaD").value = txtDistanciaD;
    document.getElementById("txtDistanciaI").value = txtDistanciaI;
    document.getElementById("txtPrecioC").value = newPrecioC2;
    document.getElementById("txtPrecioV").value = newPrecioV2;

    document.getElementById("txtNombre").focus();

}

export function leerDatosE(index) {
    //Lee los datos
    document.getElementById("txtIdLenteEstetico").value = txtIdLenteCE;
    document.getElementById("txtIdProducto").value = txtIdProductoE;
    document.getElementById("txtNombreE").value = txtNombreE;
    document.getElementById("txtMarcaE").value = txtMarcaE;
    document.getElementById("txtColorE").value = txtColorE;
    document.getElementById("txtQueratometriaE").value = txtQueratometriaE;
    document.getElementById("txtNombreE").focus();
    document.getElementById("txtExistenciaE").value = txtExistenciaE;
    document.getElementById("txtPrecioCE").value = txtPrecioCE;
    document.getElementById("txtPrecioVE").value = txtPrecioVE;


    document.getElementById("txtaBase64LenteCE").value = txtFotoE;
    document.getElementById('imgFotoLenteCE').src = "data:image/png;base64," + txtFotoE;
}

fetch("moduloLentesContacto/data_LentesCG.json")
        .then(response => {
            return response.json();
        })
        .then(function (jsondata) {
            lentesCG = jsondata;
            loadTabla();
        }
        );

fetch("moduloLentesContacto/data_LentesCE.json")
        .then(response => {
            return response.json();
        })
        .then(function (jsondata) {
            lentesCE = jsondata;
            loadTablaE();
        }
        );

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

export function showImageInputDialogLentesCE() {
    document.getElementById('inputFileImageLenteContactoEstetico').click();
}

export function subirFotoE(objetoInputFile) {
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
            document.getElementById('imgFotoLenteCE').src = fotoB64;
            document.getElementById('txtaBase64LenteCE').value = fotoB64.substring(fotoB64.indexOf(",") + 1, fotoB64.length);

        };

        //Leemos el archivo que selecciono el usuario y lo
        //metemos allá
        reader.readAsDataURL(objetoInputFile.files[0]);
    }
}


