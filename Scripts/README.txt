Creacion_bdd:
	Contiene los scripts para la creación total de la base de datos, incluyendo los ALTER TABLE para retirar los constraints respectivos, estos mismos aunque son ejecutados, los constraints vuelven a ser colocados y solamente tiene la función de poder acceder a los mismos rápido si es necesario.

eliminacion_bdd:
	Realiza un dropeo total de la base de datos, si se hace parcial se tiene que tener en cuenta que el dropeo lo hace en cascada por cada elemento, por lo tanto si se hace de forma individual el dropeo de una de las tablas, no se podrá ejecutar en totalidad el script.

seleccion_todo:
	Es el select para seleccionar todo de cada tabla.

insercion_prueba:
	Realiza la inserción en el orden que debería realizarse para llenar la base de datos. La inserción que realiza es muy básica y no tiene información relevante y de importancia/calidad para la entrega, es únicamente para ver el recorrido y realizar selects de prueba.

comandos_principales:
	Contiene seleccion,insercion y dropeo de toda la base de datos en un solo archivo, es una repetición.

borrar_contenido:
	Borra el contenido de las tablas (no es dropeo).

script_creation:
	Es el archivo que contiene todos los comandos de todos los archivos, siendo el principal con el cual se trabajó.

---Todos han sido probados---