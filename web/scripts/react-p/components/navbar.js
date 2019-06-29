import React, { Component } from 'react';
//Router para renderizar los componentes segun direccion de los mismos.
import {Router, Switch, Route, Link} from 'react-router-dom';

class Navbar extends Component {

  render(){
    //Debe incluirse a traves de switch y link los diferentes componentes a renderizar en vez de <a>
    return(
      <nav className="Navbar navbar navbar-expand-lg navbar-light bg-dark">
          <a className="navbar-brand text-light font-weight-bold" href="#">UCABINV</a>
          <button className="navbar-toggler text-light font-weight-bold" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <Link to='/home' className="nav-link">
              <li className="nav-item text-light font-weight-bold active">
                Principal <span className="sr-only">(current)</span>
              </li>
            </Link>
            <Link to='/home/corrections' className="nav-link">
              <li className="nav-item text-light font-weight-bold">
                Correcciones
              </li>
            </Link>
            <Link to='/home/statistics' className="nav-link">
              <li className="nav-item text-light font-weight-bold">
                Estadisticas
              </li>
            </Link>
            <Link to='/home/settings' className="nav-link">
              <li className="nav-item text-light font-weight-bold">
                Configuración
              </li>
            </Link>
          </ul>
          <ul className="navbar-nav nav-final">
            <Link to='/home/profile' className="nav-link">
              <li className="nav-item text-light font-weight-bold active">
                Perfil
              </li>
            </Link>
            <Link to='/home/corrections' className="nav-link">
              <li className="nav-item text-light font-weight-bold">
                Cerrar sesión
              </li>
            </Link>
          </ul>
        </div>
      </nav>
    )}

}

export default Navbar;