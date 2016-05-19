/**
 * Created by Javier on 29/04/2016.
 */
module.exports = function (app) {
    return {
        add: function (req, res) {
            var Departamento = app.get('departamento');
            Departamento.create({
                nombre: req.body.nombre,
                descripcion: req.body.descripcion,
				urlImagen: req.body.urlImagen
            }).then(function (departamento) {
                res.json(departamento);
            });
        },
        list: function (req, res) {
            var Departamento = app.get('departamento');
            Departamento.findAll().then(function (departamentos) {
                res.json(departamentos);
            });
        },
        delete:function (req, res) {
            var Departamento = app.get('departamento');
            Departamento.destroy({
                where: {
                    id_departamento: req.body.id_departamento
                }
            }).then(function (departamento) {
                res.json(departamento);
            });
        },
        edit:function (req, res) {
            var Departamento = app.get('departamento');
            Departamento.find(req.body.id_departamento).then(function (departamento) {
                if(departamento) {
                    departamento.updateAttributes({
                        nombre : req.body.nombre,
                        descripcion : req.body.direccion
                    }).then(function (restaurante) {
                        res.send(restaurante);
                    });
                }
            });
        },
        porid:function (req, res) {
            var Departamento = app.get('departamento');
            var Restaurante = app.get('restaurante');
            var Hotel = app.get('hotel');
            Departamento.find({ where: { id_departamento: req.params.id }, include: [Hotel, Restaurante] }).then(function (departamento) {
                if(departamento) {
                    res.json(departamento);
                } else {
                    res.status(404).send({ message: 'Departamento no encontrado'});
                }
            });
        }
    }
}
