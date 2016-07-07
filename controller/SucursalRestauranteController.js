/**
 * Created by Javier on 30/04/2016.
 */
module.exports = function (app) {
    return {
        add:function (req, res) {
            var Sucursal = app.get('sucursalrestaurante');
            Sucursal.create({
                direccion: req.body.direccion,
                restauranteIdRestaurante: req.body.id_restaurante,
                departamentoIdDepartamento: req.body.id_departamento
            }).then(function (sucursal) {
                res.json(sucursal);
            });
        },
        delete:function (req, res) {
            var Sucursal = app.get('sucursalrestaurante');
            Sucursal.destroy({
                where: {
                    id_sucursal: req.body.id_sucursal
                }
            }).then(function (sucursal) {
                res.json(sucursal);
            });
        },
        list:function (req, res) {
            var Sucursal = app.get('sucursalrestaurante');
            Sucursal.findAll().then(function (sucursales) {
                res.json(sucursales);
            })
        },
        edit:function (req, res) {
            var Sucursal = app.get('sucursalrestaurante');
            Sucursal.find(req.body.id_sucursal).then(function (sucursal) {
                if(sucursal){
                    sucursal.updateAttributes({
                        direccion: req.body.direccion,
                        restauranteIdRestaurante: req.body.id_restaurante,
                        departamentoIdDepartamento: req.body.id_departamento
                    }).then(function (sucursal) {
                        res.json(sucursal);
                    });
                } else {
                    res.status(404).send({ message: "Sucursal no encontrada" });
                }
            });
        },
        porid:function (req, res) {
            var Sucursal = app.get('sucursalrestaurante');
            Sucursal.findById(req.params.id).then(function (sucursal) {
                if(sucursal) {
                    res.json(sucursal);
                } else {
                    res.status(404).send({ message: "Sucursal no encontrada" })
                }
            });
        },
        restauranteSucursales: function(req, res) {
          var Sucursal = app.get('sucursalrestaurante');
          Sucursal.findAll({
            where: {
              restauranteIdRestaurante: req.params.id
            }
          }).then(function(sucursales){
            res.json(sucursales);
          });
        }
    }
}
