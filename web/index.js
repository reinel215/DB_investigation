//Import de las rutas.
const RouterPrincipal= require('./routes/principal_route.js');
//Ruta principal para direccion de la pagina web.
const appRoute = require('./routes/app_route.js');
//Ruta de acceso principal a la aplicacion.
const login= require('./middlewares/session.js');
//Modulo de manejo de servidor backend express
const express = require("express");
//Parser del contenido de peticiones.
const bodyParser = require("body-parser");
//Modulo de compilacion y empaquetado de la aplicacion react.
const webpack = require('webpack');
//Proceso de manejo del webpack a tiempo real.
const webpackDevMiddleware = require('webpack-dev-middleware');
//Configuracion del webpack.
const config = require('./webpack.config.js');
//Compilacion del webpack config para su uso en el middleware dentro del servidor.
const compiler = webpack(config);
var session = require("express-session");
//Session es el metodo para asignar la cookie de inicio de sesion. un Id especifico para su entrada.

//rutas para el blog y su pagina respectiva.

var app = express();

//Herramientas de parseo y demas.
app.use(webpackDevMiddleware(compiler,{
  publicPath: config.output.publicPath
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'));
//Se establecen los registros por sesion, el id de la sesion, el hash secreto.
//express trae por default los inicios de sesiones, pero con la funcion en genid se establece una funcion unica para generar ids unicas para cada usuario.
app.use(session({
  secret: "ekjwhjkhw21",
  //la sesion se vuelve a guardar si ha sido modificada la sesion, si dos usuarios entran en paralelo, ambos pueden modificar la sesion, por lo tanto lo mejor es colocarlo en false.
  resave: false,
  //La sesion debe guardarse aun cuando no ha sido no inicializada, una sesion no inicializada significa que es nueva pero no modificada. Reduce el store colocarla en false.
  saveUninitialized: false
}));
app.set("view engine", "jade");

//Enrutamientos
app.use("/",RouterPrincipal);
app.use("/login",login);
app.use("/app",appRoute);

//Meta data para los contenidos de la pagina


//Ejecucion de la escucha por el puerto aleatorio para el server e inicio de su funcionamiento.
var server = app.listen(process.env.PORT || 5000, function() {
  var port = server.address().port;
  console.log("Express is working on port " + port);
});
