import React, { Component } from 'react';
//Router para renderizar los componentes segun direccion de los mismos.
import {Router, Switch, Route, Link} from 'react-router-dom';

class Navbar extends Component {

  render(){
    //Debe incluirse a traves de switch y link los diferentes componentes a renderizar en vez de <a>
    return(
      <nav className="Navbar navbar navbar-expand-lg navbar-light bg-dark">
        <a class="navbar-brand text-light" href="#">Navbar</a>
          <button class="navbar-toggler text-light" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <Link to='/home'>
              <li class="nav-item active">
                <a class="nav-link text-light">Principal <span class="sr-only">(current)</span></a>
              </li>
            </Link>
            <Link to='/corrections'>
              <li class="nav-item">
                <a class="nav-link text-light">Correcciones</a>
              </li>
            </Link>
            <Link to='/statistics'>
              <li class="nav-item">
                <a class="nav-link text-light">Estadisticas</a>
              </li>
            </Link>
            <Link to='/settings'>
              <li class="nav-item">
                <a class="nav-link text-light">Configuración</a>
              </li>
            </Link>
          </ul>
          <ul class="navbar-nav nav-final">
            <Link to='/profile'>
              <li class="nav-item active">
                <a class="nav-link text-light">Perfil</a>
              </li>
            </Link>
            <Link to='/corrections'>
              <li class="nav-item">
                <a class="nav-link text-light">Cerrar sesión</a>
              </li>
            </Link>
          </ul>
        </div>
      </nav>
    )}

}

export default Navbar;