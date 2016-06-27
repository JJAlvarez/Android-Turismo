/**
 * Created by Javier on 22/04/2016.
 */
 var jwt=require('jsonwebtoken');
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
              if(usuario) {
                  res.json(usuario);
              } else {
                  res.json({ message: "Error al insertar al usuario " });
              }
      			});
        },
        login:function(req, res){
			      var Usuario = app.get('usuario');
            Usuario.find({ where: { correo: req.body.correo, contrasena: req.body.password } }).then(function (usuario) {
                if(usuario) {
                    res.json(genToken(usuario));
                } else {
                    res.status(404).send({ message: 'Credenciales Invalidas'});
                }
            });
        },
        loginTwitter: function(req, res) {
            res.json(getTokenForTwitter());
        },
  		tokenMiddleware:function(req,res,next){
  			var token=req.get('Authorization') || req.body.token || req.query.token;
  			if(token){
  				jwt.verify(token,'S3CUR3@APP',function(err,decoded){
  					if(err){
  						return res.status(403).send({
  							success:false,
  							message:'Fallo al validar token'
  						});
  					}
  					req.user=decoded;
  					next();
  				});
  			} else{
  				return res.status(403).send({
  					success:false,
  					message:'No se proporciono token'
  				});
  			}
  		},
  		tokenGenerator: function(req,res){
  			var token=jwt.sign({company:'Kinal'},'S3CUR3@APP');
  			res.send(token);
  		},
    }
}
function genToken(user){
	var payload=jwt.sign({
			"company":"Kinal"
		},
		'S3CUR3@APP');

	var token={
		"token":payload,
		"usuario":user
	}
	return token;
}
function getTokenForTwitter(){
  var payload=jwt.sign({
			"company":"Kinal"
		},
		'S3CUR3@APP');

	var token={
		"token":payload,
    "token_twitter": true
	}
	return token;
}
