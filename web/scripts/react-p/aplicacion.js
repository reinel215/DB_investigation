import React, { Component } from 'react';
//Router para renderizar los componentes segun direccion de los mismos.
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Navbar from './components/navbar.js';
import Usercard from './components/usercard.js';
import Accion from './components/accion.js';
import Selection from './components/selection.js';
import Investigation from './components/investigation.js';

class Aplicacion extends Component {

  render(){

    return(
        <div className="Aplicacion">
          <Router>
            <Navbar></Navbar>
            <Route path="/home/visualization" exact component={Selection}></Route>
            <div className="bg-principal container-fluid principal-content d-flex justify-content-start">
              <div className="container margin-content col-md-3">
                <Usercard></Usercard>
              </div>
              <div className="container margin-content col-md-8">
                  <Route path="/home" exact component={Accion}></Route>
                  <Route path="/home/investigation/:id" component={Investigation}></Route>
              </div>
            </div>
          </Router>
        </div>
    )}

}

export default Aplicacion;