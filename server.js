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
        direccion: { type: Sequelize.STRING, allowNull: false},
    });

    var Departamento = sequelize.define('departamento', {
        id_departamento: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
        nombre: { type: Sequelize.STRING, allowNull: false},
        descripcion: { type: Sequelize.STRING, allowNull: false}
    });

    var LugarTuristico = sequelize.define('lugarturistico', {
        id_lugarturistico: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
        nombre: { type: Sequelize.STRING, allowNull: false },
        descripcion: { type: Sequelize.STRING, allowNull: false },
        direccion: { type: Sequelize.STRING, allowNull: false },
        id_departamento: { type: Sequelize.INTEGER, references: {
            model: Departamento,
            key: 'id_departamento'
        }}
    });

    var Hotel = sequelize.define('hotel', {
        id_hotel: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
        direccion: { type: Sequelize.STRING, allowNull: false},
        clasificacion: { type: Sequelize.INTEGER, allowNull: false}
    });

    var Restaurante = sequelize.define('restaurante', {
        id_restaurante: { type: Sequelize.INTEGER, primaryKey: true ,autoIncrement: true },
        nombre: { type: Sequelize.STRING, allowNull: false },
        clasificacion: { type: Sequelize.INTEGER, allowNull: false }
    });

    var SucursalRestaurante = sequelize.define('sucursalrestaurante', {
        id_sucursal: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
        direccion: { type: Sequelize.STRING, allowNull: false },
        id_departamento: { type: Sequelize.INTEGER, references: {
            model: Departamento,
            key: 'id_departamento'
        }},
        id_restaurante: { type: Sequelize.INTEGER, references: {
            model: Restaurante,
            key: 'id_restaurante'
        }}
    });

    var SucursalHotel = sequelize.define('sucursalhotel', {
        id_sucursal: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
        direccion: { type: Sequelize.STRING, allowNull: false },
        id_departamento: { type: Sequelize.INTEGER, references: {
            model: Departamento,
            key: 'id_departamento'
        }},
        id_hotel: { type: Sequelize.INTEGER, references: {
            model: Hotel,
            key: 'id_hotel'
        }}
    });

    var Servicio = sequelize.define('servicio', {
        id_servicio: { type: Sequelize.INTEGER, primaryKey: true ,autoIncrement: true },
        nombre: { type: Sequelize.STRING, allowNull: false },
        descripcion: { type: Sequelize.STRING, allowNull: false }
    });

    var TipoComida = sequelize.define('tipocomida', {
        id_tipocomida: { type: Sequelize.INTEGER, primaryKey: true ,autoIncrement: true },
        nombre: { type: Sequelize.STRING, allowNull: false },
        descripcion: { type: Sequelize.STRING, allowNull: false }
    });

    Hotel.belongsToMany(Servicio, { through: 'HotelServicio' });
    Restaurante.belongsToMany(TipoComida, { through: 'ComidaRestaurante' });
    Departamento.hasMany(Restaurante, { foreignKey: 'id_restaurante', constraints: false });
    Restaurante.belongsTo(Departamento, { foreignKey: 'id_restaurante', constraints: false });
    Departamento.hasMany(LugarTuristico, { foreignKey: 'id_lugarturistico', constraints: false });
    LugarTuristico.belongsTo(Departamento, { foreignKey: 'id_lugarturistico', constraints: false });
    Departamento.hasMany(Hotel, { foreignKey: 'id_hotel', constraints: false});
    Hotel.belongsTo(Departamento, { foreignKey: 'id_hotel', constraints: false});
    Restaurante.hasMany(SucursalRestaurante, { foreignKey: 'id_sucursal', constraints: false });
    SucursalRestaurante.belongsTo(Restaurante, { foreignKey: 'id_restaurante', constraints: false});

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
    app.set('sucursal', SucursalRestaurante);
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    app.use(morgan('dev'));
    app.use('/api/v1',require('./routes')(app));
    app.use(cors());

    app.listen(puerto,function(){
        console.log("Servidor iniciado en el puerto: " + puerto);
        console.log("Debug del server: ");
    });
})();
