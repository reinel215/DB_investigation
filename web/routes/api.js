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

const query_cont_proy= 'SELECT COUNT(*) FROM Proyecto as A JOIN Usuario_Proyecto B ON B.id_proyecto = A.id_proyecto WHERE B.id_usuario = $1';
const query_actions= 'SELECT Permiso.* FROM Permiso JOIN Rol ON Rol.id_permiso = Permiso.id_permiso JOIN Tipo_Usuario ON Tipo_Usuario.id_tipo_usuario = rol.id_tipo_usuario WHERE Tipo_Usuario.id_tipo_usuario = $1';

RouterPrincipal.get("/validate", (req, res) => {
  let response=req.session.response;
  let api_response=req.session.api_response;
  req.session.response= '';
  req.session.api_response= false;
  req.session.save();
  res.send({
    response: response,
    api_response: api_response
  });
});

RouterPrincipal.get("/user_info", (req, res) => {
  const client= new Client(datos);
  let nombre= req.session.nombres + ' ' + req.session.apellidos;
  let tipo_usuario = req.session.id_tipo_usuario;
  let contador_proy;
  values = [req.session.id_usuario];
  client.connect().catch((err) => {
    console.log('Error en client connect. /api/user_info \n');
    console.log(err);
  });
  //Validacion de ingreso.
  client.query(query_cont_proy,values, (err,result) => {
    if (err){
      console.log('Error en client query. /api/user_info \n');
      console.log(err);
      nombre='';
      tipo_usuario=0;
      contador_proy=0;
    }
    else{
      contador_proy= result.rows[0].count
    }
    client.end((err) => console.log('disconnected - User Info'));
    res.send({nombre: nombre,
      tipo_usuario: tipo_usuario,
      contador_proy: contador_proy
    });
  });
});

RouterPrincipal.get("/user_actions", (req, res) => {
  console.log('entrada a user_Actions');
  const client= new Client(datos);
  var actions=[];
  values = [req.session.id_tipo_usuario];
  client.connect().catch((err) => {
    console.log('Error en client connect. /api/user_actions \n');
    console.log(err);
  });
  //Validacion de ingreso.
  client.query(query_actions,values, (err,result) => {
    if (err){
      console.log('Error en client query. /api/user_actions \n');
      console.log(err);
      nombre='';
      tipo_usuario=0;
      contador_proy=0;
    }
    else{
      if ( result.rows.length >0 )
        for(let i = 0; i< result.rows.length; i++){
          actions.push({
            nombre: result.rows[i].nombre,
            ruta: result.rows[i].ruta,
            descripcion: result.rows[i].descripcion
          })
        }
    }
    client.end((err) => console.log('disconnected - User Actions'));
    res.send({
      actions: actions
    });
  });
});

module.exports = RouterPrincipal;