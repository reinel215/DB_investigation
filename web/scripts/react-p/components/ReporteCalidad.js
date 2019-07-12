import React, { Component } from 'react';
//Router para renderizar los componentes segun direccion de los mismos.
import {Link} from 'react-router-dom';
//const Office = require('../../generar_informe.js');

class ReporteCalidad extends Component {

    constructor(props){
        super(props);
        const {id} = props;
        this.state={
            reporte: [],
            id: id,
            loaded: false
        };
    }

    componentDidMount(event){
        if (!this.state.loaded)
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
                let calidad=0;
                for(let i= 0; i< json.reportes.length ; i++){
                    calidad+= json.reportes[i].valor;
                }
                this.props.actualizarCalidad(calidad);
                this.setState({
                    reporte: json.reportes,
                    loaded: true
                })
        });
    }

    render(){
        var content;
        if(!this.state.loaded){
            content=(
                <button class="btn btn-primary" type="button" disabled>
                    <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    Loading...
                </button>
            );
        }
        else{
            content=(
                <div className="card bg-primary text-light">
                    <h4 className="card-header">Reporte de Calidad</h4>
                    <div className="card-body overflow-auto">
                        <ul>
                    {
                        this.state.reporte.map((reporte,i) => {
                            return (<li><strong>{reporte.item} :</strong> {reporte.valor * 100}%</li>);
                        })
                    }
                    </ul>
                    </div>
                </div>)
        }
        console.log(this.state.reporte);
        return(<div className="ReporteCalidad">
            {content}
        </div>);
    }

}


export default ReporteCalidad;