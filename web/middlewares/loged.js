module.exports = function(req, res, next){
    if(req.session.id_usuario){
      res.redirect('/home');
    }
    else{
      next();
    }
  }