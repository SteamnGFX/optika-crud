/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.cu.oq.rest;

import com.cu.oq.core.ControllerSoluciones;
import com.cu.oq.model.Solucion;
import com.google.gson.Gson;
import com.google.gson.JsonParseException;
import jakarta.ws.rs.DefaultValue;
import jakarta.ws.rs.FormParam;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.QueryParam;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.util.List;

/**
 *
 * @author ricar
 */
    @Path("solucion")
public class RESTSolucion {

    @GET
    @Path("getAll")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAll(@QueryParam("filtro") @DefaultValue("") String filtro) {
        String out = null;
        ControllerSoluciones ce = null;
        List<Solucion> soluciones = null;
        try {

            ce = new ControllerSoluciones();
            soluciones = ce.getAll(filtro);
            out = new Gson().toJson(soluciones);

        } catch (Exception e) {
            e.printStackTrace();
            out = "{\"exception\":\"Error Interno del servidor.\"}";
        }
        return Response.status(Response.Status.OK).entity(out).build();
    }
    
    
//    Cuando utilizo tipo POST se utiliza con @FORMPARAM
//    Cuando se usa GET se utiliza con @QUERYPARAM
    @Path("save")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    //El FormParam a diferencia del QueryParam, no hace una consulta si no que los extrae de un Formulario si asi se desea
    public Response save(@FormParam("datosSolucion") @DefaultValue("") String datosSolucion) throws Exception {
        String out = null;
        Gson gson = new Gson();
        Solucion  sol = null;
        ControllerSoluciones cs = new ControllerSoluciones();

        try {
            //Convertimos los datos empleado a Json con ayuda de Gson
            sol = gson.fromJson(datosSolucion, Solucion.class);
            //Si el id del empleado no existe lo añadimos, si ya existe lo actualizamos
            if (sol.getIdSolucion()== 0) {
                cs.insert(sol);
            } else {
                cs.update(sol);
            }
            out = gson.toJson(sol);
            
        } catch (JsonParseException jpe) {
            jpe.printStackTrace();
            out = """
                    {"exception":"%s"}
                  """;
            out = String.format(out, jpe.toString());
        }
        catch(Exception e){
            e.printStackTrace();
            out = """
                  {"exception":"%s"}
                  """;
            out = String.format(out, e.toString());
        }
        
        return Response.status(Response.Status.OK).entity(out).build();
    }
    
    
    @Path("delete")
    @PUT
    @Produces(MediaType.APPLICATION_JSON)
    //El FormParam a diferencia del QueryParam, no hace una consulta si no que los extrae de un Formulario si asi se desea
    public Response delete(@FormParam("idProducto") @DefaultValue("0") int idProducto) throws Exception {
        String out = null;
        ControllerSoluciones ce = new ControllerSoluciones();

        try {
            //Convertimos los datos empleado a Json con ayuda de Gson
            //Si el id del empleado no existe lo añadimos, si ya existe lo actualizamos
            ce.delete(idProducto);
            out = """
                    {"success":"Producto eliminado correctamente"}
                  """;
            
        } catch (JsonParseException jpe) {
            jpe.printStackTrace();
            out = """
                    {"exception":"%s"}
                  """;
            out = String.format(out, jpe.toString());
        }
        catch(Exception e){
            e.printStackTrace();
            out = """
                  {"exception":"%s"}
                  """;
            out = String.format(out, e.toString());
        }
        
        return Response.status(Response.Status.OK).entity(out).build();
    }
}


    

