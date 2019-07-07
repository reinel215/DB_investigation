import React, { Component } from 'react';
import fetch from 'node-fetch';
import RegistroInstrumental from './RegistroInstrumental';
//Router para renderizar los componentes segun direccion de los mismos.

class Sinergia extends Component {

    constructor(props){
        super(props);
        const id = props.evento_delimitado;
        this.state={
            id: id,
            sinergias: [],
            loaded: false,
            sinergia: -1
        }
        this.handleSelecction = this.handleSelecction.bind(this);
    }

    handleSelecction(event){
        this.setState({
            sinergia: this.state.sinergias[parseInt(event.target.id)].id_sinergia
        });
    }

    componentWillReceiveProps(Props){
        const id= Props.evento_delimitado;
        const body={};
        body.id=id;
        if (this.state.unidad_info != id)
            fetch('/api/evento_sinergias', {
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
                    sinergias: json.sinergias,
                    loaded: true,
                    sinergia: -1
                });
            });
    }

    render(){
        var content;

        if(this.state.loaded){
            if(this.state.sinergias.length != 0 || this.state.id != -1){
                content=(
                    <div className="container p-0 d-flex justify-content-start">
                        <div className="col-md-6 container overflow-auto section-left py-2">
                            <h4 className="Estadio-title badge badge-light text-dark text-center">Sinergias</h4>
                            {
                                this.state.sinergias.map((sinergia, i) => {
                                    if ( this.state.sinergia != sinergia.id_sinergia){
                                        return(<button className="w-100 btn-primary" onClick={this.handleSelecction} id={i}>
                                            <div className="card unidad_info_card h-25 w-100 bg-light text-dark selected" id={i}>
                                                <h6 className="card-header text-dark" id={i}>{sinergia.sinergia}</h6>
                                                <p id={i}><strong>Clase de Sinergia: </strong>{sinergia.clase_sinergia}</p>
                                                <div className="card-footer overflow-auto">
                                                    <p className="badge badge-info" id={i}><strong>Instrumento: </strong> {sinergia.instrumento}</p>
                                                </div>
                                            </div>
                                        </button>);
                                    }
                                    else{
                                        return(<button className="w-100 btn-primary"  id={i}>
                                            <div className="card unidad_info_card h-25 w-100 bg-primary text-light selected" id={i}>
                                                <h3 className="card-header text-light" id={i}>{sinergia.sinergia}</h3>
                                                <p id={i}><strong>Clase de Sinergia: </strong>{sinergia.clase_sinergia}</p>
                                                <div className="card-footer overflow-auto">
                                                    <p className="badge badge-info" id={i}><strong>Instrumento: </strong> {sinergia.instrumento}</p>
                                                </div>
                                            </div>
                                        </button>);
                                    }
                                })
                            }
                        </div>
                        <div className="col-md-6">
                            <RegistroInstrumental sinergia={this.state.sinergia}></RegistroInstrumental>
                        </div>
                    </div>
                );
            }
            else{
                if (this.state.sinergias.length == 0)
                    content=(
                    <div className="container text-light d-flex justify-content-center h-100 align-items-center">
                        <h3 className="my-auto mx-auto badge badge-info">No hay sinergias definidas en el evento</h3>
                    </div>);
                else
                    content =(
                        <div className="container row align-items-center d-flex justify-content-center h-100 align-items-center">
                            <div className="spinner-border text-dark" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>
                    );
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
        if(this.state.id == -1){
            content =(
                <div className="container row align-items-center d-flex justify-content-center h-100 align-items-center">
                    <div className="spinner-border text-dark" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            );
        }

        return(
            <div className="content-sinergias">
                {content}
            </div>
        )}

}

export default Sinergia;