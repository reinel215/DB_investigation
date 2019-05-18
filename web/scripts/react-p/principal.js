import React, { Component } from 'react';
import Login from './components/login';

class Principal extends Component {

  render(){

    return(
      <div className="container-fluid bg-p align-items-center d-flex justify-content-center">
        <div className="container">
            <div className="container d-flex justify-content-center img-p">
                <img className="mx-auto" src="./assets/images/LogoUcab.png" alt="Promocion principal"></img>
            </div>
          <div className="row d-flex justify-content-center">
              <Login></Login>
          </div>
        </div>
      </div>
    )}

}

export default Principal;