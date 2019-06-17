INSERT INTO Abordaje (nombre, descripcion) 
VALUES ('Abordaje Caologico', 'Abordaje Caologico (inestructurado, abierto) con un minimo de criterio previo, orientado a descubrir, se asemejan a los sistemas abiertos, complejos, no lineales y a las estructuras disipativas');
INSERT INTO Abordaje (nombre, descripcion)
VALUES ('Abordaje Cosmologico', 'Abordaje cosmologico(estructurado, cerrado, preestablecido, orientado a corroborar) se asemeja a un sistema lineal y cerrado');

INSERT INTO Nivel_Investigacion (nombre, descripcion)
VALUES ('Perceptual', 'Indica una aproximacion inicial al evento, en el cual apenas se alcanzan a percibir los aspectos mas evidentes del mismo. Los objetivos respecto a este nivel son : "explorar" y "describir"');
INSERT INTO Nivel_Investigacion (nombre, descripcion)
VALUES ('Aprehensivo', 'Se realiza una aproximacion mas profunda para descubrir aspectos del evento que se manifiestan en pautas de relaciones internas, es decir, si se considera al evento en estudio como un grupo de sinergias , entonces. sera posible descubrir los aspectos que lo conforman y las sinergias que lo agrupan, para asi trascender a otra comprension.');
INSERT INTO Nivel_Investigacion (nombre, descripcion)
VALUES ('Comprensivo', 'Se estudia al evento en su relacion con otros eventos, dentro de un holos mayor, y se enfatizan poor lo general las relaciones explicativas( que en algunos casos pueden ser de casualidad), aunque no exclusivamente; los objetivos propios de este nivel son "explicar", "predecir" y "proponer."');
INSERT INTO Nivel_Investigacion (nombre, descripcion)
VALUES ('Integrativo', 'Contempla acciones directas por parte del investigador, sobre el evento en estudio; estas acciones van dirigidas a transformar o modificar el evento en algun aspecto; los objetivos correspondientes al nivel integrativo son "modificar", "confirmar" y "evaluar"');

INSERT INTO Tipo_Investigacion (nombre, id_nivel_investigacion)
VALUES ('Descriptiva', 1);
INSERT INTO Tipo_Investigacion (nombre, id_nivel_investigacion)
VALUES ('Analitica', 2);
INSERT INTO Tipo_Investigacion (nombre, id_nivel_investigacion)
VALUES ('Comparativa', 2);
INSERT INTO Tipo_Investigacion (nombre, id_nivel_investigacion)
VALUES ('Explicativa', 3);
INSERT INTO Tipo_Investigacion (nombre, id_nivel_investigacion)
VALUES ('Predictiva', 3);
INSERT INTO Tipo_Investigacion (nombre, id_nivel_investigacion)
VALUES ('Proyectiva', 3);
INSERT INTO Tipo_Investigacion (nombre, id_nivel_investigacion)
VALUES ('Confirmatoria', 4);
INSERT INTO Tipo_Investigacion (nombre, id_nivel_investigacion)
VALUES ('Evaluativa', 4);
INSERT INTO Tipo_Investigacion (nombre, id_nivel_investigacion)
VALUES ('Exploratoria', 1);
INSERT INTO Tipo_Investigacion (nombre, id_nivel_investigacion)
VALUES ('Interactiva', 2);

DROP TABLE Verbo_Aplicado;
DROP TABLE Conjunto_Verbo;

INSERT INTO Verbo_Aplicado (verbo)
VALUES ('Indagar');
INSERT INTO Verbo_Aplicado (verbo)
VALUES ('Descubrir');
INSERT INTO Verbo_Aplicado (verbo)
VALUES ('Detectar');
INSERT INTO Verbo_Aplicado (verbo)
VALUES ('Explorar');
INSERT INTO Verbo_Aplicado (verbo)
VALUES ('Describir');
INSERT INTO Verbo_Aplicado (verbo)
VALUES ('Identificar');
INSERT INTO Verbo_Aplicado (verbo)
VALUES ('Precisar');
INSERT INTO Verbo_Aplicado (verbo)
VALUES ('Caracterizar');
INSERT INTO Verbo_Aplicado (verbo)
VALUES ('Tipificar');
INSERT INTO Verbo_Aplicado (verbo)
VALUES ('Clasificar');
INSERT INTO Verbo_Aplicado (verbo)
VALUES ('Detallar');
INSERT INTO Verbo_Aplicado (verbo)
VALUES ('Diagnosticar');
INSERT INTO Verbo_Aplicado (verbo)
VALUES ('Analizar');
INSERT INTO Verbo_Aplicado (verbo)
VALUES ('Interpretar');
INSERT INTO Verbo_Aplicado (verbo)
VALUES ('Criticar');
INSERT INTO Verbo_Aplicado (verbo)
VALUES ('Juzgar');
INSERT INTO Verbo_Aplicado (verbo)
VALUES ('Valorar');
INSERT INTO Verbo_Aplicado (verbo)
VALUES ('Comparar');
INSERT INTO Verbo_Aplicado (verbo)
VALUES ('Contrastar');
INSERT INTO Verbo_Aplicado (verbo)
VALUES ('Asemejar');
INSERT INTO Verbo_Aplicado (verbo)
VALUES ('Diferenciar');
INSERT INTO Verbo_Aplicado (verbo)
VALUES ('Controntar');
INSERT INTO Verbo_Aplicado (verbo)
VALUES ('Cotejar');
INSERT INTO Verbo_Aplicado (verbo)
VALUES ('Explicar');
INSERT INTO Verbo_Aplicado (verbo)
VALUES ('Entender');
INSERT INTO Verbo_Aplicado (verbo)
VALUES ('Inferir');
INSERT INTO Verbo_Aplicado (verbo)
VALUES ('Comprender');
INSERT INTO Verbo_Aplicado (verbo)
VALUES ('Relacionar');
INSERT INTO Verbo_Aplicado (verbo)
VALUES ('Identificar causas');
INSERT INTO Verbo_Aplicado (verbo)
VALUES ('Teorizar');
INSERT INTO Verbo_Aplicado (verbo)
VALUES ('Predecir');
INSERT INTO Verbo_Aplicado (verbo)
VALUES ('Prever');
INSERT INTO Verbo_Aplicado (verbo)
VALUES ('Pronosticar');
INSERT INTO Verbo_Aplicado (verbo)
VALUES ('Anticipar');
INSERT INTO Verbo_Aplicado (verbo)
VALUES ('Estimar');
INSERT INTO Verbo_Aplicado (verbo)
VALUES ('Proponer');
INSERT INTO Verbo_Aplicado (verbo)
VALUES ('Formular');
INSERT INTO Verbo_Aplicado (verbo)
VALUES ('Diseñar');
INSERT INTO Verbo_Aplicado (verbo)
VALUES ('Crear');
INSERT INTO Verbo_Aplicado (verbo)
VALUES ('Proyectar');
INSERT INTO Verbo_Aplicado (verbo)
VALUES ('Inventar');
INSERT INTO Verbo_Aplicado (verbo)
VALUES ('Programar');
INSERT INTO Verbo_Aplicado (verbo)
VALUES ('Construir');
INSERT INTO Verbo_Aplicado (verbo)
VALUES ('Modificar');
INSERT INTO Verbo_Aplicado (verbo)
VALUES ('Determinar');
INSERT INTO Verbo_Aplicado (verbo)
VALUES ('Confirmar');
INSERT INTO Verbo_Aplicado (verbo)
VALUES ('Verificar');
INSERT INTO Verbo_Aplicado (verbo)
VALUES ('Comprobar');
INSERT INTO Verbo_Aplicado (verbo)
VALUES ('Demostrar');
INSERT INTO Verbo_Aplicado (verbo)
VALUES ('Probar');
INSERT INTO Verbo_Aplicado (verbo)
VALUES ('Corroborar');
INSERT INTO Verbo_Aplicado (verbo)
VALUES ('Contrastar');
INSERT INTO Verbo_Aplicado (verbo)
VALUES ('Evaluar');
INSERT INTO Verbo_Aplicado (verbo)
VALUES ('Valorar');


INSERT INTO Conjunto_Verbo (id_verbo_aplicado, id_tipo_investigacion)
VALUES (1,9);
INSERT INTO Conjunto_Verbo (id_verbo_aplicado, id_tipo_investigacion)
VALUES (2,9);
INSERT INTO Conjunto_Verbo (id_verbo_aplicado, id_tipo_investigacion)
VALUES (3,9);
INSERT INTO Conjunto_Verbo (id_verbo_aplicado, id_tipo_investigacion)
VALUES (4,9);
INSERT INTO Conjunto_Verbo (id_verbo_aplicado, id_tipo_investigacion)
VALUES (5,1);
INSERT INTO Conjunto_Verbo (id_verbo_aplicado, id_tipo_investigacion)
VALUES (6,1);
INSERT INTO Conjunto_Verbo (id_verbo_aplicado, id_tipo_investigacion)
VALUES (7,1);
INSERT INTO Conjunto_Verbo (id_verbo_aplicado, id_tipo_investigacion)
VALUES (8,1);
INSERT INTO Conjunto_Verbo (id_verbo_aplicado, id_tipo_investigacion)
VALUES (9,1);
INSERT INTO Conjunto_Verbo (id_verbo_aplicado, id_tipo_investigacion)
VALUES (10,1);
INSERT INTO Conjunto_Verbo (id_verbo_aplicado, id_tipo_investigacion)
VALUES (11,1);
INSERT INTO Conjunto_Verbo (id_verbo_aplicado, id_tipo_investigacion)
VALUES (12,1);
INSERT INTO Conjunto_Verbo (id_verbo_aplicado, id_tipo_investigacion)
VALUES (13,2);
INSERT INTO Conjunto_Verbo (id_verbo_aplicado, id_tipo_investigacion)
VALUES (14,2);
INSERT INTO Conjunto_Verbo (id_verbo_aplicado, id_tipo_investigacion)
VALUES (15,2);
INSERT INTO Conjunto_Verbo (id_verbo_aplicado, id_tipo_investigacion)
VALUES (16,2);
INSERT INTO Conjunto_Verbo (id_verbo_aplicado, id_tipo_investigacion)
VALUES (17,2);
INSERT INTO Conjunto_Verbo (id_verbo_aplicado, id_tipo_investigacion)
VALUES (18,3);
INSERT INTO Conjunto_Verbo (id_verbo_aplicado, id_tipo_investigacion)
VALUES (19,3);
INSERT INTO Conjunto_Verbo (id_verbo_aplicado, id_tipo_investigacion)
VALUES (20,3);
INSERT INTO Conjunto_Verbo (id_verbo_aplicado, id_tipo_investigacion)
VALUES (21,3);
INSERT INTO Conjunto_Verbo (id_verbo_aplicado, id_tipo_investigacion)
VALUES (22,3);
INSERT INTO Conjunto_Verbo (id_verbo_aplicado, id_tipo_investigacion)
VALUES (23,3);
INSERT INTO Conjunto_Verbo (id_verbo_aplicado, id_tipo_investigacion)
VALUES (24,4);
INSERT INTO Conjunto_Verbo (id_verbo_aplicado, id_tipo_investigacion)
VALUES (25,4);
INSERT INTO Conjunto_Verbo (id_verbo_aplicado, id_tipo_investigacion)
VALUES (26,4);
INSERT INTO Conjunto_Verbo (id_verbo_aplicado, id_tipo_investigacion)
VALUES (27,4);
INSERT INTO Conjunto_Verbo (id_verbo_aplicado, id_tipo_investigacion)
VALUES (28,4);
INSERT INTO Conjunto_Verbo (id_verbo_aplicado, id_tipo_investigacion)
VALUES (29,4);
INSERT INTO Conjunto_Verbo (id_verbo_aplicado, id_tipo_investigacion)
VALUES (30,4);
INSERT INTO Conjunto_Verbo (id_verbo_aplicado, id_tipo_investigacion)
VALUES (31,5);
INSERT INTO Conjunto_Verbo (id_verbo_aplicado, id_tipo_investigacion)
VALUES (32,5);
INSERT INTO Conjunto_Verbo (id_verbo_aplicado, id_tipo_investigacion)
VALUES (33,5);
INSERT INTO Conjunto_Verbo (id_verbo_aplicado, id_tipo_investigacion)
VALUES (34,5);
INSERT INTO Conjunto_Verbo (id_verbo_aplicado, id_tipo_investigacion)
VALUES (35,5);
INSERT INTO Conjunto_Verbo (id_verbo_aplicado, id_tipo_investigacion)
VALUES (36,6);
INSERT INTO Conjunto_Verbo (id_verbo_aplicado, id_tipo_investigacion)
VALUES (37,6);
INSERT INTO Conjunto_Verbo (id_verbo_aplicado, id_tipo_investigacion)
VALUES (38,6);
INSERT INTO Conjunto_Verbo (id_verbo_aplicado, id_tipo_investigacion)
VALUES (39,6);
INSERT INTO Conjunto_Verbo (id_verbo_aplicado, id_tipo_investigacion)
VALUES (40,6);
INSERT INTO Conjunto_Verbo (id_verbo_aplicado, id_tipo_investigacion)
VALUES (41,6);
INSERT INTO Conjunto_Verbo (id_verbo_aplicado, id_tipo_investigacion)
VALUES (42,6);
INSERT INTO Conjunto_Verbo (id_verbo_aplicado, id_tipo_investigacion)
VALUES (43,6);
INSERT INTO Conjunto_Verbo (id_verbo_aplicado, id_tipo_investigacion)
VALUES (44,10);
INSERT INTO Conjunto_Verbo (id_verbo_aplicado, id_tipo_investigacion)
VALUES (45,7);
INSERT INTO Conjunto_Verbo (id_verbo_aplicado, id_tipo_investigacion)
VALUES (46,7);
INSERT INTO Conjunto_Verbo (id_verbo_aplicado, id_tipo_investigacion)
VALUES (47,7);
INSERT INTO Conjunto_Verbo (id_verbo_aplicado, id_tipo_investigacion)
VALUES (48,7);
INSERT INTO Conjunto_Verbo (id_verbo_aplicado, id_tipo_investigacion)
VALUES (49,7);
INSERT INTO Conjunto_Verbo (id_verbo_aplicado, id_tipo_investigacion)
VALUES (50,7);
INSERT INTO Conjunto_Verbo (id_verbo_aplicado, id_tipo_investigacion)
VALUES (51,7);
INSERT INTO Conjunto_Verbo (id_verbo_aplicado, id_tipo_investigacion)
VALUES (52,7);
INSERT INTO Conjunto_Verbo (id_verbo_aplicado, id_tipo_investigacion)
VALUES (53,8);
INSERT INTO Conjunto_Verbo (id_verbo_aplicado, id_tipo_investigacion)
VALUES (54,8);
INSERT INTO Conjunto_Verbo (id_verbo_aplicado, id_tipo_investigacion)
VALUES (35,8);

INSERT INTO Clase_Evento (Nombre)
VALUES ('Evento a describir');
INSERT INTO Clase_Evento (Nombre)
VALUES ('Evento de contexto');
INSERT INTO Clase_Evento (Nombre)
VALUES ('Evento a comparar');
INSERT INTO Clase_Evento (Nombre)
VALUES ('Evento de clasificacion');
INSERT INTO Clase_Evento (Nombre)
VALUES ('Evento a analizar');
INSERT INTO Clase_Evento (Nombre)
VALUES ('Criterio de analisis');
INSERT INTO Clase_Evento (Nombre)
VALUES ('Evento a explicar');
INSERT INTO Clase_Evento (Nombre)
VALUES ('Evento a predecir o evento focal');
INSERT INTO Clase_Evento (Nombre)
VALUES ('Evento a predecir');
INSERT INTO Clase_Evento (Nombre)
VALUES ('Evento a modificar');
INSERT INTO Clase_Evento (Nombre)
VALUES ('Evento interviniente');
INSERT INTO Clase_Evento (Nombre)
VALUES ('Evento a desear');
INSERT INTO Clase_Evento (Nombre)
VALUES ('Evento a controlar');
INSERT INTO Clase_Evento (Nombre)
VALUES ('Evento intercurrente');

INSERT INTO Clase_Evento_Estructural (Nombre)
VALUES ('Evento a describir');
INSERT INTO Clase_Evento_Estructural (Nombre)
VALUES ('Evento de contexto');
INSERT INTO Clase_Evento_Estructural (Nombre)
VALUES ('Evento a comparar');
INSERT INTO Clase_Evento_Estructural (Nombre)
VALUES ('Evento de clasificacion');
INSERT INTO Clase_Evento_Estructural (Nombre)
VALUES ('Evento a analizar');
INSERT INTO Clase_Evento_Estructural (Nombre)
VALUES ('Criterio de analisis');
INSERT INTO Clase_Evento_Estructural (Nombre)
VALUES ('Evento a explicar');
INSERT INTO Clase_Evento_Estructural (Nombre)
VALUES ('Evento a predecir o evento focal');
INSERT INTO Clase_Evento_Estructural (Nombre)
VALUES ('Evento a predecir');
INSERT INTO Clase_Evento_Estructural (Nombre)
VALUES ('Evento a modificar');
INSERT INTO Clase_Evento_Estructural (Nombre)
VALUES ('Evento interviniente');
INSERT INTO Clase_Evento_Estructural (Nombre)
VALUES ('Evento a desear');
INSERT INTO Clase_Evento_Estructural (Nombre)
VALUES ('Evento a controlar');
INSERT INTO Clase_Evento_Estructural (Nombre)
VALUES ('Evento intercurrente');

INSERT INTO Tipo_Evento (nombre)
VALUES ('Situacion');
INSERT INTO Tipo_Evento (nombre)
VALUES ('Hecho');
INSERT INTO Tipo_Evento (nombre)
VALUES ('Caracteristica');
INSERT INTO Tipo_Evento (nombre)
VALUES ('Proceso');
INSERT INTO Tipo_Evento (nombre)
VALUES ('Comportamiento');

INSERT INTO Tipo_Evento_Estructural (nombre)
VALUES ('Situacion');
INSERT INTO Tipo_Evento_Estructural (nombre)
VALUES ('Hecho');
INSERT INTO Tipo_Evento_Estructural (nombre)
VALUES ('Caracteristica');
INSERT INTO Tipo_Evento_Estructural (nombre)
VALUES ('Proceso');
INSERT INTO Tipo_Evento_Estructural (nombre)
VALUES ('Comportamiento');

INSERT INTO Estadio (nombre)
VALUES ('Descriptiva');
INSERT INTO Estadio (nombre)
VALUES ('Analitica');
INSERT INTO Estadio (nombre)
VALUES ('Comparativa');
INSERT INTO Estadio (nombre)
VALUES ('Explicativa');
INSERT INTO Estadio (nombre)
VALUES ('Predictiva');
INSERT INTO Estadio (nombre)
VALUES ('Proyectiva');
INSERT INTO Estadio (nombre)
VALUES ('Confirmatoria');
INSERT INTO Estadio (nombre)
VALUES ('Evaluativa');
INSERT INTO Estadio (nombre)
VALUES ('Exploratoria');
INSERT INTO Estadio (nombre)
VALUES ('Interactiva');

INSERT INTO Tipo_Estadio_Estructural (nombre)
VALUES ('Descriptiva');
INSERT INTO Tipo_Estadio_Estructural (nombre)
VALUES ('Analitica');
INSERT INTO Tipo_Estadio_Estructural (nombre)
VALUES ('Comparativa');
INSERT INTO Tipo_Estadio_Estructural (nombre)
VALUES ('Explicativa');
INSERT INTO Tipo_Estadio_Estructural (nombre)
VALUES ('Predictiva');
INSERT INTO Tipo_Estadio_Estructural (nombre)
VALUES ('Proyectiva');
INSERT INTO Tipo_Estadio_Estructural (nombre)
VALUES ('Confirmatoria');
INSERT INTO Tipo_Estadio_Estructural (nombre)
VALUES ('Evaluativa');
INSERT INTO Tipo_Estadio_Estructural (nombre)
VALUES ('Exploratoria');
INSERT INTO Tipo_Estadio_Estructural (nombre)
VALUES ('Interactiva');

INSERT INTO Conjuncion (conjuncion, id_tipo_investigacion)
VALUES ('Las caracteristicas', 1);
INSERT INTO Conjuncion (conjuncion, id_tipo_investigacion)
VALUES ('Las cualidades', 1);
INSERT INTO Conjuncion (conjuncion, id_tipo_investigacion)
VALUES ('Las condiciones', 1);
INSERT INTO Conjuncion (conjuncion, id_tipo_investigacion)
VALUES ('Las diferencias y semejanzas', 3);
INSERT INTO Conjuncion (conjuncion, id_tipo_investigacion)
VALUES ('La correspondencia', 2);
INSERT INTO Conjuncion (conjuncion, id_tipo_investigacion)
VALUES ('Las causas', 4);
INSERT INTO Conjuncion (conjuncion, id_tipo_investigacion)
VALUES ('Los factores que incidan', 4);
INSERT INTO Conjuncion (conjuncion, id_tipo_investigacion)
VALUES ('Las tendencias', 5);
INSERT INTO Conjuncion (conjuncion, id_tipo_investigacion)
VALUES ('Los escenarios', 5);
INSERT INTO Conjuncion (conjuncion, id_tipo_investigacion)
VALUES ('La condicion futura', 5);
INSERT INTO Conjuncion (conjuncion, id_tipo_investigacion)
VALUES ('Las acciones para', 6);
INSERT INTO Conjuncion (conjuncion, id_tipo_investigacion)
VALUES ('Los mecanismos para', 6);
INSERT INTO Conjuncion (conjuncion, id_tipo_investigacion)
VALUES ('La relacion', 7);
INSERT INTO Conjuncion (conjuncion, id_tipo_investigacion)
VALUES ('La conexion', 7);
INSERT INTO Conjuncion (conjuncion, id_tipo_investigacion)
VALUES ('A influencia', 7);
INSERT INTO Conjuncion (conjuncion, id_tipo_investigacion)
VALUES ('La efectividad', 8);
INSERT INTO Conjuncion (conjuncion, id_tipo_investigacion)
VALUES ('El impacto', 8);


INSERT INTO Tipo_Item (nombre, descripcion)
VALUES ('Respuesta abierta breve.', ' Respuesta de poca elaboracion, libre y corta.');
INSERT INTO Tipo_Item (nombre, descripcion)
VALUES ('Respuesta abierta por completar', 'Se requiere una unica palabra pra completar la respuesta');
INSERT INTO Tipo_Item (nombre, descripcion)
VALUES ('Respuesta abierta tipo ensayo', 'Se le pide al encuestado que desarrolle de manera relativamente extensa, y con sus propias palabras la respuesta.');
INSERT INTO Tipo_Item (nombre, descripcion)
VALUES ('Respuesta dicotomica', 'Respuesta cerrada centrada en 2 opciones');
INSERT INTO Tipo_Item (nombre, descripcion)
VALUES ('Respuesta de seleccion simple', 'Se realiza una respuesta seleccionada de multiples opciones, respuesta de 1 sola opcion.');
INSERT INTO Tipo_Item (nombre, descripcion)
VALUES ('Respuesta de seleccion multiple', 'Igual que la respuesta de seleccion multiple con la posibilidad de seleccionar mas de una opcion');
INSERT INTO Tipo_Item (nombre, descripcion)
VALUES ('Respuesta cerrada de jerarquizacion', 'Implican necesariamente ordenar las alternativas de respuesta.');
INSERT INTO Tipo_Item (nombre, descripcion)
VALUES ('Estimacion', 'Establece bajo alguna percepcion cualitativa, la estimacion respecto a una pregunta.');
INSERT INTO Tipo_Item (nombre, descripcion)
VALUES ('Correspondencia', 'Tambien llamdas de apareamiento o casamiento, son aquellos en los cuales al encuestado se le presentan dos columnas enfrentadas de palabras o frases.');
INSERT INTO Tipo_Item (nombre, descripcion)
VALUES ('Localizacion e identificacion', 'Se le pide al encrestado que señale o indique la respuesta, sobre algun material impreso, que puede ser un grafico, un esquema o un mapa, entre otros.');
INSERT INTO Tipo_Item (nombre, descripcion)
VALUES ('Pregunta de hecho', 'Estan referidas a hechos o acontecimientos y versan sobre asuntoss concretos, faciles de precisar y comprobar.');
INSERT INTO Tipo_Item (nombre, descripcion)
VALUES ('Pregunta de acción', 'Se refieren a actividades, actitudes o decisiones tomadas por el encuestado.');
INSERT INTO Tipo_Item (nombre, descripcion)
VALUES ('Pregunta de intencion', 'Su objetivo es indagar lo que la persona piensa sobre determinado hecho, idea o situacion, mas no lo que haria.');
INSERT INTO Tipo_Item (nombre, descripcion)
VALUES ('Pregunta de opinion', 'Estan dirigidas a indagar lo que la persona piensa sobre determinado hecho, idea o situacion, mas no lo que haria.');
INSERT INTO Tipo_Item (nombre, descripcion)
VALUES ('Pregunta de indice', 'Su proposito es obtener una informacion de manera indirecta, sin mencionar abiertamente el aspecto que se desea indagar.');
INSERT INTO Tipo_Item (nombre, descripcion)
VALUES ('Pregunta tamiz', 'Actuan como filtro antes de proseguir con las siguientes preguntas, pues estas podrian tener o no sentido en funcion de la respuesta dada a la pregunta tamiz.');
INSERT INTO Tipo_Item (nombre, descripcion)
VALUES ('Pregunta introductoria', 'Se hacen al comienzo del cuestionario y su objetivo es captar la atencion, motivar y generar confianza en el encuestado.');
INSERT INTO Tipo_Item (nombre, descripcion)
VALUES ('Pregunta Preparatoria', 'Preceden a preguntas que abordan temas escabrosos o delicados y su objetivo es suavizar el efecto de dichas preguntas.');
INSERT INTO Tipo_Item (nombre, descripcion)
VALUES ('Pregunta control', 'Su intencion es comprobar la veracidad de las respuestas dadas por el encuestado. Suelen ser preguntas similares pero redactadas de otra manera o preguntas que al ser respondidas confirman o no las anteriores en funcion de la relacion que tienen con ellas.');
INSERT INTO Tipo_Item (nombre, descripcion)
VALUES ('Pregunta de clasificacion', 'Proporciona informacion que permite clasificar a los encuestados y crear ciertos grupos para el analisis.');

INSERT INTO Obligatoriedad (cualitatividad)
VALUES ('Opcional');
INSERT INTO Obligatoriedad (cualitatividad)
VALUES ('Requerido');

INSERT INTO Tipo_Fuente (nombre)
VALUES ('Primaria');
INSERT INTO Tipo_Fuente (nombre)
VALUES ('Secundaria');
INSERT INTO Tipo_Fuente (nombre)
VALUES ('Terciaria');

INSERT INTO Estandar (nombre)
VALUES ('APA');
INSERT INTO Estandar (nombre)
VALUES ('IEEE');

INSERT INTO Base_Noologica(nombre,descripcion)
VALUES ('Referencial','Reseñas de investigaciones anteriores relacionadas con el enunciado holopraxico.');
INSERT INTO Base_Noologica(nombre,descripcion)
VALUES ('Conceptual','Definicion y comprension de los eventos de estudio. Se analizan y describen los conceptos fundamentales relacionados con la pregunta de investigacion y, especialmente con el evento de estudio.');
INSERT INTO Base_Noologica(nombre,descripcion)
VALUES ('Teorica','Desarrollo de la teoria que permite comprender y sustentar la investigacion. implica revisar y confrontar teorias. Con base en esta confrontacion, el investigador podra tomar partido de alguna de ellas o construir un sintagma.');
INSERT INTO Base_Noologica(nombre,descripcion)
VALUES ('Epistemica','Desarrollo del modelo epistemico en el cual se enmarca el estudio. Como lo señala la autora, cada teoria esta en correspondencia con un modelo epistemico, el cual representa una postura filosofica con la cual puede coincidir el autor y, por lo tanto, servir de enfoque o lineamiento filosofico para su estudio.');
INSERT INTO Base_Noologica(nombre,descripcion)
VALUES ('Historiografica','Reseña historiografica y cultural que delimita y describe el contexto en el cual se desarrolla el estudio. El contexto historico es conveniente incluirlo cuando se hace investigaciones descriptivas, donde el evento que se estudia en la actualidad es producto de su historia anterior.');
INSERT INTO Base_Noologica(nombre,descripcion)
VALUES ('Legal','Contexto legal, segun la normativa del pais se lleva a cabo la investigacion, se requiere principalmente, en las investigaciones proyectivas o interactivas, donde se desea proponer un plan de accion e incluso aplicarlo.');

INSERT INTO Tecnica_Practica (nombre)
VALUES ('Observacion');
INSERT INTO Tecnica_Practica (nombre)
VALUES ('Entrevista');
INSERT INTO Tecnica_Practica (nombre)
VALUES ('Encuesta');
INSERT INTO Tecnica_Practica (nombre)
VALUES ('Sesion en profundidad');
INSERT INTO Tecnica_Practica (nombre)
VALUES ('Revision Documental');

INSERT INTO Instrumento (nombre, descripcion)
VALUES ('Guia de observacion','Documento que permite encausar la accion de observar ciertos fenomenos.Esta guia, por lo general, se estructura a traves de columunas que favorecen la organizacion de los datos recogidos.');
INSERT INTO Instrumento (nombre, descripcion)
VALUES ('Lista de chequeo o de cotejo','Consiste en un listado de aspectos a evaluar (contenidos, capacidades, habilidades, conductas, etc.), al lado de los cuales se puede calificar ("O" visto bueno, o por ejemplo, una "X", si la conducta no es lograda) un puntaje, una nota o un concepto.');
INSERT INTO Instrumento (nombre, descripcion)
VALUES ('Escala de estimacion','Registro sistematico de una serie de rasgos o caracteristicas de los sujetos observados, que permite al observador asignar un valor a una determinada categoria conductual (unidad de observacion), indicando el grado de intensidad o frecuencia con que se manifiesta, mediante una calificacion cualitativa y/o cuantitativa.');
INSERT INTO Instrumento (nombre, descripcion)
VALUES ('Registro anecdotico','Es un instrumento en el cual se describen comportamientos imortantes del alumno/a en situaciones cotidianas.');
INSERT INTO Instrumento (nombre, descripcion)
VALUES ('Registro de especimenes','Registro de los diferentes cambios a lo largo de un lapso de tiempo determinado, especificando las caracteristicas.');
INSERT INTO Instrumento (nombre, descripcion)
VALUES ('Registro global','Un registro global captura informacion sobre un problema que afecta a muchas personas.');
INSERT INTO Instrumento (nombre, descripcion)
VALUES ('Guia de Entrevista','Elemento que realiza una serie de preguntas para ser contestada y analizada por parte de resultado a los pasos de la misma.');
INSERT INTO Instrumento (nombre, descripcion)
VALUES ('Cuestionario','Un cuestionario es una herramienta de investigacion que consiste en una serie de preguntas y otras indicaciones con el proposito de obtener informacion de los consultados.');
INSERT INTO Instrumento (nombre, descripcion)
VALUES ('Test',' Prueba de confrontacion, especialmente la que se emplea en pedagogia, psicotecnica, medicina, etc., para evaluar el grado de inteligencia, la capcidad de atencion u otras aptitudes o conductas.');
INSERT INTO Instrumento (nombre, descripcion)
VALUES ('Matriz de categorias','Permite saber que preguntar, para que y asegura que permita presentar los resultados de manera coherente y ordenada.');
INSERT INTO Instrumento (nombre, descripcion)
VALUES ('Matriz de analisis','Es una conocida herramienta estrategica de analisis de la situacion de la empresa.');
INSERT INTO Instrumento (nombre, descripcion)
VALUES ('Matriz de registro','Cuando mas de un grupo proporciona el mismo servicio, se utilizan utiliza registros de matriz de asignacion de servicios para evaluar y asignar el trabajo al proveedor de servicios adecuado.');

INSERT INTO Logica_Aplicada (id_tecnica_practica, id_instrumento)
VALUES (1,1);
INSERT INTO Logica_Aplicada (id_tecnica_practica, id_instrumento)
VALUES (1,2);
INSERT INTO Logica_Aplicada (id_tecnica_practica, id_instrumento)
VALUES (1,3);
INSERT INTO Logica_Aplicada (id_tecnica_practica, id_instrumento)
VALUES (1,4);
INSERT INTO Logica_Aplicada (id_tecnica_practica, id_instrumento)
VALUES (1,5);
INSERT INTO Logica_Aplicada (id_tecnica_practica, id_instrumento)
VALUES (1,6);
INSERT INTO Logica_Aplicada (id_tecnica_practica, id_instrumento)
VALUES (2,7);
INSERT INTO Logica_Aplicada (id_tecnica_practica, id_instrumento)
VALUES (3,8);
INSERT INTO Logica_Aplicada (id_tecnica_practica, id_instrumento)
VALUES (3,3);
INSERT INTO Logica_Aplicada (id_tecnica_practica, id_instrumento)
VALUES (3,9);
INSERT INTO Logica_Aplicada (id_tecnica_practica, id_instrumento)
VALUES (4,1);
INSERT INTO Logica_Aplicada (id_tecnica_practica, id_instrumento)
VALUES (4,7);
INSERT INTO Logica_Aplicada (id_tecnica_practica, id_instrumento)
VALUES (4,4);
INSERT INTO Logica_Aplicada (id_tecnica_practica, id_instrumento)
VALUES (5,10);
INSERT INTO Logica_Aplicada (id_tecnica_practica, id_instrumento)
VALUES (5,11);
INSERT INTO Logica_Aplicada (id_tecnica_practica, id_instrumento)
VALUES (5,12);

INSERT INTO Tecnica_Muestreo(nombre,descripcion)
VALUES ('Azar Simple','Consiste en elaborar una lista con todos los integrantes de la poblacion, asignarle un codigo a cada uno, y luego selecionar a los integrantes de la muestra mediante la tabla de numeros aleatorios.');
INSERT INTO Tecnica_Muestreo(nombre,descripcion)
VALUES ('Azar sistematico','Se elabora un listado completo de los miembros de la poblacion, se enumeran y luego se calcula el valor k con base en la formula: k=N/n');
INSERT INTO Tecnica_Muestreo(nombre,descripcion)
VALUES ('Muestreo estratificado','Cuando una poblacion es heterogenea con respecto a una o varias caracteristicas relevantes para los resultados, y algunos sectores de la poblacion son tan pequeños que corren el riesgo de no quedar representados en ella, se utiliza el muestreo estratificado.');
INSERT INTO Tecnica_Muestreo(nombre,descripcion)
VALUES ('Conglomerados','Es basicamente una estratificacion geografica. La poblacion estudiaba debe ser organizada en subconjuntos con caracteristicas comunes al grupo total; estos subgrupos se denominan conglomerados.');
INSERT INTO Tecnica_Muestreo(nombre,descripcion)
VALUES ('Por Cuotas','Consiste en formar la muestra de manera tal que cada uno  de los sectores de la poblacion quede representado en igual proporcion dentro de la muestra, pero se elige arbitrariamente a sus integrantes (Ramirez, 1992).');
INSERT INTO Tecnica_Muestreo(nombre,descripcion)
VALUES ('Casual','En este tipo de muestreo unicamente se determina el tamaño de la muestra, pero los integrantes se seleccionan sin ningun criterio establecido. Se seleccionan los casos disponibles en el momento.');
INSERT INTO Tecnica_Muestreo(nombre,descripcion)
VALUES ('Intencional','La muestra se escoge en terminos de criterios teoricos que de alguna manera sugieren que ciertas unidades son las mas convenientes para acceder a la informacion que se requiere.');
INSERT INTO Tecnica_Muestreo(nombre,descripcion)
VALUES ('Autoseleccion','En este caso la muestra queda conformada por unidades que no fueron seleccionadas de ninguna manera por el investigador, sino que llegaron alli por razones de diversa indole.');

INSERT INTO Tipo_Argumentacion (nombre, descripcion)
VALUES ('Necesidades',' Una forma de argumentar es con base en las necesidades. El darse cuenta de que una situacion no se desarrolla segun lo esperado o lo deseado, o de la existencia de vacios o carencias, forma parte de la justificacion. En ese caso, la investigacion se hace porque hay hechos o situaciones que evidencian necesidades, situaciones no deseadas, ausencias.');
INSERT INTO Tipo_Argumentacion (nombre, descripcion)
VALUES ('Curiosidades y preocupaciones','La investigacion se hace porque hay curiosidades y preguntas no resultas, ya sea porque investigadores y reflexiones que se han hecho anteriormente han generado tales curiosidades o por la carencia de estudios que le den respuesta a esas inquietudes.');
INSERT INTO Tipo_Argumentacion (nombre, descripcion)
VALUES ('Motivaciones, intereses y valores','Se hace porque el tema es importante o porque ese tem o esa situacion es valorada por muchas personas.');
INSERT INTO Tipo_Argumentacion (nombre, descripcion)
VALUES ('Potencialidades','Representan posibilidades, se hace porque existen cosas que podrian hacer pero no se han hecho, o porque existen posibilidades no aprovechadas.');
INSERT INTO Tipo_Argumentacion (nombre, descripcion)
VALUES ('Oportunidadaes','La investigacion se hace porque estan dadas condiciones que la favorecen.');
INSERT INTO Tipo_Argumentacion (nombre, descripcion)
VALUES ('Tendencias','La investigacion se hace porque las tendencias institucionales, locales, regionales, nacionales o mundiales se orientan de tal manera que el conocimiento generado por esa investigacion se requiere.');
INSERT INTO Tipo_Argumentacion (nombre, descripcion)
VALUES ('Contradicciones','la investigacion se hace porque en el contexto existen contradicciones evidentes relacionadas con una misma situacion.');

INSERT INTO Escala (nombre)
VALUES ('Nominal');
INSERT INTO Escala (nombre)
VALUES ('Ordinal');
INSERT INTO Escala (nombre)
VALUES ('Intervalo');
INSERT INTO Escala (nombre)
VALUES ('Razon');

INSERT INTO Parametro (nombre, contenido)
VALUES ('Intensidad', 'Refiere bajo a una escala cualitativa que representa un unico dato.');
INSERT INTO Parametro (nombre, contenido)
VALUES ('Frecuencia', 'Refiere bajo repeticion especifica del mismo dato.');

INSERT INTO Pregunta_Modular(contenido,id_tipo_investigacion)
VALUES ('Que en tal contexto?',9);
INSERT INTO Pregunta_Modular(contenido,id_tipo_investigacion)
VALUES ('Que ocurre en el contexto x?',9);
INSERT INTO Pregunta_Modular(contenido,id_tipo_investigacion)
VALUES ('Que preguntas pueden formularse sobre la situacion Z?',9);
INSERT INTO Pregunta_Modular(contenido,id_tipo_investigacion)
VALUES ('Como es?',1);
INSERT INTO Pregunta_Modular(contenido,id_tipo_investigacion)
VALUES ('Quienes son?',1);
INSERT INTO Pregunta_Modular(contenido,id_tipo_investigacion)
VALUES ('Cuantos hay?',1);
INSERT INTO Pregunta_Modular(contenido,id_tipo_investigacion)
VALUES ('Cuales son sus caracteristicas?',1);
INSERT INTO Pregunta_Modular(contenido,id_tipo_investigacion)
VALUES ('Como varia en el tiempo?',1);
INSERT INTO Pregunta_Modular(contenido,id_tipo_investigacion)
VALUES ('Que ocurre?',1);
INSERT INTO Pregunta_Modular(contenido,id_tipo_investigacion)
VALUES ('Cuales son los tipos?',1);
INSERT INTO Pregunta_Modular(contenido,id_tipo_investigacion)
VALUES ('En que medida el evento se ajusta a tales criterios?',2);
INSERT INTO Pregunta_Modular(contenido,id_tipo_investigacion)
VALUES ('Como se interpreta?',2);
INSERT INTO Pregunta_Modular(contenido,id_tipo_investigacion)
VALUES ('Cuales son los aspectos menos evidentes del evento?',2);
INSERT INTO Pregunta_Modular(contenido,id_tipo_investigacion)
VALUES ('Que es lo implicito?',2);
INSERT INTO Pregunta_Modular(contenido,id_tipo_investigacion)
VALUES ('Que es lo connotado?',2);
INSERT INTO Pregunta_Modular(contenido,id_tipo_investigacion)
VALUES ('Se manifiesta de forma diferente este evento en dos o mas grupos o contextos?',3);
INSERT INTO Pregunta_Modular(contenido,id_tipo_investigacion)
VALUES ('Que diferencia hay entre estos grupos en cuanto a ese evento?',3);
INSERT INTO Pregunta_Modular(contenido,id_tipo_investigacion)
VALUES ('Que semejanzas hay entre los grupos en cuanto al evento?',3);
INSERT INTO Pregunta_Modular(contenido,id_tipo_investigacion)
VALUES ('Por que ocurre este evento?',4);
INSERT INTO Pregunta_Modular(contenido,id_tipo_investigacion)
VALUES ('Cuales son las causas que lo originaron?',4);
INSERT INTO Pregunta_Modular(contenido,id_tipo_investigacion)
VALUES ('Como varia este fenomeno en presencia de otros fenomenos?',4);
INSERT INTO Pregunta_Modular(contenido,id_tipo_investigacion)
VALUES ('Como sera este evento en un futuro que reuna tales condiciones?',5);
INSERT INTO Pregunta_Modular(contenido,id_tipo_investigacion)
VALUES ('Dadas X circunstancias, cuales seran las situaciones futuras?',5);
INSERT INTO Pregunta_Modular(contenido,id_tipo_investigacion)
VALUES ('Cuales seran los escenarios mas probables de este evento dentro de X años?',5);
INSERT INTO Pregunta_Modular(contenido,id_tipo_investigacion)
VALUES ('Cuales serian las caracteristicas de un aparato, diseño, plan o propuesta, que permita lograr tales objetivos relacionados con este evento?',6);
INSERT INTO Pregunta_Modular(contenido,id_tipo_investigacion)
VALUES ('Como estaria diseñado algo que permitiera lograr tales cambios?',6);
INSERT INTO Pregunta_Modular(contenido,id_tipo_investigacion)
VALUES ('Como seria la aplicacion de tal propuesta?',10);
INSERT INTO Pregunta_Modular(contenido,id_tipo_investigacion)
VALUES ('Que cambios se pueden producir en este fenomeno, durante la aplicacion de este diseño, programa ,modificacion?',10);
INSERT INTO Pregunta_Modular(contenido,id_tipo_investigacion)
VALUES ('Existe relacion entre estos dos eventos?',7);
INSERT INTO Pregunta_Modular(contenido,id_tipo_investigacion)
VALUES ('Como incide el evento A sobre el evento B, si se controlan los eventos C,D y E?',7);
INSERT INTO Pregunta_Modular(contenido,id_tipo_investigacion)
VALUES ('El programa o diseño relacionado con este evento, esta alcanzando los objetivos qeu se propuso?',8);
INSERT INTO Pregunta_Modular(contenido,id_tipo_investigacion)
VALUES ('Cuales objetivos del programa se han logrado?',8);
INSERT INTO Pregunta_Modular(contenido,id_tipo_investigacion)
VALUES ('Que tan efectivo es el programa X?',8);
INSERT INTO Pregunta_Modular(contenido,id_tipo_investigacion)
VALUES ('En cuales aspectos es mas efectivo el programa Y',8);

INSERT INTO Modalidad (nombre, id_tipo_investigacion)
VALUES ('Unica proyectiva', 6);

INSERT INTO Tecnica_Analisis(nombre)
VALUES ('Categorizacion');
INSERT INTO Tecnica_Analisis(nombre)
VALUES ('Morfologica');
INSERT INTO Tecnica_Analisis(nombre)
VALUES ('Composicion');
INSERT INTO Tecnica_Analisis(nombre)
VALUES ('Contingencia');
INSERT INTO Tecnica_Analisis(nombre)
VALUES ('Significado');
INSERT INTO Tecnica_Analisis(nombre)
VALUES ('Comparacion');
INSERT INTO Tecnica_Analisis(nombre)
VALUES ('Reaccion');
INSERT INTO Tecnica_Analisis(nombre)
VALUES ('Matriz de impacto cruzado');
INSERT INTO Tecnica_Analisis(nombre)
VALUES ('Arbol de Secuencias');
INSERT INTO Tecnica_Analisis(nombre)
VALUES ('Identificacion de ciclos reforzados y compensadores');
INSERT INTO Tecnica_Analisis(nombre)
VALUES ('Sintesis de conceptos');
INSERT INTO Tecnica_Analisis(nombre)
VALUES ('Componentes principales');
INSERT INTO Tecnica_Analisis(nombre)
VALUES ('Cluster de variables');
INSERT INTO Tecnica_Analisis(nombre)
VALUES ('Regresion multiple');
INSERT INTO Tecnica_Analisis(nombre)
VALUES ('Factorial');
INSERT INTO Tecnica_Analisis(nombre)
VALUES ('Correlacion');
INSERT INTO Tecnica_Analisis(nombre)
VALUES ('Lindice de acuerdo Kappa');
INSERT INTO Tecnica_Analisis(nombre)
VALUES ('Varianza');
INSERT INTO Tecnica_Analisis(nombre)
VALUES ('Segmentacion');
INSERT INTO Tecnica_Analisis(nombre)
VALUES ('Discriminante');
INSERT INTO Tecnica_Analisis(nombre)
VALUES ('Tendencia');
INSERT INTO Tecnica_Analisis(nombre)
VALUES ('Log lineal');
INSERT INTO Tecnica_Analisis(nombre)
VALUES ('Covarianza');
INSERT INTO Tecnica_Analisis(nombre)
VALUES ('Correlacion parcial');
INSERT INTO Tecnica_Analisis(nombre)
VALUES ('Regresion multiple');
INSERT INTO Tecnica_Analisis(nombre)
VALUES ('Analisis de interacciones');
INSERT INTO Tecnica_Analisis(nombre)
VALUES ('Media de muestra');
INSERT INTO Tecnica_Analisis(nombre)
VALUES ('Moda');
INSERT INTO Tecnica_Analisis(nombre)
VALUES ('Mediana');

INSERT INTO Clase_Sinergia (nombre)
VALUES ('Atributo');
INSERT INTO Clase_Sinergia (nombre)
VALUES ('Etapas');
INSERT INTO Clase_Sinergia (nombre)
VALUES ('Acciones');
INSERT INTO Clase_Sinergia (nombre)
VALUES ('Relato');
INSERT INTO Clase_Sinergia (nombre)
VALUES ('Estados');

INSERT INTO Entidad_Uso(nombre)
VALUES ('Evento');
INSERT INTO Clase_Sinergia (nombre)
VALUES ('Estadio');
INSERT INTO Clase_Sinergia (nombre)
VALUES ('Contexto');
INSERT INTO Clase_Sinergia (nombre)
VALUES ('Aplicacion Instrumental');
INSERT INTO Clase_Sinergia (nombre)
VALUES ('Sinergia');
INSERT INTO Clase_Sinergia (nombre)
VALUES ('Objetivo Especifico');
INSERT INTO Clase_Sinergia (nombre)
VALUES ('Problematica');
INSERT INTO Clase_Sinergia (nombre)
VALUES ('Justificacion');

INSERT INTO Area_Restriccion (Area)
VALUES ('Recursos');
INSERT INTO Clase_Sinergia (nombre)
VALUES ('Locacion');
INSERT INTO Clase_Sinergia (nombre)
VALUES ('Poblacion');
INSERT INTO Clase_Sinergia (nombre)
VALUES ('Humano');

INSERT INTO Objetivo_Estadial (tipo)
VALUES ('Libre');
INSERT INTO Objetivo_Estadial (tipo)
VALUES ('Definir la problematica y encontrar las causas que la generan.');
INSERT INTO Objetivo_Estadial (tipo)
VALUES ('Definir las condiciones deseadas.');
INSERT INTO Objetivo_Estadial (tipo)
VALUES ('Definir la demanda y deseo de la aplicacion de la solucion a realizar.');
INSERT INTO Objetivo_Estadial (tipo)
VALUES ('Establecer un presupuesto y necesidad');
INSERT INTO Objetivo_Estadial (tipo)
VALUES ('Establecer las ofertas y proyectos que se estan realizando');
INSERT INTO Objetivo_Estadial (tipo)
VALUES ('Analisis de las ofertas actuales de accion');
INSERT INTO Objetivo_Estadial (tipo)
VALUES ('Comparar las caracteristicas de los proyectos aplicados actualmente.');
INSERT INTO Objetivo_Estadial (tipo)
VALUES ('Explicar la causa y motivo de la problematica.');
INSERT INTO Objetivo_Estadial (tipo)
VALUES ('Anticipar situaciones futuras respecto a la problematica.');
INSERT INTO Objetivo_Estadial (tipo)
VALUES ('Diseñar y ejecutar la posible solucion a la problematica');

INSERT INTO Estadio_Estructural (id_obligatoriedad, id_modalidad, descripcion, id_tipo_estadio_estructural, posicion)
VALUES (2,1, 'Se trata de definir la problematica y encontrar las causas que la generan.', 1, 1);
INSERT INTO Estadio_Estructural (id_obligatoriedad, id_modalidad, descripcion, id_tipo_estadio_estructural, posicion)
VALUES (2,1, 'Se define todo el punto deseado a concretar, colocando las posibles soluciones a la problematica.', 1, 2);
INSERT INTO Estadio_Estructural (id_obligatoriedad, id_modalidad, descripcion, id_tipo_estadio_estructural, posicion)
VALUES (2,1, 'Se define y describe la necesidad de esta solucion para dar paso a concretarlo y realizarlo', 1, 3);
INSERT INTO Estadio_Estructural (id_obligatoriedad, id_modalidad, descripcion, id_tipo_estadio_estructural, posicion)
VALUES (2,1, 'Define el prespuesto y la necesidad de los recursos para cumplir la investigacion proyectiva.', 1, 4);
INSERT INTO Estadio_Estructural (id_obligatoriedad, id_modalidad, descripcion, id_tipo_estadio_estructural, posicion)
VALUES (2,1, 'Define los distintos proyectos ya existentes para poder establecer que aspectos se pueden aportar.', 1, 5);
INSERT INTO Estadio_Estructural (id_obligatoriedad, id_modalidad, descripcion, id_tipo_estadio_estructural, posicion)
VALUES (2,1, 'Se analiza los distintos proyectos definidos para establecer una comprension total de los mismos.', 2, 6);
INSERT INTO Estadio_Estructural (id_obligatoriedad, id_modalidad, descripcion, id_tipo_estadio_estructural, posicion)
VALUES (2,1, 'Se comparan todos los proyectos para establecer las semejanzas y diferencias.', 3, 7);
INSERT INTO Estadio_Estructural (id_obligatoriedad, id_modalidad, descripcion, id_tipo_estadio_estructural, posicion)
VALUES (2,1, 'Se establecen los distintos procesos causales, realizando las respectivas explicaciones', 4, 8);
INSERT INTO Estadio_Estructural (id_obligatoriedad, id_modalidad, descripcion, id_tipo_estadio_estructural, posicion)
VALUES (2,1, 'Se realiza la anticipacion de los eventos afectados dentro de la investigacion, para concretar una solucion que se mantenga en el tiempo.', 5, 9);
INSERT INTO Estadio_Estructural (id_obligatoriedad, id_modalidad, descripcion, id_tipo_estadio_estructural, posicion)
VALUES (2,1, 'Se establece el procedimiento y formacion del proyecto para realizar una posible solucion que establezca la solucion determinada en el estadio predictivo.', 6, 10);

INSERT INTO Objetivo_Especifico (id_estadio_estructural, tipo_objetivo, correspondencia)
VALUES (1,'Definir la problematica y encontrar las causas que la generan.', FALSE);
INSERT INTO Objetivo_Especifico (id_estadio_estructural, tipo_objetivo, correspondencia)
VALUES (2,'Definir las condiciones deseadas.', FALSE);
INSERT INTO Objetivo_Especifico (id_estadio_estructural, tipo_objetivo, correspondencia)
VALUES (3,'Definir la demanda y deseo de la aplicacion de la solucion a realizar.', FALSE);
INSERT INTO Objetivo_Especifico (id_estadio_estructural, tipo_objetivo, correspondencia)
VALUES (4,'Establecer un presupuesto y necesidad', FALSE);
INSERT INTO Objetivo_Especifico (id_estadio_estructural, tipo_objetivo, correspondencia)
VALUES (5,'Establecer las ofertas y proyectos que se estan realizando', FALSE);
INSERT INTO Objetivo_Especifico (id_estadio_estructural, tipo_objetivo, correspondencia)
VALUES (6,'Analisis de las ofertas actuales de accion', FALSE);
INSERT INTO Objetivo_Especifico (id_estadio_estructural, tipo_objetivo, correspondencia)
VALUES (7,'Comparar las caracteristicas de los proyectos aplicados actualmente.', FALSE);
INSERT INTO Objetivo_Especifico (id_estadio_estructural, tipo_objetivo, correspondencia)
VALUES (8,'Explicar la causa y motivo de la problematica.', FALSE);
INSERT INTO Objetivo_Especifico (id_estadio_estructural, tipo_objetivo, correspondencia)
VALUES (9,'Anticipar situaciones futuras respecto a la problematica.', FALSE);
INSERT INTO Objetivo_Especifico (id_estadio_estructural, tipo_objetivo, correspondencia)
VALUES (10,'Diseñar y ejecutar la posible solucion a la problematica', FALSE);


