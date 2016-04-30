/**
 * Created by Javier on 22/04/2016.
 */
module.exports=function(app){
    return {
        registro:function(peticion,respuesta){
            var pool=app.get('pool');
            pool.getConnection(function(err,connection){
                if(err){
                    connection.release();
                    respuesta.json({"code" : 100, "status" : "Error al conectar a la base de datos"});
                }
                connection.query("CALL Registrar('"+peticion.body.nombre+"',"+peticion.body.telefono +",'"+peticion.body.correo+"','"+peticion.body.nick+"','"+peticion.body.contrasena+"');",function(err){
                    if(err)
                        throw err;
                    else
                        respuesta.send({"mensaje":"Registro insertado correctamente","status":"200"});
                    connection.release();
                });
            });

        },
        login:function(peticion,respuesta){
            var pool=app.get('pool');
            pool.getConnection(function(err,connection){
                if(err){
                    connection.release();
                    res.json({"code" : 100, "status" : "Error al conectar a la base de datos"});
                }
                connection.query("CALL Login('"+peticion.body.nick+"', '"+peticion.body.contrasena+"');", function(err, row){
                    if(err)
                        throw err;
                    else
                        respuesta.json(row);
                    connection.release();
                });
            });
        }
    }
}