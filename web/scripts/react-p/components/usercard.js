import React, { Component } from 'react';
import fetch from 'node-fetch';
//Router para renderizar los componentes segun direccion de los mismos.

class Usercard extends Component {

    constructor(props){
        super(props);
        this.state={nombre: '',
        tipo_usuario: 0,
        contador_proy: 0,
        instituciones: []};
    }

    componentDidMount(){
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
                        contador_proy: json.contador_proy,
                        instituciones: json.instituciones
                    });
                });
        }
    }

    render(){

        return(
        <div className="Usercard mr-auto">
            <div className="card">
                <h5 className="card-header">Información Usuario</h5>
                <div className="card-body">
                    <h3 className="card-title">{this.state.nombre}</h3>
                    <p className="card-text">Contador de proyectos : <span className="badge badge-primary mx-auto"> {this.state.contador_proy}</span></p>
                    <h3 className="card-title">Instituciones Vinculadas</h3>
                    <ul>
                        {
                            this.state.instituciones.map((institucion,i)=>{
                                <li>{institucion}</li>
                            })
                        }
                    </ul>
                </div>
            </div>
        </div>
    );}

}

export default Usercard;