const { Client } = require('pg');
const datos = {
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'UCABINV',
  port: 5432,
};

//encriptador MD5
const md5 = require('md5');


//QUERYS IN USE.
//Login User
const query_user = 'SELECT A.id_usuario, A.nombres, A.apellidos, A.correo, A.hash_password, A.intentos, A.id_tipo_usuario FROM Usuario as A WHERE A.correo = $1::text';
const reducir_intento = 'UPDATE Usuario SET intentos = $1 WHERE Usuario.id = $2';
const reset_intento = 'UPDATE Usuario SET intentos = 3 WHERE Usuario.id = $1';

//Register User
const query_register = 'INSERT INTO Usuario (nombres, apellidos, correo, hash_password, intentos, id_tipo_usuario) VALUES ($1, $2, $3, $4, 3, 1)';

//Obtencion de informacion para los proyectos.
const query_cont_proy = 'SELECT COUNT(*) FROM Proyecto as A JOIN Usuario_Proyecto B ON B.id_proyecto = A.id_proyecto WHERE B.id_usuario = $1';
const query_actions = 'SELECT Permiso.* FROM Permiso JOIN Rol ON Rol.id_permiso = Permiso.id_permiso JOIN Tipo_Usuario ON Tipo_Usuario.id_tipo_usuario = rol.id_tipo_usuario WHERE Tipo_Usuario.id_tipo_usuario = $1';
const query_investigations = 'SELECT Proyecto.Identificacion, Proyecto.id_proyecto, Investigacion.pregunta_investigacion, Investigacion.calidad, Investigacion.objetivo_general FROM Proyecto JOIN Usuario_Proyecto ON Usuario_Proyecto.id_proyecto = Proyecto.id_proyecto JOIN Investigacion ON Investigacion.id_proyecto = Proyecto.id_proyecto WHERE Usuario_Proyecto.id_usuario = $1';
const query_investigation = 'SELECT Proyecto.identificacion, count(Unidad_Informacion.id_unidad_informacion) as Cantidad_UF, Investigacion.Objetivo_General, Investigacion.Pregunta_Investigacion, Investigacion.calidad, Tipo_Investigacion.nombre as tipo_inv, Modalidad.nombre as mod, Contexto.concepcion, Contexto.poblacion, Temporalidad.descripcion as temp FROM Proyecto JOIN Unidad_Informacion ON Unidad_Informacion.id_proyecto = Proyecto.id_proyecto JOIN Investigacion ON Investigacion.id_proyecto = Proyecto.id_proyecto JOIN Esquema_Formulado ON Esquema_Formulado.id_investigacion = Investigacion.id_investigacion JOIN Pregunta_Modular ON Pregunta_Modular.id_pregunta_modular = Esquema_Formulado.id_pregunta_modular JOIN Tipo_Investigacion ON Tipo_Investigacion.id_tipo_investigacion = Pregunta_Modular.id_tipo_investigacion JOIN Modalidad ON Modalidad.id_tipo_investigacion = Tipo_Investigacion.id_tipo_investigacion JOIN Contexto ON Contexto.id_contexto = Investigacion.id_contexto JOIN Temporalidad ON Temporalidad.id_temporalidad = Investigacion.id_Temporalidad WHERE Proyecto.id_proyecto = $1 GROUP BY Proyecto.identificacion, Investigacion.Objetivo_General, Investigacion.Pregunta_Investigacion, Investigacion.calidad, tipo_inv, concepcion, poblacion, temp, mod';
const query_restricciones = 'SELECT contenido FROM Restriccion WHERE Restriccion.id_proyecto = $1';
const query_alcances = 'SELECT contenido FROM Alcance WHERE Alcance.id_proyecto = $1';
const query_unidades = 'SELECT Unidad_Informacion.id_unidad_informacion, Unidad_Informacion.titulo, Unidad_Informacion.autor, Unidad_Informacion.fecha FROM Unidad_Informacion JOIN Proyecto ON Proyecto.id_proyecto = Unidad_Informacion.id_proyecto WHERE Proyecto.id_proyecto = $1';
const query_citas = 'SELECT Cita.cita, Cita.delimitacion, Categoria_Uso.nombre as Categoria, Entidad_Uso.nombre as Entidad FROM Cita LEFT JOIN Categoria_Uso ON Categoria_Uso.id_categoria_uso = Cita.id_categoria_uso LEFT JOIN Direccion_Uso ON Direccion_Uso.id_direccion_uso = cita.id_direccion_uso LEFT JOIN Entidad_Uso ON Entidad_Uso.id_entidad_uso = Direccion_Uso.id_entidad_uso WHERE Cita.id_unidad_informacion = $1';
const query_investigacion_estadios = 'SELECT Estadio_Aplicado.id_estadio_aplicado, Objetivo_Especifico_Det.contenido, Estadio_Aplicado.posicion, Estadio.nombre FROM Estadio_Aplicado JOIN Estadio ON Estadio.id_estadio = Estadio_Aplicado.id_estadio JOIN Objetivo_Especifico_Det ON Estadio_aplicado.id_estadio_aplicado = Objetivo_Especifico_Det.id_estadio_aplicado WHERE Estadio_Aplicado.id_investigacion = $1 ORDER BY Estadio_Aplicado.posicion;';
const query_estadio_eventos = 'SELECT Evento.nombre as evento, Clase_Evento.nombre as clase_Evento, Abordaje.nombre as abordaje, Tipo_Evento.nombre as tipo_evento, Evento_Delimitado.descripcion, Evento_Delimitado.id_evento_delimitado FROM Evento_Delimitado JOIN Evento ON Evento.id_evento = Evento_Delimitado.id_evento JOIN Clase_Evento ON Clase_Evento.id_clase_evento = Evento_Delimitado.id_clase_Evento JOIN Abordaje ON Abordaje.id_Abordaje = Evento_Delimitado.id_abordaje JOIN Tipo_Evento ON Tipo_Evento.id_tipo_evento = Evento_Delimitado.id_tipo_evento WHERE Evento_Delimitado.id_estadio_aplicado = $1';
const query_evento_sinergias = 'SELECT Clase_Sinergia.nombre as clase_sinergia, Sinergia.nombre as sinergia, Instrumento.nombre as instrumento, Sinergia.id_sinergia FROM Sinergia JOIN Clase_Sinergia ON Clase_Sinergia.id_clase_sinergia = Sinergia.id_clase_sinergia JOIN Aplicacion_Instrumental ON Aplicacion_Instrumental.id_sinergia = Sinergia.id_sinergia JOIN Instrumento ON Instrumento.id_instrumento = Aplicacion_Instrumental.id_instrumento WHERE Sinergia.id_evento_delimitado = $1';
const query_sinergia_indicios = 'SELECT Aplicacion_Instrumental.identificacion, Indicio.contenido as indicio, Item.identificacion as item , Item.contenido as item_descripcion, Categoria.nombre as categoria, Categoria.aplicacion_temporal, Categoria.terminos as terminos, Categoria.descripcion as descripcion, Categoria.nivel_ausencia as nivel, Escala.nombre as escala, Fuente.valor as fuente, Muestra.valor as muestra FROM Indicio  JOIN Indicio_Item ON Indicio_Item.id_indicio = Indicio.id_indicio JOIN Item ON Item.id_item = Indicio_Item.id_item JOIN Instrumento_Item ON Instrumento_Item.id_item = Item.id_item JOIN Aplicacion_Instrumental ON Aplicacion_Instrumental.id_instrumento = Instrumento_Item.id_instrumento AND Aplicacion_Instrumental.id_sinergia = Instrumento_Item.id_sinergia JOIN Sinergia ON Sinergia.id_sinergia = Aplicacion_Instrumental.id_sinergia JOIN Fuente ON Fuente.id_sinergia = Sinergia.id_sinergia JOIN Muestra ON Muestra.id_muestra = Fuente.id_muestra JOIN Categoria ON Item.id_categoria = Categoria.id_categoria JOIN Escala ON Escala.id_escala = Categoria.id_escala WHERE Aplicacion_Instrumental.id_sinergia = $1';

//Calculo de calidad
const query_informe_calidad = ("SELECT 'No divaga' as item, cast((SELECT count(Cita.id_cita) FROM Cita JOIN Categoria_Uso ON Categoria_Uso.id_categoria_uso = Cita.id_categoria_uso JOIN Unidad_Informacion ON Unidad_Informacion.id_unidad_informacion = Cita.id_unidad_informacion WHERE Unidad_Informacion.id_proyecto = $1 AND Unidad_Informacion.autor = 'Autor' AND Categoria_Uso.id_categoria_uso = 2) as Float) / cast((SELECT count(Cita.id_cita) FROM Cita JOIN Categoria_Uso ON Categoria_Uso.id_categoria_uso = Cita.id_categoria_uso JOIN Unidad_Informacion ON Unidad_Informacion.id_unidad_informacion = Cita.id_unidad_informacion WHERE Unidad_Informacion.id_proyecto = $1 AND Categoria_Uso.id_categoria_uso = 2) as float) as valor " 
+ " UNION " + 
"SELECT 'Justifica los eventos' as item, cast((SELECT count(Evento.id_evento) FROM Evento JOIN Evento_Delimitado ON Evento_Delimitado.id_evento = Evento.id_evento JOIN Estadio_Aplicado ON Estadio_Aplicado.id_estadio_aplicado = Evento_Delimitado.id_estadio_aplicado JOIN Investigacion ON Investigacion.id_investigacion = Estadio_Aplicado.id_investigacion JOIN Direccion_Uso ON Direccion_Uso.id_entidad = Evento_Delimitado.id_evento_delimitado JOIN Cita ON Cita.id_direccion_uso = Direccion_Uso.id_direccion_uso JOIN Unidad_Informacion ON Unidad_Informacion.id_unidad_informacion = Cita.id_unidad_informacion WHERE Cita.id_categoria_uso = 2 AND Unidad_Informacion.id_proyecto = $1  GROUP BY Evento.id_evento) as float)/cast((SELECT count(Evento.id_evento) FROM Evento JOIN Evento_Delimitado ON Evento_Delimitado.id_evento = Evento.id_evento JOIN Estadio_Aplicado ON Estadio_Aplicado.id_estadio_aplicado = Evento_Delimitado.id_estadio_aplicado WHERE Estadio_Aplicado.id_investigacion = $1) as float) as valor"
+ " UNION " +
"SELECT 'Objetivos especificos completos' as item, cast((SELECT count(Objetivo_Especifico_det.id_objetivo_estadial) FROM Objetivo_Especifico_Det JOIN Estadio_Aplicado ON Estadio_Aplicado.id_estadio_aplicado = Objetivo_Especifico_Det.id_estadio_aplicado JOIN Estadio ON Estadio.id_estadio = Estadio_Aplicado.id_estadio JOIN Objetivo_Estadial ON Objetivo_Estadial.id_objetivo_estadial = Objetivo_Especifico_det.id_objetivo_estadial JOIN Investigacion ON Investigacion.id_investigacion = Estadio_Aplicado.id_investigacion JOIN Modalidad ON Modalidad.id_modalidad = Investigacion.modalidad JOIN Estadio_Estructural ON Estadio_Estructural.id_modalidad = Modalidad.id_modalidad JOIN Objetivo_Especifico ON Objetivo_Especifico.id_estadio_estructural = Estadio_Estructural.id_estadio_Estructural WHERE Estadio_Aplicado.posicion = Estadio_Estructural.posicion AND  Objetivo_Especifico.tipo_objetivo = Objetivo_Estadial.tipo AND Investigacion.id_investigacion = $1) as float)/cast(( SELECT count(Objetivo_Especifico.id_objetivo_especifico) FROM Objetivo_Especifico JOIN Estadio_Estructural ON Estadio_Estructural.id_Estadio_Estructural = Objetivo_Especifico.id_estadio_estructural JOIN Modalidad ON Modalidad.id_modalidad = Estadio_Estructural.id_modalidad JOIN Investigacion ON Investigacion.modalidad = Modalidad.id_modalidad WHERE Investigacion.id_investigacion = $1) as float) as valor"
+ " UNION " +
"SELECT 'Fuentes variadas' as item, cast((SELECT count(A.id_Base_Noologica) FROM Base_Noologica as A WHERE (SELECT count(Unidad_Informacion.id_unidad_informacion) FROM Unidad_Informacion WHERE Unidad_Informacion.id_proyecto = $1 AND Unidad_Informacion.id_Base_Noologica = A.id_base_Noologica) > 0) as float)/cast((SELECT count(Base_Noologica.id_base_noologica) FROM Base_Noologica) as float) as valor"
+ " UNION " +
"SELECT 'Conceptualiza los eventos' as item, cast((SELECT count(Evento.id_evento) FROM Evento JOIN Evento_Delimitado ON Evento_Delimitado.id_evento = Evento.id_evento JOIN Estadio_Aplicado ON Estadio_Aplicado.id_estadio_aplicado = Evento_Delimitado.id_estadio_aplicado JOIN Investigacion ON Investigacion.id_investigacion = Estadio_Aplicado.id_investigacion JOIN Direccion_Uso ON Direccion_Uso.id_entidad = Evento_Delimitado.id_evento_delimitado JOIN Cita ON Cita.id_direccion_uso = Direccion_Uso.id_direccion_uso JOIN Unidad_Informacion ON Unidad_Informacion.id_unidad_informacion = Cita.id_unidad_informacion WHERE Cita.id_categoria_uso = 3 AND Unidad_Informacion.id_proyecto = $1) as float)/cast((SELECT count(Evento.id_evento) FROM Evento JOIN Evento_Delimitado ON Evento_Delimitado.id_evento = Evento.id_evento JOIN Estadio_Aplicado ON Estadio_Aplicado.id_estadio_aplicado = Evento_Delimitado.id_estadio_aplicado WHERE Estadio_Aplicado.id_investigacion = $1) as float) as valor"
//+ " UNION " +
//"SELECT 'Eventos completos' as item, cast((SELECT count(Evento.id_evento) FROM Evento JOIN Evento_Delimitado ON Evento_Delimitado.id_evento = Evento.id_evento JOIN Estadio_Aplicado ON Estadio_Aplicado.id_estadio_aplicado = Evento_Delimitado.id_estadio_aplicado JOIN Estadio ON Estadio.id_estadio = Estadio_Aplicado.id_estadio JOIN Investigacion ON Investigacion.id_investigacion = Estadio_Aplicado.id_investigacion JOIN Modalidad ON Modalidad.id_modalidad = Investigacion.modalidad JOIN Estadio_Estructural ON Estadio_Estructural.id_modalidad = Modalidad.id_modalidad JOIN Estructura_Evento ON Estructura_Evento.id_estadio_estructural = Estadio_Estructural.id_estadio_estructural JOIN Clase_Evento_Estructural ON Clase_Evento_Estructural.id_clase_evento_Estructural = Estructura_Evento.id_clase_evento_estructural JOIN Clase_Evento ON Evento_Delimitado.id_clase_evento = Clase_Evento.id_clase_Evento WHERE Estadio_Aplicado.posicion = Estadio_Estructural.posicion AND  Clase_Evento.nombre = Clase_Evento_Estructural.nombre AND Investigacion.id_investigacion = $1) as float)/cast((SELECT count(A.id_Estadio_Estructural) FROM Estadio_Estructural as A JOIN Modalidad ON Modalidad.id_modalidad = A.id_modalidad JOIN Investigacion ON Investigacion.modalidad = Modalidad.id_modalidad WHERE Investigacion.id_investigacion = $1 AND(SELECT count(Estructura_Evento.id_Estructura_evento) FROM Estructura_Evento WHERE A.id_estadio_estructural = Estructura_Evento.id_estadio_estructural) > 0) as float) as valor"
+ " UNION " +
"SELECT 'Eventos tienen cuadro de operacionalizacion' as item, cast((SELECT count(A.id_evento_delimitado) FROM Evento_Delimitado as A JOIN Estadio_Aplicado ON Estadio_Aplicado.id_estadio_aplicado = A.id_estadio_aplicado WHERE (SELECT count(sinergia.id_sinergia) FROM Sinergia  JOIN Aplicacion_Instrumental ON Aplicacion_Instrumental.id_sinergia = Sinergia.id_sinergia WHERE Sinergia.id_evento_delimitado = A.id_evento_delimitado) > 0 AND Estadio_Aplicado.id_investigacion = $1) as float)/cast((SELECT count(A.id_evento_delimitado) FROM Evento_Delimitado as A JOIN Estadio_Aplicado ON Estadio_Aplicado.id_estadio_aplicado = A.id_Estadio_Aplicado WHERE Estadio_Aplicado.id_investigacion = $1) as float) as valor"
+ " UNION " +
"SELECT 'Señala las fuentes' as item, cast((SELECT count(A.id_sinergia) FROM Sinergia as A JOIN Evento_Delimitado ON Evento_Delimitado.id_Evento_delimitado = A.id_evento_Delimitado JOIN Estadio_Aplicado ON Estadio_Aplicado.id_estadio_aplicado = Evento_Delimitado.id_estadio_aplicado WHERE Estadio_Aplicado.id_investigacion = $1 AND (SELECT count(Fuente.id_fuente) FROM Fuente WHERE Fuente.id_sinergia = A.id_sinergia) > 0)as float)/cast(( SELECT count(A.id_sinergia) FROM Sinergia as A JOIN Evento_Delimitado ON Evento_Delimitado.id_Evento_delimitado = A.id_evento_Delimitado JOIN Estadio_Aplicado ON Estadio_Aplicado.id_estadio_aplicado = Evento_Delimitado.id_estadio_aplicado WHERE Estadio_Aplicado.id_investigacion = $1) as float) as valor"
+ " UNION " +
"SELECT 'Mide las sinergias' as item, cast((SELECT count(A.id_sinergia) FROM Sinergia as A JOIN Evento_Delimitado ON Evento_Delimitado.id_Evento_delimitado = A.id_evento_Delimitado JOIN Estadio_Aplicado ON Estadio_Aplicado.id_estadio_aplicado = Evento_Delimitado.id_estadio_aplicado WHERE Estadio_Aplicado.id_investigacion = $1 AND( SELECT count(Aplicacion_Instrumental.id_aplicacion_instrumental) FROM Aplicacion_Instrumental WHERE Aplicacion_Instrumental.id_sinergia = A.id_sinergia) > 0)as float)/cast((SELECT count(A.id_sinergia) FROM Sinergia as A JOIN Evento_Delimitado ON Evento_Delimitado.id_Evento_delimitado = A.id_evento_Delimitado JOIN Estadio_Aplicado ON Estadio_Aplicado.id_estadio_aplicado = Evento_Delimitado.id_estadio_aplicado WHERE Estadio_Aplicado.id_investigacion = $1) as float) as valor;");

const query_boolean= ("SELECT 'Justifica el tema/problematica' as item ,(SELECT count(Cita.id_cita) FROM Cita JOIN Direccion_Uso ON Direccion_Uso.id_direccion_uso = Cita.id_direccion_uso JOIN Entidad_Uso ON Entidad_Uso.id_entidad_uso = Direccion_Uso.id_entidad_uso JOIN Unidad_Informacion ON Unidad_Informacion.id_unidad_informacion = Cita.id_unidad_informacion WHERE Entidad_Uso.nombre = 'Problematica' AND Unidad_Informacion.id_proyecto = $1) > 0 as valor" 
+ " UNION " +
"SELECT 'Justifica el contexto/poblacion, unidad de estudio' as item, (SELECT count(Cita.id_cita) FROM Cita JOIN Direccion_Uso ON Direccion_Uso.id_direccion_uso = Cita.id_direccion_uso JOIN Entidad_Uso ON Entidad_Uso.id_entidad_uso = Direccion_Uso.id_entidad_uso JOIN Unidad_Informacion ON Unidad_Informacion.id_unidad_informacion = Cita.id_unidad_informacion WHERE Entidad_Uso.nombre = 'Contexto' AND Unidad_Informacion.id_proyecto = $1) > 0 as valor"
+ " UNION " +
"SELECT 'Justifica tipo de investigacion' as item, (SELECT count(Cita.id_cita) FROM Cita JOIN Direccion_Uso ON Direccion_Uso.id_direccion_uso = Cita.id_direccion_uso JOIN Unidad_Informacion ON Unidad_Informacion.id_unidad_informacion = Cita.id_unidad_informacion WHERE Direccion_Uso.id_entidad_uso = 8 AND Unidad_Informacion.id_proyecto = $1)> 0 as valor"
+ " UNION " +
"SELECT 'Tema novedoso no investigado' as item, (SELECT count(Proyecto.id_proyecto) FROM Proyecto WHERE Proyecto.id_problematica = (SELECT Problematica.id_problematica FROM Problematica JOIN Proyecto ON Proyecto.id_problematica = Problematica.id_problematica WHERE Proyecto.id_proyecto = $1) AND Proyecto.id_proyecto < 1) = 0 as valor");
//------------------------------------

module.exports.default = class DAO {

  constructor() {
    this.client = new Client(datos);
  }

  contador_proyectos(values) {
    let contador_proy;
    this.client.connect().catch((err) => {
      console.log('[-]Error en client connect. /api/user_info \n');
      console.log(err);
    });
    //Validacion de ingreso.

    return new Promise((resolve, reject) => {
      this.client.query(query_cont_proy, values, (err, result) => {
        if (err) {
          console.log('[-]Error en client query. /api/user_info \n');
          console.log(err);
          contador_proy = 0;
        }
        else {
          contador_proy = result.rows[0].count
        }
        this.client.end((err) => console.log('[+]disconnected - User Info'));
        resolve(contador_proy);
      });
    });
  }

  ingreso_usuario(values, session, password) {
    //validacion de ingreso en esta seccion.
    return new Promise((resolve, reject) => {
      this.client.connect().catch((err) => {
        console.log('Error en client connect. /signin: \n');
        console.log(err);
        session.api_response = true;
        session.response = err;
        resolve(session);
      });
      //Validacion de ingreso.
      this.client.query(query_user, values, (err, result) => {
        if (err) {
          console.log('Error en client query. /signin: \n');
          console.log(err);
          session.response = 'Error de conexion, usuario no encontrado.'
          session.api_response = true;
        }
        else {
          //Comprobacion de existencia de usuario y de intentos valido.
          if (result.rows[0] && result.rows[0].intentos > 0) {
            //comprobacion de uso de password correcto. Caso incorrecto
            if (result.rows[0].hash_password != md5(password)) {
              session.api_response = true
              session.response = 'Clave invalida';
              values = [result.rows[0].intentos--, result.rows[0].id_usuario];
              this.client.query(reducir_intento, values).then(result => console.log(result)).catch(e => console.log(e));
            }
            //Caso Correcto.
            else {
              values = [result.rows[0].id_usuario];
              this.client.query(reset_intento, values).then(result => console.log(result)).catch(e => console.log(e));;
              session.id_usuario = result.rows[0].id_usuario;
              session.hash_password = result.rows[0].hash_password;
              session.email = result.rows[0].correo;
              session.nombres = result.rows[0].nombres;
              session.apellidos = result.rows[0].apellidos;
              session.id_tipo_usuario = result.rows[0].id_tipo_usuario;
            }
          }
          //Usuario inexistente, invalido.
          else {
            session.api_response = true;
            session.response = 'Usuario invalido.';
          }
        }
        this.client.end((err) => console.log('[-]Error en ingreso al finalizar conexion'));
        resolve(session);
      });
    });
  }

  registro_usuario(values, session) {
    return new Promise((resolve, reject) => {
      this.client.connect().catch((err) => {
        console.log('Error en client connect. /signup \n');
        console.log(err);
        session.api_response = true;
        session.response = 'Error al intentar conectar.';
        resolve(session);
      });
      //Validacion de ingreso.
      this.client.query(query_register, values, (err, result) => {
        if (err) {
          console.log('Error en client query. /signup \n');
          console.log(err);
          session.api_response = true;
          session.response = 'Error de conexion, usuario no registrado.';
          if (err.code == 23505)
            session.response = 'Correo de usuario ya registrado';
        }
        else {
          session.api_response = true;
          session.response = 'Registro completado.';
        }
        resolve(session);
      });
    });
  }

  acciones_usuario(values) {
    return new Promise((resolve, reject) => {
      let actions = [];
      this.client.connect().catch((err) => {
        console.log('[-]Error en client connect. /api/user_actions \n');
        console.log(err);
      });
      //Validacion de ingreso.
      this.client.query(query_actions, values, (err, result) => {
        if (err) {
          console.log('[-]Error en client query. /api/user_actions \n');
          console.log(err);
        }
        else {
          if (result.rows.length > 0)
            for (let i = 0; i < result.rows.length; i++) {
              actions.push({
                nombre: result.rows[i].nombre,
                ruta: result.rows[i].ruta,
                descripcion: result.rows[i].descripcion
              })
            }
        }
        this.client.end((err) => console.log('[+]disconnected - User Actions'));
        resolve(actions);
      });
    });
  }

  investigaciones_usuario(values) {
    return new Promise((resolve, reject) => {
      let investigations = [];
      this.client.connect().catch((err) => {
        console.log('[-]Error en client connect. /api/user_investigations \n');
        console.log(err);
        resolve(investigations);
      });
      //Validacion de ingreso.
      this.client.query(query_investigations, values, (err, result) => {
        if (err) {
          console.log('[-]Error en client query. /api/user_investigations \n');
          console.log(err);
        }
        else {
          if (result.rows.length > 0)
            for (let i = 0; i < result.rows.length; i++) {
              investigations.push({
                identificacion: result.rows[i].identificacion,
                id_proyecto: result.rows[i].id_proyecto,
                pregunta_investigacion: result.rows[i].pregunta_investigacion,
                calidad: result.rows[i].calidad,
                objetivo_general: result.rows[i].objetivo_general
              })
            }
        }
        this.client.end((err) => console.log('[+]disconnected - User Investigations'));
        resolve(investigations);
      });
    });
  }

  investigacion_usuario(values) {
    return new Promise((resolve, reject) => {
      let investigation = {}
      this.client.connect().catch((err) => {
        console.log('[-]Error en client connect. /api/user_investigation \n');
        console.log(err);
        resolve(investigation);
      });
      //Validacion de ingreso.
      this.client.query(query_investigation, values, (err, result) => {
        if (err) {
          console.log('[-]Error en client query. /api/user_investigation \n');
          console.log(err);
        }
        else {
          if (result.rows.length > 0) {
            investigation = {
              identificacion: result.rows[0].identificacion,
              cantidad_uf: result.rows[0].cantidad_uf,
              objetivo_general: result.rows[0].objetivo_general,
              contexto: {
                poblacion: result.rows[0].poblacion,
                concepcion: result.rows[0].concepcion,
                temporalidad: result.rows[0].temp
              },
              mod: result.rows[0].mod,
              tipo_inv: result.rows[0].tipo_inv,
              calidad: result.rows[0].calidad,
              cantidad_uf: result.rows[0].cantidad_uf
            }
          }
        }
        this.client.end((err) => console.log('[+]disconnected - User Investigation'));
        resolve(investigation);
      });
    });
  }

  investigacion_restricciones_alcances(values) {
    return new Promise((resolve, reject) => {
      let restricciones = [];
      let alcances = [];
      this.client.connect().catch((err) => {
        console.log('[-]Error en client connect. /api/user_investigation_restricciones_alcances \n');
        console.log(err);
        resolve()
      });
      //Validacion de ingreso.
      this.client.query(query_restricciones, values, (err, result) => {
        if (err) {
          console.log('[-]Error en client query. /api/user_investigation_restricciones_alcances \n');
          console.log(err);
        }
        else {
          if (result.rows.length > 0) {
            for (let i = 0; i < result.rows.length; i++) {
              restricciones.push(result.rows[i].contenido);
            }
          }
        }
      });
      this.client.query(query_alcances, values, (err, result) => {
        if (err) {
          console.log('[-]Error en client query. /api/user_investigation_restricciones_alcances \n');
          console.log(err);
        }
        else {
          if (result.rows.length > 0) {
            for (let i = 0; i < result.rows.length; i++) {
              alcances.push(result.rows[i].contenido);
            }
          }
        }
        this.client.end((err) => { console.log('[+]disconnected - restricciones alcances') });
        resolve({
          restricciones: restricciones,
          alcances: alcances
        })
      });
    });
  }

  investigacion_unidades_info(values) {
    return new Promise((resolve, reject) => {
      let unidades = [];
      this.client.connect().catch((err) => {
        console.log('[-]Error en client connect. /api/user_investigation_restricciones_alcances \n');
        console.log(err);
        resolve(unidades);
      });
      //Validacion de ingreso.
      this.client.query(query_unidades, values, (err, result) => {
        if (err) {
          console.log('[-]Error en client query. /api/user_investigation_restricciones_alcances \n');
          console.log(err);
        }
        else {
          for (let i = 0; i < result.rows.length; i++) {
            let unidad = {}
            unidad.autor = result.rows[i].autor;
            unidad.fecha = result.rows[i].fecha;
            unidad.titulo = result.rows[i].titulo;
            unidad.id_unidad_informacion = result.rows[i].id_unidad_informacion;
            unidades.push(unidad);
          }
        }
        this.client.end((err) => { console.log('[+]disconnected - unidades info') });
        resolve(unidades);
      });
    });
  }

  unidades_citas(values) {
    return new Promise((resolve, reject) => {
      let citas = [];
      this.client.connect().catch((err) => {
        console.log('[-]Error en client connect. \n');
        console.log(err);
        resolve(citas);
      });
      //Validacion de ingreso.
      this.client.query(query_citas, values, (err, result) => {
        if (err) {
          console.log('[-]Error en client query.  \n');
          console.log(err);
        }
        else {
          for (let i = 0; i < result.rows.length; i++) {
            let cita = {};
            cita.cita = result.rows[i].cita;
            cita.categoria = result.rows[i].categoria;
            cita.entidad = result.rows[i].entidad;
            cita.delimitacion = result.rows[i].delimitacion;
            citas.push(cita);
          }
        }
        this.client.end((err) => { console.log('[+]disconnected - citas') });
        resolve(citas);
      });
    });
  }

  investigacion_estadios(values) {
    return new Promise((resolve, reject) => {
      let estadios = []
      this.client.connect().catch((err) => {
        console.log('[-]Error en client connect. \n');
        console.log(err);
        resolve(estadios);
      });
      //Validacion de ingreso.
      this.client.query(query_investigacion_estadios, values, (err, result) => {
        if (err) {
          console.log('[-]Error en client query.  \n');
          console.log(err);
        }
        else {
          for (let i = 0; i < result.rows.length; i++) {
            let estadio = {};
            estadio.posicion = result.rows[i].posicion;
            estadio.nombre = result.rows[i].nombre;
            estadio.id_estadio_aplicado = result.rows[i].id_estadio_aplicado;
            estadio.objetivo = result.rows[i].contenido;
            estadios.push(estadio);
          }
        }
        this.client.end((err) => { console.log('[+]disconnected - estadios en investigaciones') });
        resolve(estadios);
      });
    });
  }

  estadio_eventos(values) {
    return new Promise((resolve, reject) => {
      let eventos = [];
      this.client.connect().catch((err) => {
        console.log('[-]Error en client connect. \n');
        console.log(err);
        resolve(eventos);
      });
      //Validacion de ingreso.
      this.client.query(query_estadio_eventos, values, (err, result) => {
        if (err) {
          console.log('[-]Error en client query.  \n');
          console.log(err);
        }
        else {
          for (let i = 0; i < result.rows.length; i++) {
            let evento = {};
            evento.id_evento_delimitado = result.rows[i].id_evento_delimitado;
            evento.tipo_evento = result.rows[i].tipo_evento;
            evento.clase_evento = result.rows[i].clase_evento;
            evento.descripcion = result.rows[i].descripcion;
            evento.evento = result.rows[i].evento;
            evento.abordaje = result.rows[i].abordaje;
            eventos.push(evento);
          }
        }
        this.client.end((err) => { console.log('[+]disconnected - eventos en estadio') });
        resolve(eventos);
      });
    });
  }

  evento_sinergias(values) {
    return new Promise((resolve, reject) => {
      let sinergias = [];
      this.client.connect().catch((err) => {
        console.log('[-]Error en client connect. \n');
        console.log(err);
        resolve(sinergias);
      });
      //Validacion de ingreso.
      this.client.query(query_evento_sinergias, values, (err, result) => {
        if (err) {
          console.log('[-]Error en client query.  \n');
          console.log(err);
        }
        else {
          for (let i = 0; i < result.rows.length; i++) {
            let sinergia = {};
            sinergia.clase_sinergia = result.rows[i].clase_sinergia;
            sinergia.instrumento = result.rows[i].instrumento;
            sinergia.sinergia = result.rows[i].sinergia
            sinergia.id_sinergia = result.rows[i].id_sinergia;
            sinergias.push(sinergia);
          }
        }
        this.client.end((err) => { console.log('[+]disconnected - sinergias de evento') });
        resolve(sinergias);
      });
    });
  }

  sinergias_indicios(values) {
    return new Promise((resolve, reject) => {
      let identificacion;
      let indicios = [];
      this.client.connect().catch((err) => {
        console.log('[-]Error en client connect. \n');
        console.log(err);
        resolve({
          identificacion: identificacion,
          indicios: indicios
        })
      });
      //Validacion de ingreso.
      this.client.query(query_sinergia_indicios, values, (err, result) => {
        if (err) {
          console.log('[-]Error en client query.  \n');
          console.log(err);
        }
        else {
          for (let i = 0; i < result.rows.length; i++) {
            let indicio = {};
            indicio.indicio = result.rows[i].indicio;
            indicio.item = result.rows[i].item;
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
        this.client.end((err) => { console.log('[+]disconnected - indicios de sinergia') });
        resolve({
          indicios: indicios,
          identificacion: identificacion
        });
      });
    });
  }

  informe_calidad(values) {
    return new Promise((resolve, reject) => {
      var reportes = [];
      this.client.connect().catch((err) => {
        console.log('[-]Error en client connect. \n');
        console.log(err);
        resolve(reportes);
      });
      this.client.query(query_informe_calidad, values, (err, result) => {
        if (err) {
          console.log('[-]Error en client query - 1.  \n');
          console.log(err);
        }
        else {
          console.log(result);
          for(let i=0; i<result.rows.length; i++){
            let reporte={};
            reporte.item=result.rows[i].item;
            reporte.valor=result.rows[i].valor;
            reportes.push(reporte);
          }
        }
        this.client.query(query_boolean, values, (err, result) => {
          if (err) {
            console.log('[-]Error en client query - 2.  \n');
            console.log(err);
          }
          else {
            for(let i=0; i<result.rows.length; i++){
              let reporte={};
              reporte.item=result.rows[i].item;
              if (result.rows[i].valor)
                reporte.valor=1;
              else
                reporte.valor=0;
              reportes.push(reporte);
            }
          }
          this.client.end((err) => { console.log('[+]disconnected - indicios de sinergia') });
          console.log(reportes);
          resolve(reportes);
        });
      });
    });
  }

  descarga_informe(values) {
    return new Promise((resolve, reject) => {
      let Proyecto = {};
      this.client.connect().catch((err) => {
        console.log('[-]Error en client connect. \n');
        console.log(err);
        resolve(Proyecto);
      });
      const query_proyecto = 'SELECT Proyecto.*, Problematica.nombre as problematica, Problematica.descripcion as problematica_descripcion FROM Proyecto JOIN Problematica ON Problematica.id_problematica = Proyecto.id_problematica WHERE Proyecto.id_proyecto = $1';
      this.client.query(query_proyecto, values, (err, result) => {
        if (err) {
          console.log('[-]error --- en query ')
        }
        else {
          console.log('[+]Recoleccion de datos proyecto');
          console.log(result.rows);
          Proyecto.identificacion = result.rows[0].identificacion;
          let Problematica = {};
          Problematica.nombre = result.rows[0].problematica;
          Problematica.descripcion = result.rows[0].problematica;
          Problematica.causas_sintomas = [];
          this.client.query('SELECT Causa_Sintoma.* FROM Causa_Sintoma JOIN Problematica ON Problematica.id_problematica = Causa_Sintoma.id_problematica JOIN Proyecto ON Proyecto.id_problematica = Problematica.id_problematica WHERE Proyecto.id_proyecto = $1', values, (err, result) => {
            if (err) {
              console.log('[-]Error -- en query');
            }
            else {
              console.log('[+]Recoleccion de datos causas_sintomas');
              for (let i = 0; i < result.rows.length; i++) {
                let causas_sintomas = {};
                causas_sintomas.nombre = result.rows[i].nombre;
                causas_sintomas.descripcion = result.rows[i].descripcion;
                Problematica.causas_sintomas.push(causas_sintomas);
              }
            }
          });
          Proyecto.Problematica = Problematica;
          Proyecto.alcances = [];
          //Alcances
          this.client.query('SELECT Alcance.contenido FROM Alcance JOIN Proyecto ON Proyecto.id_proyecto = Alcance.id_proyecto WHERE Proyecto.id_proyecto = $1',
            values, (err, result) => {
              if (err) {
                console.log('[-]Error --- generando query para informe -causas_sintomas');
              }
              else {
                console.log('[+]Recoleccion de alcances');
                for (let i = 0; i < result.rows.length; i++) {
                  Proyecto.alcances.push(result.rows[i].contenido);
                }
              }
            });
          Proyecto.restricciones = [];
          //Restricciones
          this.client.query('SELECT Restriccion.contenido FROM Restriccion JOIN Proyecto ON Proyecto.id_proyecto = Restriccion.id_proyecto WHERE Proyecto.id_proyecto = $1',
            values, (err, result) => {
              if (err) {
                console.log('[-]Error --- generando query para informe -causas_sintomas');
              }
              else {
                console.log('[+]Recoleccion de restricciones');
                for (let i = 0; i < result.rows.length; i++) {
                  Proyecto.restricciones.push(result.rows[i].contenido);
                }
              }
            });
          Proyecto.unidades_informacion = []
          this.client.query('SELECT Unidad_Informacion.*, Tipo_Fuente.nombre as tipo_fuente, Base_Noologica.nombre as base_noologica FROM Unidad_Informacion JOIN Base_Noologica ON Base_Noologica.id_base_noologica = Unidad_Informacion.id_base_noologica JOIN Tipo_Fuente ON Tipo_Fuente.id_tipo_fuente = Unidad_Informacion.id_tipo_fuente WHERE Unidad_Informacion.id_proyecto = $1', values, (err, result) => {
            if (err) {
              console.log('[-]Error --- generando query para informe -causas_sintomas');
            }
            else {
              console.log('[+]Recoleccion de unidades de informacion');
              for (let i = 0; i < result.rows.length; i++) {
                let Unidad_Informacion = {};
                Unidad_Informacion.autor = result.rows[i].autor;
                Unidad_Informacion.fecha = result.rows[i].fecha;
                Unidad_Informacion.tipo_fuente = result.rows[i].tipo_fuente;
                Unidad_Informacion.base_noologica = result.rows[i].base_noologica;
                Unidad_Informacion.titulo= result.rows[i].titulo;
                Unidad_Informacion.cita_ref= i;
                Unidad_Informacion.citas = [];
                this.investigacion_restricciones_alcancesclient.query('SELECT Cita.*, Categoria_uso.nombre as categoria_uso, sub_titulo.nombre as sub_titulo, titulo.nombre as titulo, Entidad_Uso.nombre as entidad_uso FROM Cita JOIN Categoria_Uso ON Categoria_Uso.id_categoria_uso = Cita.id_categoria_uso JOIN Sub_Titulo ON Sub_Titulo.id_sub_titulo = Cita.id_sub_titulo JOIN Titulo ON Titulo.id_titulo = Sub_Titulo.id_titulo JOIN Direccion_Uso ON Direccion_Uso.id_direccion_Uso = Cita.id_direccion_uso JOIN Entidad_Uso ON Entidad_Uso.id_entidad_uso = Direccion_Uso.id_entidad_uso WHERE Cita.id_unidad_informacion = $1',
                  [result.rows[i].id_unidad_informacion], (err, result) => {
                    if (err) {
                      console.log('[-]Error - unidades de informacion');
                    }
                    else {
                      console.log('[+]Recoleccion de citas');
                      for (let i = 0; i < result.rows.length; i++) {
                        let cita = {};
                        cita.delimitacion = result.rows[i].delimitacion;
                        cita.cita = result.rows[i].cita;
                        cita.categoria_uso = result.rows[i].categoria_uso;
                        cita.sub_titulo = result.rows[i].sub_titulo;
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
          this.client.query('SELECT Investigacion.*, Contexto.*, Entorno_Investigacion.Descripcion as Entorno_Investigacion, Contexto_Investigacion.nombre as contexto_investigacion, Tipo_Investigacion.nombre as tipo_investigacion, Temporalidad.descripcion as temporalidad FROM Investigacion JOIN Entorno_Investigacion ON Entorno_Investigacion.id_investigacion = Investigacion.id_investigacion JOIN Contexto_Investigacion ON Contexto_Investigacion.id_contexto_investigacion = Entorno_Investigacion.id_contexto_investigacion JOIN Contexto ON Contexto.id_contexto = Investigacion.id_contexto JOIN Temporalidad ON Temporalidad.id_temporalidad = Investigacion.id_temporalidad JOIN Esquema_Formulado ON Esquema_Formulado.id_investigacion = Investigacion.id_investigacion JOIN Pregunta_Modular ON Pregunta_Modular.id_pregunta_modular = Esquema_Formulado.id_pregunta_modular JOIN Tipo_Investigacion ON Tipo_Investigacion.id_tipo_investigacion = Pregunta_Modular.id_tipo_investigacion WHERE Investigacion.id_proyecto = $1',
            values, (err, result) => {
              if (err) {
                console.log('[-]Error --- generando query para informe -causas_sintomas');
              }
              else {
                console.log('[+]Recoleccion de investigacion');
                let Investigacion = {};
                Investigacion.pregunta_investigacion = result.rows[0].pregunta_investigacion;
                Investigacion.calidad = result.rows[0].calidad;
                Investigacion.Objetivo_Genera = result.rows[0].objetivo_general;
                Investigacion.tipo_investigacion = result.rows[0].tipo_investigacion;
                let Contexto = {};
                Contexto.concepcion = result.rows[0].concepcion;
                Contexto.poblacion = result.rows[0].poblacion;
                Contexto.descripcion = result.rows[0].descripcion;
                Contexto.temporalidad = result.rows[0].temporalidad;
                Investigacion.contexto = Contexto;
                Investigacion.Entorno_Investigacion = result.rows[0].entorno_investigacion;
                Investigacion.Contexto_Investigacion = result.rows[0].contexto_investigacion;
                Investigacion.preguntas_investigacion = [];
                this.client.query('SELECT Esquema_Formulado.interrogante as preguntas_investigacion FROM Esquema_Formulado JOIN Investigacion ON Investigacion.id_investigacion = Esquema_Formulado.id_investigacion WHERE Investigacion.id_proyecto = $1',
                  values, (err, result) => {
                    if (err) {
                      console.log('[-]Error --- generando query para informe -causas_sintomas');
                    }
                    else {
                      console.log('[+]Recoleccion de preguntas de investigacion');
                      for (let i = 0; i < result.rows.length; i++) {
                        Investigacion.preguntas_investigacion.push(result.rows[i].preguntas_investigacion);
                      }
                    }
                  });
                Investigacion.estadios_aplicados = [];
                this.client.query('SELECT Estadio.*, Estadio_Aplicado.id_estadio_aplicado FROM Estadio JOIN Estadio_Aplicado ON Estadio_Aplicado.id_estadio = Estadio.id_Estadio JOIN Investigacion ON Investigacion.id_investigacion = Estadio_Aplicado.id_investigacion WHERE Investigacion.id_proyecto = $1',
                  values, (err, result) => {
                    if (err) {
                      console.log('[-]Error --- generando query para informe -causas_sintomas');
                    }
                    else {
                      console.log('[+]Recoleccion de estadios aplicados');
                      for (let i = 0; i < result.rows.length; i++) {
                        let estadio_aplicado = {};
                        estadio_aplicado.estadio = result.rows[i].nombre;
                        estadio_aplicado.objetivos_especificos = [];
                        this.client.query('SELECT Objetivo_Especifico_Det.contenido FROM Objetivo_Especifico_Det WHERE Objetivo_Especifico_Det.id_estadio_aplicado = $1',
                          [result.rows[i].id_estadio_aplicado], (err, result) => {
                            if (err) {
                              console.log('[-]Error --- generando query para informe -causas_sintomas');
                            }
                            else {
                              console.log('[+]Recoleccion de objetivos especificos');
                              for (let i = 0; i < result.rows.length; i++) {
                                let objetivo_especifico = result.rows[i].contenido;
                                estadio_aplicado.objetivos_especificos.push(objetivo_especifico);
                              }
                            }
                          });
                        estadio_aplicado.eventos_delimitados = [];
                        this.client.query('SELECT Evento_Delimitado.id_evento_delimitado, Clase_Evento.nombre as clase_Evento, Tipo_Evento.nombre as tipo_Evento, Evento_Delimitado.descripcion as evento_delimitado FROM Evento_Delimitado JOIN Clase_Evento ON Clase_Evento.id_clase_evento = Evento_Delimitado.id_clase_evento JOIN Tipo_Evento ON Tipo_Evento.id_tipo_evento = Evento_Delimitado.id_tipo_evento WHERE Evento_Delimitado.id_estadio_aplicado = $1',
                          [result.rows[i].id_estadio_aplicado], (err, result) => {
                            if (err) {
                              console.log('[-]Error --- generando query para informe -causas_sintomas');
                            }
                            else {
                              console.log('[+]Recoleccion de eventos delimitados');
                              for (let i = 0; i < result.rows.length; i++) {
                                let Evento_Delimitado = {};
                                Evento_Delimitado.tipo_evento = result.rows[i].tipo_evento;
                                Evento_Delimitado.clase_Evento = result.rows[i].clase_evento;
                                Evento_Delimitado.descripcion = result.rows[i].evento_delimitado;
                                Evento_Delimitado.sinergias = [];
                                this.client.query('SELECT Sinergia.id_sinergia, Sinergia.nombre FROM Sinergia WHERE Sinergia.id_evento_delimitado = $1',
                                  [result.rows[i].id_evento_delimitado], (err, result) => {
                                    if (err) {
                                      console.log('[-]Error --- generando query para informe -causas_sintomas');
                                    }
                                    else {
                                      console.log('[+]Recoleccion de sinergias');
                                      for (let i = 0; i < result.rows.length; i++) {
                                        let sinergia = {};
                                        sinergia.nombre = result.rows[i].nombre;
                                        sinergia.fuentes = [];
                                        this.client.query('SELECT Fuente.valor FROM Fuente WHERE Fuente.id_sinergia = $1',
                                          [result.rows[i].id_sinergia], (err, result) => {
                                            if (err) {
                                              console.log('[-]Error --- generando query para informe -causas_sintomas');
                                            }
                                            else {
                                              console.log('[+]Recoleccion de fuentes');
                                              for (let i = 0; i < result.rows.length; i++) {
                                                let fuente = result.rows[i].valor;
                                                sinergia.fuentes.push(fuente);
                                              }
                                            }
                                          });
                                        sinergia.aplicaciones_instrumentales = [];
                                        this.client.query('SELECT Aplicacion_Instrumental.id_sinergia, Aplicacion_Instrumental.id_instrumento, Instrumento.nombre, Aplicacion_Instrumental.identificacion FROM Aplicacion_Instrumental JOIN Instrumento ON Aplicacion_Instrumental.id_instrumento = Instrumento.id_instrumento WHERE Aplicacion_Instrumental.id_sinergia = $1',
                                          [result.rows[i].id_sinergia], (err, result) => {
                                            if (err) {
                                              console.log('[-]Error --- generando query para informe -causas_sintomas');
                                            }
                                            else {
                                              console.log('[+]Recoleccion de aplicaciones instrumentales');
                                              for (let i = 0; i < result.rows.length; i++) {
                                                let aplicacion_instrumental = {};
                                                aplicacion_instrumental.instrumento = result.rows[i].nombre;
                                                aplicacion_instrumental.identificacion = result.rows[i].identificacion;
                                                aplicacion_instrumental.items = [];
                                                this.client.query('SELECT Indicio.contenido as indicio, Item.*, Tipo_Item.nombre as tipo_item FROM Item JOIN Instrumento_Item ON Instrumento_Item.id_item = Item.id_item JOIN Indicio_Item ON Indicio_Item.id_item = Item.id_item JOIN Indicio ON Indicio.id_indicio = Indicio_Item.id_indicio JOIN Tipo_Item ON Tipo_Item.id_tipo_item = Item.id_tipo_item  WHERE Instrumento_Item.id_sinergia  = $1 AND Instrumento_Item.id_instrumento = $2',
                                                  [result.rows[i].id_sinergia, result.rows[i].id_instrumento], (err, result) => {
                                                    if (err) {
                                                      console.log('[-]Error --- generando query para informe -causas_sintomas');
                                                    }
                                                    else {
                                                      console.log('[+]Recoleccion de items');
                                                      for (let i = 0; i < result.rows.length; i++) {
                                                        let item = {};
                                                        item.contenido = result.rows[i].contenido;
                                                        item.identificacion = result.rows[i].identificacion;
                                                        item.tipo_item = result.rows[i].tipo_item;
                                                        item.indicio = result.rows[i].indicio;
                                                        client.query('SELECT Categoria.*, Escala.nombre as escala FROM Categoria JOIN Escala ON Escala.id_Escala = Categoria.id_escala JOIN Item ON Item.id_categoria = Categoria.id_Categoria WHERE Item.id_item = $1',
                                                          [result.rows[i].id_item], (err, result) => {
                                                            if (err) {
                                                              console.log('[-]Error --- generando query para informe -causas_sintomas');
                                                            }
                                                            else {
                                                              console.log('[+]Recoleccion de categorias');
                                                              let categoria = {};
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
                Proyecto.investigacion = Investigacion;
              }
            });
          }
          console.log('[+]Finalizacion de Recoleccion de informacion');
          this.client.end((err) => { console.log('[+]disconnected - Recoleccion de info') });
          resolve(Proyecto);
        });
      });
    }

}