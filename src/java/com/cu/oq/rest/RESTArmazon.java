package com.cu.oq.rest;

import com.cu.oq.core.ControllerArmazon;
import com.cu.oq.model.Armazon;
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

@Path("armazon")
public class RESTArmazon {
    //Metodo de GetAll
    @GET
    @Path("getAll")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAll(@QueryParam("filtro") @DefaultValue("") String filtro) {
        String out = null;
        ControllerArmazon ce = null;
        List<Armazon> armazones = null;
        try {
            ce = new ControllerArmazon();
            armazones = ce.getAll(filtro);
            out = new Gson().toJson(armazones);

        } catch (Exception e) {
            e.printStackTrace();
            out = "{\"exception\":\"Error Interno del servidor.\"}";
        }
        return Response.status(Response.Status.OK).entity(out).build();
    }
    
    
    @Path("save")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    //Metodo para guardar
    //El FormParam a diferencia del QueryParam, no hace una consulta si no que los extrae de un Formulario si asi se desea
    public Response save(@FormParam("datosArmazon") @DefaultValue("") String datosArmazon) throws Exception {
        String out = null;
        Gson gson = new Gson();
        Armazon arm = null;
        ControllerArmazon ce = new ControllerArmazon();

        try {
            //Convertimos los datos empleado a Json con ayuda de Gson
            arm = gson.fromJson(datosArmazon, Armazon.class);
            //Si el id del empleado no existe lo añadimos, si ya existe lo actualizamos
            if (arm.getIdArmazon() == 0) {
                ce.insert(arm);
            } else {
                ce.update(arm);
            }
            out = gson.toJson(arm);
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
    //Metodo para eliminar
    //El FormParam a diferencia del QueryParam, no hace una consulta si no que los extrae de un Formulario si asi se desea
    public Response delete(@FormParam("idProducto") @DefaultValue("0") int idProducto) throws Exception {
        String out = null;
        ControllerArmazon ca = new ControllerArmazon();

        try {
            //Convertimos los datos empleado a Json con ayuda de Gson
            //Si el id del empleado no existe lo añadimos, si ya existe lo actualizamos
            ca.delete(idProducto);
            
            out = """
                    {"success":"Empleado eliminado correctamente"}
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