import React, { Component } from 'react';
import fetch from 'node-fetch';
//Router para renderizar los componentes segun direccion de los mismos.

class Citas extends Component {

    constructor(props){
        super(props);
        this.state={
            id: -1,
            citas: [],
            loaded: false
        }
    }

    componentWillReceiveProps(Props){
        console.log('se cambia las citas:' + Props.unidad_info);
        const id= Props.unidad_info;
        const body={};
        body.id=id;
        if (this.state.unidad_info != id)
            fetch('/api/unidades_citas', {
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
                    citas:json.citas,
                    loaded: true
                });
            });
    }

    render(){
        console.log('se actualiza citas');
        var content;

        if(this.state.loaded){
            if(this.state.citas.length > 0 || this.state.id != -1){
                content= this.state.citas.map((cita,i)=>{ return(
                                            <div className="card unidad_info_card h-50 w-100 row content-extended" id={i}>
                                                <h5 className="card-header">{cita.delimitacion}</h5>
                                                <div className="card-body overflow-auto">
                                                    <p>{cita.cita}</p>
                                                </div>
                                                <div className="card-footer row">
                                                    <div className="col-6">
                                                        <p>Categoria: {cita.categoria}</p>
                                                    </div>
                                                    <div className="col-6">
                                                        <p>Delimitado en: {cita.entidad}</p>
                                                    </div>
                                                </div>
                                            </div>);
                })
            }
            else{
                if (this.state.citas.length == 0)
                    content=(
                    <div className="container-fluid bg-light text-dark">
                        <h3 className="my-auto mx-auto">No hay citas en esta unidad de informacion</h3>
                    </div>);
            }
        }
        else{
            content =(
                <div className="container-fluid row align-items-center d-flex justify-content-center my-auto">
                    <div className="spinner-border text-dark" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            );
        }

        return(
            <div className="content-citas">
                {content}
            </div>
        )}

}

export default Citas;