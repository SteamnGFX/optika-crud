//  ESTA ES LA PRIMER LLAMADA FETCH.
//  AL AGREGAR UNA NUEVO MODULO llamarlo como cargarNuevo
//  es importante leer la parte del CONTROLADOR
//  EJEMPLO
//  moduloCliente = controller
//  ESTA es para definir al momento de hacer ONCLICK
//  Si se agrega otro sería moduloNuevo

function cargarHome() {
    document.getElementById("navbar-home").style.fontWeight = "bold";
    document.getElementById("navbar-clientes").style.fontWeight = "";
    document.getElementById("navbar-empleados").style.fontWeight = "";
    document.getElementById("navbar-soluciones").style.fontWeight = "";
    document.getElementById("navbar-productos").style.fontWeight = "";
    document.getElementById("navbar-tratamientos").style.fontWeight = "";
    document.getElementById("navbar-materiales").style.fontWeight = "";
    document.getElementById("navbar-lentesDeContacto").style.fontWeight = "";
    document.getElementById("navbar-armazones").style.fontWeight = "";
    document.getElementById("navbar-accesorios").style.fontWeight = "";
    document.getElementById("navbar-servicios").style.fontWeight = "";
    document.getElementById("navbar-examenVista").style.fontWeight = "";
    document.getElementById("navbar-otros").style.fontWeight = "";

    fetch("moduloHome/view_Home.html")
            .then(
                    function (response) {
                        return response.text();
                    }
            ).then(
            function (html) {
                document.getElementById("contenedorPrincipal").innerHTML = html;
            }
    );
}

function cargarModuloClientes(){
        document.getElementById("navbar-home").style.fontWeight = "";
        document.getElementById("navbar-empleados").style.fontWeight = "";
        document.getElementById("navbar-soluciones").style.fontWeight = "";
        document.getElementById("navbar-productos").style.fontWeight = "";
        document.getElementById("navbar-tratamientos").style.fontWeight = "";
        document.getElementById("navbar-lentesDeContacto").style.fontWeight = "";
        document.getElementById("navbar-materiales").style.fontWeight = "";
        document.getElementById("navbar-clientes").style.fontWeight = "bold";
        document.getElementById("navbar-armazones").style.fontWeight = "";
        document.getElementById("navbar-accesorios").style.fontWeight = "";
        document.getElementById("navbar-servicios").style.fontWeight = "";
        document.getElementById("navbar-examenVista").style.fontWeight = "";
        document.getElementById("navbar-otros").style.fontWeight = "";
        fetch("moduloClientes/view_Clientes.html")
        .then(
                function(response){
                return response.text();
                }
        )
        .then(
                function(html){
                document.getElementById("contenedorPrincipal").innerHTML = html;
                import ("../modulos/moduloClientes/controller_Clientes.js").then(
                        function(controller){
                        moduloCliente = controller;
                                moduloCliente.loadClientCatalogModule();
                        }
                );
                }
        );
        }



function cargarModuloEmpleados(){
        document.getElementById("navbar-home").style.fontWeight = "";
        document.getElementById("navbar-clientes").style.fontWeight = "";
        document.getElementById("navbar-soluciones").style.fontWeight = "";
        document.getElementById("navbar-productos").style.fontWeight = "";
        document.getElementById("navbar-tratamientos").style.fontWeight = "";
        document.getElementById("navbar-lentesDeContacto").style.fontWeight = "";
        document.getElementById("navbar-empleados").style.fontWeight = "bold";
        document.getElementById("navbar-armazones").style.fontWeight = "";
        document.getElementById("navbar-accesorios").style.fontWeight = "";
        document.getElementById("navbar-servicios").style.fontWeight = "";
        document.getElementById("navbar-examenVista").style.fontWeight = "";
        document.getElementById("navbar-otros").style.fontWeight = "";
        fetch("moduloEmpleados/view_Empleados.html")
        .then(
                function(response){
                return response.text();
                }
        )
        .then(
                function(html){
                document.getElementById("contenedorPrincipal").innerHTML = html;
                import ("../modulos/moduloEmpleados/controller_Empleados.js").then(
                        function(controller){
                        moduloEmpleado = controller;
                                moduloEmpleado.cargarModuloCatalogoEmpleados();
                                moduloEmpleado.inicializar();
                        }
                );
                }
        );
        }

function cargarModuloSoluciones(){
        document.getElementById("navbar-home").style.fontWeight = "";
        document.getElementById("navbar-empleados").style.fontWeight = "";
        document.getElementById("navbar-clientes").style.fontWeight = "";
        document.getElementById("navbar-lentesDeContacto").style.fontWeight = "";
        document.getElementById("navbar-soluciones").style.fontWeight = "bold";
        document.getElementById("navbar-productos").style.fontWeight = "bold";
        document.getElementById("navbar-materiales").style.fontWeight = "";
        document.getElementById("navbar-tratamientos").style.fontWeight = "";
        document.getElementById("navbar-armazones").style.fontWeight = "";
        document.getElementById("navbar-accesorios").style.fontWeight = "";
        document.getElementById("navbar-servicios").style.fontWeight = "";
        document.getElementById("navbar-examenVista").style.fontWeight = "";
        document.getElementById("navbar-otros").style.fontWeight = "";
        fetch("moduloSoluciones/view_Soluciones.html")
        .then(
                function(response){
                return response.text();
                }
        )
        .then(
                function(html){
                document.getElementById("contenedorPrincipal").innerHTML = html;
                import ("../modulos/moduloSoluciones/controller_Soluciones.js").then(
                        function(controller){
                        moduloSoluciones = controller;
                        moduloSoluciones.cargarModuloCatalogoSoluciones();
                        }
                );
                }
        );
        }


function cargarModuloTratamientos(){
        document.getElementById("navbar-home").style.fontWeight = "";
        document.getElementById("navbar-empleados").style.fontWeight = "";
        document.getElementById("navbar-clientes").style.fontWeight = "";
        document.getElementById("navbar-soluciones").style.fontWeight = "";
        document.getElementById("navbar-lentesDeContacto").style.fontWeight = "";
        document.getElementById("navbar-productos").style.fontWeight = "";
        document.getElementById("navbar-materiales").style.fontWeight = "";
        document.getElementById("navbar-tratamientos").style.fontWeight = "bold";
        document.getElementById("navbar-armazones").style.fontWeight = "";
        document.getElementById("navbar-accesorios").style.fontWeight = "";
        document.getElementById("navbar-servicios").style.fontWeight = "";
        document.getElementById("navbar-examenVista").style.fontWeight = "";
        document.getElementById("navbar-otros").style.fontWeight = "bold";
        fetch("moduloTratamientos/view_Tratamientos.html")
        .then(
                function(response){
                return response.text();
                }
        )
        .then(
                function(html){
                document.getElementById("contenedorPrincipal").innerHTML = html;
                import ("../modulos/moduloTratamientos/controller_Tratamientos.js").then(
                        function(controller){
                        moduloTratamiento = controller;
                                moduloTratamiento.cargarModuloCatalogoTratamiento();
                        }
                );
                }
        );
        }

function cargarModuloLentesDeContactoCG(){
        document.getElementById("navbar-home").style.fontWeight = "";
        document.getElementById("navbar-empleados").style.fontWeight = "";
        document.getElementById("navbar-clientes").style.fontWeight = "";
        document.getElementById("navbar-soluciones").style.fontWeight = "";
        document.getElementById("navbar-productos").style.fontWeight = "bold";
        document.getElementById("navbar-tratamientos").style.fontWeight = "";
        document.getElementById("navbar-materiales").style.fontWeight = "";
        document.getElementById("navbar-lentesDeContacto").style.fontWeight = "bold";
        document.getElementById("navbar-armazones").style.fontWeight = "";
        document.getElementById("navbar-accesorios").style.fontWeight = "";
        document.getElementById("navbar-servicios").style.fontWeight = "";
        document.getElementById("navbar-examenVista").style.fontWeight = "";
        
        fetch("moduloLentesContacto/view_LentesCG.html")
        .then(
                function(response){
                return response.text();
                }
        )
        .then(
                function(html){
                document.getElementById("contenedorPrincipal").innerHTML = html;
                import ("../modulos/moduloLentesContacto/controller_LentesContacto.js").then(
                        function(controller){
                        moduloLentesCG = controller;
                                moduloLentesCG.cargarModuloCatalogoLentesCG();
                        }
                );
                }
        );
        }

function cargarModuloLentesDeContactoCE(){
        document.getElementById("navbar-home").innerHTML = "Inicio"
        document.getElementById("navbar-empleados").innerHTML = "Empleados"
        document.getElementById("navbar-clientes").innerHTML = "Clientes"

        fetch("moduloLentesContacto/view_LentesCE.html")
        .then(
                function(response){
                return response.text();
                }
        )
        .then(
                function(html){
                document.getElementById("contenedorPrincipal").innerHTML = html;
                import ("../modulos/moduloLentesContacto/controller_LentesContacto.js").then(
                        function(controller){
                        moduloLentesCE = controller;
                                moduloLentesCE.cargarModuloCatalogoLentesCE();
                        }
                );
                }
        );
        }

function cargarModuloMateriales(){
        document.getElementById("navbar-home").style.fontWeight = "";
        document.getElementById("navbar-empleados").style.fontWeight = "";
        document.getElementById("navbar-clientes").style.fontWeight = "";
        document.getElementById("navbar-soluciones").style.fontWeight = "";
        document.getElementById("navbar-productos").style.fontWeight = "";
        document.getElementById("navbar-tratamientos").style.fontWeight = "";
        document.getElementById("navbar-lentesDeContacto").style.fontWeight = "";
        document.getElementById("navbar-materiales").style.fontWeight = "bold";
        document.getElementById("navbar-armazones").style.fontWeight = "";
        document.getElementById("navbar-servicios").style.fontWeight = "";
        document.getElementById("navbar-examenVista").style.fontWeight = "";
        document.getElementById("navbar-accesorios").style.fontWeight = "";
        document.getElementById("navbar-otros").style.fontWeight = "bold";
        fetch("moduloMateriales/view_Materiales.html")
        .then(
                function(response){
                return response.text();
                }
        )
        .then(
                function(html){
                document.getElementById("contenedorPrincipal").innerHTML = html;
                import ("../modulos/moduloMateriales/controller_Materiales.js").then(
                        function(controller){
                        moduloMateriales = controller;
                                moduloMateriales.cargarModuloCatalogoMateriales();
                        }
                );
                }
        );
        }

function cargarModuloArmazon(){
        document.getElementById("navbar-home").style.fontWeight = "";
        document.getElementById("navbar-empleados").style.fontWeight = "";
        document.getElementById("navbar-clientes").style.fontWeight = "";
        document.getElementById("navbar-soluciones").style.fontWeight = "";
        document.getElementById("navbar-productos").style.fontWeight = "bold";
        document.getElementById("navbar-tratamientos").style.fontWeight = "";
        document.getElementById("navbar-lentesDeContacto").style.fontWeight = "";
        document.getElementById("navbar-materiales").style.fontWeight = "";
        document.getElementById("navbar-servicios").style.fontWeight = "";
        document.getElementById("navbar-examenVista").style.fontWeight = "";
        document.getElementById("navbar-armazones").style.fontWeight = "bold";
        document.getElementById("navbar-accesorios").style.fontWeight = "";
        fetch("moduloArmazones/view_Armazones.html")
        .then(
                function(response){
                return response.text();
                }
        )
        .then(
                function(html){
                document.getElementById("contenedorPrincipal").innerHTML = html;
                import ("../modulos/moduloArmazones/controller_Armazones.js").then(
                        function(controller){
                        moduloArmazones = controller;
                                moduloArmazones.cargarModuloCatalogoArmazon();
                                moduloArmazones.inicializar();
                        }
                );
                }
        );
        }
function cargarModuloAccesorios(){
        document.getElementById("navbar-home").style.fontWeight = "";
        document.getElementById("navbar-empleados").style.fontWeight = "";
        document.getElementById("navbar-clientes").style.fontWeight = "";
        document.getElementById("navbar-soluciones").style.fontWeight = "";
        document.getElementById("navbar-productos").style.fontWeight = "bold";
        document.getElementById("navbar-tratamientos").style.fontWeight = "";
        document.getElementById("navbar-lentesDeContacto").style.fontWeight = "";
        document.getElementById("navbar-materiales").style.fontWeight = "";
        document.getElementById("navbar-armazones").style.fontWeight = "";
        document.getElementById("navbar-servicios").style.fontWeight = "";
        document.getElementById("navbar-examenVista").style.fontWeight = "";
        document.getElementById("navbar-otros").style.fontWeight = "";
        document.getElementById("navbar-accesorios").style.fontWeight = "bold";
        fetch("moduloAccesorios/view_Accesorios.html")
        .then(
                function(response){
                return response.text();
                }
        )
        .then(
                function(html){
                document.getElementById("contenedorPrincipal").innerHTML = html;
                import ("../modulos/moduloAccesorios/controller_Accesorios.js").then(
                        function(controller){
                        moduloAccesorios = controller;
                                moduloAccesorios.cargarModuloCatalogoAccesorios();
                        }
                );
                }
        );
        }



function cargarModuloExamen(){
        document.getElementById("navbar-home").style.fontWeight = "";
        document.getElementById("navbar-empleados").style.fontWeight = "";
        document.getElementById("navbar-clientes").style.fontWeight = "";
        document.getElementById("navbar-soluciones").style.fontWeight = "";
        document.getElementById("navbar-productos").style.fontWeight = "";
        document.getElementById("navbar-tratamientos").style.fontWeight = "";
        document.getElementById("navbar-lentesDeContacto").style.fontWeight = "";
        document.getElementById("navbar-materiales").style.fontWeight = "";
        document.getElementById("navbar-armazones").style.fontWeight = "";
        document.getElementById("navbar-servicios").style.fontWeight = "";
        document.getElementById("navbar-accesorios").style.fontWeight = "";
        document.getElementById("navbar-servicios").style.fontWeight = "bold";
        document.getElementById("navbar-examenVista").style.fontWeight = "bold";
        fetch("moduloExamenVista/view_ExamenVista.html")
        .then(
                function(response){
                return response.text();
                }
        )
        .then(
                function(html){
                document.getElementById("contenedorPrincipal").innerHTML = html;
                import ("../modulos/moduloExamenVista/controller_ExamenVista.js").then(
                        function(controller){
                        moduloExamenVista = controller;
                                moduloExamenVista.cargarModuloCatalogoExamenVista();
                        }
                );
                }
        );
        }

