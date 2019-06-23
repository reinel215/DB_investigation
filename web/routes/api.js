//Ruta principal de acceso a la pagina.
const express = require('express');
const RouterPrincipal = express.Router();

RouterPrincipal.get("/validate", (req, res) => {
  console.log(req.session);
    res.send({status: req.session.status,
      response: req.session.response
    });
});

module.exports = RouterPrincipal;