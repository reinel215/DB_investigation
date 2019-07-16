import React, { Component } from 'react';
import fetch from 'node-fetch';
import { Link } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
//Router para renderizar los componentes segun direccion de los mismos.

var Proyecto;
var Contexto;
var Objetivo_General;
var Pregunta_Investigacion;
var Entorno_Investigacion;
var Temporalidad;
var Evento;
var Resultado;

class Buscador extends Component {

    constructor(props) {
        super(props);
        this.state = {
            busqueda: '',
            section: 'Proyecto',
            accion: false,
            resultado: []
        }
        this.handle_busqueda = this.handle_busqueda.bind(this);
        this.handle_change = this.handle_change.bind(this);
        this.handle_section = this.handle_section.bind(this);
        Proyecto = "badge badge-primary";
        Contexto = "badge badge-secondary";
        Objetivo_General = "badge badge-secondary";
        Pregunta_Investigacion = "badge badge-secondary";
        Entorno_Investigacion = "badge badge-secondary";
        Temporalidad = "badge badge-secondary";
        Evento = "badge badge-secondary";
    }

    handle_busqueda(event) {
        fetch('/api/busqueda', {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(this.state), // data can be `string` or {object}!
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(
            res => {
                if (res.status == 200)
                    return res.json()
                else
                    return null;
            }).then(json => {
                if (json.resultados.length == 0) {
                    Resultado = (<h4 className="ml-5 my-4 text-dark">No se encontraron resultados</h4>);
                }
                else {
                    Resultado = json.resultados.map((investigation, i) => {
                        let link = "/home/investigation/" + investigation.id_proyecto;
                        return (
                            <div className="card w-100 h-50 overflow-auto my-3">
                                <h3>Proyecto</h3>
                                <h5 className="card-header">{investigation.identificacion}</h5>
                                <div className="card-body">
                                    <h3 className="card-title">{investigation.pregunta_investigacion}</h3>
                                    <h2 className="card-title"> Objetivo General:</h2>
                                    <li className="list-group-item">{investigation.objetivo_general}</li>
                                    {
                                        investigation.autores.map((autor, i) => {
                                            return (<li className="list-group-item">
                                                <p>{autor.tipo_usuario} - {autor.nombres} {autor.apellidos}</p>
                                            </li>);
                                        })
                                    }
                                    <li className="list-group-item">
                                        <button type="button" className="btn btn-primary">
                                            <Link to={link} className="button-select text-light font-weight-bold" id={investigation.id_proyecto}>
                                                Detalle
                                            </Link>
                                        </button>
                                    </li>
                                </div>
                            </div>);
                    });
                }
                this.setState({
                    resultado: json.resultados,
                    accion: true,
                })
            });
    }

    handle_section(event) {
        eval(this.state.section + "= 'badge badge-secondary'");
        eval(event.target.id + "= 'badge badge-primary'");
        this.setState({
            section: event.target.id
        });
    }

    handle_change(event) {
        this.setState({
            busqueda: event.target.value
        })
    }

    render() {
        console.log(this.state);
        var content;
        content = (
            <div className="mr-auto">
                <div className="container h-100">
                    <div className="row d-flex justify-content-center h-100">
                        <div className="searchbar">
                            <input class="search_input" id="buscador" type="text" name="" placeholder="Search..." onKeyUp={(event) => { if (event.key == 'Enter') document.getElementById('buscar').click() }} value={this.state.busqueda} onChange={this.handle_change}></input>
                            <a href="#" class="search_icon"><i class="fas fa-search" onClick={this.handle_busqueda} id="buscar"></i></a>
                        </div>
                    </div>
                    <div className="row d-flex justify-content-center h-100">
                        <div className="seleccion_search w-100 d-inline">
                            <nav class="navbar navbar-expand-lg">
                                <p class="navbar-brand text-light"><strong>Busqueda por:</strong></p>
                                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                    <span class="navbar-toggler-icon"></span>
                                </button>

                                <div class="collapse navbar-collapse opciones-busqueda mx-auto overflow-auto" id="navbarSupportedContent">
                                    <ul class="navbar-nav mx-auto">
                                        <li class="nav-item active">
                                            <a class="nav-link"><span class={Proyecto} id="Proyecto" onClick={this.handle_section}>Proyecto</span><span class="sr-only">(current)</span></a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link"><span class={Evento} id="Evento" onClick={this.handle_section}>Evento_Abordado</span></a>
                                        </li>
                                        <li class="nav-item dropdown">
                                            <a class="nav-link"><span class={Objetivo_General} id="Objetivo_General" onClick={this.handle_section}>Objetivo General</span></a>
                                        </li>
                                        <li class="nav-item dropdown">
                                            <a class="nav-link"><span class={Pregunta_Investigacion} id="Pregunta_Investigacion" onClick={this.handle_section}>Pregunta investigacion</span></a>
                                        </li>
                                        <li class="nav-item dropdown">
                                            <a class="nav-link"><span class={Entorno_Investigacion} id="Entorno_Investigacion" onClick={this.handle_section}>Entorno Investigacion</span></a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link"><span class={Contexto} id="Contexto" onClick={this.handle_section}>Contexto</span></a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link"><span class={Temporalidad} id="Temporalidad" onClick={this.handle_section}>Temporalidad</span></a>
                                        </li>
                                    </ul>
                                </div>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        );

        return (<div className="Buscador">
            <div className="mx-auto">
                {content}
            </div>
            <div className="mx-auto">
                <div className="mr-auto">
                    <div className="container h-100">
                        <div className="row d-flex justify-content-center h-100">
                            <div className=" mr-auto">
                                <h4 className="ml-5 my-4 mr-auto text-dark"><strong>Resultados:</strong></h4>
                                <div className="Resultados">
                                    {Resultado}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        );
    }

}

export default Buscador;