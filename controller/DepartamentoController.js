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
			var LugarTuristico = app.get('lugarturistico');
            var Departamento = app.get('departamento');
            Departamento.findAll({ include: [LugarTuristico]}).then(function (departamentos) {
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
        },
        departmentRestaurantes: function (req, res) {
          var Departamento = app.get('departamento');
          var Restaurante = app.get('restaurante');
          Departamento.find({ where: { id_departamento: req.params.id }, include: [Restaurante] }).then(function(departamento) {
              if(departamento) {
                res.json(departamento.restaurantes);
              } else {
                res.status(404).send({ message: 'Departamento no encontrado' });
              }
          });
        },
        departmentHoteles: function(req, res) {
          var Departamento = app.get('departamento');
          var Hotel = app.get('hotel');
          Departamento.find({ where: { id_departamento: req.params.id }, include: [Hotel] }).then(function(departamento){
              if(departamento) {
                res.json(departamento.hotels);
              } else {
                res.status(404).send({ message: 'Departamento no encontrado' });
              }
          });
        },
        departmentLugares: function(req, res) {
          var Departamento = app.get('departamento');
          var LugarTuristico = app.get('lugarturistico');
          Departamento.find({ where: { id_departamento: req.params.id }, include: [LugarTuristico] }).then(function(departamento){
              if(departamento) {
                res.json(departamento.lugarturisticos);
              } else {
                res.status(404).send({ message: 'Departamento no encontrado' });
              }
          });
        },
        listwithouttoken: function (req, res) {
          var LugarTuristico = app.get('lugarturistico');
          var Departamento = app.get('departamento');
          Departamento.findAll({ include: [LugarTuristico]}).then(function (departamentos) {
              res.json(departamentos);
          });
        },
        poridfree:function (req, res) {
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
        },
        departmentRestaurantesfree: function (req, res) {
          var Departamento = app.get('departamento');
          var Restaurante = app.get('restaurante');
          Departamento.find({ where: { id_departamento: req.params.id }, include: [Restaurante] }).then(function(departamento) {
              if(departamento) {
                res.json(departamento.restaurantes);
              } else {
                res.status(404).send({ message: 'Departamento no encontrado' });
              }
          });
        },
        departmentHotelesfree: function(req, res) {
          var Departamento = app.get('departamento');
          var Hotel = app.get('hotel');
          Departamento.find({ where: { id_departamento: req.params.id }, include: [Hotel] }).then(function(departamento){
              if(departamento) {
                res.json(departamento.hotels);
              } else {
                res.status(404).send({ message: 'Departamento no encontrado' });
              }
          });
        },
        departmentLugaresfree: function(req, res) {
          var Departamento = app.get('departamento');
          var LugarTuristico = app.get('lugarturistico');
          Departamento.find({ where: { id_departamento: req.params.id }, include: [LugarTuristico] }).then(function(departamento){
              if(departamento) {
                res.json(departamento.lugarturisticos);
              } else {
                res.status(404).send({ message: 'Departamento no encontrado' });
              }
          });
        }
    }
}
