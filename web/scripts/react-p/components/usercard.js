import React, { Component } from 'react';
import fetch from 'node-fetch';
//Router para renderizar los componentes segun direccion de los mismos.

class Usercard extends Component {

    constructor(props){
        super(props);
        this.state={nombre: '',
        tipo_usuario: 0,
        contador_proy: 0};
    }

    componentWillMount(){
        if (!this.state.nombre || this.state.tipo_usuario == 0){
            fetch('/api/user_info').then(
                res => {
                    if (res.status == 200)
                        return res.json()
                    else
                        return null;
                }).then(json => {
                    this.setState({
                        nombre: json.nombre,
                        tipo_usuario: json.tipo_usuario,
                        contador_proy: json.contador_proy
                    });
                });
        }
    }

    render(){

        return(
        <div className="Usercard mr-auto ml-1">
            <div class="card" style="width: 18rem;">
                <h5 class="card-header">Información Usuario</h5>
                <img class="card-img-top" src="..." alt="Card image cap"/>
                <div class="card-body">
                    <h5 class="card-title">{this.state.nombre}</h5>
                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <a href="#" class="btn btn-primary">Go somewhere</a>
                </div>
            </div>
        </div>
    );}

}

export default Usercard;