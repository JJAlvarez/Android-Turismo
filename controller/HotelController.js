/**
 * Created by Javier on 22/04/2016.
 */
module.exports = function (app) {
    return {
        add:function(req, res){
            var pool = app.get('pool');
            pool.getConnection(function(err, connection){
                if(err){
                    connection.release();
                    res.json({"code": "100", "status": "Error al conectar con la base de datos"});
                }
                connection.query("INSERT INTO Hotel VALUES(NULL, '" +
                    req.body.nombre + "', '" +
                    req.body.direccion + "', '" +
                    req.body.clasificacion + "'," +
                    req.body.id_departamento + ");"
                    , function (err, row) {
                        if (err)
                            throw err;
                        else
                            res.json({"mensaje": "El Hotel ha sido agregado correctamente."});
                        connection.release();
                });
            });
        },
        delete:function (req, res) {
            var pool = app.get('pool');
            pool.getConnection(function(err, connection){
                if(err){
                    connection.release();
                    res.json({"code": "100", "status": "Error al conectar con la base de datos"});
                }
                connection.query("DELETE FROM HOTEL WHERE id_hotel = " + req.query.id_hotel, function (err, row) {
                    if (err)
                       throw err;
                    else
                        res.json({"mensaje": "El hotel ha sido eliminar correctamente."});
                    connection.release();
                });
            });
        },
        list:function (req, res) {
            var pool = app.get('pool');
            pool.getConnection(function (err, connection){
                if(err){
                    connection.release();
                    res.json({"code": "100", "status": "Error al conectar con la base de datos"});
                }
                connection.query("SELECT * FROM Hotel", function (err, row) {
                    if (err)
                        throw err;
                    else
                        res.json(row);
                    connection.release();
                })
            });
        },
        edit:function (req, res) {
            var pool = app.get('pool');
            pool.getConnection(function (err, connection) {
                if(err){
                    connection.release();
                    res.json({"code": "100", "status": "Error al conectar con la base de datos"});
                }
                connection.query("UPDATE Hotel SET nombre = '" +
                    req.body.nombre + "', '" +
                    "direccion = '" + req.body.direccion + "', '" +
                    "clasificacion = '" + req.body.clasificacion + "'", function (err, row) {
                    if (err)
                        throw err;
                    else
                        res.json({"mensaje": "El hotel ha sido editado correctamente."});
                    connection.release();
                })
            });
        }
    }
}