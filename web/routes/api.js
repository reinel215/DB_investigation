//Ruta principal de acceso a la pagina.
const express = require('express');
const path = require('path');
const fs = require('fs');
const RouterPrincipal = express.Router();
var repositorios= [];

RouterPrincipal.get("/validate", (req, res) => {
    if (req.session.validacion_num  < 3){
      res.send({status : true,
                response: ''});
    }
    else{
      res.send({status: false,
                response: 'Usuario no existe o password invalida.'});
    }
});

module.exports = RouterPrincipal;