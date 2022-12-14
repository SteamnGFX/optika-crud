package com.cu.oq.rest;

import com.cu.oq.core.ControllerAccesorio;
import com.cu.oq.core.ControllerEmpleado;
import com.cu.oq.core.ControllerLenteContactoEstetico;
import com.cu.oq.model.Accesorio;
import com.cu.oq.model.LentesContactoEsteticos;
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


@Path("lenteContacto")
public class RESTLenteCE {
    @GET
    @Path("getAll")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAll(@QueryParam("filtro") @DefaultValue("") String filtro) {
        String out = null;
        ControllerLenteContactoEstetico clce = null;
        List<LentesContactoEsteticos> listaLenteContactoEstetico = null;

        try {
            clce = new ControllerLenteContactoEstetico();
            listaLenteContactoEstetico = clce.getAll(filtro);
            out = new Gson().toJson(listaLenteContactoEstetico);
        } catch (Exception e) {
            e.printStackTrace();
            out = "{\"exception\":\"Error Interno del servidor.\"}";
        }
        return Response.status(Response.Status.OK).entity(out).build();
    }

    @Path("save")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public Response save(@FormParam("datosLenteContactoE") @DefaultValue("") String datosLenteContactoE) {
        String out = null;
        Gson gson = new Gson();
        LentesContactoEsteticos lce = null;
        ControllerLenteContactoEstetico clce = new ControllerLenteContactoEstetico();
        try {
            lce = gson.fromJson(datosLenteContactoE, LentesContactoEsteticos.class);
            if (lce.getIdLenteContacto()== 0) {
                clce.insert(lce);
            } else {
                clce.update(lce);
            }
            out = gson.toJson(lce);
        } catch (JsonParseException jpe) {
            jpe.printStackTrace();
            out = """
                                {"exception" : "Forma JSON de datos incorrecto"}
                                 """;

        } catch (Exception e) {
            e.printStackTrace();
            out = """
                  {"exception" : "%s"}
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
        ControllerLenteContactoEstetico clce = new ControllerLenteContactoEstetico();

        try {
            //Convertimos los datos empleado a Json con ayuda de Gson
            //Si el id del producto no existe lo añadimos, si ya existe lo actualizamos
            System.out.println(idProducto);
            clce.delete(idProducto);
            out = """
                    {"success":"Lente de Contacto Estetico eliminado correctamente"}
                  """;

        } catch (JsonParseException jpe) {
            jpe.printStackTrace();
            out = """
                    {"exception":"%s"}
                  """;
            out = String.format(out, jpe.toString());
        } catch (Exception e) {
            e.printStackTrace();
            out = """
                  {"exception":"%s"}
                  """;
            out = String.format(out, e.toString());
        }

        return Response.status(Response.Status.OK).entity(out).build();
    }
}
