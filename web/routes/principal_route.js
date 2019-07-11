var DAO = require('../scripts/DAO.js').default;
//Ruta principal de acceso a la pagina.
const express = require('express');
const path = require('path');
const RouterPrincipal = express.Router();
const { Client } = require('pg');
const md5 = require('md5');
const middleware_loged = require('../middlewares/loged.js');
const datos= {
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'UCABINV',
  port: 5432,
};

RouterPrincipal.all("/", (req, res) =>{
  res.redirect('/login');
});

RouterPrincipal.use("/login",middleware_loged);
//Respuesta del primer acceso.
RouterPrincipal.get("/login", (req, res) =>{
    res.sendFile(path.join(__dirname +'\/..\/views\/index.html'));
});

//Validacion de ingreso.
RouterPrincipal.post("/signin", (req, res) => {
  var values = [req.body.email];
  let conexion = new DAO();
  conexion.ingreso_usuario(values, req.session, req.body.password).then((session) => {
    //Finalizacion de la respuesta con desconexion y redireccion.
    req.session = session;
    req.session.save();
    console.log('redireccion');
    res.redirect('/');
  });
});


RouterPrincipal.post("/signup", function(req,res){
  const values = [req.body.nombres, req.body.apellidos, req.body.registro_email, md5(req.body.registro_password)];
  //validacion de ingreso en esta seccion.
  const conexion= new DAO();
  conexion.registro_usuario(values,req.session).then((session) => {
    req.session = session;
    req.session.save();
    res.redirect("/");
  });
});

module.exports = RouterPrincipal;
