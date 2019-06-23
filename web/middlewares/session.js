//Middleware que comprueba el acceso del usuario y si tiene un id asignado para su logeo.
module.exports = function(req, res, next){
  console.log('ENTROOOOOOOOOOOOOOOOOOOOOOOOOO');
  if(!req.session.id_usuario){
    res.redirect('/login');
  }
  else{
    next();
  }
}
