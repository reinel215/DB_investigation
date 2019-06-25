const {fetch} = require('node-fetch');
//Ruta principal de acceso a la pagina.
const express = require('express');
const RouterPrincipal = express.Router();
const { Client } = require('pg');
const datos= {
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'UCABINV',
  port: 5432,
};
const client= new Client(datos);

const query_cont_proy= 'SELECT COUNT(*) FROM Proyecto as A JOIN Usuario_Proyecto B ON B.id_proyecto = A.id_proyecto WHERE B.id_usuario = $1';

RouterPrincipal.get("/validate", (req, res) => {
  res.send({status: req.session.status,
    response: req.session.response,
    register_f: req.session.register_f
  });
});

RouterPrincipal.get("/user_info", (req, res) => {
  let nombre= req.session.nombres + ' ' + req.session.apellidos;
  let tipo_usuario = req.session.id_tipo_usuario;
  let contador_proy;
  values = [req.session.id_usuario];
  client.connect().catch((err) => {
    console.log(err);
  });
  //Validacion de ingreso.
  client.query(query_cont_proy,values, (err,result) => {
    if (err){
      console.log(err);
      nombre='';
      tipo_usuario=0;
      contador_proy=0;
    }
    else{
      contador_proy= result.rows[0].count
    }
  });
  res.send({nombre: nombre,
    tipo_usuario: tipo_usuario,
    contador_proy: contador_proy
  });
});

module.exports = RouterPrincipal;