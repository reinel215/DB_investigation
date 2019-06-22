//Ruta principal de acceso a la pagina.
const express = require('express');
const path = require('path');
const fs = require('fs');
const RouterPrincipal = express.Router();
var repositorios= [];

RouterPrincipal.get("/validate", (req, res) => {
    if (req.session.validacion_num  < 3){
      res.send({status : true});
    }
    else{
      res.send({status: false});
    }
});

RouterPrincipal.post("/ingreso", (req, res) => {
  //validacion de ingreso en esta seccion.
  if (req.session.validacion_num)
    req.session.validacion_num= req.session.validacion_num - 1;
  else 
    req.session.validacion_num= 2;
  res.redirect("/login");
});

module.exports = RouterPrincipal;