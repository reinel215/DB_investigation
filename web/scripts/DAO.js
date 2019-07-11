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

module.exports.default = class DAO {

    constructor() {
        this.client= new Client(datos);
    }

    contador_proyectos(values){
        let contador_proy;
        this.client.connect().catch((err) => {
            console.log('[-]Error en client connect. /api/user_info \n');
            console.log(err);
          });
          //Validacion de ingreso.

        return new Promise((resolve, reject ) => {
            this.client.query(query_cont_proy,values, (err,result) => {
            if (err){
              console.log('[-]Error en client query. /api/user_info \n');
              console.log(err);
              contador_proy=0;
            }
            else{
              contador_proy= result.rows[0].count
            }
            this.client.end((err) => console.log('[+]disconnected - User Info'));
            resolve(contador_proy);
            });
        });
    }
}