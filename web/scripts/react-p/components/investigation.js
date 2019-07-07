import React, { Component } from 'react';
//Router para renderizar los componentes segun direccion de los mismos.
import {Link} from 'react-router-dom';

var linkUF;
var linkINV;

class Investigation extends Component {

    constructor(props){
        super(props);
        const {id}= this.props.match.params;
        this.state={
            investigation:{},
            loaded: false,
            formload: false,
            id: id,
            alcances: [],
            restricciones: []
        };
        linkUF="/home/investigation/" + this.props.match.params.id + "/UF";
        linkINV="/home/investigation/" + this.props.match.params.id + "/INV";
        this.handleCalculoCalidad= this.handleCalculoCalidad.bind(this);
    }

    descargarInforme(event){
        fetch('/api/descarga_informe', {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(this.state), // data can be `string` or {object}!
            headers:{
                'Content-Type': 'application/json'
            }
        })
    }

    handleCalculoCalidad(event){
        fetch('/api/calculo_calidad', {
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
                var investigation = this.state.investigation;
                investigation.calidad= json.calidad;
                this.setState({
                    investigation: investigation
                });
        });
    }

    componentDidMount(){
        if(!this.state.loaded){
                fetch('/api/user_investigation', {
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
                                investigation:json.investigation,
                                loaded: json.loaded
                            });
                    });
        }
        if(!this.state.formload){
            fetch('/api/user_investigation_restricciones_alcances', {
                method: 'POST', // or 'PUT'
                body: JSON.stringify(this.state), // data can be `string` or {object}!
                headers:{
                    'Content-Type': 'application/json'
                }
            }).then( res => {
                if(res.status == 200)
                    return res.json();
                else
                    return null;
            }).then( json => {
                this.setState({
                    restricciones: json.restricciones,
                    alcances: json.alcances,
                    formload: true
                })
            });
        }
    }

    render(){
        var content;
        if(!this.state.loaded){
            content=(<div className="container row align-items-center d-flex justify-content-center my-auto">
                        <div className="spinner-border text-dark" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>);
        }
        else{
            const {investigation} = this.state;
            var calidadBadge;
                if (investigation.calidad < 10 || investigation.calidad == null){
                    calidadBadge= (<span className="badge badge-danger mx-auto badge-calidad my-1 mx-auto text-center">{investigation.calidad + 1}</span>);
                }
                else if (investigation.calidad > 10){
                    calidadBadge= (<span className="badge badge-primary mx-auto badge-calidad my-1 mx-auto text-center">{investigation.calidad}</span>);
                }
                if(investigation.calidad > 20){
                    calidadBadge= (<span className="badge badge-success mx-auto badge-calidad my-1 mx-auto text-center">{investigation.calidad}</span>);
                }
            console.log(investigation);
            content= (<div className="container card bg-dark text-light content-extended">
                <h2 className="card-header row col-12 bg-primary text-light title-proy">{investigation.identificacion}</h2>
                <div className="card-body">
                    <div className="list-group list-group-flush row mb-2">
                        <p> Pregunta de Investigacion:<h3 className="card-title">{investigation.pregunta_investigacion}</h3></p>
                        <h3 className="card-title">Objetivo General:</h3><p>{investigation.objetivo_general}</p>
                        <p className="card-text">Contador de Unidades de informacion : <span className="badge badge-secondary mx-auto"> {investigation.cantidad_uf}</span></p>
                    </div>
                    <div className="row mb-2">
                        <div className="col-6 section-left-card-investigation">
                            <h4>Tipo de Investigacion:</h4>
                            <h5>{investigation.tipo_inv}</h5>
                        </div>
                        <div className="col-6">
                            <h4>Modalidad:</h4>
                            <h5>{investigation.mod}</h5>
                        </div>
                    </div>
                    <div className="row d-flex justify-content-center mb-3 calidad-section">
                        <div className="col-6 pb-2">
                            <h5 className="mx-auto text-center">Calidad</h5>
                            <div className="container d-flex justify-content-center">
                                    {calidadBadge}
                            </div>
                        </div>
                    </div>
                    <div className="row d-flex justify-content-center mb-3 calidad-section">
                        <div className="col-6 pb-2">
                            <div className="container d-flex justify-content-center">
                                    <button className="btn btn-info" onClick={this.handleCalculoCalidad}>Calcular calidad</button>
                            </div>
                        </div>
                    </div>
                    <div className="contexto-div row mb-2 pt-2">
                            <h3 className="text-weight-bold mb-2 col-12">Contexto</h3>
                            <div className="col-6">
                                <h5>Descripcion:</h5>
                                <p>{investigation.contexto.concepcion}</p>
                            </div>
                            <div className="col-6">
                                <h5>Poblacion:</h5>
                                <p>{investigation.contexto.poblacion}</p>
                                <h5>Temporalidad:</h5>
                                <p>{investigation.contexto.temporalidad}</p>
                            </div>
                    </div>
                    <div className="row">
                        <div className="col-6" id="alcances">
                            <h5>Alcances:</h5>
                            <div data-spy="scroll" data-target="#alcances" data-offset="0">
                                <ul>
                                {   
                                    this.state.alcances.map((alcance, i) => {
                                        return (<li>{alcance}</li>);
                                    })
                                }
                                </ul>
                            </div>
                        </div>
                        <div className="col-6" id="restricciones">
                            <h5>Restricciones:</h5>
                            <div data-spy="scroll" data-target="#restricciones" data-offset="0">
                                <ul>
                                {
                                    this.state.restricciones.map((restriccion, i) => {
                                        return (<li>{restriccion}</li>);
                                    })
                                }
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="row d-flex justify-content-center py-2 mb-2">
                        <div className="col-10">
                            <div className="card bg-light text-light mx-auto">
                                <h5 class="card-title text-center text-dark">Unidades de Información</h5>
                                <div className="card-footer d-flex justify-content-center">
                                    <button type="button" className="btn btn-primary button-select">
                                        <Link to={linkUF} className="text-light">
                                            Detalle
                                        </Link>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row d-flex justify-content-center py-2 mb-2">
                        <div className="col-10">
                            <div className="card bg-light text-light mx-auto">
                                <h5 class="card-title text-center text-dark">Recorrido de la Investigacion</h5>
                                <div className="card-footer d-flex justify-content-center">
                                    <button type="button" className="btn btn-primary button-select">
                                        <Link to={linkINV} className="text-light">
                                            Detalle
                                        </Link>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row d-flex justify-content-center py-2 mb-2">
                        <div className="col-10">
                            <div className="card bg-primary text-light mx-auto">
                                <h5 class="card-title text-center text-dark">Generar Informe</h5>
                                <div className="card-footer d-flex justify-content-center">
                                    <button type="button" className="btn btn-light text-dark button-select" onClick={this.descargarInforme}>
                                        Descargar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>);
        }

        return(
            <div className="Investigation mx-auto">
                {content}
            </div>
        );
    }

}


export default Investigation;