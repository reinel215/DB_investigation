--Reportes

--Seleccion de los elementos constitutivos. SELECT * FROM Usuario;
--											SELECT * FROM Tipo_Usuario;
--Listado de usuarios con su rol(tipo de usuario)
SELECT A.nombres, A.apellidos, A.correo, B.nombre FROM Usuario as A
JOIN Tipo_Usuario B ON B.id_tipo_usuario= A.id_tipo_usuario;



--Seleccion de los elementos constitutivos. SELECT * FROM Tipo_Argumentacion;
--											SELECT * FROM Justificacion;
--Tabla de argumentos de justificacion.
---Las justificaciones se ordena por el id ya que se crea segun el sentido de uso.
SELECT A.contenido, B.nombre FROM Justificacion as A
JOIN Tipo_Argumentacion B ON B.id_tipo_argumentacion = A.id_tipo_argumentacion
JOIN Proyecto C ON C.id_proyecto = A.id_proyecto ORDER BY A.id_justificacion;

--Seleccion de los elementos constitutivos. SELECT * FROM Tipo_Investigacion;
--											SELECT * FROM Nivel_Investigacion;
--Listado de los tipos de investigacion y sus niveles y vicerversa.
SELECT A.nombre, B.nombre FROM Tipo_Investigacion as A
JOIN Nivel_Investigacion B ON B.id_nivel_investigacion = A.id_nivel_investigacion;
SELECT A.nombre, B.nombre FROM Nivel_Investigacion as A
JOIN Tipo_Investigacion B ON B.id_nivel_investigacion = A.id_nivel_investigacion;

--Seleccion de los elementos constitutivos. SELECT * FROM Instrumento
--											SELECT * FROM Aplicacion_Instrumental
--											SELECT * FROM Evento
-- 											SELECT * FROM Investigacion
-- El where determina la investigacion de la que se quiere saber el listado de instrumentos segun el evento.
--Instrumentos usados por evento.
SELECT A.nombre as Evnt, B.nombre as Instr FROM Evento AS A
JOIN Sinergia C ON C.id_evento = A.id_evento
JOIN Aplicacion_Instrumental D ON D.id_sinergia = C.id_sinergia
JOIN Instrumento B ON B.id_instrumento = D.id_instrumento
JOIN Estadio_Aplicado E ON E.id_estadio_aplicado = A.id_estadio_aplicado
JOIN Investigacion F ON E.id_investigacion = F.id_investigacion
WHERE E.id_investigacion = 4;

--Seleccion de los institutos de investigacion. SELECT * FROM Entidad_Institucional
--Entidad institucional.
SELECT A.nombre, A.correo, A.rif FROM Entidad_Institucional AS A;

--Seleccion de los contextos atendidos. SELECT * FROM Contexto
--	Tempo es la temporalidad que representa la descripcion de la misma.
--Listado de contextos atendidos.
SELECT A.concepcion, A.poblacion, A.descripcion, B.descripcion as tempo FROM Contexto AS A
JOIN Temporalidad B ON B.id_contexto = A.id_contexto;


--Seleccion de los elementos a a buscar. SELECT * FROM Evento
--Listado de eventos abordados.
SELECT D.nombre as Estd, A.nombre as Evnt, A.descripcion as Evnt_descp FROM Evento AS A
JOIN Estadio_Aplicado B ON B.id_estadio_aplicado = A.id_estadio_aplicado
JOIN Investigacion C ON C.id_investigacion = B.id_investigacion
JOIN Estadio D ON D.id_estadio = B.id_estadio
WHERE C.id_investigacion = 4;

--Seleccion de los tipos de eventos.
--Listado de tipos de evento
SELECT A.nombre FROM Tipo_Evento as A;

--Seleccion de tipos de unidades de info
--Esto constituye que tipo de fuente es y que base noologica constituye la misma.
--Listado de tipos de fuente.
SELECT A.nombre FROM Tipo_Fuente as A;
SELECT A.nombre FROM Base_Noologica as A;
SELECT A.nombre FROM Entidad_Uso as A;

--Listado de modalidades por tipo
SELECT A.nombre as Mod, B.nombre as T_Inv FROM Modalidad as A
JOIN Tipo_Investigacion B ON B.id_tipo_investigacion = A.id_tipo_investigacion;

--Listado de tecnicas practicas, para la recoleccion de informacion.
SELECT A.nombre FROM Tecnica_Practica as A;

--Listado de tecnicas de analisis.
SELECT A.nombre FROM Tecnica_Analisis as A;

--SELECT * FROM Investigacion
--Listado de investigaciones por contexto de investigacion.
SELECT A.identificacion as Proyect, B.nombre as Discp FROM Proyecto as A
JOIN Investigacion C ON C.id_proyecto = A.id_proyecto
JOIN Entorno_Investigacion D ON D.id_investigacion = C.id_investigacion
JOIN Contexto_Investigacion B ON B.id_contexto_investigacion = D.id_contexto_investigacion
WHERE B.id_contexto_investigacion = 4;

