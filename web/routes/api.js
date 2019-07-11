var DAO = require('../scripts/DAO/DAO.js').default;

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

RouterPrincipal.get("/user_info", async (req, res) => {
  console.log('[+]Entrada a user_info');
  let conexion = new DAO();
  let info={};
  info.nombre= req.session.nombres + ' ' + req.session.apellidos;
  info.tipo_usuario = req.session.id_tipo_usuario;
  conexion.contador_proyectos([req.session.id_usuario]).then( (contador_proy) => {
    info.contador_proy = contador_proy;
    console.log('EPALE:');
    console.log(info);
    res.send(info);
  });
});

RouterPrincipal.get("/user_actions", (req, res) => {
  console.log('[+]Entrada a user_Actions');
  const conexion= new DAO();
  values = [req.session.id_tipo_usuario];
  conexion.acciones_usuario(values).then((actions) => {
    res.send({
      actions: actions,
      loaded:true
    });
  });
});

RouterPrincipal.get("/user_investigations", (req, res) => {
  console.log('[+]Entrada a user_investigations');
  const conexion= new DAO(datos);
  values = [req.session.id_usuario];
  conexion.investigaciones_usuario(values).then( (investigations) => {
    res.send({
      investigations: investigations,
      loaded:true
    });
  });
});

RouterPrincipal.post("/user_investigation", (req, res) => {
  console.log('[+]Entrada a user_investigation')
  const conexion= new DAO(datos);
  values = [req.body.id];
  conexion.investigacion_usuario(values).then((investigation) => {
    res.send({
      investigation: investigation,
      loaded:true
    });
  });
});

RouterPrincipal.post("/user_investigation_restricciones_alcances", (req, res) => {
  console.log('[+]Entrada a restricciones con alcances');
  const conexion= new DAO();
  values = [req.body.id];
  conexion.investigacion_restricciones_alcances(values).then((info) =>{
    res.send(info);
  });
});

RouterPrincipal.post("/unidades_info", (req, res) => {
  console.log('[+]Entrada a unidades_info')
  const conexion= new DAO();
  values = [req.body.id];
  conexion.investigacion_unidades_info(values).then((unidades) => {
    res.send({
      unidades:unidades
    });
  });
});

RouterPrincipal.post("/unidades_citas", (req, res) => {
  console.log('[+]Entrada en citas');
  const conexion= new DAO();
  values = [req.body.id];
  conexion.unidades_citas(values).then((citas) => {
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
  console.log('[+]Descarga Informe - entrada');
  console.log('[+]Construccion de informacion');
  var Proyecto ={};
  values = [req.body.id];
  console.log(values);
  const client= new Client(datos);
  client.connect().catch((err) => {
    console.log('[-]Error en client connect. \n');
    console.log(err);
  });
  const query_proyecto = 'SELECT Proyecto.*, Problematica.nombre as problematica, Problematica.descripcion as problematica_descripcion FROM Proyecto JOIN Problematica ON Problematica.id_problematica = Proyecto.id_problematica WHERE Proyecto.id_proyecto = $1';
  client.query(query_proyecto, values, (err,result) => {
    if(err){
      console.log('[-]error --- en query ')
    }
    else{
      console.log('[+]Recoleccion de datos proyecto');
      console.log(result.rows);
      Proyecto.identificacion= result.rows[0].identificacion;
      Problematica={};
      Problematica.nombre= result.rows[0].problematica;
      Problematica.descripcion= result.rows[0].problematica;
      Problematica.causas_sintomas=[];
      client.query('SELECT Causa_Sintoma.* FROM Causa_Sintoma JOIN Problematica ON Problematica.id_problematica = Causa_Sintoma.id_problematica JOIN Proyecto ON Proyecto.id_problematica = Problematica.id_problematica WHERE Proyecto.id_proyecto = $1', values, (err,result) => {
        if(err){
          console.log('[-]Error -- en query');
        }
        else{
          console.log('[+]Recoleccion de datos causas_sintomas');
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
      client.query('SELECT Alcance.contenido FROM Alcance JOIN Proyecto ON Proyecto.id_proyecto = Alcance.id_proyecto WHERE Proyecto.id_proyecto = $1', 
            values, (err,result) => {
            if(err){
              console.log('[-]Error --- generando query para informe -causas_sintomas');
            }
            else{
              console.log('[+]Recoleccion de alcances');
              for(let i=0; i< result.rows.length; i++){
                Proyecto.alcances.push(result.rows[i].contenido);
              }
            }
      });
      Proyecto.restricciones =[];
      //Restricciones
      client.query('SELECT Restriccion.contenido FROM Restriccion JOIN Proyecto ON Proyecto.id_proyecto = Restriccion.id_proyecto WHERE Proyecto.id_proyecto = $1', 
            values, (err,result) => {
            if(err){
              console.log('[-]Error --- generando query para informe -causas_sintomas');
            }
            else{
              console.log('[+]Recoleccion de restricciones');
              for(let i=0; i< result.rows.length; i++){
                Proyecto.restricciones.push(result.rows[i].contenido);
              }
            }
          });
      Proyecto.unidades_informacion=[]
      client.query('SELECT Unidad_Informacion.*, Tipo_Fuente.nombre as tipo_fuente, Base_Noologica.nombre as base_noologica FROM Unidad_Informacion JOIN Base_Noologica ON Base_Noologica.id_base_noologica = Unidad_Informacion.id_base_noologica JOIN Tipo_Fuente ON Tipo_Fuente.id_tipo_fuente = Unidad_Informacion.id_tipo_fuente WHERE Unidad_Informacion.id_proyecto = $1', values, (err,result) => {
        if(err){
          console.log('[-]Error --- generando query para informe -causas_sintomas');
        }
        else{
          console.log('[+]Recoleccion de unidades de informacion');
          for(let i= 0; i<result.rows.length; i++){
            Unidad_Informacion ={};
            Unidad_Informacion.autor = result.rows[i].autor;
            Unidad_Informacion.fecha = result.rows[i].fecha;
            Unidad_Informacion.tipo_fuente = result.rows[i].tipo_fuente;
            Unidad_Informacion.base_noologica = result.rows[i].base_noologica;
            Unidad_Informacion.citas = [];
            client.query('SELECT Cita.*, Categoria_uso.nombre as categoria_uso, sub_titulo.nombre as sub_titulo, titulo.nombre as titulo, Entidad_Uso.nombre as entidad_uso FROM Cita JOIN Categoria_Uso ON Categoria_Uso.id_categoria_uso = Cita.id_categoria_uso JOIN Sub_Titulo ON Sub_Titulo.id_sub_titulo = Cita.id_sub_titulo JOIN Titulo ON Titulo.id_titulo = Sub_Titulo.id_titulo JOIN Direccion_Uso ON Direccion_Uso.id_direccion_Uso = Cita.id_direccion_uso JOIN Entidad_Uso ON Entidad_Uso.id_entidad_uso = Direccion_Uso.id_entidad_uso WHERE Cita.id_unidad_informacion = $1',
            [result.rows[i].id_unidad_informacion], (err, result) => {
              if(err){
                console.log('[-]Error - unidades de informacion');
              }
              else{
                console.log('[+]Recoleccion de citas');
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
      client.query('SELECT Investigacion.*, Contexto.*, Entorno_Investigacion.Descripcion as Entorno_Investigacion, Contexto_Investigacion.nombre as contexto_investigacion, Tipo_Investigacion.nombre as tipo_investigacion, Temporalidad.descripcion as temporalidad FROM Investigacion JOIN Entorno_Investigacion ON Entorno_Investigacion.id_investigacion = Investigacion.id_investigacion JOIN Contexto_Investigacion ON Contexto_Investigacion.id_contexto_investigacion = Entorno_Investigacion.id_contexto_investigacion JOIN Contexto ON Contexto.id_contexto = Investigacion.id_contexto JOIN Temporalidad ON Temporalidad.id_temporalidad = Investigacion.id_temporalidad JOIN Esquema_Formulado ON Esquema_Formulado.id_investigacion = Investigacion.id_investigacion JOIN Pregunta_Modular ON Pregunta_Modular.id_pregunta_modular = Esquema_Formulado.id_pregunta_modular JOIN Tipo_Investigacion ON Tipo_Investigacion.id_tipo_investigacion = Pregunta_Modular.id_tipo_investigacion WHERE Investigacion.id_proyecto = $1', 
      values, (err,result) => {
        if(err){
          console.log('[-]Error --- generando query para informe -causas_sintomas');
        }
        else{
          console.log('[+]Recoleccion de investigacion');
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
          client.query('SELECT Esquema_Formulado.interrogante as preguntas_investigacion FROM Esquema_Formulado JOIN Investigacion ON Investigacion.id_investigacion = Esquema_Formulado.id_investigacion WHERE Investigacion.id_proyecto = $1', 
            values, (err,result) => {
            if(err){
              console.log('[-]Error --- generando query para informe -causas_sintomas');
            }
            else{
              console.log('[+]Recoleccion de preguntas de investigacion');
              for(let i=0; i< result.rows.length; i++){
                Investigacion.preguntas_investigacion.push(result.rows[i].preguntas_investigacion);
              }
            }
          });
          Investigacion.estadios_aplicados=[];
          client.query('SELECT Estadio.*, Estadio_Aplicado.id_estadio_aplicado FROM Estadio JOIN Estadio_Aplicado ON Estadio_Aplicado.id_estadio = Estadio.id_Estadio JOIN Investigacion ON Investigacion.id_investigacion = Estadio_Aplicado.id_investigacion WHERE Investigacion.id_proyecto = $1', 
            values, (err,result) => {
            if(err){
              console.log('[-]Error --- generando query para informe -causas_sintomas');
            }
            else{
              console.log('[+]Recoleccion de estadios aplicados');
              for(let i=0; i< result.rows.length; i++){
                estadio_aplicado={};
                estadio_aplicado.estadio=result.rows[i].nombre;
                estadio_aplicado.objetivos_especificos=[];
                client.query('SELECT Objetivo_Especifico_Det.contenido FROM Objetivo_Especifico_Det WHERE Objetivo_Especifico_Det.id_estadio_aplicado = $1', 
                  [result.rows[i].id_estadio_aplicado], (err,result) => {
                  if(err){
                    console.log('[-]Error --- generando query para informe -causas_sintomas');
                  }
                  else{
                    console.log('[+]Recoleccion de objetivos especificos');
                    for(let i=0; i< result.rows.length; i++){
                      let objetivo_especifico= result.rows[i].contenido;
                      estadio_aplicado.objetivos_especificos.push(objetivo_especifico);
                    }
                  }
                });
                estadio_aplicado.eventos_delimitados=[];
                client.query('SELECT Evento_Delimitado.id_evento_delimitado, Clase_Evento.nombre as clase_Evento, Tipo_Evento.nombre as tipo_Evento, Evento_Delimitado.descripcion as evento_delimitado FROM Evento_Delimitado JOIN Clase_Evento ON Clase_Evento.id_clase_evento = Evento_Delimitado.id_clase_evento JOIN Tipo_Evento ON Tipo_Evento.id_tipo_evento = Evento_Delimitado.id_tipo_evento WHERE Evento_Delimitado.id_estadio_aplicado = $1', 
                  [result.rows[i].id_estadio_aplicado], (err,result) => {
                  if(err){
                    console.log('[-]Error --- generando query para informe -causas_sintomas');
                  }
                  else{
                    console.log('[+]Recoleccion de eventos delimitados');
                    for(let i=0; i< result.rows.length; i++){
                      Evento_Delimitado ={};
                      Evento_Delimitado.tipo_evento = result.rows[i].tipo_evento;
                      Evento_Delimitado.clase_Evento = result.rows[i].clase_evento;
                      Evento_Delimitado.descripcion = result.rows[i].evento_delimitado;
                      Evento_Delimitado.sinergias = [];
                      client.query('SELECT Sinergia.id_sinergia, Sinergia.nombre FROM Sinergia WHERE Sinergia.id_evento_delimitado = $1', 
                        [result.rows[i].id_evento_delimitado], (err,result) => {
                        if(err){
                          console.log('[-]Error --- generando query para informe -causas_sintomas');
                        }
                        else{
                          console.log('[+]Recoleccion de sinergias');
                          for(let i=0; i< result.rows.length; i++){
                            sinergia={};
                            sinergia.nombre= result.rows[i].nombre;
                            sinergia.fuentes=[];
                            client.query('SELECT Fuente.valor FROM Fuente WHERE Fuente.id_sinergia = $1', 
                              [result.rows[i].id_sinergia], (err,result) => {
                                if(err){
                                  console.log('[-]Error --- generando query para informe -causas_sintomas');
                                }
                                else{
                                  console.log('[+]Recoleccion de fuentes');
                                  for(let i=0; i< result.rows.length; i++){
                                    let fuente= result.rows[i].valor;
                                    sinergia.fuentes.push(fuente);
                                  }
                                }
                            });
                            sinergia.aplicaciones_instrumentales=[];
                            client.query('SELECT Aplicacion_Instrumental.id_sinergia, Aplicacion_Instrumental.id_instrumento, Instrumento.nombre, Aplicacion_Instrumental.identificacion FROM Aplicacion_Instrumental JOIN Instrumento ON Aplicacion_Instrumental.id_instrumento = Instrumento.id_instrumento WHERE Aplicacion_Instrumental.id_sinergia = $1', 
                              [result.rows[i].id_sinergia], (err,result) => {
                                if(err){
                                  console.log('[-]Error --- generando query para informe -causas_sintomas');
                                }
                                else{
                                  console.log('[+]Recoleccion de aplicaciones instrumentales');
                                  for(let i=0; i< result.rows.length; i++){
                                    aplicacion_instrumental={};
                                    aplicacion_instrumental.instrumento= result.rows[i].nombre;
                                    aplicacion_instrumental.identificacion = result.rows[i].identificacion;
                                    aplicacion_instrumental.items= [];
                                    client.query('SELECT Indicio.contenido as indicio, Item.*, Tipo_Item.nombre as tipo_item FROM Item JOIN Instrumento_Item ON Instrumento_Item.id_item = Item.id_item JOIN Indicio_Item ON Indicio_Item.id_item = Item.id_item JOIN Indicio ON Indicio.id_indicio = Indicio_Item.id_indicio JOIN Tipo_Item ON Tipo_Item.id_tipo_item = Item.id_tipo_item  WHERE Instrumento_Item.id_sinergia  = $1 AND Instrumento_Item.id_instrumento = $2', 
                                      [result.rows[i].id_sinergia, result.rows[i].id_instrumento], (err,result) => {
                                      if(err){
                                        console.log('[-]Error --- generando query para informe -causas_sintomas');
                                      }
                                      else{
                                        console.log('[+]Recoleccion de items');
                                        for(let i=0; i< result.rows.length; i++){
                                          item ={};
                                          item.contenido= result.rows[i].contenido;
                                          item.identificacion= result.rows[i].identificacion;
                                          item.tipo_item= result.rows[i].tipo_item;
                                          item.indicio= result.rows[i].indicio;
                                          client.query('SELECT Categoria.*, Escala.nombre as escala FROM Categoria JOIN Escala ON Escala.id_Escala = Categoria.id_escala JOIN Item ON Item.id_categoria = Categoria.id_Categoria WHERE Item.id_item = $1', 
                                            [result.rows[i].id_item], (err,result) => {
                                              if(err){
                                                console.log('[-]Error --- generando query para informe -causas_sintomas');
                                              }
                                              else{
                                                console.log('[+]Recoleccion de categorias');
                                                categoria={};
                                                categoria.nombre = result.rows[0].nombre;
                                                categoria.descripcion = result.rows[0].descripcion;
                                                categoria.aplicacion_temporal = result.rows[0].aplicacion_temporal;
                                                categoria.terminos = result.rows[0].terminos;
                                                categoria.nivel_ausencia = result.rows[0].nivel_ausencia;
                                                categoria.escala = result.rows[0].escala;
                                                item.categoria = categoria;
                                              }
                                          });
                                          aplicacion_instrumental.items.push(item);
                                        }
                                      }
                                    });
                                    sinergia.aplicaciones_instrumentales.push(aplicacion_instrumental);
                                  }
                                }
                            });
                            Evento_Delimitado.sinergias.push(sinergia);
                          }
                        }
                      });
                      estadio_aplicado.eventos_delimitados.push(Evento_Delimitado);
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
    console.log('[+]Finalizacion de Recoleccion de informacion');
    client.end((err) => {console.log('[+]disconnected - Recoleccion de info')});
    res.send({
      proyecto: proyecto
    });
  });
});

module.exports = RouterPrincipal;