const {fetch} = require('node-fetch');
//Ruta principal de acceso a la pagina.
const express = require('express');
const RouterPrincipal = express.Router();

RouterPrincipal.get("/validate", (req, res) => {
  res.send({status: req.session.status,
    response: req.session.response,
    register_f: req.session.register_f
  });
});

module.exports = RouterPrincipal;