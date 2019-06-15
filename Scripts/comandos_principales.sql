SELECT * FROM Tipo_Estadio_Estructural;

DROP TABLE Tipo_Estadio_Estructural;

INSERT INTO Tipo_Estadio_Estructural (nombre) VALUES ('Exploratorio');

DELETE FROM Tipo_Estadio_Estructural;

DROP TABLE tipo_usuario;

INSERT INTO tipo_usuario (Nombre)
VALUES ('Epale');

SELECT * FROM tipo_usuario;

DELETE FROM tipo_usuario;
DROP TABLE Permiso;

INSERT INTO Permiso (nombre)
VALUES ('Epale');

SELECT * FROM Permiso;

DELETE FROM Permiso;
DROP TABLE Rol;

INSERT INTO Rol (Id_Tipo_Usuario, Id_Permiso) VALUES (1, 1);

SELECT * FROM Rol;

DELETE FROM Rol;
SELECT * FROM Usuario;

DROP TABLE Usuario;

INSERT INTO Usuario (nombres, apellidos, hash_password, correo, id_tipo_usuario) VALUES ('epale','epale','epale','epale@hotmail.com', 1, 3);

DELETE FROM Usuario;
SELECT * FROM Entidad_Institucional;

DROP TABLE Entidad_Institucional;

INSERT INTO Entidad_Institucional (nombre, hash_password, correo, rif) VALUES ('epale','epale','epale@hotmail.com', 'F-1231241');

DELETE FROM Entidad_Institucional;
SELECT * FROM Registro_Institucional;

DROP TABLE Registro_Institucional;

INSERT INTO Registro_Institucional (id_entidad_institucional, id_usuario) VALUES (1, 1);

DELETE FROM Registro_Institucional;
SELECT * FROM Problematica;

DROP TABLE Problematica;

INSERT INTO Problematica (nombre, descripcion) VALUES ('epale', 'descripcion');

DELETE FROM Problematica;
SELECT * FROM Causa_Sintoma;

DROP TABLE Causa_Sintoma;

INSERT INTO Causa_Sintoma (nombre, descripcion, id_problematica) VALUES ('epale', 'descripcion', 1);

DELETE FROM Causa_Sintoma;
SELECT * FROM Proyecto;

DROP TABLE Proyecto;

INSERT INTO Proyecto (factibilidad, identificacion, id_problematica) VALUES (0, 'descripcion', 1);

DELETE FROM Proyecto;
SELECT * FROM Usuario_Proyecto;

DROP TABLE Usuario_Proyecto;

INSERT INTO Usuario_Proyecto (id_proyecto, id_usuario) VALUES (1, 1);

DELETE FROM Usuario_Proyecto;
SELECT * FROM Base_Noologica;

DROP TABLE Base_Noologica;

INSERT INTO Base_Noologica (nombre, descripcion) VALUES ('Pedro', 'Epale todo fino?');

DELETE FROM Base_Noologica;
SELECT * FROM Tipo_Fuente;

DROP TABLE Tipo_Fuente;

INSERT INTO Tipo_Fuente (nombre) VALUES ('Pedro');

DELETE FROM Tipo_Fuente;
SELECT * FROM Unidad_Informacion;

DROP TABLE Unidad_Informacion;

INSERT INTO Unidad_Informacion (id_tipo_fuente, id_base_noologica, id_proyecto, autor, fecha, titulo) VALUES (1, 1, 1, 'Pedro', NULL, 'Epale todo fino?');

DELETE FROM Unidad_Informacion;
SELECT * FROM Entidad_Uso;

DROP TABLE Entidad_Uso;

INSERT INTO Entidad_Uso (nombre) VALUES ('Pedro');

DELETE FROM Entidad_Uso;
SELECT * FROM Direccion_Uso;

DROP TABLE Direccion_Uso;

INSERT INTO Direccion_Uso (id_entidad_uso, nombre) VALUES (1, 'Fuente de tiro');

DELETE FROM Direccion_Uso;
SELECT * FROM Titulo;

DROP TABLE Titulo;

INSERT INTO Titulo (nombre) VALUES ('Pedro hizo esto');

DELETE FROM Titulo;
SELECT * FROM Sub_Titulo;

DROP TABLE Sub_Titulo;

INSERT INTO Sub_Titulo (id_titulo, nombre) VALUES (1, 'Epale todo fino?');

DELETE FROM Sub_Titulo;
SELECT * FROM Cita;

DROP TABLE Cita;

INSERT INTO Cita (id_sub_titulo,id_direccion_uso, id_unidad_informacion, cita, delimitacion) VALUES (1, 1, 1, 'Pedro hizo esto','Epale todo fino?');

DELETE FROM Cita;
SELECT * FROM Alcance;

DROP TABLE Alcance;

INSERT INTO Alcance (id_proyecto, contenido) VALUES (1,'Epale todo fino?');

DELETE FROM Alcance;
SELECT * FROM Area_Restriccion;

DROP TABLE Area_Restriccion;

INSERT INTO Area_Restriccion (area) VALUES ('recursos');

DELETE FROM Area_Restriccion;
SELECT * FROM Restriccion;

DROP TABLE Restriccion;

INSERT INTO Restriccion (id_proyecto, id_area_restriccion, contenido) VALUES (1,1,'Epale todo fino?');

DELETE FROM Restriccion;
SELECT * FROM Tipo_Argumentacion;

DROP TABLE Tipo_Argumentacion;

INSERT INTO Tipo_Argumentacion (nombre, descripcion) VALUES ('Bueno', 'Todo bien y pro');

DELETE FROM Tipo_Argumentacion;
SELECT * FROM Justificacion;

DROP TABLE Justificacion;

INSERT INTO Justificacion (id_proyecto, id_tipo_argumentacion, contenido) VALUES (1,1,'Epale todo fino?');

DELETE FROM Justificacion;
SELECT * FROM Contexto;

DROP TABLE Contexto;

INSERT INTO Contexto (concepcion, poblacion, descripcion) VALUES ('epale','todo fino','Epale todo fino?');

DELETE FROM Contexto;
SELECT * FROM Temporalidad;

DROP TABLE Temporalidad;

INSERT INTO Temporalidad (id_contexto, descripcion) VALUES (1,'Epale todo fino?');

DELETE FROM Temporalidad;
SELECT * FROM Estandar;

DROP TABLE Estandar;

INSERT INTO Estandar (nombre) VALUES ('epale');

DELETE FROM Estandar;
SELECT * FROM Investigacion;

DROP TABLE Investigacion;

INSERT INTO Investigacion (id_contexto, id_proyecto, id_estandar, calidad, pregunta_investigacion, objetivo_general) VALUES (1,1,1,NULL,'Epale todo fino?', 'epale fino');

DELETE FROM Investigacion;
SELECT * FROM Nivel_Investigacion;

DROP TABLE Nivel_Investigacion;

INSERT INTO Nivel_Investigacion (nombre, descripcion) VALUES ('Epale todo fino?', 'epale fino');

DELETE FROM Nivel_Investigacion;
SELECT * FROM Tipo_Investigacion;

DROP TABLE Tipo_Investigacion;

INSERT INTO Tipo_Investigacion (id_nivel_investigacion, nombre) VALUES (1, 'Exploratoria');

DELETE FROM Tipo_Investigacion;
SELECT * FROM Verbo_Aplicado;

DROP TABLE Verbo_Aplicado;

INSERT INTO Verbo_Aplicado (verbo) VALUES ('Diseñar');

DELETE FROM Verbo_Aplicado;
SELECT * FROM Conjunto_Verbo;

DROP TABLE Conjunto_Verbo;

INSERT INTO Conjunto_Verbo (id_tipo_investigacion, id_verbo_aplicado) VALUES (1,1);

DELETE FROM Conjunto_Verbo;
SELECT * FROM Pregunta_Modular;

DROP TABLE Pregunta_Modular;

INSERT INTO Pregunta_Modular (id_tipo_investigacion, contenido) VALUES (1, 'que es eso?');

DELETE FROM Pregunta_Modular;
SELECT * FROM Esquema_Formulado;

DROP TABLE Esquema_Formulado;

INSERT INTO Esquema_Formulado (id_pregunta_modular, id_investigacion, interrogante) VALUES (1,1, 'que es eso vale?');

DELETE FROM Esquema_Formulado;
SELECT * FROM Modalidad;

DROP TABLE Modalidad;

INSERT INTO Modalidad (id_tipo_investigacion, nombre) VALUES (1, 'modalidad 1');

DELETE FROM Modalidad;
SELECT * FROM Obligatoriedad;

DROP TABLE Obligatoriedad;

INSERT INTO Obligatoriedad (cualitatividad) VALUES ('Obligatorio');

DELETE FROM Obligatoriedad;
SELECT * FROM Estadio_Estructural;

DROP TABLE Estadio_Estructural;

INSERT INTO Estadio_Estructural (id_modalidad, id_tipo_estadio_estructural, id_obligatoriedad, descripcion, posicion) VALUES (1, 1, 1, 'modalidad 1 es pro', 1);

DELETE FROM Estadio_Estructural;
SELECT * FROM Objetivo_Especifico;

DROP TABLE Objetivo_Especifico;

INSERT INTO Objetivo_Especifico (id_estadio_estructural, tipo_objetivo, correspondencia) VALUES (1,'describir el evento a explorar', TRUE);

DELETE FROM Objetivo_Especifico;
SELECT * FROM Clase_Evento_Estructural;

DROP TABLE Clase_Evento_Estructural;

INSERT INTO Clase_Evento_Estructural (nombre) VALUES ('evento a describir');

DELETE FROM Clase_Evento_Estructural;
SELECT * FROM Tipo_Evento_Estructural;

DROP TABLE Tipo_Evento_Estructural;

INSERT INTO Tipo_Evento_Estructural (nombre) VALUES ('Proceso');

DELETE FROM Tipo_Evento_Estructural;
SELECT * FROM Estructura_Evento;

DROP TABLE Estructura_Evento;

INSERT INTO Estructura_Evento (id_estadio_estructural, id_clase_evento_estructural) VALUES (1,1);

DELETE FROM Estructura_Evento;
SELECT * FROM Estructura_Tipo_Evento;

DROP TABLE Estructura_Tipo_Evento;

INSERT INTO Estructura_Tipo_Evento (id_estadio_estructural, id_tipo_evento_estructural) VALUES (1,1);

DELETE FROM Estructura_Tipo_Evento;
SELECT * FROM Objetivo_Estadial;

DROP TABLE Objetivo_Estadial;

INSERT INTO Objetivo_Estadial (tipo) VALUES ('Epale, todo fino.');

DELETE FROM Objetivo_Estadial;
SELECT * FROM Estadio;

DROP TABLE Estadio;

INSERT INTO Estadio (nombre) VALUES ('Exploratorio');

DELETE FROM Estadio;

SELECT * FROM Estadio_Aplicado;

DROP TABLE Estadio_Aplicado;

INSERT INTO Estadio_Aplicado (id_investigacion, id_estadio) VALUES (1,1);

DELETE FROM Estadio_Aplicado;
SELECT * FROM Objetivo_Especifico_Det;

DROP TABLE Objetivo_Especifico_Det;

INSERT INTO Objetivo_Especifico_Det (id_objetivo_estadial, id_estadio_aplicado, contenido) VALUES (1,1,'Epale todo fino');

DELETE FROM Objetivo_Especifico_Det;
SELECT * FROM Clase_Evento;

DROP TABLE Clase_Evento;

INSERT INTO Clase_Evento (nombre) VALUES ('A Modificar');

DELETE FROM Clase_Evento;
SELECT * FROM Abordaje;

DROP TABLE Abordaje;

INSERT INTO Abordaje (nombre,descripcion) VALUES ('hola', 'Epale todo fino');

DELETE FROM Abordaje;

SELECT * FROM Tipo_Evento;

DROP TABLE Tipo_Evento;

INSERT INTO Tipo_Evento (nombre) VALUES ('hola');

DELETE FROM Tipo_Evento;

SELECT * FROM Tecnica_Analisis;

DROP TABLE Tecnica_Analisis;

INSERT INTO Tecnica_Analisis (nombre) VALUES ('hola');

DELETE FROM Tecnica_Analisis;

SELECT * FROM Evento;

DROP TABLE Evento;

INSERT INTO Evento (id_clase_evento, id_abordaje, id_tipo_evento, id_tecnica_analisis, id_estadio_aplicado, nombre, descripcion) 
	VALUES (1, 1, 1, 1, 1,'Epale', 'fino todo');

DELETE FROM Evento;
SELECT * FROM Tecnica_Muestreo;

DROP TABLE Tecnica_Muestreo;

INSERT INTO Tecnica_Muestreo (nombre,descripcion) VALUES ('hola', 'por poblacion');

DELETE FROM Tecnica_Muestreo;

SELECT * FROM Muestra;

DROP TABLE Muestra;

INSERT INTO Muestra (id_tecnica_muestreo, valor, criterio_seleccion, tamano) 
	VALUES (1,'Epale', 'fino todo', 5);

DELETE FROM Muestra;

SELECT * FROM Clase_Sinergia;

DROP TABLE Clase_Sinergia;

INSERT INTO Clase_Sinergia (nombre) VALUES ('hola');

DELETE FROM Clase_Sinergia;

SELECT * FROM Sinergia;

DROP TABLE Sinergia;

INSERT INTO Sinergia (id_clase_sinergia, id_evento, nombre) 
	VALUES (1, 1,'Epale');

DELETE FROM Sinergia;

SELECT * FROM Fuente;

DROP TABLE Fuente;

INSERT INTO Fuente (id_sinergia, id_muestra, valor) 
	VALUES (1, 1,'Epale');

DELETE FROM Fuente;

SELECT * FROM Instrumento;

DROP TABLE Instrumento;

INSERT INTO Instrumento (nombre, descripcion) 
	VALUES ('Epale','miralo todo pro');

DELETE FROM Instrumento;


SELECT * FROM Tecnica_Practica;

DROP TABLE Tecnica_Practica;

INSERT INTO Tecnica_Practica (nombre) 
	VALUES ('Epale');

DELETE FROM Tecnica_Practica;


SELECT * FROM Logica_Aplicada;

DROP TABLE Logica_Aplicada;

INSERT INTO Logica_Aplicada (id_instrumento, id_tecnica_practica) 
	VALUES (1, 1);

DELETE FROM Logica_Aplicada;


SELECT * FROM Aplicacion_Instrumental;

DROP TABLE Aplicacion_Instrumental;

INSERT INTO Aplicacion_Instrumental (id_instrumento, id_sinergia, identificacion) 
	VALUES (1, 1, 'epale todo fino');

DELETE FROM Aplicacion_Instrumental;


SELECT * FROM Escala;

DROP TABLE Escala;

INSERT INTO Escala (nombre) 
	VALUES ('epale todo fino');

DELETE FROM Escala;


SELECT * FROM Parametro;

DROP TABLE Parametro;

INSERT INTO Parametro (nombre,contenido) 
	VALUES ('epale todo fino','todo fino y pro elegante, pro.');

DELETE FROM Parametro;

SELECT * FROM Categoria;

DROP TABLE Categoria;

INSERT INTO Categoria (id_escala, id_parametro, nombre, descripcion, aplicacion_temporal, terminos, nivel_ausencia) 
	VALUES (1, 1, 'epale todo fino', 'si todo fino', 'esta mañana', 'no importa', 'bajo');

DELETE FROM Categoria;


SELECT * FROM Tipo_Item;

DROP TABLE Tipo_Item;

INSERT INTO Tipo_Item (nombre, descripcion) 
	VALUES ('epale todo fino', 'si todo fino');

DELETE FROM Tipo_Item;


SELECT * FROM Indicio;

DROP TABLE Indicio;

INSERT INTO Indicio (contenido) 
	VALUES ('epale todo fino');

DELETE FROM Indicio;


SELECT * FROM Item;

DROP TABLE Item;

INSERT INTO Item (id_sinergia, id_instrumento, id_indicio, id_categoria, id_tipo_item, identificacion, contenido) 
	VALUES (1, 1, 1, 1, 1,'epale todo fino', 'si todo fino');

DELETE FROM Item;