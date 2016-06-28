/**
 * Created by Javier on 22/04/2016.
 */
var ruta=require('express').Router();
module.exports=(function(app){
    var usuario = require('../controller/UsuarioController.js')(app);
    var hotel = require('../controller/HotelController.js')(app);
    var restaurante = require('../controller/RestauranteController')(app);
    var departamento = require('../controller/DepartamentoController')(app);
    var lugarturistico = require('../controller/LugarTuristicoController')(app);
    var sucursalrestaurante = require('../controller/SucursalRestauranteController')(app);
    var sucursalhotel = require('../controller/SucursalHotelController')(app);
    var comentario = require('../controller/ComentariosController')(app);

    /*
     Rutas para Usuario
     */
    ruta.post('/usuario/registro',usuario.registro);
    ruta.post('/usuario/login',usuario.login);
    ruta.get('/lugarturistico/ver', lugarturistico.ver);

	ruta.get('/token',usuario.tokenGenerator);
  ruta.get('/token_twitter',usuario.loginTwitter);

	ruta.use(usuario.tokenMiddleware);

    /*
      Rutas para los comentarios
    */
    ruta.get('/comentariohotel/:id', comentario.hotelComentarios);
    ruta.get('/comentariorestaurante/:id', comentario.restaurateComentario);
    ruta.get('/comentariolugar/:id', comentario.lugarComentario);
    ruta.post('/comentariohotel', comentario.agregarHotelComentario);
    ruta.post('/comentariorestaurante', comentario.agregarRestauranteComentario);
    ruta.post('/comentariolugar', comentario.agregarLugarComentario);
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

    /*
     Rutas para los departamentos
     */
    ruta.get('/lugarturistico', lugarturistico.list);
    ruta.post('/lugarturistico', lugarturistico.add);
    ruta.put('/lugarturistico', lugarturistico.edit);
    ruta.delete('/lugarturistico', lugarturistico.delete);
    ruta.get('lugarturistico/:id', lugarturistico.porid);

    /*
    Rutas para las sucursales de los restaurantes
     */
    ruta.get('/sucursalrestaurante', sucursalrestaurante.list);
    ruta.post('/sucursalrestaurante', sucursalrestaurante.add);
    ruta.put('/sucursalrestaurante', sucursalrestaurante.edit);
    ruta.delete('/sucursalrestaurante', sucursalrestaurante.delete);
    ruta.get('/sucursalrestaurante/:id', sucursalrestaurante.porid);

    /*
     Rutas para las sucursales de los hoteles
     */
    ruta.get('/sucursalhotel', sucursalhotel.list);
    ruta.post('/sucursalhotel', sucursalhotel.add);
    ruta.put('/sucursalhotel', sucursalhotel.edit);
    ruta.delete('/sucursalhotel', sucursalhotel.delete);
    ruta.get('/sucursalhotel/:id', sucursalhotel.porid);

    return ruta;
});
