module.exports = function(req, res, next){
    console.log('ENTROOOOOOOOOOOOOOOOOOOOOOOOOO2');
    if(req.session.id_usuario){
      res.redirect('/app');
    }
    else{
      next();
    }
  }