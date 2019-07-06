import React, { Component } from 'react';
import fetch from 'node-fetch';
//Router para renderizar los componentes segun direccion de los mismos.
import {Router, Switch, Route, Link} from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

class Selection extends Component {

    constructor(props){
        super(props);
        this.state={
            investigations: [],
            loaded: false
        };
        console.log(props);
    }

    componentDidMount(){
        if(!this.state.loaded){
            fetch('/api/user_investigations').then(
                res => {
                    if (res.status == 200)
                        return res.json()
                    else
                        return null;
                }).then(json => {
                        this.setState({
                            investigations:json.investigations,
                            loaded: json.loaded
                        });
                });
        }
    }

    render(){
        var content;

        if(this.state.loaded){
            if(this.state.investigations.length > 0)
            content =(<div id="carruselInvestigations" className="carousel slide my-auto container row align-items-center d-flex justify-content-center" data-ride="carousel">
                        <ol className="carousel-indicators">
                            {
                                this.state.investigations.map((investigation, i) =>{
                                    if(i = 0)
                                        return(<li data-target="#carruselInvestigations" data-slide-to={i} className="active"></li>)
                                    return(<li data-target="#carruselInvestigations" data-slide-to={i}></li>)
                                })
                            }
                        </ol>
                        <button
                            className="button-select button-exit"
                            onClick={this.props.history.goBack}>
                                X
                            </button>
                        <div className="carousel-inner">
                            {
                                this.state.investigations.map((investigation, i) =>{
                                    let classN;
                                    let badge;
                                    let link="/home/investigation/" + investigation.id_proyecto;
                                    if(i == 0)
                                        classN="carousel-item active mx-auto pb-1";
                                    else
                                        classN="carousel-item";
                                    if(investigation.calidad < 10)
                                        badge="badge badge-danger mr-auto";
                                    if(investigation.calidad > 10)
                                        badge="badge badge-primary mr-auto";
                                    if(investigation.calidad == 100)
                                        badge="badge badge-success mr-auto";
                                    return( <div className={classN}>
                                                <div className="card col-md-6 mx-auto card-Investigation">
                                                    <h3>Proyecto</h3>
                                                    <h5 className="card-header">{investigation.identificacion}</h5>
                                                    <div className="card-body">
                                                        <h3 className="card-title">{investigation.pregunta_investigacion}</h3>
                                                        <h2 className="card-title"> Objetivo General:</h2>
                                                        <li className="list-group-item">{investigation.objetivo_general}</li>
                                                        <li className="list-group-item">
                                                            <p>Calidad <span className={badge}>{investigation.calidad}</span></p>
                                                            <button type="button" className="btn btn-primary">
                                                                <Link to={link} className="button-select text-light font-weight-bold" id={investigation.id_proyecto}>
                                                                    Detalle
                                                                </Link>
                                                            </button>
                                                        </li>
                                                    </div>
                                                </div>
                                            </div>)
                                })
                            }
                        </div>
                        <a className="carousel-control-prev" href="#carruselInvestigations" role="button" data-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="sr-only">Previous</span>
                        </a>
                        <a className="carousel-control-next" href="#carruselInvestigations" role="button" data-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="sr-only">Next</span>
                        </a>
                    </div>);
            else{
                content=(<h3 className="my-auto mx-auto">No tienes investigaciones</h3>)
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

export default Selection;