//Ruta principal de acceso a la pagina.
const express = require('express');
const path = require('path');
const fs = require('fs');
const RouterPrincipal = express.Router();
const { Client } = require('pg');
const md5 = require('md5');
const middleware_session = require('../middlewares/session.js');
const middleware_logged = require('../middlewares/loged.js');

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'UCABINV',
  port: 5432,
});

const query_user= 'SELECT A.id_usuario, A.correo, A.hash_password, A.intentos FROM Usuario as A WHERE A.hash_password = $1::text AND A.correo = $2::text';

RouterPrincipal.use('/app', middleware_session);
RouterPrincipal.use('/login', middleware_logged);

//Respuesta del primer acceso.
RouterPrincipal.get("/login", (req, res) =>{
    res.sendFile(path.join(__dirname +'\/..\/views\/index.html'));
});

RouterPrincipal.get("/session", (req, res) =>{
  res.send(req.session);
});

//Validacion de ingreso.
RouterPrincipal.post("/ingreso", (req, res) => {
  const values = [md5(req.body.password), req.body.email];
  //validacion de ingreso en esta seccion.
  client.connect().catch((err) => {
    req.session.status = true;
    req.session.response = 'Error al intentar conectar.'
    req.session.save();
    res.redirect("/login");
  });
  //Validacion de ingreso.
  client.query(query_user,values, (err,result) => {
    if (err){
      req.session.status = true;
      req.session.response= 'Error de conexion, usuario no encontrado.'
      req.session.save();
    }
    else{
      if(result.rows[0] && result.rows[0].intentos > 0){
        req.session.id_usuario = result.rows[0].id_usuario;
        req.session.hash_password = result.rows[0].hash_password;
        req.session.email = result.rows[0].correo;
        req.session.save();
        client.end();
        //res.redirect('/app');
      }
      else{
        req.session.status = true;
        req.session.response= 'Usuario invalido.';
        req.session.save();
      }
    }
  });
  client.end();
  console.log(req.session);
  res.redirect("/login");
});

/*
app.post("/signup", function(req,res){
  //Metodo post para el registro de los usuarios a traves del metodo post. con el req obtenemos los datos respectivos de cada a usuario para su registro.
  //Abajo realizamos el query debido.
});

//Metodos de peticion para el servidor.
app.post("/signin", function(req,res){
    //Esta es la entrada de inicio de sesion para el servidor, con el req, obtenemos los datos del metodo post y podemos asignar de esa manera un id de sesion con session.
    //Primero se hace el query y se ejecuta una funcion luego de esta, obteniendo un id para el usuario mismo.
});*/

module.exports = RouterPrincipal;
