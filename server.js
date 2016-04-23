/**
 * Created by Javier on 22/04/2016.
 */
(function(){
    var express=require('express');
    var bodyParser=require('body-parser');
    var morgan=require('morgan');
    var mysql=require('mysql');
    var puerto=3000;
    var conf=require('./config');
    var pool=mysql.createPool(conf.database);
    var app=express();
    app.set('pool',pool);
    app.use(bodyParser.urlencoded({
        extended:false
    }));
    app.use(bodyParser.json());
    app.use(morgan('dev'));
    app.use('/api/v1',require('./routes')(app));

    app.listen(puerto,function(){
        console.log("Servidor iniciado en el puerto: "+puerto);
    });
})();
