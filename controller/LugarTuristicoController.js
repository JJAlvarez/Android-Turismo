/**
 * Created by Javier on 03/05/2016.
 */
module.exports = function (app) {
    return {
        add:function (req, res) {
            var LugarTuristico = app.get('lugarturistico');
            LugarTuristico.create({
                nombre: req.body.nombre,
                descripcion: req.body.descripcion,
                direccion: req.body.direccion,
                id_departamento: req.body.id_departamento
            }).then(function (lugar) {
                res.json(lugar);
            });
        },
        list:function (req, res) {
            var LugarTuristico = app.get('lugarturistico');
            LugarTuristico.findAll().then(function (lugares) {
                res.json(lugares);
            });
        },
        edit:function (req, res) {
            var LugarTuristico = app.get('lugarturistico');
            LugarTuristico.find(req.body.id_lugar).then(function (lugar) {
                if(lugar) {
                    lugar.updateAttributes({
                        nombre: req.body.nombre,
                        descripcion: req.body.descripcion,
                        direccion: req.body.direccion,
                        id_departamento: req.body.id_departamento
                    }).then(function (lugar) {
                        res.json(lugar);
                    })
                } else {
                    res.status(404).json({ message: "Lugar turistico no encontrado."})
                }
            })
        },
        delete:function (req, res) {
            var LugarTuristico = app.get('lugarturistico');
            LugarTuristico.destroy({
                where: {
                    id_lugarturistico: req.body.id_lugarturistico
                }
            }).then(function (lugar) {
                res.json(lugar);
            });
        },
        porid:function (req, res) {
            var LugarTuristico = app.get('lugarturistico');
            LugarTuristico.find(req.params.id).then(function (lugar) {
                res.json(lugar);
            });
        }
    }
}
