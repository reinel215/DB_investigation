import React, { Component } from 'react';
import fetch from 'node-fetch';
import Citas from './Citas.js';

class UnidadInfo extends Component {

    constructor(props){
        super(props);
        const {id}= this.props.match.params;
        this.state={
            id: id,
            unidades: [],
            loaded: false,
            unidad: -1
        }
        this.handleSelecction= this.handleSelecction.bind(this);
    }

    handleSelecction(event){
        console.log('Se coloco la cita:' + event.target.id);
        this.setState({
            unidad: this.state.unidades[parseInt(event.target.id)].id_unidad_informacion
        });
    }

    componentDidMount(){
        if(!this.state.loaded){
            fetch('/api/unidades_info', {
                method: 'POST', // or 'PUT'
                body: JSON.stringify(this.state), // data can be `string` or {object}!
                headers:{
                    'Content-Type': 'application/json'
                }
            }).then(
                res => {
                    if (res.status == 200)
                        return res.json()
                    else
                        return null;
                }).then(json => {
                        this.setState({
                            unidades:json.unidades,
                            loaded: true
                        });
                });
        }
    }

    render(){
        var content;

        if(this.state.loaded){
            if(this.state.unidades.length > 0){
                content=(
                    <div className="container row w-75 h-75 p-2 contenedor-uf bg-dark content-extended pb-2">
                        <div className="col-md-6 container overflow-auto section-left">
                            {
                                this.state.unidades.map((unidad, i) => {
                                    if ( this.state.unidad != unidad.id_unidad_informacion){
                                        return(<button className="w-100 btn-primary" onClick={this.handleSelecction} id={i}>
                                            <div className="card unidad_info_card h-25 w-100 bg-light text-dark" id={i}>
                                                <h4 className="card-header" id={i}>{unidad.titulo}</h4>
                                                <div className="card-body" id={i}>
                                                    <p id={i}>Autor: {unidad.autor}</p>
                                                </div>
                                                <div className="card-footer text-muted" id={i}>
                                                    <p id={i} className="badge badge-info">Fecha - {unidad.fecha}</p>
                                                </div>
                                            </div>
                                        </button>);
                                    }
                                    else{
                                        return(<button className="w-100 btn-primary"  id={i}>
                                            <div className="card unidad_info_card h-25 w-100 bg-primary text-light" id={i}>
                                                <h4 className="card-header" id={i}>{unidad.titulo}</h4>
                                                <div className="card-body" id={i}>
                                                    <p id={i}>Autor: {unidad.autor}</p>
                                                </div>
                                                <div className="card-footer text-muted" id={i}>
                                                    <p id={i} className="badge badge-info">Fecha - {unidad.fecha}</p>
                                                </div>
                                            </div>
                                        </button>);
                                    }
                                })
                            }
                        </div>
                        <div className="col-md-6 container overflow-auto section-right">
                            <Citas unidad_info={this.state.unidad}></Citas>
                        </div>
                    </div>
                );
            }
            else{
                content=(<h3 className="my-auto mx-auto">No tienes unidades de informacion</h3>)
            }
        }
        else{
            content =(
                <div className="container row align-items-center d-flex justify-content-center my-auto">
                    <div className="spinner-border text-dark" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            );
        }

        return(
            <div className="Selection container-fluid d-flex justify-content-center align-items-center selection-bg">
                {content}
            </div>
        )}

}

export default UnidadInfo;