//Ruta principal de acceso a la pagina.
const express = require('express');
const path = require('path');
const fs = require('fs');
const RouterPrincipal = express.Router();
var repositorios= [];

//Respuesta del primer acceso.
RouterPrincipal.get("/login", (req, res) =>{
    res.sendFile(path.join(__dirname +'\/..\/views\/index.html'));
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
