import React, { Component } from 'react';
import Login from './components/login';

class Principal extends Component {

  render(){

    return(
      <div className="container-fluid bg-p row align-items-center">
        <div className="container col-sm-4 d-flex justify-content-center">
              <Login></Login>
        </div>
      </div>
    )}

}

export default Principal;