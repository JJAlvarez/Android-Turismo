/**
 * Created by Javier on 25/04/2016.
 */
module.exports = function (app) {
    return {
        add: function (req, res) {
            var Servicio = app.get('servicio');
            Servicio.create({
                nombre: req.body.nombre,
                descipcion: req.body.descripcion
            }).then(function (servicio) {
                res.json(servicio);
            });
        },
        delete: function (req, res) {
            var Servicio = app.get('servicio');
            Servicio.destroy({
                where: {
                    id_servicio: req.body.id_servicio
                }
            }).then(function (servicio) {
                res.json(servicio);
            })
        },
        list: function(req, res){
            var Servicio = app.get('servicio');
            Servicio.findAll().then(function (servicios) {
                res.json(servicios);
            });
        },
        edit: function (req, res) {
            var Servicio = app.get('servicio');
            Servicio.find(req.body.id_servicio).then(function (servicio) {
                if (servicio){
                    servicio.updateAttributes({
                        nombre: req.body.nombre,
                        descripcion: req.body.descripcion
                    }).then(function (servicio) {
                        res.json(servicio);
                    });
                }
            });
        }
    }
}
