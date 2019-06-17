CREATE TABLE tipo_usuario (
	id_tipo_usuario SERIAL,
	nombre VARCHAR(50) NOT NULL,
	PRIMARY KEY (id_tipo_usuario)
);

DROP TABLE tipo_usuario;

INSERT INTO tipo_usuario (Nombre)
VALUES ('Epale');

SELECT * FROM tipo_usuario;

DELETE FROM tipo_usuario;

CREATE TABLE permiso (
	id_permiso SERIAL,
	nombre VARCHAR(50) NOT NULL,
	PRIMARY KEY (id_permiso)
);

DROP TABLE Permiso;

INSERT INTO Permiso (nombre)
VALUES ('Epale');

SELECT * FROM Permiso;

DELETE FROM Permiso;

CREATE TABLE Rol (
	id_rol SERIAL,
	id_tipo_Usuario INT NOT NULL,
	id_permiso INT NOT NULL,
	
	PRIMARY KEY (id_tipo_usuario,id_permiso),
	
	CONSTRAINT fk_tipo_usuario_rol FOREIGN KEY (id_tipo_Usuario)
	REFERENCES Tipo_Usuario(id_tipo_usuario) MATCH SIMPLE
  	ON UPDATE NO ACTION ON DELETE NO ACTION,
	
	CONSTRAINT fk_permiso_rol FOREIGN KEY (id_permiso)
	REFERENCES Permiso(id_permiso) MATCH SIMPLE
  	ON UPDATE NO ACTION ON DELETE NO ACTION
);

ALTER TABLE Rol
DROP CONSTRAINT fk_permiso_rol;

ALTER TABLE Rol
DROP CONSTRAINT fk_tipo_usuario_rol;

ALTER TABLE ROL ADD CONSTRAINT fk_tipo_usuario_rol FOREIGN KEY (id_tipo_Usuario)
REFERENCES Tipo_Usuario(id_tipo_usuario) MATCH SIMPLE
ON UPDATE NO ACTION ON DELETE NO ACTION,
	
ALTER TABLE ROL ADD CONSTRAINT fk_permiso_rol FOREIGN KEY (id_permiso)
REFERENCES Permiso(id_permiso) MATCH SIMPLE
ON UPDATE NO ACTION ON DELETE NO ACTION

DROP TABLE Rol;

INSERT INTO Rol (Id_Tipo_Usuario, Id_Permiso) VALUES (1, 1);

SELECT * FROM Rol;

DELETE FROM Rol;

CREATE TABLE Usuario (
	id_usuario SERIAL,
	nombres VARCHAR(50) NOT NULL,
	apellidos VARCHAR(50) NOT NULL,
	hash_password VARCHAR(500) NOT NULL,
	correo VARCHAR(50) NOT NULL,
	id_tipo_usuario INT NOT NULL,
	intentos INT,
	
	PRIMARY KEY (id_usuario),
	
	CONSTRAINT correo_usuario CHECK (correo ~* '^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+[.][A-Za-z]+$'),
	CONSTRAINT intentos_seguridad CHECK (intentos <= 3 AND intentos >=0),
	
	CONSTRAINT fK_tipo_usuario_usuario FOREIGN KEY (id_tipo_usuario)
	REFERENCES Tipo_Usuario(id_tipo_usuario) MATCH SIMPLE
  	ON UPDATE NO ACTION ON DELETE NO ACTION
);

SELECT * FROM Usuario;

DROP TABLE Usuario;

INSERT INTO Usuario (nombres, apellidos, hash_password, correo, id_tipo_usuario) VALUES ('epale','epale','epale','epale@hotmail.com', 1, 3);

DELETE FROM Usuario;

ALTER TABLE Usuario
DROP CONSTRAINT fk_tipo_usuario_usuario;

ALTER TABLE Usuario
ADD CONSTRAINT fK_tipo_usuario_usuario FOREIGN KEY (id_tipo_usuario)
REFERENCES Tipo_Usuario(id_tipo_usuario) MATCH SIMPLE
ON UPDATE NO ACTION ON DELETE NO ACTION;

CREATE TABLE Entidad_Institucional (
	id_entidad_institucional SERIAL,
	nombre VARCHAR(50) NOT NULL,
	hash_password VARCHAR(500) NOT NULL,
	correo VARCHAR(50) NOT NULL,
	rif VARCHAR(12) NOT NULL,
	
	PRIMARY KEY (id_entidad_institucional),
	
	CONSTRAINT correo_entidad CHECK (correo ~* '^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+[.][A-Za-z]+$')
);

SELECT * FROM Entidad_Institucional;

DROP TABLE Entidad_Institucional;

INSERT INTO Entidad_Institucional (nombre, hash_password, correo, rif) VALUES ('epale','epale','epale@hotmail.com', 'F-1231241');

DELETE FROM Entidad_Institucional;

CREATE TABLE Registro_Institucional (
	id_registro_institucional SERIAL,
	id_entidad_institucional INT NOT NULL,
	id_usuario INT NOT NULL,
	
	PRIMARY KEY (id_entidad_institucional, id_usuario),
	
	CONSTRAINT fk_entidad_institucional_registro_institucional FOREIGN KEY (id_entidad_institucional) 
	REFERENCES Entidad_Institucional(id_entidad_institucional) MATCH SIMPLE
	ON UPDATE NO ACTION ON DELETE NO ACTION,
	
	CONSTRAINT fk_usuario_registro_institucional FOREIGN KEY (id_usuario) 
	REFERENCES Usuario(id_usuario) MATCH SIMPLE
	ON UPDATE NO ACTION ON DELETE NO ACTION
);

SELECT * FROM Registro_Institucional;

DROP TABLE Registro_Institucional;

INSERT INTO Registro_Institucional (id_entidad_institucional, id_usuario) VALUES (1, 1);

DELETE FROM Registro_Institucional;

ALTER TABLE Registro_Institucional
DROP CONSTRAINT fk_usuario_registro_institucional;

ALTER TABLE Registro_Institucional
ADD CONSTRAINT fK_usuario_registro_institucional FOREIGN KEY (id_usuario)
REFERENCES Usuario(id_usuario) MATCH SIMPLE
ON UPDATE NO ACTION ON DELETE NO ACTION;

ALTER TABLE Registro_Institucional
DROP CONSTRAINT fk_entidad_institucional_registro_institucional;

ALTER TABLE Registro_Institucional
ADD CONSTRAINT fK_entidad_institucional_registro_institucional FOREIGN KEY (id_entidad_institucional)
REFERENCES Entidad_Institucional(id_entidad_institucional) MATCH SIMPLE
ON UPDATE NO ACTION ON DELETE NO ACTION;

CREATE TABLE Problematica (
	id_problematica SERIAL,
	nombre VARCHAR(50) NOT NULL,
	descripcion VARCHAR(50) NOT NULL,
	
	PRIMARY KEY (id_problematica)
);

SELECT * FROM Problematica;

DROP TABLE Problematica;

INSERT INTO Problematica (nombre, descripcion) VALUES ('epale', 'descripcion');

DELETE FROM Problematica;

CREATE TABLE Causa_Sintoma (
	id_causa_sintoma SERIAL,
	nombre VARCHAR(50) NOT NULL,
	descripcion VARCHAR(50) NOT NULL,
	id_problematica INT NOT NULL,
	
	PRIMARY KEY (id_causa_sintoma),
	
	CONSTRAINT fk_causa_sintoma_problematica FOREIGN KEY (id_problematica) 
	REFERENCES Problematica(id_problematica) MATCH SIMPLE
	ON UPDATE NO ACTION ON DELETE NO ACTION
);

SELECT * FROM Causa_Sintoma;

DROP TABLE Causa_Sintoma;

INSERT INTO Causa_Sintoma (nombre, descripcion, id_problematica) VALUES ('epale', 'descripcion', 1);

DELETE FROM Causa_Sintoma;

ALTER TABLE Causa_Sintoma
DROP CONSTRAINT fk_problematica_causa_sintoma;

ALTER TABLE Causa_Sintoma
ADD CONSTRAINT fk_causa_sintoma_problematica FOREIGN KEY (id_problematica) 
REFERENCES Problematica(id_problematica) MATCH SIMPLE
ON UPDATE NO ACTION ON DELETE NO ACTION;

CREATE TABLE Proyecto (
	id_proyecto SERIAL,
	factibilidad INT,
	identificacion VARCHAR(50) NOT NULL,
	id_problematica INT NOT NULL,
	
	PRIMARY KEY (id_proyecto),
	
	CONSTRAINT fk_problematica_proyecto FOREIGN KEY (id_problematica) 
	REFERENCES Problematica(id_problematica) MATCH SIMPLE
	ON UPDATE NO ACTION ON DELETE NO ACTION
);

SELECT * FROM Proyecto;

DROP TABLE Proyecto;

INSERT INTO Proyecto (factibilidad, identificacion, id_problematica) VALUES (0, 'descripcion', 1);

DELETE FROM Proyecto;

ALTER TABLE Proyecto
DROP CONSTRAINT fk_problematica_proyecto;

ALTER TABLE Proyecto
ADD CONSTRAINT fk_problematica_proyecto FOREIGN KEY (id_problematica) 
REFERENCES Problematica(id_problematica) MATCH SIMPLE
ON UPDATE NO ACTION ON DELETE NO ACTION;

CREATE TABLE Usuario_Proyecto (
	id_usuario_proyecto SERIAL,
	id_usuario INT NOT NULL,
	id_proyecto INT NOT NULL,
	
	PRIMARY KEY (id_usuario, id_proyecto),
	
	CONSTRAINT fk_usuario_usuario_proyecto FOREIGN KEY (id_usuario) 
	REFERENCES Usuario(id_usuario) MATCH SIMPLE
	ON UPDATE NO ACTION ON DELETE NO ACTION,
	
	CONSTRAINT fk_proyecto_usuario_proyecto FOREIGN KEY (id_proyecto) 
	REFERENCES Proyecto(id_proyecto) MATCH SIMPLE
	ON UPDATE NO ACTION ON DELETE NO ACTION
);

SELECT * FROM Usuario_Proyecto;

DROP TABLE Usuario_Proyecto;

INSERT INTO Usuario_Proyecto (id_proyecto, id_usuario) VALUES (1, 1);

DELETE FROM Usuario_Proyecto;

ALTER TABLE Usuario_Proyecto
DROP CONSTRAINT fk_usuario_usuario_proyecto;

ALTER TABLE Usuario_Proyecto
ADD CONSTRAINT fk_usuario_usuario_proyecto FOREIGN KEY (id_usuario) 
REFERENCES Usuario(id_usuario) MATCH SIMPLE
ON UPDATE NO ACTION ON DELETE NO ACTION;

ALTER TABLE Usuario_Proyecto
DROP CONSTRAINT fk_proyecto_usuario_proyecto;

ALTER TABLE Usuario_Proyecto
ADD CONSTRAINT fk_proyecto_usuario_proyecto FOREIGN KEY (id_proyecto) 
REFERENCES Proyecto(id_proyecto) MATCH SIMPLE
ON UPDATE NO ACTION ON DELETE NO ACTION;

CREATE TABLE Base_Noologica (
	id_base_noologica SERIAL,
	nombre VARCHAR(100) NOT NULL,
	descripcion VARCHAR(100) NOT NULL,
	
	PRIMARY KEY (id_base_noologica)
);

SELECT * FROM Base_Noologica;

DROP TABLE Base_Noologica;

INSERT INTO Base_Noologica (nombre, descripcion) VALUES ('Pedro', 'Epale todo fino?');

DELETE FROM Base_Noologica;

CREATE TABLE Tipo_Fuente (
	id_tipo_fuente SERIAL,
	nombre VARCHAR(100) NOT NULL,
	
	PRIMARY KEY (id_tipo_fuente)
);

SELECT * FROM Tipo_Fuente;

DROP TABLE Tipo_Fuente;

INSERT INTO Tipo_Fuente (nombre) VALUES ('Pedro');

DELETE FROM Tipo_Fuente;

CREATE TABLE Unidad_Informacion (
	id_unidad_informacion SERIAL,
	id_tipo_fuente INT NOT NULL,
	id_base_noologica INT NOT NULL,
	id_proyecto INT NOT NULL,
	titulo VARCHAR(100) NOT NULL,
	fecha DATE,
	autor VARCHAR(100) NOT NULL,
	
	
	PRIMARY KEY (id_unidad_informacion),
	
	CONSTRAINT fk_tipo_fuente_unidad_informacion FOREIGN KEY (id_tipo_fuente) 
	REFERENCES Tipo_Fuente(id_tipo_fuente) MATCH SIMPLE
	ON UPDATE NO ACTION ON DELETE NO ACTION,
	
	CONSTRAINT fk_base_noologica_unidad_informacion FOREIGN KEY (id_base_noologica) 
	REFERENCES Base_Noologica(id_base_noologica) MATCH SIMPLE
	ON UPDATE NO ACTION ON DELETE NO ACTION,
	
	CONSTRAINT fk_proyecto_unidad_informacion FOREIGN KEY (id_proyecto) 
	REFERENCES Proyecto(id_proyecto) MATCH SIMPLE
	ON UPDATE NO ACTION ON DELETE NO ACTION
);

SELECT * FROM Unidad_Informacion;

DROP TABLE Unidad_Informacion;

INSERT INTO Unidad_Informacion (id_tipo_fuente, id_base_noologica, id_proyecto, autor, fecha, titulo) VALUES (1, 1, 1, 'Pedro', NULL, 'Epale todo fino?');

DELETE FROM Unidad_Informacion;

ALTER TABLE Unidad_Informacion
DROP CONSTRAINT fk_tipo_fuente_unidad_informacion;

ALTER TABLE Unidad_Informacion
ADD CONSTRAINT fk_tipo_fuente_unidad_informacion FOREIGN KEY (id_tipo_fuente) 
REFERENCES Tipo_Fuente(id_tipo_fuente) MATCH SIMPLE
ON UPDATE NO ACTION ON DELETE NO ACTION;

ALTER TABLE Unidad_Informacion
DROP CONSTRAINT fk_base_noologica_unidad_informacion;

ALTER TABLE Unidad_Informacion
ADD CONSTRAINT fk_base_noologica_unidad_informacion FOREIGN KEY (id_base_noologica) 
REFERENCES Base_Noologica(id_base_noologica) MATCH SIMPLE
ON UPDATE NO ACTION ON DELETE NO ACTION;

ALTER TABLE Unidad_Informacion
DROP CONSTRAINT fk_proyecto_unidad_informacion;

ALTER TABLE Unidad_Informacion
ADD CONSTRAINT fk_proyecto_unidad_informacion FOREIGN KEY (id_proyecto) 
REFERENCES Proyecto(id_proyecto) MATCH SIMPLE
ON UPDATE NO ACTION ON DELETE NO ACTION;

CREATE TABLE Entidad_Uso (
	id_entidad_uso SERIAL,
	nombre VARCHAR(100) NOT NULL,
	
	PRIMARY KEY (id_entidad_uso)
);

SELECT * FROM Entidad_Uso;

DROP TABLE Entidad_Uso;

INSERT INTO Entidad_Uso (nombre) VALUES ('Pedro');

DELETE FROM Entidad_Uso;

CREATE TABLE Direccion_Uso (
	id_direccion_uso SERIAL,
	id_entidad_uso INT NOT NULL,
	nombre VARCHAR(50) NOT NULL,
	
	
	PRIMARY KEY (id_direccion_uso),
	
	CONSTRAINT fk_entidad_uso_direccion_uso FOREIGN KEY (id_entidad_uso) 
	REFERENCES Entidad_Uso(id_entidad_uso) MATCH SIMPLE
	ON UPDATE NO ACTION ON DELETE NO ACTION
);

SELECT * FROM Direccion_Uso;

DROP TABLE Direccion_Uso;

INSERT INTO Direccion_Uso (id_entidad_uso, nombre) VALUES (1, 'Fuente de tiro');

DELETE FROM Direccion_Uso;

ALTER TABLE Direccion_Uso
DROP CONSTRAINT fk_entidad_uso_direccion_uso;

ALTER TABLE Direccion_Uso
ADD CONSTRAINT fk_entidad_uso_direccion_uso FOREIGN KEY (id_entidad_uso) 
REFERENCES Entidad_Uso(id_entidad_uso) MATCH SIMPLE
ON UPDATE NO ACTION ON DELETE NO ACTION;

CREATE TABLE Titulo (
	id_titulo SERIAL,
	nombre VARCHAR(100) NOT NULL,
	
	
	PRIMARY KEY (id_titulo)
);

SELECT * FROM Titulo;

DROP TABLE Titulo;

INSERT INTO Titulo (nombre) VALUES ('Pedro hizo esto');

DELETE FROM Titulo;

CREATE TABLE Sub_Titulo (
	id_sub_titulo SERIAL,
	id_titulo INT NOT NULL,
	nombre VARCHAR(100) NOT NULL,
	
	PRIMARY KEY (id_sub_titulo),
	
	CONSTRAINT fk_titulo_sub_titulo FOREIGN KEY (id_titulo) 
	REFERENCES Titulo(id_titulo) MATCH SIMPLE
	ON UPDATE NO ACTION ON DELETE NO ACTION
);

SELECT * FROM Sub_Titulo;

DROP TABLE Sub_Titulo;

INSERT INTO Sub_Titulo (id_titulo, nombre) VALUES (1, 'Epale todo fino?');

DELETE FROM Sub_Titulo;

ALTER TABLE Sub_Titulo
DROP CONSTRAINT fk_titulo_sub_titulo;

ALTER TABLE Sub_Titulo
ADD CONSTRAINT fk_titulo_sub_titulo FOREIGN KEY (id_titulo) 
REFERENCES Titulo(id_titulo) MATCH SIMPLE
ON UPDATE NO ACTION ON DELETE NO ACTION;

CREATE TABLE Cita (
	id_cita SERIAL,
	id_direccion_uso INT NOT NULL,
	id_unidad_informacion INT NOT NULL,
	id_sub_titulo INT NOT NULL,
	cita VARCHAR(100) NOT NULL,
	delimitacion VARCHAR(100) NOT NULL,
	
	
	PRIMARY KEY (id_cita),
	
	CONSTRAINT fk_direccion_uso_cita FOREIGN KEY (id_direccion_uso) 
	REFERENCES Direccion_Uso(id_direccion_uso) MATCH SIMPLE
	ON UPDATE NO ACTION ON DELETE NO ACTION,
	
	CONSTRAINT fk_unidad_informacion_cita FOREIGN KEY (id_unidad_informacion) 
	REFERENCES Unidad_Informacion(id_unidad_informacion) MATCH SIMPLE
	ON UPDATE NO ACTION ON DELETE NO ACTION,
	
	CONSTRAINT fk_sub_titulo_cita FOREIGN KEY (id_sub_titulo) 
	REFERENCES Sub_Titulo(id_sub_titulo) MATCH SIMPLE
	ON UPDATE NO ACTION ON DELETE NO ACTION
);

SELECT * FROM Cita;

DROP TABLE Cita;

INSERT INTO Cita (id_sub_titulo,id_direccion_uso, id_unidad_informacion, cita, delimitacion) VALUES (1, 1, 1, 'Pedro hizo esto','Epale todo fino?');

DELETE FROM Cita;

ALTER TABLE Cita
DROP CONSTRAINT fk_direccion_uso_cita;

ALTER TABLE Cita
ADD CONSTRAINT fk_direccion_uso_cita FOREIGN KEY (id_direccion_uso) 
REFERENCES Direccion_Uso(id_direccion_uso) MATCH SIMPLE
ON UPDATE NO ACTION ON DELETE NO ACTION;

ALTER TABLE Cita
DROP CONSTRAINT fk_unidad_informacion_cita;

ALTER TABLE Cita
ADD CONSTRAINT fk_unidad_informacion_cita FOREIGN KEY (id_unidad_informacion) 
REFERENCES Unidad_Informacion(id_unidad_informacion) MATCH SIMPLE
ON UPDATE NO ACTION ON DELETE NO ACTION;

ALTER TABLE Cita
DROP CONSTRAINT fk_sub_titulo_cita;

ALTER TABLE Cita
ADD CONSTRAINT fk_sub_titulo_cita FOREIGN KEY (id_sub_titulo) 
REFERENCES Sub_Titulo(id_sub_titulo) MATCH SIMPLE
ON UPDATE NO ACTION ON DELETE NO ACTION;

CREATE TABLE Alcance (
	id_alcance SERIAL,
	id_proyecto INT NOT NULL,
	contenido VARCHAR(100) NOT NULL,
	
	PRIMARY KEY (id_alcance),
	
	CONSTRAINT fk_proyecto_alcance FOREIGN KEY (id_proyecto) 
	REFERENCES Proyecto(id_proyecto) MATCH SIMPLE
	ON UPDATE NO ACTION ON DELETE NO ACTION
);

SELECT * FROM Alcance;

DROP TABLE Alcance;

INSERT INTO Alcance (id_proyecto, contenido) VALUES (1,'Epale todo fino?');

DELETE FROM Alcance;

ALTER TABLE Alcance
DROP CONSTRAINT fk_proyecto_alcance;

ALTER TABLE Alcance
ADD CONSTRAINT fk_proyecto_alcance FOREIGN KEY (id_proyecto) 
REFERENCES Proyecto(id_proyecto) MATCH SIMPLE
ON UPDATE NO ACTION ON DELETE NO ACTION;

CREATE TABLE Area_Restriccion (
	id_area_restriccion SERIAL,
	area VARCHAR(50) NOT NULL,
	
	PRIMARY KEY (id_area_restriccion)
);

SELECT * FROM Area_Restriccion;

DROP TABLE Area_Restriccion;

INSERT INTO Area_Restriccion (area) VALUES ('recursos');

DELETE FROM Area_Restriccion;

CREATE TABLE Restriccion(
	id_restriccion SERIAL,
	id_proyecto INT NOT NULL,
	id_area_restriccion INT NOT NULL,
	contenido VARCHAR(500) NOT NULL,
	
	PRIMARY KEY (id_restriccion),
	
	CONSTRAINT fk_area_restriccion_restriccion FOREIGN KEY (id_area_restriccion) 
	REFERENCES Area_Restriccion(id_area_restriccion) MATCH SIMPLE
	ON UPDATE NO ACTION ON DELETE NO ACTION,
	
	CONSTRAINT fk_proyecto_restriccion FOREIGN KEY (id_proyecto) 
	REFERENCES Proyecto(id_proyecto) MATCH SIMPLE
	ON UPDATE NO ACTION ON DELETE NO ACTION
);

SELECT * FROM Restriccion;

DROP TABLE Restriccion;

INSERT INTO Restriccion (id_proyecto, id_area_restriccion, contenido) VALUES (1,1,'Epale todo fino?');

DELETE FROM Restriccion;

ALTER TABLE Restriccion
DROP CONSTRAINT fk_area_restriccion_restriccion;

ALTER TABLE Restriccion
ADD CONSTRAINT fk_area_restriccion_restriccion FOREIGN KEY (id_area_restriccion) 
REFERENCES Area_Restriccion(id_area_restriccion) MATCH SIMPLE
ON UPDATE NO ACTION ON DELETE NO ACTION;

ALTER TABLE Restriccion
DROP CONSTRAINT fk_proyecto_restriccion;

ALTER TABLE Restriccion
ADD CONSTRAINT fk_proyecto_restriccion FOREIGN KEY (id_proyecto) 
REFERENCES Proyecto(id_proyecto) MATCH SIMPLE
ON UPDATE NO ACTION ON DELETE NO ACTION;

CREATE TABLE Tipo_Argumentacion (
	id_tipo_argumentacion SERIAL,
	nombre VARCHAR(50) NOT NULL,
	descripcion VARCHAR(500) NOT NULL,
	
	PRIMARY KEY (id_tipo_argumentacion)
);

SELECT * FROM Tipo_Argumentacion;

DROP TABLE Tipo_Argumentacion;

INSERT INTO Tipo_Argumentacion (nombre, descripcion) VALUES ('Bueno', 'Todo bien y pro');

DELETE FROM Tipo_Argumentacion;

CREATE TABLE Justificacion(
	id_justificacion SERIAL,
	id_proyecto INT NOT NULL,
	id_tipo_argumentacion INT NOT NULL,
	contenido VARCHAR(500) NOT NULL,
	
	PRIMARY KEY (id_justificacion),
	
	CONSTRAINT fk_proyecto_justificacion FOREIGN KEY (id_proyecto) 
	REFERENCES Proyecto(id_proyecto) MATCH SIMPLE
	ON UPDATE NO ACTION ON DELETE NO ACTION,
	
	CONSTRAINT fk_tipo_argumentacion_justificacion FOREIGN KEY (id_tipo_argumentacion) 
	REFERENCES Tipo_Argumentacion(id_tipo_argumentacion) MATCH SIMPLE
	ON UPDATE NO ACTION ON DELETE NO ACTION
);

SELECT * FROM Justificacion;

DROP TABLE Justificacion;

INSERT INTO Justificacion (id_proyecto, id_tipo_argumentacion, contenido) VALUES (1,1,'Epale todo fino?');

DELETE FROM Justificacion;

ALTER TABLE Justificacion
DROP CONSTRAINT fk_proyecto_justificacion;

ALTER TABLE Justificacion
ADD CONSTRAINT fk_proyecto_justificacion FOREIGN KEY (id_proyecto) 
REFERENCES Proyecto(id_proyecto) MATCH SIMPLE
ON UPDATE NO ACTION ON DELETE NO ACTION;

ALTER TABLE Justificacion
DROP CONSTRAINT fk_tipo_argumentacion_justificacion;

ALTER TABLE Justificacion
ADD CONSTRAINT fk_tipo_argumentacion_justificacion FOREIGN KEY (id_tipo_argumentacion) 
REFERENCES Tipo_Argumentacion(id_tipo_argumentacion) MATCH SIMPLE
ON UPDATE NO ACTION ON DELETE NO ACTION;

CREATE TABLE Contexto(
	id_contexto SERIAL,
	concepcion VARCHAR(100) NOT NULL,
	poblacion VARCHAR(100) NOT NULL,
	descripcion VARCHAR(500) NOT NULL,
	
	PRIMARY KEY (id_contexto)
);

SELECT * FROM Contexto;

DROP TABLE Contexto;

INSERT INTO Contexto (concepcion, poblacion, descripcion) VALUES ('epale','todo fino','Epale todo fino?');

DELETE FROM Contexto;

CREATE TABLE Temporalidad(
	id_temporalidad SERIAL,
	id_contexto INT NOT NULL,
	descripcion VARCHAR(500) NOT NULL,
	
	PRIMARY KEY (id_temporalidad),
	
	CONSTRAINT fk_contexto_temporalidad FOREIGN KEY (id_contexto) 
	REFERENCES Contexto(id_contexto) MATCH SIMPLE
	ON UPDATE NO ACTION ON DELETE NO ACTION
);

SELECT * FROM Temporalidad;

DROP TABLE Temporalidad;

INSERT INTO Temporalidad (id_contexto, descripcion) VALUES (1,'Epale todo fino?');

DELETE FROM Temporalidad;

ALTER TABLE Temporalidad
DROP CONSTRAINT fk_contexto_temporalidad;

ALTER TABLE Temporalidad
ADD CONSTRAINT fk_contexto_temporalidad FOREIGN KEY (id_contexto) 
REFERENCES Contexto(id_contexto) MATCH SIMPLE
ON UPDATE NO ACTION ON DELETE NO ACTION;

CREATE TABLE Estandar(
	id_estandar SERIAL,
	nombre VARCHAR(500) NOT NULL,
	
	PRIMARY KEY (id_estandar)
);

SELECT * FROM Estandar;

DROP TABLE Estandar;

INSERT INTO Estandar (nombre) VALUES ('epale');

DELETE FROM Estandar;

CREATE TABLE Investigacion(
	id_investigacion SERIAL,
	id_proyecto INT NOT NULL,
	id_contexto INT NOT NULL,
	id_estandar INT NOT NULL,
	calidad INT,
	pregunta_investigacion VARCHAR(500) NOT NULL,
	objetivo_general VARCHAR(100) NOT NULL,
	
	PRIMARY KEY (id_investigacion),
	
	CONSTRAINT fk_proyecto_investigacion FOREIGN KEY (id_proyecto) 
	REFERENCES Proyecto(id_proyecto) MATCH SIMPLE
	ON UPDATE NO ACTION ON DELETE NO ACTION,
	
	CONSTRAINT fk_contexto_investigacion FOREIGN KEY (id_contexto) 
	REFERENCES Contexto(id_contexto) MATCH SIMPLE
	ON UPDATE NO ACTION ON DELETE NO ACTION,
	
	CONSTRAINT fk_estandar_investigacion FOREIGN KEY (id_estandar) 
	REFERENCES Estandar(id_estandar) MATCH SIMPLE
	ON UPDATE NO ACTION ON DELETE NO ACTION
);

SELECT * FROM Investigacion;

DROP TABLE Investigacion;

INSERT INTO Investigacion (id_contexto, id_proyecto, id_estandar, calidad, pregunta_investigacion, objetivo_general) VALUES (1,1,1,NULL,'Epale todo fino?', 'epale fino');

DELETE FROM Investigacion;

ALTER TABLE Investigacion
DROP CONSTRAINT fk_proyecto_investigacion;

ALTER TABLE Investigacion
ADD CONSTRAINT fk_proyecto_investigacion FOREIGN KEY (id_proyecto) 
REFERENCES Proyecto(id_proyecto) MATCH SIMPLE
ON UPDATE NO ACTION ON DELETE NO ACTION;

ALTER TABLE Investigacion
DROP CONSTRAINT fk_contexto_investigacion;

ALTER TABLE Investigacion
ADD CONSTRAINT fk_contexto_investigacionn FOREIGN KEY (id_contexto) 
REFERENCES Contexto(id_contexto) MATCH SIMPLE
ON UPDATE NO ACTION ON DELETE NO ACTION;

ALTER TABLE Investigacion
DROP CONSTRAINT fk_estandar_investigacion;

ALTER TABLE Investigacion
ADD CONSTRAINT fk_estandar_investigacion FOREIGN KEY (id_estandar) 
REFERENCES Estandar(id_estandar) MATCH SIMPLE
ON UPDATE NO ACTION ON DELETE NO ACTION;

CREATE TABLE Nivel_Investigacion(
	id_nivel_investigacion SERIAL,
	nombre VARCHAR(100) NOT NULL,
	descripcion VARCHAR(500) NOT NULL,
	
	PRIMARY KEY (id_nivel_investigacion)
);

SELECT * FROM Nivel_Investigacion;

DROP TABLE Nivel_Investigacion;

INSERT INTO Nivel_Investigacion (nombre, descripcion) VALUES ('Epale todo fino?', 'epale fino');

DELETE FROM Nivel_Investigacion;

CREATE TABLE Tipo_Investigacion(
	id_tipo_investigacion SERIAL,
	id_nivel_investigacion INT NOT NULL,
	nombre VARCHAR(100) NOT NULL,
	
	PRIMARY KEY (id_tipo_investigacion),
	
	CONSTRAINT fk_nivel_investigacion_tipo_investigacion FOREIGN KEY (id_nivel_investigacion) 
	REFERENCES Nivel_Investigacion(id_nivel_investigacion) MATCH SIMPLE
	ON UPDATE NO ACTION ON DELETE NO ACTION
);

SELECT * FROM Tipo_Investigacion;

DROP TABLE Tipo_Investigacion;

INSERT INTO Tipo_Investigacion (id_nivel_investigacion, nombre) VALUES (1, 'Exploratoria');

DELETE FROM Tipo_Investigacion;

ALTER TABLE Tipo_Investigacion
DROP CONSTRAINT fk_nivel_investigacion_tipo_investigacion;

ALTER TABLE Tipo_Investigacion
ADD CONSTRAINT fk_nivel_investigacion_tipo_investigacion FOREIGN KEY (id_nivel_investigacion) 
REFERENCES Nivel_Investigacion(id_nivel_investigacion) MATCH SIMPLE
ON UPDATE NO ACTION ON DELETE NO ACTION;

CREATE TABLE Verbo_Aplicado(
	id_verbo_aplicado SERIAL,
	verbo VARCHAR(20) NOT NULL,
	
	PRIMARY KEY (id_verbo_aplicado)
);

SELECT * FROM Verbo_Aplicado;

DROP TABLE Verbo_Aplicado;

INSERT INTO Verbo_Aplicado (verbo) VALUES ('Diseñar');

DELETE FROM Verbo_Aplicado;

CREATE TABLE Conjunto_Verbo(
	id_conjunto_verbo SERIAL,
	id_tipo_investigacion INT NOT NULL,
	id_verbo_aplicado INT NOT NULL,
	
	PRIMARY KEY (id_tipo_investigacion, id_verbo_aplicado),
	
	CONSTRAINT fk_tipo_investigacion_conjunto_verbo FOREIGN KEY (id_tipo_investigacion) 
	REFERENCES Tipo_Investigacion(id_tipo_investigacion) MATCH SIMPLE
	ON UPDATE NO ACTION ON DELETE NO ACTION,
	
	CONSTRAINT fk_verbo_aplicado_conjunto_verbo FOREIGN KEY (id_verbo_aplicado) 
	REFERENCES Verbo_Aplicado(id_verbo_aplicado) MATCH SIMPLE
	ON UPDATE NO ACTION ON DELETE NO ACTION
);

SELECT * FROM Conjunto_Verbo;

DROP TABLE Conjunto_Verbo;

INSERT INTO Conjunto_Verbo (id_tipo_investigacion, id_verbo_aplicado) VALUES (1,1);

DELETE FROM Conjunto_Verbo;

ALTER TABLE Conjunto_Verbo
DROP CONSTRAINT fk_tipo_investigacion_conjunto_verbo;

ALTER TABLE Conjunto_Verbo
ADD CONSTRAINT fk_tipo_investigacion_conjunto_verbo FOREIGN KEY (id_tipo_investigacion) 
REFERENCES Tipo_Investigacion(id_tipo_investigacion) MATCH SIMPLE
ON UPDATE NO ACTION ON DELETE NO ACTION;

ALTER TABLE Conjunto_Verbo
DROP CONSTRAINT fk_verbo_aplicado_conjunto_verbo;

ALTER TABLE Conjunto_Verbo
ADD CONSTRAINT fk_verbo_aplicado_conjunto_verbo FOREIGN KEY (id_verbo_aplicado) 
REFERENCES Verbo_Aplicado(id_verbo_aplicado) MATCH SIMPLE
ON UPDATE NO ACTION ON DELETE NO ACTION;

CREATE TABLE Pregunta_Modular(
	id_pregunta_modular SERIAL,
	id_tipo_investigacion INT NOT NULL,
	contenido VARCHAR(500) NOT NULL,
	
	PRIMARY KEY (id_pregunta_modular),
	
	CONSTRAINT fk_tipo_investigacion_pregunta_modular FOREIGN KEY (id_tipo_investigacion) 
	REFERENCES Tipo_Investigacion(id_tipo_investigacion) MATCH SIMPLE
	ON UPDATE NO ACTION ON DELETE NO ACTION
);

SELECT * FROM Pregunta_Modular;

DROP TABLE Pregunta_Modular;

INSERT INTO Pregunta_Modular (id_tipo_investigacion, contenido) VALUES (1, 'que es eso?');

DELETE FROM Pregunta_Modular;

ALTER TABLE Pregunta_Modular
DROP CONSTRAINT fk_tipo_investigacion_pregunta_modular;

ALTER TABLE Pregunta_Modular
ADD CONSTRAINT fk_tipo_investigacion_pregunta_modular FOREIGN KEY (id_tipo_investigacion) 
REFERENCES Tipo_Investigacion(id_tipo_investigacion) MATCH SIMPLE
ON UPDATE NO ACTION ON DELETE NO ACTION;

CREATE TABLE Esquema_Formulado(
	id_esquema_formulado SERIAL,
	id_pregunta_modular INT NOT NULL,
	id_investigacion INT NOT NULL,
	interrogante VARCHAR(100) NOT NULL,
	
	PRIMARY KEY (id_pregunta_modular, id_investigacion),
	
	CONSTRAINT fk_pregunta_modular_esquema_formulado FOREIGN KEY (id_pregunta_modular) 
	REFERENCES Pregunta_Modular(id_pregunta_modular) MATCH SIMPLE
	ON UPDATE NO ACTION ON DELETE NO ACTION,
	
	CONSTRAINT fk_investigacion_esquema_formulado FOREIGN KEY (id_investigacion) 
	REFERENCES Investigacion(id_investigacion) MATCH SIMPLE
	ON UPDATE NO ACTION ON DELETE NO ACTION
);

SELECT * FROM Esquema_Formulado;

DROP TABLE Esquema_Formulado;

INSERT INTO Esquema_Formulado (id_pregunta_modular, id_investigacion, interrogante) VALUES (1,1, 'que es eso vale?');

DELETE FROM Esquema_Formulado;

ALTER TABLE Esquema_Formulado
DROP CONSTRAINT fk_pregunta_modular_Esquema_Formulado;

ALTER TABLE Esquema_Formulado
ADD CONSTRAINT fk_pregunta_modular_esquema_formulado FOREIGN KEY (id_pregunta_modular) 
REFERENCES Pregunta_Modular(id_pregunta_modular) MATCH SIMPLE
ON UPDATE NO ACTION ON DELETE NO ACTION;

ALTER TABLE Esquema_Formulado
DROP CONSTRAINT fk_investigacion_Esquema_Formulado;

ALTER TABLE Esquema_Formulado
ADD CONSTRAINT fk_investigacion_esquema_formulado FOREIGN KEY (id_investigacion) 
REFERENCES Investigacion(id_investigacion) MATCH SIMPLE
ON UPDATE NO ACTION ON DELETE NO ACTION;

CREATE TABLE Modalidad(
	id_modalidad SERIAL,
	id_tipo_investigacion INT NOT NULL,
	nombre VARCHAR(100) NOT NULL,
	
	PRIMARY KEY (id_modalidad),
	
	CONSTRAINT fk_tipo_investigacion_modalidad FOREIGN KEY (id_tipo_investigacion) 
	REFERENCES Tipo_Investigacion(id_tipo_investigacion) MATCH SIMPLE
	ON UPDATE NO ACTION ON DELETE NO ACTION
);

SELECT * FROM Modalidad;

DROP TABLE Modalidad;

INSERT INTO Modalidad (id_tipo_investigacion, nombre) VALUES (1, 'modalidad 1');

DELETE FROM Modalidad;

ALTER TABLE Modalidad
DROP CONSTRAINT fk_tipo_investigacion_modalidad;

ALTER TABLE Modalidad
ADD CONSTRAINT fk_tipo_investigacion_modalidad FOREIGN KEY (id_tipo_investigacion) 
REFERENCES Tipo_Investigacion(id_tipo_investigacion) MATCH SIMPLE
ON UPDATE NO ACTION ON DELETE NO ACTION;

CREATE TABLE Obligatoriedad(
	id_obligatoriedad SERIAL,
	cualitatividad VARCHAR(100) NOT NULL,
	
	PRIMARY KEY (id_obligatoriedad)
);

SELECT * FROM Obligatoriedad;

DROP TABLE Obligatoriedad;

INSERT INTO Obligatoriedad (cualitatividad) VALUES ('Obligatorio');

DELETE FROM Obligatoriedad;

CREATE TABLE Tipo_Estadio_Estructural(
	id_tipo_estadio_estructural SERIAL,
	nombre VARCHAR(100) NOT NULL,
	
	PRIMARY KEY (id_tipo_estadio_estructural)
);

SELECT * FROM Tipo_Estadio_Estructural;

DROP TABLE Tipo_Estadio_Estructural;

INSERT INTO Tipo_Estadio_Estructural (nombre) VALUES ('Exploratorio');

DELETE FROM Tipo_Estadio_Estructural;

CREATE TABLE Estadio_Estructural(
	id_estadio_estructural SERIAL,
	id_modalidad INT NOT NULL,
	id_tipo_estadio_estructural INT NOT NULL,
	id_obligatoriedad INT NOT NULL,
	descripcion VARCHAR(500) NOT NULL,
	posicion INT NOT NULL,
	
	PRIMARY KEY (id_estadio_estructural),
	
	CONSTRAINT fk_modalidad_estadio_estructural FOREIGN KEY (id_modalidad) 
	REFERENCES Modalidad(id_modalidad) MATCH SIMPLE
	ON UPDATE NO ACTION ON DELETE NO ACTION,
	
	CONSTRAINT fk_tipo_estadio_estadio_estructural FOREIGN KEY (id_tipo_estadio_estructural) 
	REFERENCES Tipo_Estadio_Estructural(id_tipo_estadio_estructural) MATCH SIMPLE
	ON UPDATE NO ACTION ON DELETE NO ACTION,
	
	CONSTRAINT fk_obligatoriedad_estadio_estructural FOREIGN KEY (id_obligatoriedad) 
	REFERENCES Obligatoriedad(id_obligatoriedad) MATCH SIMPLE
	ON UPDATE NO ACTION ON DELETE NO ACTION
);

SELECT * FROM Estadio_Estructural;

DROP TABLE Estadio_Estructural;

INSERT INTO Estadio_Estructural (id_modalidad, id_tipo_estadio_estructural, id_obligatoriedad, descripcion, posicion) VALUES (1, 1, 1, 'modalidad 1 es pro', 1);

DELETE FROM Estadio_Estructural;

ALTER TABLE Estadio_Estructural
DROP CONSTRAINT fk_modalidad_estadio_estructural;

ALTER TABLE Estadio_Estructural
ADD CONSTRAINT fk_modalidad_estadio_estructural FOREIGN KEY (id_modalidad) 
REFERENCES Modalidad(id_modalidad) MATCH SIMPLE
ON UPDATE NO ACTION ON DELETE NO ACTION;

ALTER TABLE Estadio_Estructural
DROP CONSTRAINT fk_tipo_estadio_estadio_estructural;

ALTER TABLE Estadio_Estructural
ADD CONSTRAINT fk_tipo_estadio_estadio_estructural FOREIGN KEY (id_tipo_estadio_estructural) 
REFERENCES Tipo_Estadio_Estructural(id_tipo_estadio_estructural) MATCH SIMPLE
ON UPDATE NO ACTION ON DELETE NO ACTION;

ALTER TABLE Estadio_Estructural
DROP CONSTRAINT fk_obligatoriedad_estadio_estructural;

ALTER TABLE Estadio_Estructural
ADD CONSTRAINT fk_obligatoriedad_estadio_estructural FOREIGN KEY (id_obligatoriedad) 
REFERENCES Obligatoriedad(id_obligatoriedad) MATCH SIMPLE
ON UPDATE NO ACTION ON DELETE NO ACTION;

CREATE TABLE Objetivo_Especifico(
	id_objetivo_especifico SERIAL,
	id_estadio_estructural INT NOT NULL,
	tipo_objetivo VARCHAR(100) NOT NULL,
	correspondencia BOOL NOT NULL,
	
	PRIMARY KEY (id_objetivo_especifico),
	
	CONSTRAINT fk_estadio_estructural_objetivo_especifico FOREIGN KEY (id_estadio_estructural) 
	REFERENCES Estadio_Estructural(id_estadio_estructural) MATCH SIMPLE
	ON UPDATE NO ACTION ON DELETE NO ACTION
);

SELECT * FROM Objetivo_Especifico;

DROP TABLE Objetivo_Especifico;

INSERT INTO Objetivo_Especifico (id_estadio_estructural, tipo_objetivo, correspondencia) VALUES (1,'describir el evento a explorar', TRUE);

DELETE FROM Objetivo_Especifico;

ALTER TABLE Objetivo_Especifico
DROP CONSTRAINT fk_estadio_estructural_objetivo_especifico;

ALTER TABLE Objetivo_Especifico
ADD CONSTRAINT fk_estadio_estructural_objetivo_especifico FOREIGN KEY (id_estadio_estructural) 
REFERENCES Estadio_Estructural(id_estadio_estructural) MATCH SIMPLE
ON UPDATE NO ACTION ON DELETE NO ACTION;

CREATE TABLE Clase_Evento_Estructural(
	id_clase_evento_estructural SERIAL,
	nombre VARCHAR(100) NOT NULL,
	
	PRIMARY KEY (id_clase_evento_estructural)
);

SELECT * FROM Clase_Evento_Estructural;

DROP TABLE Clase_Evento_Estructural;

INSERT INTO Clase_Evento_Estructural (nombre) VALUES ('evento a describir');

DELETE FROM Clase_Evento_Estructural;

CREATE TABLE Tipo_Evento_Estructural(
	id_tipo_evento_estructural SERIAL,
	nombre VARCHAR(100) NOT NULL,
	
	PRIMARY KEY (id_tipo_evento_estructural)
);

SELECT * FROM Tipo_Evento_Estructural;

DROP TABLE Tipo_Evento_Estructural;

INSERT INTO Tipo_Evento_Estructural (nombre) VALUES ('Proceso');

DELETE FROM Tipo_Evento_Estructural;

CREATE TABLE Estructura_Evento(
	id_estructura_evento SERIAL,
	id_estadio_estructural INT NOT NULL,
	id_clase_evento_estructural INT NOT NULL,
	
	PRIMARY KEY (id_estadio_estructural, id_clase_evento_estructural),
	
	CONSTRAINT fk_clase_evento_estructural_estructura_evento FOREIGN KEY (id_clase_evento_estructural) 
	REFERENCES Clase_Evento_Estructural(id_clase_evento_estructural) MATCH SIMPLE
	ON UPDATE NO ACTION ON DELETE NO ACTION,
	
	CONSTRAINT fk_estadio_estructural_estructura_evento FOREIGN KEY (id_estadio_estructural) 
	REFERENCES Estadio_Estructural(id_estadio_estructural) MATCH SIMPLE
	ON UPDATE NO ACTION ON DELETE NO ACTION
);

SELECT * FROM Estructura_Evento;

DROP TABLE Estructura_Evento;

INSERT INTO Estructura_Evento (id_estadio_estructural, id_clase_evento_estructural) VALUES (1,1);

DELETE FROM Estructura_Evento;

ALTER TABLE Estructura_Evento
DROP CONSTRAINT fk_estadio_estructural_estructura_evento;

ALTER TABLE Estructura_Evento
ADD CONSTRAINT fk_estadio_estructural_estructura_evento FOREIGN KEY (id_estadio_estructural) 
REFERENCES Estadio_Estructural(id_estadio_estructural) MATCH SIMPLE
ON UPDATE NO ACTION ON DELETE NO ACTION;

ALTER TABLE Estructura_Evento
DROP CONSTRAINT fk_clase_evento_estructural_estructura_evento;

ALTER TABLE Estructura_Evento
ADD CONSTRAINT fk_clase_evento_estructural_estructura_evento FOREIGN KEY (id_clase_evento_estructural) 
REFERENCES Clase_Evento_Estructural(id_clase_evento_estructural) MATCH SIMPLE
ON UPDATE NO ACTION ON DELETE NO ACTION;

CREATE TABLE Estructura_Tipo_Evento(
	id_estructura_tipo_evento SERIAL,
	id_estadio_estructural INT NOT NULL,
	id_tipo_evento_estructural INT NOT NULL,
	
	PRIMARY KEY (id_estadio_estructural, id_tipo_evento_estructural),
	
	CONSTRAINT fk_tipo_evento_estructural_estructura_tipo_evento FOREIGN KEY (id_tipo_evento_estructural) 
	REFERENCES Tipo_Evento_Estructural(id_tipo_evento_estructural) MATCH SIMPLE
	ON UPDATE NO ACTION ON DELETE NO ACTION,
	
	CONSTRAINT fk_estadio_estructural_estructura_tipo_evento FOREIGN KEY (id_estadio_estructural) 
	REFERENCES Estadio_Estructural(id_estadio_estructural) MATCH SIMPLE
	ON UPDATE NO ACTION ON DELETE NO ACTION
);

SELECT * FROM Estructura_Tipo_Evento;

DROP TABLE Estructura_Tipo_Evento;

INSERT INTO Estructura_Tipo_Evento (id_estadio_estructural, id_tipo_evento_estructural) VALUES (1,1);

DELETE FROM Estructura_Tipo_Evento;

ALTER TABLE Estructura_Tipo_Evento
DROP CONSTRAINT fk_estadio_estructural_estructura_tipo_evento;

ALTER TABLE Estructura_Tipo_Evento
ADD CONSTRAINT fk_estadio_estructural_estructura_tipo_evento FOREIGN KEY (id_estadio_estructural) 
REFERENCES Estadio_Estructural(id_estadio_estructural) MATCH SIMPLE
ON UPDATE NO ACTION ON DELETE NO ACTION;

ALTER TABLE Estructura_Tipo_Evento
DROP CONSTRAINT fk_tipo_evento_estructural_estructura_tipo_evento;

ALTER TABLE Estructura_Tipo_Evento
ADD CONSTRAINT fk_tipo_evento_estructural_estructura_tipo_evento FOREIGN KEY (id_tipo_evento_estructural) 
REFERENCES Tipo_Evento_Estructural(id_tipo_evento_estructural) MATCH SIMPLE
ON UPDATE NO ACTION ON DELETE NO ACTION;

CREATE TABLE Objetivo_Estadial(
	id_objetivo_estadial SERIAL,
	tipo VARCHAR(100) NOT NULL,
	
	PRIMARY KEY (id_objetivo_estadial)
);

SELECT * FROM Objetivo_Estadial;

DROP TABLE Objetivo_Estadial;

INSERT INTO Objetivo_Estadial (tipo) VALUES ('Epale, todo fino.');

DELETE FROM Objetivo_Estadial;

CREATE TABLE Estadio(
	id_estadio SERIAL,
	nombre VARCHAR(100) NOT NULL,
	
	PRIMARY KEY (id_estadio)
);

SELECT * FROM Estadio;

DROP TABLE Estadio;

INSERT INTO Estadio (nombre) VALUES ('Exploratorio');

DELETE FROM Estadio;

CREATE TABLE Estadio_Aplicado(
	id_estadio_aplicado SERIAL,
	id_investigacion INT NOT NULL,
	id_estadio INT NOT NULL,
	
	PRIMARY KEY (id_estadio_aplicado),
	
	CONSTRAINT fk_investigacion_estadio_aplicado FOREIGN KEY (id_investigacion) 
	REFERENCES Investigacion(id_investigacion) MATCH SIMPLE
	ON UPDATE NO ACTION ON DELETE NO ACTION,
	
	CONSTRAINT fk_estadio_estadio_aplicado FOREIGN KEY (id_estadio) 
	REFERENCES Estadio(id_estadio) MATCH SIMPLE
	ON UPDATE NO ACTION ON DELETE NO ACTION
);

SELECT * FROM Estadio_Aplicado;

DROP TABLE Estadio_Aplicado;

INSERT INTO Estadio_Aplicado (id_investigacion, id_estadio) VALUES (1,1);

DELETE FROM Estadio_Aplicado;

ALTER TABLE Estadio_Aplicado
DROP CONSTRAINT fk_investigacion_estadio_aplicado;

ALTER TABLE Estadio_Aplicado
ADD CONSTRAINT fk_investigacion_estadio_aplicado FOREIGN KEY (id_investigacion) 
REFERENCES Investigacion(id_investigacion) MATCH SIMPLE
ON UPDATE NO ACTION ON DELETE NO ACTION;

ALTER TABLE Estadio_Aplicado
DROP CONSTRAINT fk_estadio_estadio_aplicado;

ALTER TABLE Estadio_Aplicado
ADD CONSTRAINT fk_estadio_estadio_aplicado FOREIGN KEY (id_estadio) 
REFERENCES Estadio(id_estadio) MATCH SIMPLE
ON UPDATE NO ACTION ON DELETE NO ACTION;

CREATE TABLE Objetivo_Especifico_Det(
	id_objetivo_especifico_det SERIAL,
	id_objetivo_estadial INT NOT NULL,
	id_estadio_aplicado INT NOT NULL,
	contenido VARCHAR(500) NOT NULL,
	
	PRIMARY KEY (id_objetivo_especifico_det),
	
	CONSTRAINT fk_objetivo_estadial_objetivo_especifico_det FOREIGN KEY (id_objetivo_estadial) 
	REFERENCES Objetivo_Estadial(id_objetivo_estadial) MATCH SIMPLE
	ON UPDATE NO ACTION ON DELETE NO ACTION,
	
	CONSTRAINT fk_estadio_aplicado_objetivo_especifico_det FOREIGN KEY (id_estadio_aplicado) 
	REFERENCES Estadio_Aplicado(id_estadio_aplicado) MATCH SIMPLE
	ON UPDATE NO ACTION ON DELETE NO ACTION
);

SELECT * FROM Objetivo_Especifico_Det;

DROP TABLE Objetivo_Especifico_Det;

INSERT INTO Objetivo_Especifico_Det (id_objetivo_estadial, id_estadio_aplicado, contenido) VALUES (1,1,'Epale todo fino');

DELETE FROM Objetivo_Especifico_Det;

ALTER TABLE Objetivo_Especifico_Det
DROP CONSTRAINT fk_objetivo_estadial_objetivo_especifico_det;

ALTER TABLE Objetivo_Especifico_Det
ADD CONSTRAINT fk_objetivo_estadial_objetivo_especifico_det FOREIGN KEY (id_objetivo_estadial) 
REFERENCES Objetivo_Estadial(id_objetivo_estadial) MATCH SIMPLE
ON UPDATE NO ACTION ON DELETE NO ACTION;

ALTER TABLE Objetivo_Especifico_Det
DROP CONSTRAINT fk_estadio_aplicado_objetivo_especifico_det;

ALTER TABLE Objetivo_Especifico_Det
ADD CONSTRAINT fk_estadio_aplicado_objetivo_especifico_det FOREIGN KEY (id_estadio_aplicado) 
REFERENCES Estadio_Aplicado(id_estadio_aplicado) MATCH SIMPLE
ON UPDATE NO ACTION ON DELETE NO ACTION;

CREATE TABLE Clase_Evento(
	id_clase_evento SERIAL,
	nombre VARCHAR(100) NOT NULL,
	
	PRIMARY KEY (id_clase_evento)
);

SELECT * FROM Clase_Evento;

DROP TABLE Clase_Evento;

INSERT INTO Clase_Evento (nombre) VALUES ('A Modificar');

DELETE FROM Clase_Evento;

CREATE TABLE Abordaje(
	id_abordaje SERIAL,
	nombre VARCHAR(100) NOT NULL,
	descripcion VARCHAR(500) NOT NULL,
	
	PRIMARY KEY (id_abordaje)
);

SELECT * FROM Abordaje;

DROP TABLE Abordaje;

INSERT INTO Abordaje (nombre,descripcion) VALUES ('hola', 'Epale todo fino');

DELETE FROM Abordaje;

CREATE TABLE Tipo_Evento(
	id_tipo_evento SERIAL,
	nombre VARCHAR(100) NOT NULL,
	
	PRIMARY KEY (id_tipo_evento)
);

SELECT * FROM Tipo_Evento;

DROP TABLE Tipo_Evento;

INSERT INTO Tipo_Evento (nombre) VALUES ('hola');

DELETE FROM Tipo_Evento;

CREATE TABLE Tecnica_Analisis(
	id_tecnica_analisis SERIAL,
	nombre VARCHAR(100) NOT NULL,
	
	PRIMARY KEY (id_tecnica_analisis)
);

SELECT * FROM Tecnica_Analisis;

DROP TABLE Tecnica_Analisis;

INSERT INTO Tecnica_Analisis (nombre) VALUES ('hola');

DELETE FROM Tecnica_Analisis;

CREATE TABLE Evento(
	id_evento SERIAL,
	id_clase_evento INT NOT NULL,
	id_abordaje INT NOT NULL,
	id_tipo_evento INT NOT NULL,
	id_estadio_aplicado INT NOT NULL,
	nombre VARCHAR(100) NOT NULL,
	descripcion VARCHAR(500) NOT NULL,
	
	PRIMARY KEY (id_evento),
	
	CONSTRAINT fk_clase_evento_evento FOREIGN KEY (id_clase_evento) 
	REFERENCES Clase_Evento(id_clase_evento) MATCH SIMPLE
	ON UPDATE NO ACTION ON DELETE NO ACTION,
	
	CONSTRAINT fk_abordaje_evento FOREIGN KEY (id_abordaje) 
	REFERENCES Abordaje(id_abordaje) MATCH SIMPLE
	ON UPDATE NO ACTION ON DELETE NO ACTION,
	
	CONSTRAINT fk_tipo_evento_evento FOREIGN KEY (id_tipo_evento) 
	REFERENCES Tipo_Evento(id_tipo_evento) MATCH SIMPLE
	ON UPDATE NO ACTION ON DELETE NO ACTION,
	
	CONSTRAINT fk_estadio_aplicado_evento FOREIGN KEY (id_estadio_aplicado) 
	REFERENCES Estadio_Aplicado(id_estadio_aplicado) MATCH SIMPLE
	ON UPDATE NO ACTION ON DELETE NO ACTION
);

SELECT * FROM Evento;

DROP TABLE Evento;

INSERT INTO Evento (id_clase_evento, id_abordaje, id_tipo_evento, id_tecnica_analisis, id_estadio_aplicado, nombre, descripcion) 
	VALUES (1, 1, 1, 1,'Epale', 'fino todo');

DELETE FROM Evento;

ALTER TABLE Evento
DROP CONSTRAINT fk_clase_evento_evento;

ALTER TABLE Evento
ADD CONSTRAINT fk_clase_evento_evento FOREIGN KEY (id_clase_evento) 
REFERENCES Clase_Evento(id_clase_evento) MATCH SIMPLE
ON UPDATE NO ACTION ON DELETE NO ACTION;

ALTER TABLE Evento
DROP CONSTRAINT fk_abordaje_evento;

ALTER TABLE Evento
ADD CONSTRAINT fk_abordaje_evento FOREIGN KEY (id_abordaje) 
REFERENCES Abordaje(id_abordaje) MATCH SIMPLE
ON UPDATE NO ACTION ON DELETE NO ACTION;

ALTER TABLE Evento
DROP CONSTRAINT fk_tipo_evento_evento;

ALTER TABLE Evento
ADD CONSTRAINT fk_tipo_evento_evento FOREIGN KEY (id_tipo_evento) 
REFERENCES Tipo_Evento(id_tipo_evento) MATCH SIMPLE
ON UPDATE NO ACTION ON DELETE NO ACTION;

ALTER TABLE Evento
DROP CONSTRAINT fk_estadio_aplicado_evento;

ALTER TABLE Evento
ADD CONSTRAINT fk_estadio_aplicado_evento FOREIGN KEY (id_estadio_aplicado) 
REFERENCES Estadio_Aplicado(id_estadio_aplicado) MATCH SIMPLE
ON UPDATE NO ACTION ON DELETE NO ACTION;

CREATE TABLE Forma_Analisis(
	id_forma_analisis SERIAL,
	id_tecnica_analisis INT NOT NULL,
	id_evento INT NOT NULL,
	
	PRIMARY KEY (id_evento),
	
	CONSTRAINT fk_evento_forma_analisis FOREIGN KEY (id_evento) 
	REFERENCES Evento(id_evento) MATCH SIMPLE
	ON UPDATE NO ACTION ON DELETE NO ACTION,
	
	CONSTRAINT fk_tecnica_analisis_forma_analisis FOREIGN KEY (id_tecnica_analisis) 
	REFERENCES Tecnica_Analisis(id_tecnica_analisis) MATCH SIMPLE
	ON UPDATE NO ACTION ON DELETE NO ACTION
);

SELECT * FROM Forma_Analisis;

DROP TABLE Forma_Analisis;

INSERT INTO Forma_Analisis (id_evento, id_tecnica_analisis) 
	VALUES (1, 1);

ALTER TABLE Forma_Analisis
DROP CONSTRAINT fk_evento_forma_analisis;

ALTER TABLE Forma_Analisis
ADD CONSTRAINT fk_evento_forma_analisis FOREIGN KEY (id_evento) 
REFERENCES Evento(id_evento) MATCH SIMPLE
ON UPDATE NO ACTION ON DELETE NO ACTION;

ALTER TABLE Forma_Analisis
DROP CONSTRAINT fk_tecnica_analisis_forma_analisis;

ALTER TABLE Forma_Analisis
ADD CONSTRAINT fk_tecnica_analisis_forma_analisis FOREIGN KEY (id_tecnica_analisis) 
REFERENCES Tecnica_Analisis(id_tecnica_analisis) MATCH SIMPLE
ON UPDATE NO ACTION ON DELETE NO ACTION;

CREATE TABLE Tecnica_Muestreo(
	id_tecnica_muestreo SERIAL,
	nombre VARCHAR(100) NOT NULL,
	descripcion VARCHAR(500) NOT NULL,
	
	PRIMARY KEY (id_tecnica_muestreo)
);

SELECT * FROM Tecnica_Muestreo;

DROP TABLE Tecnica_Muestreo;

INSERT INTO Tecnica_Muestreo (nombre,descripcion) VALUES ('hola', 'por poblacion');

DELETE FROM Tecnica_Muestreo;

CREATE TABLE Muestra(
	id_muestra SERIAL,
	id_tecnica_muestreo INT NOT NULL,
	valor VARCHAR(100) NOT NULL,
	criterio_seleccion VARCHAR(500) NOT NULL,
	tamano INT NOT NULL,
	
	PRIMARY KEY (id_muestra),
	
	CONSTRAINT fk_tecnica_muestreo_muestra FOREIGN KEY (id_tecnica_muestreo) 
	REFERENCES Tecnica_muestreo(id_tecnica_muestreo) MATCH SIMPLE
	ON UPDATE NO ACTION ON DELETE NO ACTION
);

SELECT * FROM Muestra;

DROP TABLE Muestra;

INSERT INTO Muestra (id_tecnica_muestreo, valor, criterio_seleccion, tamano) 
	VALUES (1,'Epale', 'fino todo', 5);

DELETE FROM Muestra;

ALTER TABLE Muestra
DROP CONSTRAINT fk_tecnica_muestreo_muestra;

ALTER TABLE Muestra
ADD CONSTRAINT fk_tecnica_muestreo_muestra FOREIGN KEY (id_tecnica_muestreo) 
REFERENCES Tecnica_muestreo(id_tecnica_muestreo) MATCH SIMPLE
ON UPDATE NO ACTION ON DELETE NO ACTION;

CREATE TABLE Clase_Sinergia(
	id_clase_sinergia SERIAL,
	nombre VARCHAR(100) NOT NULL,
	
	PRIMARY KEY (id_clase_sinergia)
);

SELECT * FROM Clase_Sinergia;

DROP TABLE Clase_Sinergia;

INSERT INTO Clase_Sinergia (nombre) VALUES ('hola');

DELETE FROM Clase_Sinergia;

CREATE TABLE Sinergia(
	id_sinergia SERIAL,
	id_clase_sinergia INT NOT NULL,
	id_evento INT NOT NULL,
	nombre VARCHAR(100) NOT NULL,
	
	PRIMARY KEY (id_sinergia),
	
	CONSTRAINT fk_clase_sinergia_sinergia FOREIGN KEY (id_clase_sinergia) 
	REFERENCES Clase_Sinergia(id_clase_sinergia) MATCH SIMPLE
	ON UPDATE NO ACTION ON DELETE NO ACTION,
	
	CONSTRAINT fk_evento_sinergia FOREIGN KEY (id_evento) 
	REFERENCES Evento(id_evento) MATCH SIMPLE
	ON UPDATE NO ACTION ON DELETE NO ACTION
);

SELECT * FROM Sinergia;

DROP TABLE Sinergia;

INSERT INTO Sinergia (id_clase_sinergia, id_evento, nombre) 
	VALUES (1, 1,'Epale');

DELETE FROM Sinergia;

ALTER TABLE Sinergia
DROP CONSTRAINT fk_clase_sinergia_sinergia;

ALTER TABLE Sinergia
ADD CONSTRAINT fk_clase_sinergia_sinergia FOREIGN KEY (id_clase_sinergia) 
REFERENCES Clase_Sinergia(id_clase_sinergia) MATCH SIMPLE
ON UPDATE NO ACTION ON DELETE NO ACTION;

ALTER TABLE Sinergia
DROP CONSTRAINT fk_evento_sinergia;

ALTER TABLE Sinergia
ADD CONSTRAINT fk_evento_sinergia FOREIGN KEY (id_evento) 
REFERENCES Evento(id_evento) MATCH SIMPLE
ON UPDATE NO ACTION ON DELETE NO ACTION;

CREATE TABLE Fuente(
	id_fuente SERIAL,
	id_muestra INT NOT NULL,
	id_sinergia INT NOT NULL,
	valor VARCHAR(100) NOT NULL,
	
	PRIMARY KEY (id_fuente),
	
	CONSTRAINT fk_muestra_fuente FOREIGN KEY (id_muestra) 
	REFERENCES Muestra(id_muestra) MATCH SIMPLE
	ON UPDATE NO ACTION ON DELETE NO ACTION,
	
	CONSTRAINT fk_sinergia_fuente FOREIGN KEY (id_sinergia) 
	REFERENCES Sinergia(id_sinergia) MATCH SIMPLE
	ON UPDATE NO ACTION ON DELETE NO ACTION
);

SELECT * FROM Fuente;

DROP TABLE Fuente;

INSERT INTO Fuente (id_sinergia, id_muestra, valor) 
	VALUES (1, 1,'Epale');

DELETE FROM Fuente;

ALTER TABLE Fuente
DROP CONSTRAINT fk_muestra_fuente;

ALTER TABLE Fuente
ADD CONSTRAINT fk_muestra_fuente FOREIGN KEY (id_muestra) 
REFERENCES Muestra(id_muestra) MATCH SIMPLE
ON UPDATE NO ACTION ON DELETE NO ACTION;

ALTER TABLE Fuente
DROP CONSTRAINT fk_sinergia_fuente;

ALTER TABLE Fuente
ADD CONSTRAINT fk_sinergia_fuente FOREIGN KEY (id_sinergia) 
REFERENCES Sinergia(id_sinergia) MATCH SIMPLE
ON UPDATE NO ACTION ON DELETE NO ACTION;

CREATE TABLE Instrumento(
	id_instrumento SERIAL,
	nombre VARCHAR(100) NOT NULL,
	descripcion VARCHAR(500) NOT NULL,
	
	PRIMARY KEY (id_instrumento)
);

SELECT * FROM Instrumento;

DROP TABLE Instrumento;

INSERT INTO Instrumento (nombre, descripcion) 
	VALUES ('Epale','miralo todo pro');

DELETE FROM Instrumento;

CREATE TABLE Tecnica_Practica(
	id_tecnica_practica SERIAL,
	nombre VARCHAR(100) NOT NULL,
	
	PRIMARY KEY (id_tecnica_practica)
);

SELECT * FROM Tecnica_Practica;

DROP TABLE Tecnica_Practica;

INSERT INTO Tecnica_Practica (nombre) 
	VALUES ('Epale');

DELETE FROM Tecnica_Practica;

CREATE TABLE Logica_Aplicada(
	id_logica_aplicada SERIAL,
	id_instrumento INT NOT NULL,
	id_tecnica_practica INT NOT NULL,
	
	PRIMARY KEY (id_instrumento,id_tecnica_practica),
	
	CONSTRAINT fk_instrumento_logica_aplicada FOREIGN KEY (id_instrumento) 
	REFERENCES Instrumento(id_instrumento) MATCH SIMPLE
	ON UPDATE NO ACTION ON DELETE NO ACTION,
	
	CONSTRAINT fk_tecnica_practica_logica_aplicada FOREIGN KEY (id_tecnica_practica) 
	REFERENCES Tecnica_Practica(id_tecnica_practica) MATCH SIMPLE
	ON UPDATE NO ACTION ON DELETE NO ACTION
);

SELECT * FROM Logica_Aplicada;

DROP TABLE Logica_Aplicada;

INSERT INTO Logica_Aplicada (id_instrumento, id_tecnica_practica) 
	VALUES (1, 1);

DELETE FROM Logica_Aplicada;

ALTER TABLE Logica_Aplicada
DROP CONSTRAINT fk_instrumento_logica_aplicada;

ALTER TABLE Logica_Aplicada
ADD CONSTRAINT fk_instrumento_logica_aplicada FOREIGN KEY (id_instrumento) 
REFERENCES Instrumento(id_instrumento) MATCH SIMPLE
ON UPDATE NO ACTION ON DELETE NO ACTION;

ALTER TABLE Logica_Aplicada
DROP CONSTRAINT fk_tecnica_practica_logica_aplicada;

ALTER TABLE Logica_Aplicada
ADD CONSTRAINT fk_tecnica_practica_logica_aplicada FOREIGN KEY (id_tecnica_practica) 
REFERENCES Tecnica_Practica(id_tecnica_practica) MATCH SIMPLE
ON UPDATE NO ACTION ON DELETE NO ACTION;

CREATE TABLE Aplicacion_Instrumental(
	id_aplicacion_instrumental SERIAL,
	id_instrumento INT NOT NULL,
	id_sinergia INT NOT NULL,
	identificacion VARCHAR(100) NOT NULL,
	
	
	PRIMARY KEY (id_instrumento,id_sinergia),
	
	CONSTRAINT fk_instrumento_aplicacion_instrumental FOREIGN KEY (id_instrumento) 
	REFERENCES Instrumento(id_instrumento) MATCH SIMPLE
	ON UPDATE NO ACTION ON DELETE NO ACTION,
	
	CONSTRAINT fk_sinergia_aplicacion_instrumental FOREIGN KEY (id_sinergia) 
	REFERENCES Sinergia(id_sinergia) MATCH SIMPLE
	ON UPDATE NO ACTION ON DELETE NO ACTION
);

SELECT * FROM Aplicacion_Instrumental;

DROP TABLE Aplicacion_Instrumental;

INSERT INTO Aplicacion_Instrumental (id_instrumento, id_sinergia, identificacion) 
	VALUES (1, 1, 'epale todo fino');

DELETE FROM Aplicacion_Instrumental;

ALTER TABLE Aplicacion_Instrumental
DROP CONSTRAINT fk_instrumento_aplicacion_instrumental;

ALTER TABLE Aplicacion_Instrumental
ADD CONSTRAINT fk_instrumento_aplicacion_instrumental FOREIGN KEY (id_instrumento) 
REFERENCES Instrumento(id_instrumento) MATCH SIMPLE
ON UPDATE NO ACTION ON DELETE NO ACTION;

ALTER TABLE Aplicacion_Instrumental
DROP CONSTRAINT fk_sinergia_aplicacion_instrumental;

ALTER TABLE Aplicacion_Instrumental
ADD CONSTRAINT fk_sinergia_aplicacion_instrumental FOREIGN KEY (id_sinergia) 
REFERENCES Sinergia(id_sinergia) MATCH SIMPLE
ON UPDATE NO ACTION ON DELETE NO ACTION;

CREATE TABLE Escala(
	id_escala SERIAL,
	nombre VARCHAR(100) NOT NULL,
	
	PRIMARY KEY (id_escala)
);

SELECT * FROM Escala;

DROP TABLE Escala;

INSERT INTO Escala (nombre) 
	VALUES ('epale todo fino');

DELETE FROM Escala;

CREATE TABLE Parametro(
	id_parametro SERIAL,
	nombre VARCHAR(100) NOT NULL,
	contenido VARCHAR(100) NOT NULL,
	
	PRIMARY KEY (id_parametro)
);

SELECT * FROM Parametro;

DROP TABLE Parametro;

INSERT INTO Parametro (nombre,contenido) 
	VALUES ('epale todo fino','todo fino y pro elegante, pro.');

DELETE FROM Parametro;

CREATE TABLE Categoria(
	id_categoria SERIAL,
	id_escala INT NOT NULL,
	id_parametro INT NOT NULL,
	nombre VARCHAR(100) NOT NULL,
	descripcion VARCHAR(500) NOT NULL,
	aplicacion_temporal VARCHAR(100) NOT NULL,
	terminos VARCHAR(100) NOT NULL,
	nivel_ausencia VARCHAR(100) NOT NULL,
	
	
	PRIMARY KEY (id_categoria),
	
	CONSTRAINT fk_escala_categoria FOREIGN KEY (id_escala) 
	REFERENCES Escala(id_escala) MATCH SIMPLE
	ON UPDATE NO ACTION ON DELETE NO ACTION,
	
	CONSTRAINT fk_parametro_categoria FOREIGN KEY (id_parametro) 
	REFERENCES Parametro(id_parametro) MATCH SIMPLE
	ON UPDATE NO ACTION ON DELETE NO ACTION
);

SELECT * FROM Categoria;

DROP TABLE Categoria;

INSERT INTO Categoria (id_escala, id_parametro, nombre, descripcion, aplicacion_temporal, terminos, nivel_ausencia) 
	VALUES (1, 1, 'epale todo fino', 'si todo fino', 'esta mañana', 'no importa', 'bajo');

DELETE FROM Categoria;

ALTER TABLE Categoria
DROP CONSTRAINT fk_escala_categoria;

ALTER TABLE Categoria
ADD CONSTRAINT fk_escala_categoria FOREIGN KEY (id_escala) 
REFERENCES Escala(id_escala) MATCH SIMPLE
ON UPDATE NO ACTION ON DELETE NO ACTION;

ALTER TABLE Categoria
DROP CONSTRAINT fk_parametro_categoria;

ALTER TABLE Categoria
ADD CONSTRAINT fk_parametro_categoria FOREIGN KEY (id_parametro) 
REFERENCES Parametro(id_parametro) MATCH SIMPLE
ON UPDATE NO ACTION ON DELETE NO ACTION;

CREATE TABLE Tipo_Item(
	id_tipo_item SERIAL,
	nombre VARCHAR(100) NOT NULL,
	descripcion VARCHAR(500) NOT NULL,
	
	
	PRIMARY KEY (id_tipo_item)
);

SELECT * FROM Tipo_Item;

DROP TABLE Tipo_Item;

INSERT INTO Tipo_Item (nombre, descripcion) 
	VALUES ('epale todo fino', 'si todo fino');

DELETE FROM Tipo_Item;

CREATE TABLE Indicio(
	id_indicio SERIAL,
	contenido VARCHAR(100) NOT NULL,
	
	
	PRIMARY KEY (id_indicio)
);

SELECT * FROM Indicio;

DROP TABLE Indicio;

INSERT INTO Indicio (contenido) 
	VALUES ('epale todo fino');

DELETE FROM Indicio;

DELETE FROM Parametro;

CREATE TABLE Item(
	id_item SERIAL,
	id_indicio INT NOT NULL,
	id_sinergia INT NOT NULL,
	id_instrumento INT NOT NULL,
	id_categoria INT NOT NULL,
	id_tipo_item INT NOT NULL,
	identificacion VARCHAR(100) NOT NULL,
	contenido VARCHAR(500) NOT NULL,
	
	
	PRIMARY KEY (id_item),
	
	CONSTRAINT fk_indicio_item FOREIGN KEY (id_indicio) 
	REFERENCES Indicio(id_indicio) MATCH SIMPLE
	ON UPDATE NO ACTION ON DELETE NO ACTION,
	
	CONSTRAINT fk_aplicacion_instrumental_item FOREIGN KEY (id_sinergia,id_instrumento) 
	REFERENCES Aplicacion_Instrumental(id_sinergia, id_instrumento) MATCH SIMPLE
	ON UPDATE NO ACTION ON DELETE NO ACTION,
	
	CONSTRAINT fk_categoria_item FOREIGN KEY (id_categoria) 
	REFERENCES Categoria(id_categoria) MATCH SIMPLE
	ON UPDATE NO ACTION ON DELETE NO ACTION,
	
	CONSTRAINT fk_tipo_item_item FOREIGN KEY (id_tipo_item) 
	REFERENCES Tipo_Item(id_tipo_item) MATCH SIMPLE
	ON UPDATE NO ACTION ON DELETE NO ACTION
);

SELECT * FROM Item;

DROP TABLE Item;

INSERT INTO Item (id_sinergia, id_instrumento, id_indicio, id_categoria, id_tipo_item, identificacion, contenido) 
	VALUES (1, 1, 1, 1, 1,'epale todo fino', 'si todo fino');

DELETE FROM Item;

ALTER TABLE Item
DROP CONSTRAINT fk_indicio_item;

ALTER TABLE Item
ADD CONSTRAINT fk_indicio_item FOREIGN KEY (id_indicio) 
REFERENCES Indicio(id_indicio) MATCH SIMPLE
ON UPDATE NO ACTION ON DELETE NO ACTION;

ALTER TABLE Item
DROP CONSTRAINT fk_aplicacion_instrumental_item;

ALTER TABLE Item
ADD CONSTRAINT fk_aplicacion_instrumental_item FOREIGN KEY (id_sinergia,id_instrumento) 
REFERENCES Aplicacion_Instrumental(id_sinergia, id_instrumento) MATCH SIMPLE
ON UPDATE NO ACTION ON DELETE NO ACTION;

ALTER TABLE Item
DROP CONSTRAINT fk_categoria_item;

ALTER TABLE Item
ADD CONSTRAINT fk_categoria_item FOREIGN KEY (id_categoria) 
REFERENCES Categoria(id_categoria) MATCH SIMPLE
ON UPDATE NO ACTION ON DELETE NO ACTION;

ALTER TABLE Item
DROP CONSTRAINT fk_tipo_item_item;

ALTER TABLE Item
ADD CONSTRAINT fk_tipo_item_item FOREIGN KEY (id_tipo_item) 
REFERENCES Tipo_Item(id_tipo_item) MATCH SIMPLE
ON UPDATE NO ACTION ON DELETE NO ACTION;