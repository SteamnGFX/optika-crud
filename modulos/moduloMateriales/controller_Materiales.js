let indexmaterialeseleccionado;
let materiales = [];
let indiceAnterior = 0;
cargarModuloCatalogoMateriales();

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


export function cargarModuloCatalogoMateriales() {
    document.getElementById('btnCatalogo').classList.remove("btn-light");
    document.getElementById('btnCatalogo').classList.add("btn-primary");
    document.getElementById('btnAgregar').classList.remove("btn-primary");
    document.getElementById('btnAgregar').classList.add("btn-light");
    document.getElementById('btnModificar').classList.remove("btn-primary");
    document.getElementById('btnModificar').classList.add("btn-light");
    document.getElementById('btnAgregar').classList.remove("disabled");
    document.getElementById('btnModificar').classList.add("disabled");
    document.getElementById('btnEliminar').classList.add("disabled");
    indexmaterialeseleccionado = 0;
    indiceAnterior = 0;
    
    fetch("moduloMateriales/moduloRegistroMateriales/view_CatalogoMateriales.html")
            .then(
                    function (response) {
                        return response.text();
                    }
            )
            .then(
                    function (html) {
                        document.getElementById("contenedor-modulo").innerHTML = html;
                        loadTabla();
                        var $rows = $('#tblMateriales tr');
                        $('#txtBuscarMaterial').keyup(function () {
                            var val = $.trim($(this).val()).replace(/ +/g, ' ').toLowerCase();
                            $rows.show().filter(function () {
                                var text = $(this).text().replace(/\s+/g, ' ').toLowerCase();
                                return !~text.indexOf(val);
                            }).hide();
                        });
                        $(document).ready(function () {
                            $('#tblMaterialHead').DataTable({
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

export function cargarModuloModificarMateriales() {
    document.getElementById('btnCatalogo').classList.remove("btn-primary");
    document.getElementById('btnCatalogo').classList.add("btn-light");
    document.getElementById('btnModificar').classList.remove("btn-light");
    document.getElementById('btnModificar').classList.add("btn-primary");
    fetch("moduloMateriales/moduloRegistroMateriales/view_ModificarMateriales.html")
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
export function cargarModuloRegistroMateriales() {
    document.getElementById('btnCatalogo').classList.remove("btn-primary");
    document.getElementById('btnCatalogo').classList.add("btn-light");
    document.getElementById('btnAgregar').classList.remove("btn-light");
    document.getElementById('btnAgregar').classList.add("btn-primary");
    document.getElementById('btnModificar').classList.remove("btn-primary");
    document.getElementById('btnModificar').classList.add("btn-light");

    fetch("moduloMateriales/moduloRegistroMateriales/view_RegistroMateriales.html")
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



export function boton() {
    document.getElementById("btnAgregar").classList.remove("disabled");
    document.getElementById("btnModificar").classList.add("disabled");
    document.getElementById("btnEliminar").classList.add("disabled");
    document.getElementById("txtBuscarMaterial").value = "";
    document.getElementById("txtBuscarMaterial").focus();
}

export function getRandomInt(max) {
    return Math.floor(Math.random() * max);


}



export function addMaterial() {
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
            //GENERA LA CLAVE UNICA DE CLIENTE
            let primero = document.getElementById("txtNombre").value;
            let final = "OQM" + primero;

            if (nombre == "" && precio_cObtenido == "" && precio_vObtenido == "") {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'No puedes tener los campos vacíos!',
                    showConfirmButton: false,
                    timer: 1500
                })
            } else if (nombre == "") {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'No puedes tener el Nombre o más campos vacíos!',
                    showConfirmButton: false,
                    timer: 1500
                })
            } else if (precio_cObtenido == "") {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'No puedes tener el Precio de Compra o más campos vacíos!',
                    showConfirmButton: false,
                    timer: 1500
                })
            } else if (precio_vObtenido == "") {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'No puedes tener el Precio de venta o más campos vacíos!',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
            //form.submit();
            else {
                let material = {};

                material.numeroUnicoMaterial = final;
                material.nombre = nombre;
                material.precio_c = precio_c;
                material.precio_v = precio_v;


                material.estatus = "Activo";
                materiales.push(material);
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
    materiales.forEach(function (material) {
        let registro =
                '<tr id="' + materiales.indexOf(material) + '"class="" onclick="moduloMateriales.selectMaterial(' + materiales.indexOf(material) + ');">' +
                '<td>' + material.numeroUnicoMaterial + '</td>' +
                '<td>' + material.nombre + '</td>' +
                '<td>' + material.precio_c + '</td>' +
                '<td>' + material.precio_v + '</td>' +
                '<td>' + material.estatus + '</td></tr>';
        cuerpo += registro;
    });
    document.getElementById("tblMateriales").innerHTML = cuerpo;
    document.getElementById(0).classList.add("d-none");
}


let txtNombre;
let txtPrecioC;
let txtPrecioV;
let txtEstatus;
let txtNumUnico;

export function selectMaterial(index) {

    document.getElementById("btnModificar").classList.remove("disabled");
    document.getElementById("btnEliminar").classList.remove("disabled");
    document.getElementById("btnAgregar").classList.add("disabled");
    if (materiales[index].estatus === "Activo") {
        document.getElementById('btnEliminar').classList.remove("disabled");

    } else {
        document.getElementById('btnEliminar').classList.add("disabled");
        document.getElementById('btnAgregar').classList.remove("disabled");
    }

    txtNombre = materiales[index].nombre;
    txtPrecioC = materiales[index].precio_c;
    txtPrecioV = materiales[index].precio_v;
    txtEstatus = materiales[index].estatus;
    txtNumUnico = materiales[index].numeroUnicoMaterial;
    indexmaterialeseleccionado = index;

    if (indexmaterialeseleccionado === index) {
        document.getElementById(indiceAnterior).classList.remove('bg-info');
        document.getElementById(indiceAnterior).classList.remove('text-light');
        document.getElementById(indexmaterialeseleccionado).classList.add('bg-info');
        document.getElementById(indexmaterialeseleccionado).classList.add('text-light');

        if (indiceAnterior === indexmaterialeseleccionado) {
            document.getElementById("btnAgregar").classList.remove('disabled');
            document.getElementById("btnEliminar").classList.add('disabled');
            document.getElementById("btnModificar").classList.add('disabled');
            document.getElementById(indexmaterialeseleccionado).classList.remove('bg-info');
            document.getElementById(indexmaterialeseleccionado).classList.remove('text-light');
            indiceAnterior = 0;
            indexmaterialeseleccionado = 0;
        }
        indiceAnterior = indexmaterialeseleccionado;
    }
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
        if (result.isConfirmed) {
            Swal.fire('Limpiados!', '', 'success')
            document.getElementById("txtNumUnico").value = "";
            document.getElementById("txtNombre").value = "";
            document.getElementById("txtPrecioC").value = "";
            document.getElementById("txtPrecioV").value = "";
            document.getElementById("txtNombre").focus();
            indexmaterialeseleccionado = 0;
        } else if (result.isDenied) {
            Swal.fire('No se limpio el formulario!', '', 'info')
        }
    })
}


export function clean() {
    document.getElementById("txtNombre").value = "";
    document.getElementById("txtPrecioC").value = "";
    document.getElementById("txtPrecioV").value = "";
    document.getElementById("txtNombre").focus();
    indexmaterialeseleccionado = 0;
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
    document.getElementById("txtNumUnico").value = txtNumUnico;
    document.getElementById("txtPrecioC").value = newPrecioC2;
    document.getElementById("txtPrecioV").value = newPrecioV2;
    document.getElementById("txtEstatus").value = txtEstatus;
    document.getElementById("txtNombre").focus();
}



export function updateMaterial() {
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
                    precio_vObtenido,
                    numeroUnicoMaterial;

            numeroUnicoMaterial = document.getElementById("txtNumUnico").value;
            nombre = document.getElementById("txtNombre").value;
            precio_cObtenido = document.getElementById("txtPrecioC").value;
            precio_vObtenido = document.getElementById("txtPrecioV").value;
            precio_c = "$" + precio_cObtenido;
            precio_v = "$" + precio_vObtenido;
            estatus = txtEstatus;

            if (nombre == "" && precio_cObtenido == "" && precio_vObtenido == "") {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'No puedes tener los campos vacíos!',
                    showConfirmButton: false,
                    timer: 1500
                })
            } else if (nombre == "") {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'No puedes tener el Nombre o más campos vacíos!',
                    showConfirmButton: false,
                    timer: 1500
                })
            } else if (precio_cObtenido == "") {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'No puedes tener el Precio de Compra o más campos vacíos!',
                    showConfirmButton: false,
                    timer: 1500
                })
            } else if (precio_vObtenido == "") {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'No puedes tener el Precio de venta o más campos vacíos!',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
            //form.submit();
            else {
                let material = {};
                material.numeroUnicoMaterial = numeroUnicoMaterial;
                material.nombre = nombre;
                material.precio_c = precio_c;
                material.precio_v = precio_v;
                material.estatus = estatus;
                materiales[indexmaterialeseleccionado] = material;
                clean();
                notificacionActualización();
            }
        } else if (result.isDenied) {
            Swal.fire('Los cambios no se guardaron', '', 'info')
        }
    })

}

export function deleteMaterial() {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })

    Swal.fire({
        title: 'Estás seguro de eliminar?',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: 'Eliminar',
        denyButtonText: `Cancelar`,
    }).then((result) => {
        if (result.isConfirmed) {
            swalWithBootstrapButtons.fire(
                    'Eliminado!',
                    'Tú registro se ha eliminado.',
                    'success'
                    );

            materiales[indexmaterialeseleccionado].estatus = "Inactivo";
            loadTabla();
        } else if (result.isDenied) {
            Swal.fire('Se cancelo la eliminación!', '', 'info')
        }
    });
}

fetch("moduloMateriales/data_Materiales.json")
        .then(response => {
            return response.json();
        })
        .then(function (jsondata) {
            materiales = jsondata;
            loadTabla();
        }
        );


export function searchMaterial() {
    let filtro = document.getElementById("txtBuscarMaterial").value;
    let resultadosMaterial = materiales.filter(element => element.material === filtro);
    let resultadosNombre = materiales.filter(element => element.numeroUnicoMaterial === filtro);
    let resultadosPrecioC = materiales.filter(element => element.precio_c === filtro);
    let resultadosPrecioV = materiales.filter(element => element.precio_v === filtro);
    let resultadosEstatus = materiales.filter(element => element.estatus === filtro);

    let cuerpo = "";

    resultadosMaterial.forEach(function (material) {
        let registro =
                '<tr onclick="modulomaterial.selectmaterial(' + materiales.indexOf(material) + ');">' +
                '<td>' + material.numeroUnicoMaterial + '</td>' +
                '<td>' + material.nombre + '</td>' +
                '<td>' + material.precio_c + '</td>' +
                '<td>' + material.precio_v + '</td>' +
                '<td>' + material.estatus + '</td></tr>';
        cuerpo += registro;
    });

    resultadosNombre.forEach(function (material) {
        let registro =
                '<tr onclick="modulomaterial.selectmaterial(' + materiales.indexOf(material) + ');">' +
                '<td>' + material.numeroUnicoMaterial + '</td>' +
                '<td>' + material.nombre + '</td>' +
                '<td>' + material.precio_c + '</td>' +
                '<td>' + material.precio_v + '</td>' +
                '<td>' + material.estatus + '</td></tr>';
        cuerpo += registro;
    });

    resultadosPrecioC.forEach(function (material) {
        let registro =
                '<tr onclick="modulomaterial.selectmaterial(' + materiales.indexOf(material) + ');">' +
                '<td>' + material.numeroUnicoMaterial + '</td>' +
                '<td>' + material.nombre + '</td>' +
                '<td>' + material.precio_c + '</td>' +
                '<td>' + material.precio_v + '</td>' +
                '<td>' + material.estatus + '</td></tr>';
        cuerpo += registro;
    });

    resultadosPrecioV.forEach(function (material) {
        let registro =
                '<tr onclick="modulomaterial.selectmaterial(' + materiales.indexOf(material) + ');">' +
                '<td>' + material.numeroUnicoMaterial + '</td>' +
                '<td>' + material.nombre + '</td>' +
                '<td>' + material.precio_c + '</td>' +
                '<td>' + material.precio_v + '</td>' +
                '<td>' + material.estatus + '</td></tr>';
        cuerpo += registro;
    });



    resultadosEstatus.forEach(function (material) {
        let registro =
                '<tr onclick="modulomaterial.selectmaterial(' + materiales.indexOf(material) + ');">' +
                '<td>' + material.numeroUnicoMaterial + '</td>' +
                '<td>' + material.nombre + '</td>' +
                '<td>' + material.precio_c + '</td>' +
                '<td>' + material.precio_v + '</td>' +
                '<td>' + material.estatus + '</td></tr>';
        cuerpo += registro;
    });
    document.getElementById("tblMateriales").innerHTML = cuerpo;
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

