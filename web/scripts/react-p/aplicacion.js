import React, { Component } from 'react';
//Router para renderizar los componentes segun direccion de los mismos.
import {Router, Switch, Route} from 'react-router-dom';
import Navbar from './components/navbar.js';
import Usercard from './components/usercard.js';
import Accion from './components/accion.js';
import Selection from './components/selection.js';
import UnidadInfo from './components/UnidadInfo.js';
import Investigation from './components/investigation.js';
import Recorrido from './components/Recorrido.js';
import { createBrowserHistory } from "history";
const customHistory = createBrowserHistory();

class Aplicacion extends Component {

  constructor(props){
    super(props);
    this.state={};
    customHistory.push('/home');
  }

  render(){

    return(
        <div className="Aplicacion">
          <Router history={customHistory}>
            <Navbar></Navbar>
            <Route path="/home/visualization" exact component={Selection}></Route>
            <Route path="/home/investigation/:id/UF" component={UnidadInfo}></Route>
            <Route path="/home/investigation/:id/INV" component={Recorrido}></Route>
            <div className="bg-principal container-fluid principal-content d-flex justify-content-start">
              <div className="container margin-content col-md-3">
                <Usercard></Usercard>
              </div>
              <div className="container margin-content col-md-8">
                  <Route path="/home" exact component={Accion}></Route>
                  <Route path="/home/investigation/:id" exact component={Investigation}></Route>
              </div>
            </div>
          </Router>
        </div>
    )}

}

export default Aplicacion;