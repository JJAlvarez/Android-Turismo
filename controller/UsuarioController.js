/**
 * Created by Javier on 22/04/2016.
 */
module.exports=function(app){
    return {
        registro:function(req, res) {
            var Usuario = app.get('usuario');
            Usuario.create({
				nombre: req.body.nombre,
				telefono: req.body.telefono,
				correo: req.body.correo,
				nick: req.body.nick,
				contrasena: req.body.password,
				direccion: req.body.direccion
			}).then(function(usuario) {
				res.json(usuario);
			});
        },
        login:function(req, res){
			var Usuario = app.get('usuario');
            Usuario.find({ where: { correo: req.body.correo, contrasena: req.body.password } }).then(function (usuario) {
                if(usuario) {
                    res.json(usuario);
                } else {
                    res.status(404).send({ message: 'Credenciales Invalidas'});
                }
            });
        }
    }
}
