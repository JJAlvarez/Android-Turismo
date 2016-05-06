/**
 * Created by Javier on 22/04/2016.
 */
module.exports = function (app) {
    return {
        add:function(req, res){
            var Restaurante = app.get('restaurante');
            Restaurante.create({
                nombre: req.body.nombre,
                clasificacion: req.body.clasificacion
            }).then(function (restaurante) {
                res.json(restaurante);
            });
        },
        delete:function (req, res) {
            var Restaurante = app.get('restaurante');
            Restaurante.destroy({
                where: {
                    id_restaurante: req.body.id_restaurante
                }
            }).then(function (restaurante) {
                res.json(restaurante);
            });
        },
        list:function (req, res) {
            var TipoComida = app.get('tipocomida');
            var Restaurante = app.get('restaurante');
            var Sucursal = app.get('sucursal');
            Restaurante.findAll({ include: [TipoComida]}).then(function (restaurantes) {
                res.json(restaurantes);
            });
        },
        edit:function (req, res) {
            var Restaurante = app.get('restaurante');
            Restaurante.find(req.body.id_restaurante).then(function (restaurante) {
                if(restaurante){
                    restaurante.updateAttributes({
                        nombre : req.body.nombre,
                        direccion : req.body.direccion,
                        clasificacion : req.body.clasificacion,
                        id_departamento : req.body.id_departamento
                    }).then(function (restaurante) {
                        res.send(restaurante);
                    });
                }
            });
        },
        tiposcomida:function (req, res) {
            var Restaurante = app.get('restaurante');
            var TipoComida = app.get('tipocomida');
            Restaurante.find({ where: { id_restaurante: req.params.id }, include: [TipoComida] }).then(function (restaurante) {
                if(restaurante) {
                    res.json(restaurante.tipocomidas);
                } else {
                    res.status(404).send({ message: 'Restaurante no encontrado'});
                }
            });
        },
        porid:function (req, res) {
            var Restaurante = app.get('restaurante');
            var TipoComida = app.get('tipocomida');
            Restaurante.find({ where: { id_restaurante: req.params.id }, include: [TipoComida] }).then(function (restaurante) {
                if(restaurante) {
                    res.json(restaurante);
                } else {
                    res.status(404).send({ message: 'Restaurante no encontrado'});
                }
            });
        }
    }
}
