import generador_documento from './generador_documentos.js';
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
const query_investigacion_estadios= 'SELECT Estadio_Aplicado.id_estadio_aplicado, Objetivo_Especifico_Det.contenido, Estadio_Aplicado.posicion, Estadio.nombre FROM Estadio_Aplicado JOIN Estadio ON Estadio.id_estadio = Estadio_Aplicado.id_estadio JOIN Objetivo_Especifico_Det ON Estadio_aplicado.id_estadio_aplicado = Objetivo_Especifico_Det.id_estadio_aplicado WHERE Estadio_Aplicado.id_investigacion = $1 ORDER BY Estadio_Aplicado.posicion;'; 
const query_estadio_eventos= 'SELECT Evento.nombre as evento, Clase_Evento.nombre as clase_Evento, Abordaje.nombre as abordaje, Tipo_Evento.nombre as tipo_evento, Evento_Delimitado.descripcion, Evento_Delimitado.id_evento_delimitado FROM Evento_Delimitado JOIN Evento ON Evento.id_evento = Evento_Delimitado.id_evento JOIN Clase_Evento ON Clase_Evento.id_clase_evento = Evento_Delimitado.id_clase_Evento JOIN Abordaje ON Abordaje.id_Abordaje = Evento_Delimitado.id_abordaje JOIN Tipo_Evento ON Tipo_Evento.id_tipo_evento = Evento_Delimitado.id_tipo_evento WHERE Evento_Delimitado.id_estadio_aplicado = $1';
const query_evento_sinergias= 'SELECT Clase_Sinergia.nombre as clase_sinergia, Sinergia.nombre as sinergia, Instrumento.nombre as instrumento, Sinergia.id_sinergia FROM Sinergia JOIN Clase_Sinergia ON Clase_Sinergia.id_clase_sinergia = Sinergia.id_clase_sinergia JOIN Aplicacion_Instrumental ON Aplicacion_Instrumental.id_sinergia = Sinergia.id_sinergia JOIN Instrumento ON Instrumento.id_instrumento = Aplicacion_Instrumental.id_instrumento WHERE Sinergia.id_evento_delimitado = $1';
const query_sinergia_indicios= 'SELECT Aplicacion_Instrumental.identificacion, Indicio.contenido as indicio, Item.identificacion as item , Item.contenido as item_descripcion, Categoria.nombre as categoria, Categoria.aplicacion_temporal, Categoria.terminos as terminos, Categoria.descripcion as descripcion, Categoria.nivel_ausencia as nivel, Escala.nombre as escala, Fuente.valor as fuente, Muestra.valor as muestra FROM Indicio  JOIN Indicio_Item ON Indicio_Item.id_indicio = Indicio.id_indicio JOIN Item ON Item.id_item = Indicio_Item.id_item JOIN Instrumento_Item ON Instrumento_Item.id_item = Item.id_item JOIN Aplicacion_Instrumental ON Aplicacion_Instrumental.id_instrumento = Instrumento_Item.id_instrumento AND Aplicacion_Instrumental.id_sinergia = Instrumento_Item.id_sinergia JOIN Sinergia ON Sinergia.id_sinergia = Aplicacion_Instrumental.id_sinergia JOIN Fuente ON Fuente.id_sinergia = Sinergia.id_sinergia JOIN Muestra ON Muestra.id_muestra = Fuente.id_muestra JOIN Categoria ON Item.id_categoria = Categoria.id_categoria JOIN Escala ON Escala.id_escala = Categoria.id_escala WHERE Aplicacion_Instrumental.id_sinergia = $1';

//Calculo de calidad
const query_calculo_rondas='';
const query_calculo_porcentajes='';


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

RouterPrincipal.post("/investigation_estadios", (req, res) => {
  console.log('[+]Entrada en estadios de cierta investigacion');
  const client= new Client(datos);
  var estadios=[];
  values = [req.body.id];
  client.connect().catch((err) => {
    console.log('[-]Error en client connect. \n');
    console.log(err);
  });
  //Validacion de ingreso.
  client.query(query_investigacion_estadios, values, (err,result) => {
    if (err){
      console.log('[-]Error en client query.  \n');
      console.log(err);
    }
    else{
        for (let i= 0; i < result.rows.length; i++){
          estadio={};
          estadio.posicion = result.rows[i].posicion;
          estadio.nombre = result.rows[i].nombre;
          estadio.id_estadio_aplicado = result.rows[i].id_estadio_aplicado;
          estadio.objetivo = result.rows[i].contenido;
          estadios.push(estadio);
        }
    }
    client.end((err) => {console.log('[+]disconnected - estadios en investigaciones')});
    res.send({
      estadios: estadios
    });
  });
});

RouterPrincipal.post("/estadio_eventos", (req, res) => {
  console.log('[+]Entrada eventos de cierto estadio');
  const client= new Client(datos);
  var eventos=[];
  values = [req.body.id];
  client.connect().catch((err) => {
    console.log('[-]Error en client connect. \n');
    console.log(err);
  });
  //Validacion de ingreso.
  client.query(query_estadio_eventos, values, (err,result) => {
    if (err){
      console.log('[-]Error en client query.  \n');
      console.log(err);
    }
    else{
        for (let i= 0; i < result.rows.length; i++){
          evento={};
          evento.id_evento_delimitado = result.rows[i].id_evento_delimitado;
          evento.tipo_evento = result.rows[i].tipo_evento;
          evento.clase_evento = result.rows[i].clase_evento;
          evento.descripcion = result.rows[i].descripcion;
          evento.evento = result.rows[i].evento;
          evento.abordaje = result.rows[i].abordaje;
          eventos.push(evento);
        }
    }
    client.end((err) => {console.log('[+]disconnected - eventos en estadio')});
    res.send({
      eventos: eventos
    });
  });
});

RouterPrincipal.post("/evento_sinergias", (req, res) => {
  console.log('[+]Entrada sinergias de cierto evento');
  const client= new Client(datos);
  var sinergias=[];
  values = [req.body.id];
  client.connect().catch((err) => {
    console.log('[-]Error en client connect. \n');
    console.log(err);
  });
  //Validacion de ingreso.
  client.query(query_evento_sinergias, values, (err,result) => {
    if (err){
      console.log('[-]Error en client query.  \n');
      console.log(err);
    }
    else{
        for (let i= 0; i < result.rows.length; i++){
          sinergia={};
          sinergia.clase_sinergia = result.rows[i].clase_sinergia;
          sinergia.instrumento = result.rows[i].instrumento;
          sinergia.sinergia = result.rows[i].sinergia
          sinergia.id_sinergia = result.rows[i].id_sinergia;
          sinergias.push(sinergia);
        }
    }
    client.end((err) => {console.log('[+]disconnected - sinergias de evento')});
    res.send({
      sinergias: sinergias
    });
  });
});

RouterPrincipal.post("/sinergia_indicios", (req, res) => {
  console.log('[+]Entrada indicios de cierta sinergia');
  const client= new Client(datos);
  var indicios=[];
  var identificacion;
  values = [req.body.id];
  client.connect().catch((err) => {
    console.log('[-]Error en client connect. \n');
    console.log(err);
  });
  //Validacion de ingreso.
  client.query(query_sinergia_indicios, values, (err,result) => {
    if (err){
      console.log('[-]Error en client query.  \n');
      console.log(err);
    }
    else{
        for (let i= 0; i < result.rows.length; i++){
          indicio={};
          indicio.indicio= result.rows[i].indicio;
          indicio.item= result.rows[i].item;
          indicio.item_descripcion = result.rows[i].item_descripcion;
          indicio.categoria = result.rows[i].categoria;
          indicio.aplicacion_temporal = result.rows[i].aplicacion_temporal;
          indicio.terminos = result.rows[i].terminos;
          indicio.descripcion = result.rows[i].descripcion;
          indicio.nivel = result.rows[i].nivel;
          indicio.fuente = result.rows[i].fuente;
          indicio.escala = result.rows[i].escala;
          indicio.muestra = result.rows[i].muestra;
          indicios.push(indicio);
          identificacion = result.rows[i].identificacion;
        }
    }
    client.end((err) => {console.log('[+]disconnected - indicios de sinergia')});
    res.send({
      indicios: indicios,
      identificacion: identificacion
    });
  });
});

RouterPrincipal.post("/calculo_calidad", (req, res) => {
  console.log('[+]Entrada calculo calidad');
  const client= new Client(datos);
  var calidad=0;
  var calidad_rondas=0;
  var calidad_porcentajes=0;
  values = [req.body.id];
  client.connect().catch((err) => {
    console.log('[-]Error en client connect. \n');
    console.log(err);
  });
  client.query(query_calculo_rondas, values, (err,result) => {
    if (err){
      console.log('[-]Error en client query.  \n');
      console.log(err);
    }
    else{
        
    }
  });
  client.query(query_calculo_porcentajes, values, (err,result) => {
    if (err){
      console.log('[-]Error en client query.  \n');
      console.log(err);
    }
    else{
        
    }
    calidad= calidad_rondas + calidad_porcentajes
    client.end((err) => {console.log('[+]disconnected - indicios de sinergia')});
    res.send({
      calidad: calidad
    });
  });
});

//Proceso de generacion de informe y su descarga.
RouterPrincipal.post("/descarga_informe", (req, res) => {
  var Proyecto;
  values = [req.body.id];
  client.connect().catch((err) => {
    console.log('[-]Error en client connect. \n');
    console.log(err);
  });
  const query_proyecto = 'SELECT Proyecto.*, Problematica.nombre as problematica, Problematica.descripcion as problematica_descripcion FROM Proyecto JOIN Problematica WHERE Proyecto.id_proyecto = $1';
  client.query(query_proyecto, values, (err,result) => {
    if(err){
      console.log('[-]error --- generando query para informe ')
    }
    else{
      Proyecto.identificacion= result.rows[0].identificacion;
      Problematica={};
      Problematica.nombre= result.rows[0].problematica;
      Problematica.descripcion= result.rows[0].problematica;
      Problematica.causas_sintomas=[];
      client.query('SELECT Causas_Sintomas.* FROM Causas_Sintomas JOIN Problematica ON Problematica.id_problematica = Causas_Sintomas.id_problematica JOIN Proyecto ON Proyecto.id_problematica = Problematica.id_problematica WHERE Proyecto.id_proyecto = $1', values, (err,result) => {
        if(err){
          console.log('[-]Error --- generando query para informe -causas_sintomas');
        }
        else{
          for(let i= 0; i<result.rows.length; i++){
            causas_sintomas ={};
            causas_sintomas.nombre = result.rows[i].nombre;
            causas_sintomas.descripcion = result.rows[i].descripcion;
            Problematica.causas_sintomas.push(causas_sintomas);
          }
        }
      });
      Proyecto.Problematica= Problematica;
      Proyecto.alcances=[];
      //Alcances
      client.query('SELECT Alcance.contenido JOIN Proyecto ON Proyecto.id_proyecto = Alcance.id_proyecto WHERE Proyecto.id_proyecto = $1', 
            values, (err,result) => {
            if(err){
              console.log('[-]Error --- generando query para informe -causas_sintomas');
            }
            else{
              for(let i=0; i< result.rows.length; i++){
                Proyecto.alcances.push(result.rows[i].contenido);
              }
            }
      });
      Proyecto.restricciones =[];
      //Restricciones
      client.query('SELECT Restriccion.contenido JOIN Proyecto ON Proyecto.id_proyecto = Restriccion.id_proyecto WHERE Proyecto.id_proyecto = $1', 
            values, (err,result) => {
            if(err){
              console.log('[-]Error --- generando query para informe -causas_sintomas');
            }
            else{
              for(let i=0; i< result.rows.length; i++){
                Proyecto.restricciones.push(result.rows[i].contenido);
              }
            }
          });
      Proyecto.unidades_informacion=[]
      client.query('SELECT Unidad_Informacion.*, Tipo_Fuente.nombre as tipo_fuente, Base_Noologica.nombre as base_noologica WHERE Unidad_Informacion.id_proyecto = $1', values, (err,result) => {
        if(err){
          console.log('[-]Error --- generando query para informe -causas_sintomas');
        }
        else{
          for(let i= 0; i<result.rows.length; i++){
            Unidad_Informacion ={};
            Unidad_Informacion.autor = result.rows[i].autor;
            Unidad_Informacion.fecha = result.rows[i].fecha;
            Unidad_Informacion.tipo_fuente = result.rows[i].tipo_fuente;
            Unidad_Informacion.base_noologica = result.rows[i].base_noologica;
            Unidad_Informacion.citas = [];
            client.query('SELECT Citas.*, Categoria_uso.nombre as categoria_uso, sub_titulo.nombre as sub_titulo, titulo.nombre as titulo, Entidad_Uso.nombre as entidad_uso FROM Citas JOIN Categoria_Uso ON Categoria_Uso.id_categoria_uso = Citas.id_categoria_uso JOIN Sub_Titulo ON Sub_Titulo.id_sub_titulo = Citas.id_sub_titulo JOIN Titulo ON Titulo.id_titulo = Sub_Titulo.id_titulo JOIN Direccion_Uso ON Direccion_Uso.id_direccion_Uso = Citas.id_direccion_uso JOIN Entidad_Uso ON Entidad_Uso.id_entidad_uso = Direccion_Uso.id_entidad_uso WHERE Citas.id_unidad_informacion = $1',
            [result.rows[i].id_unidad_informacion], (err, result) => {
              if(err){
                console.log('[-]Error - unidades de informacion');
              }
              else{
                for(let i=0; i<result.rows.length; i++){
                  cita ={};
                  cita.delimitacion = result.rows[i].delimitacion;
                  cita.cita = result.rows[i].cita;
                  cita.categoria_uso= result.rows[i].categoria_uso;
                  cita.sub_titulo= result.rows[i].sub_titulo;
                  cita.titulo = result.rows[i].titulo;
                  cita.entidad_uso = result.rows[i].entidad_uso;
                  Unidad_Informacion.citas.push(cita);
                }
              }
            });
            Proyecto.unidades_informacion.push(Unidad_Informacion);
          }
        }
      });
      client.query('SELECT Investigacion.*, Contexto.*, Entorno_Investigacion.Descripcion as Entorno_Investigacion, Contexto_Investigacion.nombre as contexto_investigacion, Tipo_Investigacion.nombre as tipo_investigacion, Temporalidad.descripcion as temporalidad JOIN Entorno_Investigacion.id_investigacion = Investigacion.id_investigacion JOIN Contexto_Investigacion ON Contexto_Investigacion.id_contexto_investigacion = Entorno_Investigacion.id_contexto_investigacion JOIN Contexto ON Contexto.id_contexto = Investigacion.id_contexto JOIN Temporalidad ON Temporalidad.id_temporalidad = Investigacion.id_temporalidad JOIN Esquema_Formulado ON Esquema_Formulado.id_investigacion = Investigacion.id_investigacion JOIN Pregunta_Modular ON Pregunta_Modular.id_pregunta_modular = Esquema_Formulado.id_pregunta_modular JOIN Tipo_Investigacion ON Tipo_Investigacion.id_tipo_investigacion = Pregunta_Modular.id_tipo_investigacion WHERE Investigacion.id_proyecto = $1', 
      values, (err,result) => {
        if(err){
          console.log('[-]Error --- generando query para informe -causas_sintomas');
        }
        else{
          Investigacion={};
          Investigacion.pregunta_investigacion = result.rows[0].pregunta_investigacion;
          Investigacion.calidad = result.rows[0].calidad;
          Investigacion.Objetivo_Genera = result.rows[0].objetivo_general;
          Investigacion.tipo_investigacion = result.rows[0].tipo_investigacion;
          Contexto={};
          Contexto.concepcion= result.rows[0].concepcion;
          Contexto.poblacion = result.rows[0].poblacion;
          Contexto.descripcion = result.rows[0].descripcion;
          Contexto.temporalidad = result.rows[0].temporalidad;
          Investigacion.contexto = Contexto;
          Investigacion.Entorno_Investigacion= result.rows[0].entorno_investigacion;
          Investigacion.Contexto_Investigacion= result.rows[0].contexto_investigacion;
          Investigacion.preguntas_investigacion = [];
          client.query('SELECT Esquema_Formulado.descripcion as preguntas_investigacion FROM Esquema_Formulado JOIN Investigacion ON Investigacion.id_investigacion = Esquema_Formulado.id_investigacion WHERE Investigacion.id_proyecto = $1', 
            values, (err,result) => {
            if(err){
              console.log('[-]Error --- generando query para informe -causas_sintomas');
            }
            else{
              for(let i=0; i< result.rows.length; i++){
                Investigacion.preguntas_investigacion.push(result.rows[i].preguntas_investigacion);
              }
            }
          });
          Investigacion.estadios_aplicados=[];
          client.query('SELECT Estadio.*, Estadio_Aplicado.id_estadio_aplicado JOIN Estadio_Aplicado ON Estadio_Aplicado.id_estadio = Estadio.id_Estadio JOIN Investigacion ON Investigacion.id_investigacion = Estadio_Aplicado.id_investigacion WHERE Investigacion.id_proyecto = $1', 
            values, (err,result) => {
            if(err){
              console.log('[-]Error --- generando query para informe -causas_sintomas');
            }
            else{
              for(let i=0; i< result.rows.length; i++){
                estadio_aplicado={};
                estadio_aplicado.estadio=result.rows[i].nombre;
                estadio_aplicado.objetivos_especificos=[];
                client.query('SELECT  WHERE Investigacion.id_proyecto = $1', 
                  [result.rows[i].id_estadio_aplicado], (err,result) => {
                  if(err){
                    console.log('[-]Error --- generando query para informe -causas_sintomas');
                  }
                  else{
                    for(let i=0; i< result.rows.length; i++){
                      
                    }
                  }
                });
                Investigacion.estadios_aplicados.push(estadio_aplicado);
              }
            }
          });
          Proyecto.investigacion=Investigacion;
        }
      });
    }
  });
});

module.exports = RouterPrincipal;