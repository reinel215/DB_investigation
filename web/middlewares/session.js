//Middleware que comprueba el acceso del usuario y si tiene un id asignado para su logeo.
module.exports = function(req, res, next){
  //el next representa el siguiente middleware.
  if(!req.session.user_id){
    res.redirect('/login');
  }
  else{
    next();
  }
}
