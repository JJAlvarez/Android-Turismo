/**
 * Created by Javier on 02/05/2016.
 */
module.exports = function (app) {
    return {
        add:function (req, res) {
            var Sucursal = app.get('sucursalhotel');
            Sucursal.create({
                direccion: req.body.direccion,
                hotelIdDepartamento: req.body.id_hotel,
                departamentoIdDepartamento: req.body.id_departamento
            }).then(function (sucursal) {
                res.json(sucursal);
            });
        },
        list:function (req, res) {
            var Sucursal = app.get('sucursalhotel');
            Sucursal.findAll().then(function (sucursales) {
                res.json(sucursales);
            });
        },
        edit:function (req, res) {
            var Sucursal = app.get('sucursalhotel');
            Sucursal.find(req.body.id_sucursal).then(function (sucursal) {
                if(sucursal) {
                    sucursal.updateAttributes({
                        direccion: req.body.direccion,
                        hotelIdDepartamento: req.body.id_hotel,
                        departamentoIdDepartamento: req.body.id_departamento
                    }).then(function (sucursal) {
                        res.json(sucursal);
                    });
                } else {
                    res.status(404).send({ message: "Sucursal no encontrado" });
                }
            });
        },
        delete:function (req, res) {
            var Sucursal = app.get('sucursalhotel');
            Sucursal.destroy({
                where: {
                    id_sucursal: req.body.id_sucursal
                }
            }).then(function (sucursal) {
                res.json(sucursal);
            });
        },
        porid:function (req, res) {
            var Sucursal = app.get('sucursalhotel');
            Sucursal.find(req.params.id).then(function (sucursal) {
                if(sucursal) {
                    res.json(sucursal);
                } else {
                    res.status(404).send({ message: "Sucursal no encontrada" })
                }
            });
        }
    }
}
