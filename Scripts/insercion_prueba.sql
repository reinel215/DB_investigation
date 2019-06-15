INSERT INTO Tipo_Estadio_Estructural (nombre) VALUES ('Exploratorio');
INSERT INTO tipo_usuario (Nombre)
VALUES ('Epale');
INSERT INTO Permiso (nombre)
VALUES ('Epale');
INSERT INTO Rol (Id_Tipo_Usuario, Id_Permiso) VALUES (1, 1);
INSERT INTO Usuario (nombres, apellidos, hash_password, correo, id_tipo_usuario) VALUES ('epale','epale','epale','epale@hotmail.com', 1, 3);
INSERT INTO Entidad_Institucional (nombre, hash_password, correo, rif) VALUES ('epale','epale','epale@hotmail.com', 'F-1231241');
INSERT INTO Registro_Institucional (id_entidad_institucional, id_usuario) VALUES (1, 1);
INSERT INTO Problematica (nombre, descripcion) VALUES ('epale', 'descripcion');
INSERT INTO Causa_Sintoma (nombre, descripcion, id_problematica) VALUES ('epale', 'descripcion', 1);
INSERT INTO Proyecto (factibilidad, identificacion, id_problematica) VALUES (0, 'descripcion', 1);
INSERT INTO Usuario_Proyecto (id_proyecto, id_usuario) VALUES (1, 1);
INSERT INTO Base_Noologica (nombre, descripcion) VALUES ('Pedro', 'Epale todo fino?');
INSERT INTO Tipo_Fuente (nombre) VALUES ('Pedro');
INSERT INTO Unidad_Informacion (id_tipo_fuente, id_base_noologica, id_proyecto, autor, fecha, titulo) VALUES (1, 1, 1, 'Pedro', NULL, 'Epale todo fino?');
INSERT INTO Entidad_Uso (nombre) VALUES ('Pedro');
INSERT INTO Direccion_Uso (id_entidad_uso, nombre) VALUES (1, 'Fuente de tiro');
INSERT INTO Titulo (nombre) VALUES ('Pedro hizo esto');
INSERT INTO Sub_Titulo (id_titulo, nombre) VALUES (1, 'Epale todo fino?');
INSERT INTO Cita (id_sub_titulo,id_direccion_uso, id_unidad_informacion, cita, delimitacion) VALUES (1, 1, 1, 'Pedro hizo esto','Epale todo fino?');
INSERT INTO Alcance (id_proyecto, contenido) VALUES (1,'Epale todo fino?');
INSERT INTO Area_Restriccion (area) VALUES ('recursos');
INSERT INTO Restriccion (id_proyecto, id_area_restriccion, contenido) VALUES (1,1,'Epale todo fino?');
INSERT INTO Tipo_Argumentacion (nombre, descripcion) VALUES ('Bueno', 'Todo bien y pro');
INSERT INTO Justificacion (id_proyecto, id_tipo_argumentacion, contenido) VALUES (1,1,'Epale todo fino?');
INSERT INTO Contexto (concepcion, poblacion, descripcion) VALUES ('epale','todo fino','Epale todo fino?');
INSERT INTO Temporalidad (id_contexto, descripcion) VALUES (1,'Epale todo fino?');
INSERT INTO Estandar (nombre) VALUES ('epale');
INSERT INTO Investigacion (id_contexto, id_proyecto, id_estandar, calidad, pregunta_investigacion, objetivo_general) VALUES (1,1,1,NULL,'Epale todo fino?', 'epale fino');
INSERT INTO Nivel_Investigacion (nombre, descripcion) VALUES ('Epale todo fino?', 'epale fino');
INSERT INTO Tipo_Investigacion (id_nivel_investigacion, nombre) VALUES (1, 'Exploratoria');
INSERT INTO Verbo_Aplicado (verbo) VALUES ('Diseñar');
INSERT INTO Conjunto_Verbo (id_tipo_investigacion, id_verbo_aplicado) VALUES (1,1);
INSERT INTO Pregunta_Modular (id_tipo_investigacion, contenido) VALUES (1, 'que es eso?');
INSERT INTO Esquema_Formulado (id_pregunta_modular, id_investigacion, interrogante) VALUES (1,1, 'que es eso vale?');
INSERT INTO Modalidad (id_tipo_investigacion, nombre) VALUES (1, 'modalidad 1');
INSERT INTO Obligatoriedad (cualitatividad) VALUES ('Obligatorio');
INSERT INTO Estadio_Estructural (id_modalidad, id_tipo_estadio_estructural, id_obligatoriedad, descripcion, posicion) VALUES (1, 1, 1, 'modalidad 1 es pro', 1);
INSERT INTO Objetivo_Especifico (id_estadio_estructural, tipo_objetivo, correspondencia) VALUES (1,'describir el evento a explorar', TRUE);
INSERT INTO Clase_Evento_Estructural (nombre) VALUES ('evento a describir');
INSERT INTO Tipo_Evento_Estructural (nombre) VALUES ('Proceso');
INSERT INTO Estructura_Evento (id_estadio_estructural, id_clase_evento_estructural) VALUES (1,1);
INSERT INTO Estructura_Tipo_Evento (id_estadio_estructural, id_tipo_evento_estructural) VALUES (1,1);
INSERT INTO Objetivo_Estadial (tipo) VALUES ('Epale, todo fino.');
INSERT INTO Estadio (nombre) VALUES ('Exploratorio');
INSERT INTO Estadio_Aplicado (id_investigacion, id_estadio) VALUES (1,1);
INSERT INTO Objetivo_Especifico_Det (id_objetivo_estadial, id_estadio_aplicado, contenido) VALUES (1,1,'Epale todo fino');
INSERT INTO Clase_Evento (nombre) VALUES ('A Modificar');
INSERT INTO Abordaje (nombre,descripcion) VALUES ('hola', 'Epale todo fino');
INSERT INTO Tipo_Evento (nombre) VALUES ('hola');
INSERT INTO Tecnica_Analisis (nombre) VALUES ('hola');
INSERT INTO Evento (id_clase_evento, id_abordaje, id_tipo_evento, id_tecnica_analisis, id_estadio_aplicado, nombre, descripcion) 
	VALUES (1, 1, 1, 1, 1,'Epale', 'fino todo');
INSERT INTO Tecnica_Muestreo (nombre,descripcion) VALUES ('hola', 'por poblacion');
INSERT INTO Muestra (id_tecnica_muestreo, valor, criterio_seleccion, tamano) 
	VALUES (1,'Epale', 'fino todo', 5);
INSERT INTO Clase_Sinergia (nombre) VALUES ('hola');
INSERT INTO Sinergia (id_clase_sinergia, id_evento, nombre) 
	VALUES (1, 1,'Epale');
INSERT INTO Fuente (id_sinergia, id_muestra, valor) 
	VALUES (1, 1,'Epale');
INSERT INTO Instrumento (nombre, descripcion) 
	VALUES ('Epale','miralo todo pro');
INSERT INTO Tecnica_Practica (nombre) 
	VALUES ('Epale');
INSERT INTO Logica_Aplicada (id_instrumento, id_tecnica_practica) 
	VALUES (1, 1);
INSERT INTO Aplicacion_Instrumental (id_instrumento, id_sinergia, identificacion) 
	VALUES (1, 1, 'epale todo fino');
INSERT INTO Escala (nombre) 
	VALUES ('epale todo fino');
INSERT INTO Parametro (nombre,contenido) 
	VALUES ('epale todo fino','todo fino y pro elegante, pro.');
INSERT INTO Categoria (id_escala, id_parametro, nombre, descripcion, aplicacion_temporal, terminos, nivel_ausencia) 
	VALUES (1, 1, 'epale todo fino', 'si todo fino', 'esta mañana', 'no importa', 'bajo');
INSERT INTO Tipo_Item (nombre, descripcion) 
	VALUES ('epale todo fino', 'si todo fino');
INSERT INTO Indicio (contenido) 
	VALUES ('epale todo fino');
INSERT INTO Item (id_sinergia, id_instrumento, id_indicio, id_categoria, id_tipo_item, identificacion, contenido) 
	VALUES (1, 1, 1, 1, 1,'epale todo fino', 'si todo fino');