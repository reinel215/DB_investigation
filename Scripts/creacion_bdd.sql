CREATE TABLE tipo_usuario (
	id_tipo_usuario SERIAL,
	nombre VARCHAR(50) NOT NULL,
	PRIMARY KEY (id_tipo_usuario)
);

CREATE TABLE permiso (
	id_permiso SERIAL,
	nombre VARCHAR(50) NOT NULL,
	PRIMARY KEY (id_permiso)
);

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
ON UPDATE NO ACTION ON DELETE NO ACTION;
	
ALTER TABLE ROL ADD CONSTRAINT fk_permiso_rol FOREIGN KEY (id_permiso)
REFERENCES Permiso(id_permiso) MATCH SIMPLE
ON UPDATE NO ACTION ON DELETE NO ACTION;

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

CREATE TABLE Causa_Sintoma (
	id_causa_sintoma SERIAL,
	nombre VARCHAR(50) NOT NULL,
	descripcion VARCHAR(50) NOT NULL,
	id_problematica INT NOT NULL,
	
	PRIMARY KEY (id_causa_sintoma),
	
	CONSTRAINT fk_problematica_causa_sintoma FOREIGN KEY (id_problematica) 
	REFERENCES Problematica(id_problematica) MATCH SIMPLE
	ON UPDATE NO ACTION ON DELETE NO ACTION
);

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
	descripcion VARCHAR(500) NOT NULL,
	
	PRIMARY KEY (id_base_noologica)
);

CREATE TABLE Tipo_Fuente (
	id_tipo_fuente SERIAL,
	nombre VARCHAR(100) NOT NULL,
	
	PRIMARY KEY (id_tipo_fuente)
);

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

CREATE TABLE Direccion_Uso (
	id_direccion_uso SERIAL,
	id_entidad_uso INT NOT NULL,
	nombre VARCHAR(50) NOT NULL,
	
	
	PRIMARY KEY (id_direccion_uso),
	
	CONSTRAINT fk_entidad_uso_direccion_uso FOREIGN KEY (id_entidad_uso) 
	REFERENCES Entidad_Uso(id_entidad_uso) MATCH SIMPLE
	ON UPDATE NO ACTION ON DELETE NO ACTION
);

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

CREATE TABLE Sub_Titulo (
	id_sub_titulo SERIAL,
	id_titulo INT NOT NULL,
	nombre VARCHAR(100) NOT NULL,
	
	PRIMARY KEY (id_sub_titulo),
	
	CONSTRAINT fk_titulo_sub_titulo FOREIGN KEY (id_titulo) 
	REFERENCES Titulo(id_titulo) MATCH SIMPLE
	ON UPDATE NO ACTION ON DELETE NO ACTION
);

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

CREATE TABLE Temporalidad(
	id_temporalidad SERIAL,
	id_contexto INT NOT NULL,
	descripcion VARCHAR(500) NOT NULL,
	
	PRIMARY KEY (id_temporalidad),
	
	CONSTRAINT fk_contexto_temporalidad FOREIGN KEY (id_contexto) 
	REFERENCES Contexto(id_contexto) MATCH SIMPLE
	ON UPDATE NO ACTION ON DELETE NO ACTION
);

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

CREATE TABLE Tipo_Investigacion(
	id_tipo_investigacion SERIAL,
	id_nivel_investigacion INT NOT NULL,
	nombre VARCHAR(100) NOT NULL,
	
	PRIMARY KEY (id_tipo_investigacion),
	
	CONSTRAINT fk_nivel_investigacion_tipo_investigacion FOREIGN KEY (id_nivel_investigacion) 
	REFERENCES Nivel_Investigacion(id_nivel_investigacion) MATCH SIMPLE
	ON UPDATE NO ACTION ON DELETE NO ACTION
);

ALTER TABLE Tipo_Investigacion
DROP CONSTRAINT fk_nivel_investigacion_tipo_investigacion;

ALTER TABLE Tipo_Investigacion
ADD CONSTRAINT fk_nivel_investigacion_tipo_investigacion FOREIGN KEY (id_nivel_investigacion) 
REFERENCES Nivel_Investigacion(id_nivel_investigacion) MATCH SIMPLE
ON UPDATE NO ACTION ON DELETE NO ACTION;

CREATE TABLE Conjuncion(
	id_conjuncion SERIAL,
	id_tipo_investigacion INT NOT NULL,
	conjuncion VARCHAR(100) NOT NULL,
	
	PRIMARY KEY (id_conjuncion),
	
	CONSTRAINT fk_tipo_investigacion_conjuncion FOREIGN KEY (id_tipo_investigacion) 
	REFERENCES Tipo_Investigacion(id_tipo_investigacion) MATCH SIMPLE
	ON UPDATE NO ACTION ON DELETE NO ACTION
);

ALTER TABLE Conjuncion
DROP CONSTRAINT fk_tipo_investigacion_conjuncion;

ALTER TABLE Conjuncion
ADD CONSTRAINT fk_tipo_investigacion_conjuncion FOREIGN KEY (id_tipo_investigacion) 
REFERENCES Tipo_Investigacion(id_tipo_investigacion) MATCH SIMPLE
ON UPDATE NO ACTION ON DELETE NO ACTION;

CREATE TABLE Verbo_Aplicado(
	id_verbo_aplicado SERIAL,
	verbo VARCHAR(20) NOT NULL,
	
	PRIMARY KEY (id_verbo_aplicado)
);

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

CREATE TABLE Tipo_Estadio_Estructural(
	id_tipo_estadio_estructural SERIAL,
	nombre VARCHAR(100) NOT NULL,
	
	PRIMARY KEY (id_tipo_estadio_estructural)
);

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

CREATE TABLE Tipo_Evento_Estructural(
	id_tipo_evento_estructural SERIAL,
	nombre VARCHAR(100) NOT NULL,
	
	PRIMARY KEY (id_tipo_evento_estructural)
);

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

CREATE TABLE Estadio(
	id_estadio SERIAL,
	nombre VARCHAR(100) NOT NULL,
	
	PRIMARY KEY (id_estadio)
);

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

CREATE TABLE Abordaje(
	id_abordaje SERIAL,
	nombre VARCHAR(100) NOT NULL,
	descripcion VARCHAR(500) NOT NULL,
	
	PRIMARY KEY (id_abordaje)
);

CREATE TABLE Tipo_Evento(
	id_tipo_evento SERIAL,
	nombre VARCHAR(100) NOT NULL,
	
	PRIMARY KEY (id_tipo_evento)
);

CREATE TABLE Tecnica_Analisis(
	id_tecnica_analisis SERIAL,
	nombre VARCHAR(100) NOT NULL,
	
	PRIMARY KEY (id_tecnica_analisis)
);

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


CREATE TABLE Tecnica_Practica(
	id_tecnica_practica SERIAL,
	nombre VARCHAR(100) NOT NULL,
	
	PRIMARY KEY (id_tecnica_practica)
);

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

CREATE TABLE Parametro(
	id_parametro SERIAL,
	nombre VARCHAR(100) NOT NULL,
	contenido VARCHAR(100) NOT NULL,
	
	PRIMARY KEY (id_parametro)
);

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

CREATE TABLE Indicio(
	id_indicio SERIAL,
	contenido VARCHAR(100) NOT NULL,
	
	
	PRIMARY KEY (id_indicio)
);

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