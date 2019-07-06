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
const query_investigations= 'SELECT Proyecto.Identificacion, Proyecto.id_proyecto, Investigacion.pregunta_investigacion, Investigacion.calidad, Investigacion.objetivo_general FROM Proyecto JOIN Usuario_Proyecto ON Usuario_Proyecto.id_proyecto = Proyecto.id_proyecto JOIN Investigacion ON Investigacion.id_proyecto = Proyecto.id_proyecto WHERE Usuario_Proyecto.id_usuario = $1';
const query_investigation='SELECT Proyecto.identificacion, count(Unidad_Informacion.id_unidad_informacion) as Cantidad_UF, Investigacion.Objetivo_General, Investigacion.Pregunta_Investigacion, Investigacion.calidad, Tipo_Investigacion.nombre as tipo_inv, Modalidad.nombre as mod, Contexto.concepcion, Contexto.poblacion, Temporalidad.descripcion as temp FROM Proyecto JOIN Unidad_Informacion ON Unidad_Informacion.id_proyecto = Proyecto.id_proyecto JOIN Investigacion ON Investigacion.id_proyecto = Proyecto.id_proyecto JOIN Esquema_Formulado ON Esquema_Formulado.id_investigacion = Investigacion.id_investigacion JOIN Pregunta_Modular ON Pregunta_Modular.id_pregunta_modular = Esquema_Formulado.id_pregunta_modular JOIN Tipo_Investigacion ON Tipo_Investigacion.id_tipo_investigacion = Pregunta_Modular.id_tipo_investigacion JOIN Modalidad ON Modalidad.id_tipo_investigacion = Tipo_Investigacion.id_tipo_investigacion JOIN Contexto ON Contexto.id_contexto = Investigacion.id_contexto JOIN Temporalidad ON Temporalidad.id_temporalidad = Investigacion.id_Temporalidad WHERE Proyecto.id_proyecto = $1 GROUP BY Proyecto.identificacion, Investigacion.Objetivo_General, Investigacion.Pregunta_Investigacion, Investigacion.calidad, tipo_inv, concepcion, poblacion, temp, mod';
const query_restricciones='SELECT contenido FROM Restriccion WHERE Restriccion.id_proyecto = $1';
const query_alcances='SELECT contenido FROM Alcance WHERE Alcance.id_proyecto = $1';
const query_unidades= 'SELECT Unidad_Informacion.id_unidad_informacion, Unidad_Informacion.titulo, Unidad_Informacion.autor, Unidad_Informacion.fecha FROM Unidad_Informacion JOIN Proyecto ON Proyecto.id_proyecto = Unidad_Informacion.id_proyecto WHERE Proyecto.id_proyecto = $1';
const query_citas='SELECT Cita.cita, Cita.delimitacion, Categoria_Uso.nombre as Categoria, Entidad_Uso.nombre as Entidad FROM Cita LEFT JOIN Categoria_Uso ON Categoria_Uso.id_categoria_uso = Cita.id_categoria_uso LEFT JOIN Direccion_Uso ON Direccion_Uso.id_direccion_uso = cita.id_direccion_uso LEFT JOIN Entidad_Uso ON Entidad_Uso.id_entidad_uso = Direccion_Uso.id_entidad_uso WHERE Cita.id_unidad_informacion = $1';


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
  console.log('[+]Entrada a user_info');
  const client= new Client(datos);
  let nombre= req.session.nombres + ' ' + req.session.apellidos;
  let tipo_usuario = req.session.id_tipo_usuario;
  let contador_proy;
  values = [req.session.id_usuario];
  client.connect().catch((err) => {
    console.log('[-]Error en client connect. /api/user_info \n');
    console.log(err);
  });
  //Validacion de ingreso.
  client.query(query_cont_proy,values, (err,result) => {
    if (err){
      console.log('[-]Error en client query. /api/user_info \n');
      console.log(err);
      nombre='';
      tipo_usuario=0;
      contador_proy=0;
    }
    else{
      contador_proy= result.rows[0].count
    }
    client.end((err) => console.log('[+]disconnected - User Info'));
    res.send({nombre: nombre,
      tipo_usuario: tipo_usuario,
      contador_proy: contador_proy
    });
  });
});

RouterPrincipal.get("/user_actions", (req, res) => {
  console.log('[+]Entrada a user_Actions');
  const client= new Client(datos);
  var actions=[];
  values = [req.session.id_tipo_usuario];
  client.connect().catch((err) => {
    console.log('[-]Error en client connect. /api/user_actions \n');
    console.log(err);
  });
  //Validacion de ingreso.
  client.query(query_actions,values, (err,result) => {
    if (err){
      console.log('[-]Error en client query. /api/user_actions \n');
      console.log(err);
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
    client.end((err) => console.log('[+]disconnected - User Actions'));
    res.send({
      actions: actions,
      loaded:true
    });
  });
});

RouterPrincipal.get("/user_investigations", (req, res) => {
  console.log('[+]Entrada a user_investigations');
  const client= new Client(datos);
  var investigations=[];
  values = [req.session.id_usuario];
  client.connect().catch((err) => {
    console.log('[-]Error en client connect. /api/user_investigations \n');
    console.log(err);
  });
  //Validacion de ingreso.
  client.query(query_investigations,values, (err,result) => {
    if (err){
      console.log('[-]Error en client query. /api/user_investigations \n');
      console.log(err);
    }
    else{
      if ( result.rows.length > 0 )
        for(let i = 0; i< result.rows.length; i++){
          investigations.push({
            identificacion: result.rows[i].identificacion,
            id_proyecto: result.rows[i].id_proyecto,
            pregunta_investigacion: result.rows[i].pregunta_investigacion,
            calidad: result.rows[i].calidad,
            objetivo_general: result.rows[i].objetivo_general
          })
        }
    }
    client.end((err) => console.log('[+]disconnected - User Investigations'));
    res.send({
      investigations: investigations,
      loaded:true
    });
  });
});

RouterPrincipal.post("/user_investigation", (req, res) => {
  console.log('[+]Entrada a user_investigation')
  const client= new Client(datos);
  var investigation={};
  values = [req.body.id];
  client.connect().catch((err) => {
    console.log('[-]Error en client connect. /api/user_investigation \n');
    console.log(err);
  });
  //Validacion de ingreso.
  client.query(query_investigation,values, (err,result) => {
    if (err){
      console.log('[-]Error en client query. /api/user_investigation \n');
      console.log(err);
    }
    else{
      if ( result.rows.length > 0 ){
        investigation={
          identificacion: result.rows[0].identificacion,
          cantidad_uf: result.rows[0].cantidad_uf,
          objetivo_general: result.rows[0].objetivo_general,
          contexto:{
            poblacion: result.rows[0].poblacion,
            concepcion: result.rows[0].concepcion,
            temporalidad: result.rows[0].temp
          },
          mod: result.rows[0].mod,
          tipo_inv:result.rows[0].tipo_inv,
          calidad: result.rows[0].calidad,
          cantidad_uf: result.rows[0].cantidad_uf
        }
      }
    }
    client.end((err) => console.log('[+]disconnected - User Investigation'));
    res.send({
      investigation: investigation,
      loaded:true
    });
  });
});

RouterPrincipal.post("/user_investigation_restricciones_alcances", (req, res) => {
  console.log('[+]Entrada a restricciones con alcances');
  const client= new Client(datos);
  var alcances=[];
  var restricciones=[];
  values = [req.body.id];
  client.connect().catch((err) => {
    console.log('[-]Error en client connect. /api/user_investigation_restricciones_alcances \n');
    console.log(err);
  });
  //Validacion de ingreso.
  client.query(query_restricciones,values, (err,result) => {
    if (err){
      console.log('[-]Error en client query. /api/user_investigation_restricciones_alcances \n');
      console.log(err);
    }
    else{
      if ( result.rows.length > 0 ){
        for(let i=0; i< result.rows.length;i++){
          restricciones.push(result.rows[i].contenido);
        }
      }
    }
  });
  client.query(query_alcances,values, (err,result) => {
    if (err){
      console.log('[-]Error en client query. /api/user_investigation_restricciones_alcances \n');
      console.log(err);
    }
    else{
      if ( result.rows.length > 0 ){
        for(let i=0; i< result.rows.length;i++){
          alcances.push(result.rows[i].contenido);
        }
      }
    }
    client.end((err) => {console.log('[+]disconnected - restricciones alcances')});
    res.send({
      alcances: alcances,
      restricciones: restricciones
    });
  });
});

RouterPrincipal.post("/unidades_info", (req, res) => {
  console.log('[+]Entrada a unidades_info')
  const client= new Client(datos);
  var unidades=[];
  values = [req.body.id];
  client.connect().catch((err) => {
    console.log('[-]Error en client connect. /api/user_investigation_restricciones_alcances \n');
    console.log(err);
  });
  //Validacion de ingreso.
  client.query(query_unidades,values, (err,result) => {
    if (err){
      console.log('[-]Error en client query. /api/user_investigation_restricciones_alcances \n');
      console.log(err);
    }
    else{
        for (let i= 0; i < result.rows.length; i++){
          unidad ={}
          unidad.autor= result.rows[i].autor;
          unidad.fecha= result.rows[i].fecha;
          unidad.titulo= result.rows[i].titulo;
          unidad.id_unidad_informacion = result.rows[i].id_unidad_informacion;
          unidades.push(unidad);
        }
    }
    client.end((err) => {console.log('[+]disconnected - unidades info')});
    res.send({
      unidades:unidades
    });
  });
});

RouterPrincipal.post("/unidades_citas", (req, res) => {
  console.log('[+]Entrada en citas');
  const client= new Client(datos);
  var citas=[];
  values = [req.body.id];
  client.connect().catch((err) => {
    console.log('[-]Error en client connect. \n');
    console.log(err);
  });
  //Validacion de ingreso.
  client.query(query_citas, values, (err,result) => {
    if (err){
      console.log('[-]Error en client query.  \n');
      console.log(err);
    }
    else{
        for (let i= 0; i < result.rows.length; i++){
          cita ={};
          cita.cita= result.rows[i].cita;
          cita.categoria = result.rows[i].categoria;
          cita.entidad = result.rows[i].entidad;
          cita.delimitacion = result.rows[i].delimitacion;
          citas.push(cita);
        }
    }
    client.end((err) => {console.log('[+]disconnected - citas')});
    res.send({
      citas: citas
    });
  });
});

module.exports = RouterPrincipal;