/**
 * Created by Javier on 22/04/2016.
 */
(function(){
    var express=require('express');
    var bodyParser=require('body-parser');
    var morgan=require('morgan');
    var mysql=require('mysql');
    var cors = require('cors');
    var Sequelize = require('sequelize');
    var sequelize = new Sequelize('db_turismo', 'root', '', {
        host: 'localhost',
        dialect: 'mysql',
        pool: {
            max: 20,
            min: 0,
            idle: 10000
        }
    });

    /*
        Declaraciones de los modelos con el ORM
     */
    var Usuario = sequelize.define('usuario', {
        id_usuario: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
        nombre: { type: Sequelize.STRING, allowNull: false},
        telefono: { type: Sequelize.INTEGER, allowNull: false},
        correo: { type: Sequelize.STRING, allowNull: false},
        nick: { type: Sequelize.STRING, allowNull: false},
        contrasena: { type: Sequelize.STRING, allowNull: false},
        direccion: { type: Sequelize.STRING, allowNull: false}
    }, {
        freezeTableName: true,
        timestamps: false
    });

    var Departamento = sequelize.define('departamento', {
        id_departamento: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
        nombre: { type: Sequelize.STRING, allowNull: false },
        descripcion: { type: Sequelize.TEXT, allowNull: false },
        urlImagen: { type: Sequelize.STRING, allowNull: false }
    }, {
        freezeTableName: true,
        timestamps: false
    });

    var LugarTuristico = sequelize.define('lugarturistico', {
        id_lugarturistico: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
        nombre: { type: Sequelize.STRING, allowNull: false },
        descripcion: { type: Sequelize.TEXT, allowNull: false },
        direccion: { type: Sequelize.STRING, allowNull: false },
        urlImagen: { type: Sequelize.STRING, allowNull: false },
		latitud: { type: Sequelize.FLOAT, allowNull: false },
		longitud: { type: Sequelize.FLOAT, allowNull: false }
    }, {
        freezeTableName: true,
        timestamps: false
    });

    var Hotel = sequelize.define('hotel', {
        id_hotel: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
		nombre: { type: Sequelize.STRING, allowNull: false },
		descripcion: { type: Sequelize.TEXT, allowNull: false },
        clasificacion: { type: Sequelize.INTEGER, allowNull: false},
		pbx: { type: Sequelize.INTEGER, allowNull: true },
		urlLogo: { type: Sequelize.STRING, allowNull: false },
        urlImagen: { type: Sequelize.STRING, allowNull: false }
    }, {
        freezeTableName: true,
        timestamps: false
    });

    var Restaurante = sequelize.define('restaurante', {
        id_restaurante: { type: Sequelize.INTEGER, primaryKey: true ,autoIncrement: true },
        nombre: { type: Sequelize.STRING, allowNull: false },
        clasificacion: { type: Sequelize.INTEGER, allowNull: false },
		descripcion: { type: Sequelize.TEXT, allowNull: false },
		pbx: { type: Sequelize.INTEGER, allowNull: true },
		urlLogo: { type: Sequelize.STRING, allowNull: false },
        urlImagen: { type: Sequelize.STRING, allowNull: false }
    }, {
        freezeTableName: true,
        timestamps: false
    });

    var SucursalRestaurante = sequelize.define('sucursalrestaurante', {
        id_sucursal: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
        direccion: { type: Sequelize.STRING, allowNull: false },
		latitud: { type: Sequelize.FLOAT, allowNull: false },
		longitud: { type: Sequelize.FLOAT, allowNull: false }
    }, {
        freezeTableName: true,
        timestamps: false
    });

    var SucursalHotel = sequelize.define('sucursalhotel', {
        id_sucursal: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
        direccion: { type: Sequelize.STRING, allowNull: false },
		latitud: { type: Sequelize.FLOAT, allowNull: false },
		longitud: { type: Sequelize.FLOAT, allowNull: false }
    }, {
        freezeTableName: true,
        timestamps: false
    });

    var Servicio = sequelize.define('servicio', {
        id_servicio: { type: Sequelize.INTEGER, primaryKey: true ,autoIncrement: true },
        nombre: { type: Sequelize.STRING, allowNull: false },
        descripcion: { type: Sequelize.TEXT, allowNull: false }
    }, {
        freezeTableName: true,
        timestamps: false
    });

    var TipoComida = sequelize.define('tipocomida', {
        id_tipocomida: { type: Sequelize.INTEGER, primaryKey: true ,autoIncrement: true },
        nombre: { type: Sequelize.STRING, allowNull: false },
        descripcion: { type: Sequelize.TEXT, allowNull: false }
    }, {
        freezeTableName: true,
        timestamps: false
    });

    var Comentario = sequelize.define('comentario', {
        id_comentario: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
        comentario: { type: Sequelize.STRING, allowNull: false }
    }, {
        freezeTableName: true,
        timestamps: false
    });

    Hotel.belongsToMany(Servicio, { through: 'HotelServicio' });
    Restaurante.belongsToMany(TipoComida, { through: 'ComidaRestaurante' });
	  Departamento.belongsToMany(Hotel, { through: 'DepartamentoHotel' });
	  Departamento.belongsToMany(Restaurante, { through: 'DepartamentoRestaurante' });
    LugarTuristico.belongsToMany(Comentario, { through: 'ComentarioLugarTuristico' });
    Hotel.belongsToMany(Comentario, { through: 'ComentarioHotel' });
    Restaurante.belongsToMany(Comentario, { through: 'ComentarioRestaurante' });
    Departamento.hasMany(LugarTuristico, { constraints: true });
    LugarTuristico.belongsTo(Departamento, { constraints: true });
    Restaurante.hasMany(SucursalRestaurante, { constraints: true });
    SucursalRestaurante.belongsTo(Restaurante, { constraints: true });
    Hotel.hasMany(SucursalHotel, { constraints: true });
    SucursalHotel.belongsTo(Hotel, { constraints: true });
    Departamento.hasMany(SucursalHotel, { constraints: true });
    SucursalHotel.belongsTo(Departamento, { constraints: true });
    Departamento.hasMany(SucursalRestaurante, { constraints: true });
    SucursalRestaurante.belongsTo(Departamento, { constraints: true });

    sequelize.sync({ force: false });
    var puerto=3000;
    var conf=require('./config');
    var app=express();
    app.set('sequelize', sequelize);
    app.set('usuario', Usuario);
    app.set('departamento', Departamento);
    app.set('lugarturistico', LugarTuristico);
    app.set('hotel', Hotel);
    app.set('servicio', Servicio);
    app.set('tipocomida', TipoComida);
    app.set('restaurante', Restaurante);
    app.set('sucursalrestaurante', SucursalRestaurante);
    app.set('sucursalhotel', SucursalHotel);
    app.set('comentario', Comentario);
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    app.use(morgan('dev'));
    app.use(function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
    });
    app.use('/api/v1',require('./routes')(app));
    app.use(cors());

    app.listen(puerto,function(){
        console.log("Servidor iniciado en el puerto: " + puerto);
        console.log("Debug del server: ");
    });
})();
