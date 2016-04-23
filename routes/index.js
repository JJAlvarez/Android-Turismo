/**
 * Created by Javier on 22/04/2016.
 */
var ruta=require('express').Router();
module.exports=(function(app){
    var usuario=require('../controller/UsuarioController.js')(app);
    var hotel=require('../controller/HotelController.js')(app);
    ruta.get('/',function(peticion,respuesta){
        respuesta.send("Servicio iniciado");
    });

    /*
     Rutas para Usuario
     */
    ruta.post('/usuario/registro',usuario.registro);
    ruta.post('/usuario/login',usuario.login);
    /*
     Rutas para los Hoteles
     */
    ruta.get('/hotel',hotel.list);
    ruta.post('/hotel',hotel.add);
    ruta.put('/hotel',hotel.edit);
    ruta.delete('/hotel',hotel.delete);

    return ruta;
});
