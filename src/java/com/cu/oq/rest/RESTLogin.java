
package com.cu.oq.rest;

import java.util.List;
import com.cu.oq.core.ControllerEmpleado;
import com.cu.oq.model.Empleado;
import com.google.gson.Gson;
import jakarta.ws.rs.DefaultValue;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.QueryParam;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
  @Path("login")
public class RESTLogin {
        @GET
        @Path("access")
        @Produces(MediaType.APPLICATION_JSON)
        public Response login(
                @QueryParam("user") @DefaultValue("") String user,
                @QueryParam("pass") @DefaultValue("") String pass) {
            String out = null;
            ControllerEmpleado ce = null;
            List<Empleado> emp = null;
            boolean nulo = false;
            try {
                ce = new ControllerEmpleado();
                emp = ce.login(user, pass);
                if (emp != null) {
                    out = new Gson().toJson(emp);
                    nulo = emp.isEmpty();
                }
                if (nulo == true) {
                    out = """
                      {"error":"Usuario/contraseña no son válidos!"}
                      """;
                   
                }
            } catch (Exception e) {
                e.printStackTrace();
                out = "{\"exception\":\"Error del servidor.\"}";
            }
            return Response.status(Response.Status.OK).entity(out).build();
        }
        
        @GET
        @Path("accessAPP")
        @Produces(MediaType.APPLICATION_JSON)
        public Response loginAPP(
                @QueryParam("user") @DefaultValue("") String user,
                @QueryParam("pass") @DefaultValue("") String pass) {
            String out = null;
            ControllerEmpleado ce = null;
            List<Empleado> emp = null;
            boolean nulo = false;
            try {
                ce = new ControllerEmpleado();
                emp = ce.login(user, pass);
                if (emp != null) {
                    out = new Gson().toJson(emp);
                    nulo = emp.isEmpty();
                }
                if (nulo == true) {
                    out = """
                      [{"idEmpleado":0,"numeroUnico":"0","usuario":{"idUsuario":0,"nombre":"incorrecto","contrasenia":"incorrecta","rol":"Creador","lastToken":"","dateLastToken":""},"estatus":0,"persona":{"idPersona":0,"nombre":"","apellidoPaterno":"","apellidoMaterno":"","genero":"","fechaNacimiento":"","calle":"","numero":"","colonia":"","cp":"","ciudad":"","estado":"","telCasa":"","telMovil":"","email":"","rfc":""}}]
                      """;
                   
                }
            } catch (Exception e) {
                e.printStackTrace();
                out = "{\"exception\":\"Error del servidor.\"}";
            }
            return Response.status(Response.Status.OK).entity(out).build();
        }
    }

    
