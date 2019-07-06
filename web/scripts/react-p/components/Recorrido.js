import React, { Component } from 'react';
import fetch from 'node-fetch';
import Citas from './Citas.js';

class Recorrido extends Component {

    constructor(props){
        super(props);
        const {id}= this.props.match.params;
        this.state={
            id: id,
            estadios: [],
            loaded: false,
            estadio: -1
        }
        this.handleSelecction= this.handleSelecction.bind(this);
    }

    handleSelecction(event){
        console.log('Se coloco la cita:' + event.target.id);
        this.setState({
            estadio: this.state.estadios[parseInt(event.target.id)].id_estadio_aplicado
        });
    }

    componentDidMount(){
        if(!this.state.loaded){
            fetch('/api/investigation_estadios', {
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
                            estadios:json.estadios,
                            loaded: true
                        });
                });
        }
    }

    render(){
        var content;

        if(this.state.loaded){
            if(this.state.estadios.length > 0){
                content=(
                    <div className="container row Recorrido h-75 p-2 contenedor-uf bg-dark content-extended">
                        <div className="col-md-3 container overflow-auto section-left">
                        <h4 className="Estadio-title badge badge-light text-dark text-center">Estadios</h4>
                        {
                                this.state.estadios.map((estadio, i) => {
                                    if ( this.state.estadio != estadio.id_estadio_aplicado){
                                        return(<button className="w-100 btn-dark" onClick={this.handleSelecction} id={i}>
                                            <div className="card unidad_info_card h-25 w-100 bg-secondary" id={i}>
                                                <h3 className="card-header text-light">{estadio.nombre}</h3>
                                                <div className="card-footer text-light">
                                                    <p>Posicion: {estadio.posicion}</p>
                                                </div>
                                            </div>
                                        </button>);
                                    }
                                    else{
                                        return(<button className="w-100"  id={i}>
                                            <div className="card unidad_info_card h-25 w-100 bg-primary text-light" id={i}>
                                               
                                            </div>
                                        </button>);
                                    }
                                })
                            }
                        </div>
                        <div className="col-md-10 container overflow-auto section-right p-0">
                        </div>
                    </div>
                );
            }
            else{
                content=(<h3 className="my-auto mx-auto">No hay un recorrido definido</h3>)
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

export default Recorrido;