import React, { Component } from 'react';
//Router para renderizar los componentes segun direccion de los mismos.
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Navbar from './components/navbar.js';

class Aplicacion extends Component {

  render(){

    return(
        <div className="Aplicacion">
          <Router>
            <Navbar></Navbar>
            
          </Router>
        </div>
    )}

}

export default Aplicacion;