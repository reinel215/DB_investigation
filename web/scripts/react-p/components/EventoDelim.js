import React, { Component } from 'react';
import fetch from 'node-fetch';
//Router para renderizar los componentes segun direccion de los mismos.
import Sinergia from './Sinergia.js';

class EventoDelim extends Component {

    constructor(props){
        super(props);
        const id = props.estadio_aplicado;
        this.state={
            id: id,
            eventos: [],
            loaded: false,
            evento: -1
        }
        this.handleSelecction = this.handleSelecction.bind(this);
    }

    handleSelecction(event){
        this.setState({
            evento: this.state.eventos[parseInt(event.target.id)].id_evento_delimitado
        });
    }

    componentWillReceiveProps(Props){
        const id= Props.estadio_aplicado;
        const body={};
        body.id=id;
        if (this.state.unidad_info != id)
            fetch('/api/estadio_eventos', {
                method: 'POST', // or 'PUT'
                body: JSON.stringify(body), // data can be `string` or {object}!
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
                console.log(json);
                this.setState({
                    id: id,
                    eventos: json.eventos,
                    loaded: true,
                    evento: -1
                });
            });
    }

    render(){
        var content;

        if(this.state.loaded){
            if(this.state.eventos.length > 0 && this.state.id != -1){
                content=(
                    <div className="container p-0 d-flex justify-content-start">
                        <div className="col-md-4 container overflow-auto section-left py-2">
                        <h4 className="Estadio-title badge badge-light text-dark text-center">Eventos Delimitados</h4>
                        {
                                this.state.eventos.map((evento, i) => {
                                    if ( this.state.evento != evento.id_evento_delimitado){
                                        return(<button className="w-100 btn-primary" onClick={this.handleSelecction} id={i}>
                                            <div className="card unidad_info_card h-25 w-100 bg-light text-dark" id={i}>
                                                <h3 className="card-header text-dark" id={i}>{evento.evento}</h3>
                                                <div className="card-body text-dark" id={i}>
                                                    <div className="row" id={i}>
                                                        <div className="col-6" id={i}>
                                                            <h5 id={i}>Clase Evento:</h5>
                                                            <p id={i}><small>{evento.clase_evento}</small></p>
                                                        </div>
                                                        <div className="col-6" id={i}>
                                                            <h5 id={i}>Tipo Evento:</h5>
                                                            <p id={i}><small>{evento.tipo_evento}</small></p>
                                                        </div>
                                                    </div>
                                                    <div className="row overflow-auto" id={i}>
                                                        <h5 id={i}>Descripcion</h5>
                                                        <p id={i}>{evento.descripcion}</p>
                                                    </div>
                                                </div>
                                                <div className="card-footer text-dark" id={i}>
                                                    <p id={i} className="badge badge-info">Abordaje: {evento.abordaje}</p>
                                                </div>
                                            </div>
                                        </button>);
                                    }
                                    else{
                                        return(<button className="w-100 btn-primary"  id={i}>
                                            <div className="card unidad_info_card h-25 w-100 bg-primary text-light selected" id={i}>
                                            <div className="card unidad_info_card h-25 w-100 bg-primary text-light" id={i}>
                                                <h3 className="card-header text-light" id={i}>{evento.evento}</h3>
                                                <div className="card-body text-light" id={i}>
                                                    <div className="row" id={i}>
                                                        <div className="col-6" id={i}>
                                                            <h5 id={i}>Clase Evento:</h5>
                                                            <p id={i}><small>{evento.clase_evento}</small></p>
                                                        </div>
                                                        <div className="col-6" id={i}>
                                                            <h5 id={i}>Tipo Evento:</h5>
                                                            <p id={i}><small>{evento.tipo_evento}</small></p>
                                                        </div>
                                                    </div>
                                                    <div className="row overflow-auto" id={i}>
                                                        <h5 id={i}>Descripcion</h5>
                                                        <p id={i}><small>{evento.descripcion}</small></p>
                                                    </div>
                                                </div>
                                                <div className="card-footer text-light" id={i}>
                                                    <p id={i} className="badge badge-info">Abordaje: {evento.abordaje}</p>
                                                </div>
                                            </div>
                                            </div>
                                        </button>);
                                    }
                                })
                            }
                        </div>
                        <div className="col-md-8 overflow-auto">
                            <Sinergia evento_delimitado={this.state.evento}></Sinergia>
                        </div>
                    </div>
                );
            }
            else{
                if (this.state.eventos.length == 0)
                    content=(
                    <div className="container bg-light text-dark d-flex justify-content-center h-100 align-items-center">
                        <h3 className="my-auto mx-auto badge badge-info">No hay Eventos delimitados</h3>
                    </div>);
                else{
                    content =(
                        <div className="container row align-items-center d-flex justify-content-center h-100 align-items-center">
                            <div className="spinner-border text-dark" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>
                    );
                }
            }
        }
        else{
            content =(
                <div className="container row align-items-center d-flex justify-content-center h-100 align-items-center">
                    <div className="spinner-border text-dark" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            );
        }

        return(
            <div className="content-eventos_delim">
                {content}
            </div>
        )}

}

export default EventoDelim;