package com.cu.oq.rest;

import com.cu.oq.core.ControllerCliente;
import com.cu.oq.model.Cliente;
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
 * @author Fernando Damian Gamboa Lopez
 * @version 1.0
 * @since  07/11/2022
 */
@Path("cliente")
public class ClienteREST {
    
    @GET
    @Path("getAll")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAll(@QueryParam("filtro") @DefaultValue("") String filtro) {
        
        String out = null;
        ControllerCliente cc = null;
        List<Cliente> clientes = null;
        
        try {

            cc = new ControllerCliente();
            clientes = cc.getAll(filtro);
            out = new Gson().toJson(clientes);

        } catch (Exception e) {
            e.printStackTrace();
            
            out = """
                  {"exception":"Error interno del Servidor"}
                  """
                    ;
        }
        return Response.status(Response.Status.OK).entity(out).build();
    }

//    Cuando utilizo tipo POST se utiliza con @FORMPARAM
//    Cuando se usa GET se utiliza con @QUERYPARAM
    @Path("save")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    //El FormParam a diferencia del QueryParam, no hace una consulta si no que los extrae de un Formulario si asi se desea
    public Response save(@FormParam("datosCliente") @DefaultValue("") String datosCliente) throws Exception {
        String out = null;
        Gson gson = new Gson();
        Cliente cliente = null;
        ControllerCliente cc = new ControllerCliente();

        try {
            //Convertimos los datos cliente a Json con ayuda de Gson
            cliente = gson.fromJson(datosCliente, Cliente.class);
            //Si el id del cliente no existe lo añadimos, si ya existe lo actualizamos
            if (cliente.getIdCliente() == 0) {
                cc.insert(cliente);
            } else {
                cc.update(cliente);
            }
            out = gson.toJson(cliente);
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
    public Response delete(@FormParam("idCliente") @DefaultValue("0") int idCliente) throws Exception {
        
        String out = null;
        ControllerCliente cc = new ControllerCliente();

        try {
            //Convertimos los datos empleado a Json con ayuda de Gson
            //Si el id del empleado no existe lo añadimos, si ya existe lo actualizamos
            System.out.println(idCliente);
            cc.delete(idCliente);
            out = """
                    {"success":"Cliente eliminado correctamente"}
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
