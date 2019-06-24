import React, { Component } from 'react';
//Router para renderizar los componentes segun direccion de los mismos.
import {Router, Switch, Route} from 'react-router-dom';
import Navbar from './components/navbar.js';

class Aplicacion extends Component {

  render(){

    return(
      <Router>
        <div className="Aplicacion">
          <Navbar></Navbar>
        </div>
      </Router>
    )}

}

export default Aplicacion;