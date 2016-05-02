/**
 * Created by Javier on 22/04/2016.
 */
module.exports=function(app){
    return {
        registro:function(req, res) {
            var Sequelize = app.get('sequelize');
            Sequelize.query("CALL Registrar('"+req.body.nombre+"',"+req.body.telefono +",'"+req.body.correo+"','"+req.body.nick+"','"+req.body.contrasena+"', '" + req.body.direccion + "');").then(function (response) {
                res.status(200).send({ message: "Usuario resgistrado correctamente" });
            }).error(function (err) {
                res.json(err);
            });
        },
        login:function(req, res){
            var Sequelize = app.get('sequelize');
            Sequelize.query("CALL Login('"+req.body.nick+"', '"+req.body.contrasena+"');").then(function (response) {
                if(response.length > 0) {
                    res.status(200).send(response);
                } else {
                    res.status(404).send({ message: "Credenciales invalidas. Verifique por favor." })
                }
            }).error(function (err) {
                res.json(err);
            });
        }
    }
}
