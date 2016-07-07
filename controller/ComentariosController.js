module.exports = function(app) {
  return {
    hotelComentarios: function(req, res) {
      var Hotel = app.get('hotel');
      var Comentario = app.get('comentario');
      Hotel.find({ where: { id_hotel: req.params.id }, include: [Comentario] }).then(function(hotel) {
        if(hotel) {
          res.json(hotel.comentarios);
        }else {
          res.status(404).json({ message: "Hotel no encontrado" });
        }
      });
    },
    restaurateComentario: function(req, res) {
      var Restaurante = app.get('restaurante');
      var Comentario = app.get('comentario');
      Restaurante.find({ where: { id_restaurante: req.params.id }, include: [Comentario] }).then(function(restaurante){
        if(restaurante) {
          res.json(restaurante.comentarios);
        } else {
          res.status(404).json({ message: "Restaurante no encontrado" });
        }
      });
    },
    lugarComentario: function(req, res) {
      var Lugar = app.get('lugarturistico');
      var Comentario = app.get('comentario');
      Lugar.find({ where: { id_lugarturistico: req.params.id }, include: [Comentario] }).then(function(lugar){
        if(lugar) {
          res.json(lugar.comentarios);
        } else {
          res.status(404).json({ message: "Lugar Tursitico no encontrado" });
        }
      });
    },
    agregarHotelComentario: function(req, res) {
      var Hotel = app.get('hotel');
      var Comentario = app.get('comentario');
      Hotel.findById(req.body.id_hotel).then(function(hotel){
        Comentario.create({
          comentario: req.body.comentario,
          usuario: req.body.usuario
        }).then(function(comentario){
          hotel.addComentario(comentario).then(function(){
            res.json(comentario);
          })
        });
      });
    },
    agregarRestauranteComentario: function(req, res) {
      var Restaurante = app.get('restaurante');
      var Comentario = app.get('comentario');
      Restaurante.findById(req.body.id_restaurante).then(function(restaurante){
        Comentario.create({
          comentario: req.body.comentario,
          usuario: req.body.usuario
        }).then(function(comentario){
          restaurante.addComentario(comentario).then(function(){
            res.json(comentario);
          });
        });
      });
    },
    agregarLugarComentario: function(req, res) {
      var Lugar = app.get('lugarturistico');
      var Comentario = app.get('comentario');
      Lugar.findById(req.body.id_lugarturistico).then(function(lugar){
        Comentario.create({
          comentario: req.body.comentario,
          usuario: req.body.usuario
        }).then(function(comentario){
          lugar.addComentario(comentario).then(function(){
            res.json(comentario);
          });
        });
      });
    },
    editarComentario: function(req, res) {
      var Comentario = app.get('comentario');
      Comentario.findById(req.body.id_comentario).then(function(comentario){
        comentario.updateAttributes({
          comentario: req.body.comentario
        }).then(function(comentario){
          res.json(comentario);
        });
      });
    },
    eliminarComentario: function(req, res) {
      var Comentario = app.get('comentario');
      Comentario.destroy({
        where: {
            id_comentario: req.params.id
        }
      }).then(function(eliminado){
        if(eliminado == 1) {
          res.json({ message: "Comentario eliminado", status: eliminado });
        } else {
          res.json({ message: "Comentario no encontrado", status: eliminado });
        }
      });
    }
  }
}
