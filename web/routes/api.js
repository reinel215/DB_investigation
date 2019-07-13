var DAO = require('../scripts/DAO/DAO.js').default;

const { fetch } = require('node-fetch');
//Ruta principal de acceso a la pagina.
const express = require('express');
const RouterPrincipal = express.Router();

RouterPrincipal.get("/validate", (req, res) => {
  let response = req.session.response;
  let api_response = req.session.api_response;
  req.session.response = '';
  req.session.api_response = false;
  req.session.save();
  res.send({
    response: response,
    api_response: api_response
  });
});

RouterPrincipal.get("/user_info", async (req, res) => {
  console.log('[+]Entrada a user_info');
  let conexion = new DAO();
  let info = {};
  info.nombre = req.session.nombres + ' ' + req.session.apellidos;
  info.tipo_usuario = req.session.id_tipo_usuario;
  conexion.contador_proyectos([req.session.id_usuario]).then((contador_proy) => {
    info.contador_proy = contador_proy;
    conexion2= new DAO();
    conexion2.instituciones_usuario([req.session.id_usuario]).then((instituciones) => {
      info.instituciones= instituciones;
      res.send(info);
    });
  });
});

RouterPrincipal.get("/user_actions", (req, res) => {
  console.log('[+]Entrada a user_Actions');
  const conexion = new DAO();
  values = [req.session.id_tipo_usuario];
  conexion.acciones_usuario(values).then((actions) => {
    res.send({
      actions: actions,
      loaded: true
    });
  });
});

RouterPrincipal.get("/user_investigations", (req, res) => {
  console.log('[+]Entrada a user_investigations');
  const conexion = new DAO();
  values = [req.session.id_usuario];
  if (req.session.id_tipo_usuario == 1) {
    console.log('[+]tipo de usuario investigador');
    conexion.investigaciones_usuario(values).then((investigations) => {
      res.send({
        investigations: investigations,
        loaded: true
      });
    });
  }
  else{
    console.log('[+]tipo de usuario gerente');
    conexion.investigaciones_institucion(values).then((investigations) => {
      res.send({
        investigations: investigations,
        loaded: true
      });
    });
  }
});

RouterPrincipal.post("/user_investigation", (req, res) => {
  console.log('[+]Entrada a user_investigation')
  const conexion = new DAO();
  values = [req.body.id];
  conexion.investigacion_usuario(values).then((investigation) => {
    res.send({
      investigation: investigation,
      loaded: true
    });
  });
});

RouterPrincipal.post("/user_investigation_restricciones_alcances", (req, res) => {
  console.log('[+]Entrada a restricciones con alcances');
  const conexion = new DAO();
  values = [req.body.id];
  conexion.investigacion_restricciones_alcances(values).then((info) => {
    res.send(info);
  });
});

RouterPrincipal.post("/unidades_info", (req, res) => {
  console.log('[+]Entrada a unidades_info')
  const conexion = new DAO();
  values = [req.body.id];
  conexion.investigacion_unidades_info(values).then((unidades) => {
    res.send({
      unidades: unidades
    });
  });
});

RouterPrincipal.post("/unidades_citas", (req, res) => {
  console.log('[+]Entrada en citas');
  const conexion = new DAO();
  values = [req.body.id];
  conexion.unidades_citas(values).then((citas) => {
    res.send({
      citas: citas
    });
  });
});

RouterPrincipal.post("/investigation_estadios", (req, res) => {
  console.log('[+]Entrada en estadios de cierta investigacion');
  const conexion = new DAO();
  values = [req.body.id];
  conexion.investigacion_estadios(values).then((estadios) => {
    res.send({
      estadios: estadios
    });
  });
});

RouterPrincipal.post("/investigation_instrumentos", (req, res) => {
  console.log('[+]Entrada en estadios de cierta investigacion');
  const conexion = new DAO();
  values = [req.body.id];
  conexion.investigacion_instrumentos(values).then((instrumentos) => {
    res.send({
      instrumentos: instrumentos
    });
  });
});

RouterPrincipal.post("/estadio_eventos", (req, res) => {
  console.log('[+]Entrada eventos de cierto estadio');
  const conexion = new DAO();
  values = [req.body.id];
  conexion.estadio_eventos(values).then((eventos) => {
    res.send({
      eventos: eventos
    });
  });
});

RouterPrincipal.post("/evento_sinergias", (req, res) => {
  console.log('[+]Entrada sinergias de cierto evento');
  const conexion = new DAO();
  values = [req.body.id];
  conexion.evento_sinergias(values).then((sinergias) => {
    res.send({
      sinergias: sinergias
    });
  });
});

RouterPrincipal.post("/sinergia_indicios", (req, res) => {
  console.log('[+]Entrada indicios de cierta sinergia');
  const conexion = new DAO();
  values = [req.body.id];
  conexion.sinergias_indicios(values).then((info) => {
    res.send(info);
  });
});

RouterPrincipal.post("/calculo_calidad", (req, res) => {
  console.log('[+]Entrada calculo calidad');
  const conexion = new DAO();
  values = [req.body.id];
  console.log(values);
  conexion.informe_calidad(values).then((reportes) => {
    console.log(reportes);
    res.send({
      reportes: reportes
    });
  });
});

//Proceso de generacion de informe y su descarga.
RouterPrincipal.post("/descarga_informe", (req, res) => {
  console.log('[+]Descarga Informe - entrada');
  console.log('[+]Construccion de informacion');
  values = [req.body.id];
  const conexion = new DAO();
  conexion.descarga_informe(values).then((proyecto) => {
    res.send({
      proyecto: proyecto
    });
  });
});

module.exports = RouterPrincipal;