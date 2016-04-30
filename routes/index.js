/**
 * Created by Javier on 22/04/2016.
 */
var ruta=require('express').Router();
module.exports=(function(app){
    var usuario=require('../controller/UsuarioController.js')(app);
    var hotel=require('../controller/HotelController.js')(app);
    var restaurante = require('../controller/RestauranteController')(app);
    var departamento = require('../controller/DepartamentoController')(app);

    ruta.get('/',function(peticion, respuesta){
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
    ruta.get('/hotel/servicios/:id', hotel.servicios);
    ruta.get('/hotel/:id', hotel.porid);

    /*
    Rutas para los Restaurantes
     */
    ruta.get('/restaurante', restaurante.list);
    ruta.post('/restaurante', restaurante.add);
    ruta.delete('/restaurante', restaurante.delete);
    ruta.put('/restaurante', restaurante.edit);
    ruta.get('/restaurante/tipocomidas/:id', restaurante.tiposcomida);
    ruta.get('restaurante/:id', restaurante.porid);

    /*
     Rutas para los departamentos
    */
    ruta.get('/departamento', departamento.list);
    ruta.post('/departamento', departamento.add);
    ruta.put('/departamento', departamento.edit);
    ruta.delete('/departamento', departamento.delete);
    ruta.get('departamento/:id', departamento.porid);

    return ruta;
});