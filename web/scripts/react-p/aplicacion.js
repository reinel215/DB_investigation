import React, { Component } from 'react';
//Router para renderizar los componentes segun direccion de los mismos.
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Navbar from './components/navbar.js';
import Usercard from './components/usercard.js';
import Accion from './components/accion.js';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

class Aplicacion extends Component {

  render(){

    return(
        <div className="Aplicacion">
          <Router>
            <Navbar></Navbar>
            <div className="bg-principal container-fluid principal-content d-flex justify-content-start">
              <div className="container margin-content col-md-3">
                <Usercard></Usercard>
              </div>
              <div className="container margin-content col-md-8">
                <CSSTransition
                  in={true}
                  appear={true}
                  timeout={1000}
                  classNames="fade">

                  <Route path="/home" exact component={Accion} key="1"></Route>
                
                </CSSTransition>
              </div>
            </div>
          </Router>
        </div>
    )}

}

export default Aplicacion;