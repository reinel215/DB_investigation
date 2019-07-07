import React, { Component } from 'react';
import fetch from 'node-fetch';
//Router para renderizar los componentes segun direccion de los mismos.

class RegistroInstrumental extends Component {

    constructor(props){
        super(props);
        const id = props.evento_delimitado;
        this.state={
            id: id,
            Indicios: [],
            loaded: false,
            identificacion: ''
        }
    }

    componentWillReceiveProps(Props){
        const id= Props.sinergia;
        const body={};
        body.id=id;
        if (this.state.unidad_info != id)
            fetch('/api/sinergia_indicios', {
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
                    indicios: json.indicios,
                    loaded: true,
                    identificacion: json.identificacion
                });
            });
    }

    render(){
        console.log('entrada a indicios');
        var content;

        if(this.state.loaded){
            if(this.state.indicios.length != 0 || this.state.id != -1){
                content=(
                    <div className="container p-0 d-flex justify-content-start">
                        <div className="col-md-12 container overflow-auto section-left py-2">
                            <div className="container overflow-auto">
                                <h4 className="Estadio-title badge badge-light text-dark text-center">{this.state.identificacion}</h4>
                            </div>
                            {
                                this.state.indicios.map((indicio, i) => {
                                        return(<button className="w-100 btn-primary"  id={i}>
                                            <div className="card unidad_info_card w-100 bg-light text-dark selected" id={i}>
                                                <h5 className="card-header text-dark" id={i}>{indicio.indicio}</h5>
                                                <ul class="list-group list-group-flush">
                                                    <li class="list-group-item bg-light">
                                                        <h6>Item</h6>
                                                        <p>{indicio.item}</p>
                                                        <p>{indicio.item_descripcion}</p>
                                                    </li>
                                                    <li class="list-group-item">
                                                        <h5>Categoria</h5>
                                                        <p>{indicio.categoria}</p>
                                                        <h6>Aplicacion_Temporal</h6>
                                                        <p>{indicio.aplicacion_temporal}</p>
                                                        <p><strong>Terminos: </strong>{indicio.terminos}</p>
                                                        <p><strong>Descripcion: </strong> {indicio.descripcion}</p>
                                                        <p><strong>Escala: </strong> {indicio.escala}</p>
                                                    </li>
                                                    <li class="list-group-item">
                                                        <h6>Muestra</h6>
                                                        <p><small>{indicio.muestra}</small></p>
                                                        <p><strong> Fuente {indicio.fuente}</strong></p>
                                                    </li>
                                                </ul>
                                            </div>
                                        </button>);
                                })
                            }
                        </div>
                    </div>
                );
            }
            else{
                if (this.state.indicios.length == 0)
                    content=(
                    <div className="container text-light d-flex justify-content-center h-100 align-items-center">
                        <h3 className="my-auto mx-auto badge badge-info">No hay Operacionalizacion</h3>
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

        return(
            <div className="content-Registro_Instrumental">
                {content}
            </div>
        )}

}

export default RegistroInstrumental;