//Ruta principal de acceso a la pagina.
const express = require('express');
const path = require('path');
const RouterPrincipal = express.Router();
const { Client } = require('pg');
const md5 = require('md5');
const datos= {
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'UCABINV',
  port: 5432,
};
const client= new Client(datos);

const query_user= 'SELECT A.id_usuario, A.correo, A.hash_password, A.intentos FROM Usuario as A WHERE A.correo = $1::text';
const reducir_intento= 'UPDATE Usuario SET intentos = $1 WHERE Usuario.id = $2';
const reset_intento= 'UPDATE Usuario SET intentos = 3 WHERE Usuario.id = $1';
const query_register= 'INSERT INTO Usuario (nombres, apellidos, correo, hash_password, intentos, id_tipo_usuario) VALUES ($1, $2, $3, $4, 3, 1)';

//Respuesta del primer acceso.
RouterPrincipal.get("/", (req, res) =>{
    res.sendFile(path.join(__dirname +'\/..\/views\/index.html'));
});

//Validacion de ingreso.
RouterPrincipal.post("/signin", (req, res) => {
  var values = [req.body.email];
  //validacion de ingreso en esta seccion.
  client.connect().catch((err) => {
    console.log(err);
    req.session.status = true;
    req.session.response = err;
    req.session.save();
  });
  //Validacion de ingreso.
  client.query(query_user,values, (err,result) => {
    if (err){
      console.log(err);
      req.session.status = true;
      req.session.response= 'Error de conexion, usuario no encontrado.'
      req.session.save();
    }
    else{
      if(result.rows[0] && result.rows[0].intentos > 0){
        if (result.rows[0].hash_password != md5(req.body.password)){
          req.session.status = true;
          req.session.response = 'Clave invalida';
          values =[result.rows[0].intentos--, result.rows[0].id_usuario];
          client.query(reducir_intento, values).then( result => console.log(result)).catch(e => console.log(e));
        }
        else{
          values =[result.rows[0].id_usuario];
          client.query(reset_intento, values).then( result => console.log(result)).catch(e => console.log(e));;
          req.session.id_usuario = result.rows[0].id_usuario;
          req.session.hash_password = result.rows[0].hash_password;
          req.session.email = result.rows[0].correo;
          req.session.nombres = result.rows[0].nombres;
          req.session.apellidos = result.rows[0].apellidos;
          req.session.save()
        }
      }
      else{
        req.session.status = true;
        req.session.response= 'Usuario invalido.';
      }
    }
    req.session.save();
    client.end((err) => console.log('disconnected'));
    res.redirect('/');
  });
});


RouterPrincipal.post("/signup", function(req,res){
  const values = [req.body.nombres, req.body.apellidos, req.body.email, md5(req.body.password)];
  //validacion de ingreso en esta seccion.
  client.connect().catch((err) => {
    req.session.status = true;
    req.session.response = 'Error al intentar conectar.'
    req.session.save();
  });
  //Validacion de ingreso.
  client.query(query_register,values, (err,result) => {
    if (err){
      req.session.status = true;
      req.session.response= 'Error de conexion, usuario no registrado.'
    }
    else{
      req.session.status = false;
      req.session.response= 'Registro completado.';
    }
    req.session.save();
    client.end((err) => console.log('disconnected'));
    res.redirect("/");
  });
});

module.exports = RouterPrincipal;
