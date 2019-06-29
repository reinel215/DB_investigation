import React, { Component } from 'react';
import fetch from 'node-fetch';
import {Link} from 'react-router-dom';
//Router para renderizar los componentes segun direccion de los mismos.

class Accion extends Component {

    constructor(props){
        super(props);
        this.state={
            actions: [],
            loaded: false
        }
    }

    componentDidMount(){
        if (!this.state.loaded){
            console.log('no entra aca\n\n');
            fetch('/api/user_actions').then(
                res => {
                    if (res.status == 200)
                        return res.json()
                    else
                        return null;
                }).then(json => {
                    this.setState({
                        actions:json.actions,
                        loaded: true
                    });
                });
        }
    }

    render(){
        var content;
        if(!this.state.loaded){
            content =(
                <div className="container row align-items-center d-flex justify-content-center">
                    <div className="spinner-border text-dark" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            );
        }
        else{
            content=(
                <div className="mr-auto">
                    {
                        this.state.actions.map((action,i)=>{
                            return (<div className="card mr-auto">
                                <h5 className="card-header"></h5>
                                <div className="card-body">
                                    <h3 className="card-title">{action.nombre}</h3>
                                    <p className="text-justify">{action.descripcion}</p>
                                    <button type="button" class="btn btn-primary">
                                        <Link to={action.ruta} className="nav-link text-light font-weight-bold">
                                            Presióname
                                        </Link>
                                    </button>
                                </div>
                            </div>);
                        })
                    }
                </div>
            );
        }

        return(
        <div className="Accion mx-auto">
            {content}
        </div>
    );}

}

export default Accion;