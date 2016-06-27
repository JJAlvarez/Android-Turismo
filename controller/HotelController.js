/**
 * Created by Javier on 22/04/2016.
 */
module.exports = function (app) {
    return {
        add:function(req, res){
            var Hotel = app.get('hotel');
            Hotel.create({
                nombre: req.body.nombre,
                clasificacion: req.body.clasificacion
            }).then(function (hotel) {
                res.json(hotel)
            });
        },
        delete:function (req, res) {
            var Hotel = app.get('hotel');
            Hotel.destroy({
                where: {
                    id_hotel: req.body.id_hotel
                }
            }).then(function (hotel) {
                res.json(hotel);
            });
        },
        list:function (req, res) {
            var Servicio = app.get('servicio');
			var Sucursal = app.get('sucursalhotel');
            var Hotel = app.get('hotel');
            Hotel.findAll({ include : [ Sucursal ]}).then(function (hoteles) {
                res.json(hoteles);
            });
        },
        edit:function (req, res) {
            var Hotel = app.get('hotel');
            Hotel.find(req.body.id_hotel).then(function (hotel) {
                if(hotel){
                    hotel.updateAttributes({
                        nombre : req.body.nombre,
                        clasificacion : req.body.clasificacion
                    }).then(function (hotel) {
                        res.json(hotel);
                    });
                }
            });
        },
        servicios:function (req, res) {
            var Hotel = app.get('hotel');
            var Servicio = app.get('servicio');
            Hotel.find({ where: { id_hotel: req.params.id }, include: [Servicio] }).then(function (hotel) {
                if(hotel) {
                    res.send(hotel.servicios)
                } else {
                    res.status(404).send({ menssage: 'Hotel no encontrado' });
                }
            });
        },
        porid:function (req, res) {
            var Hotel = app.get('hotel');
            var Servicio = app.get('servicio');
			var Sucursal = app.get('sucursalhotel');
            Hotel.find({ where: { id_hotel: req.params.id }, include: [Servicio, Sucursal] }).then(function (hotel) {
               if(hotel) {
                   res.send(hotel);
               } else {
                   res.status(404).send({ menssage: 'Hotel no encontrado' });
               }
            });
        }
    }
}