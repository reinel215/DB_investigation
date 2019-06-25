import React, { Component } from 'react';
import fetch from 'node-fetch';

class Login extends Component {

    constructor(props){
        super(props);
        this.state={
            email:'',
            password:'',
            render: 'form-log',
            nombres: "",
            apellidos: "",
            registro_password: "",
            registro_email: "",
            registro_confirm: "",
            tipo_usuario: 1,
            status: false,
            method: false,
            register_f: false,
            response: '',
            api_response: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleHoover = this.handleHoover.bind(this);
        this.handleHooverOut= this.handleHooverOut.bind(this);
        this.handleMethod = this.handleMethod.bind(this);
        this.verificacion = this.verificacion.bind(this);
        this.error= this.error.bind(this);
    }
    
    error(){
        let log= '';
        let button ='';
        let clase='';
        if(this.state.status || this.state.register_f || this.state.api_response){
            if (this.state.response == 'Registro completado.')
                clase= "col-12 badge badge-success mt-3";
            else
                clase= "col-12 badge badge-danger mt-3";
            log= (<div className="row container d-flex justify-content-center error-bg">
                        <span className={clase}> {this.state.response} </span>
                    </div>);
            button=(<button name="signup" type="submit" className="roboto font-weight-bold btn btn-info btn-sp col-sm-6" onClick={this.handleMethod} disabled>Sign-Up</button>);
        }
        else{
            button=(<button name="signup" type="submit" className="roboto font-weight-bold btn btn-info btn-sp col-sm-6" onClick={this.handleMethod}>Sign-Up</button>);
        }
        return ({
            button: button,
            log: log
        })
    }

    verificacion(){
        if(!this.state.api_response){
            var flagStatus = false;
            var flagRegisterF = false;
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            var ps= /[A-Za-z0-9]/;
            var name= /[A-Z\sa-z]/;
            var respuesta;
            if(!(re.test(this.state.email)) && this.state.email != ''){
                flagStatus=true;
                respuesta= 'Email invalido para ingreso.';
            }
            else if(!(re.test(this.state.registro_email)) && this.state.registro_email != ''){
                flagRegisterF=true;
                respuesta= 'Email invalido para registro.';
            }
            else if((!(ps.test(this.state.registro_password)) || this.state.registro_password<6) && this.state.registro_password != ''){
                flagRegisterF=true;
                respuesta= 'Password invalido para registro. Tiene que ser mayor de 6 caracteres';
            }
            else if(this.state.registro_password != this.state.registro_confirm){
                flagRegisterF=true;
                respuesta = 'No coinciden las contraseñas.';
            }
            else if((!(name.test(this.state.nombres) || name.test(this.state.apellidos))) && (this.state.apellidos != '' || this.state.nombres != '')){
                flagRegisterF=true;
                respuesta = 'Nombres o apellidos invalidos.'
            }
            if(this.state.register_f != flagRegisterF || this.state.status != flagStatus){
                this.setState({
                    register_f: flagRegisterF,
                    status: flagStatus,
                    response: respuesta
                })
            }
        }
    }

    handleChange(event){
        const name= event.target.name;
        const value= event.target.value;
        this.setState({
            [name]: value,
            api_response: false
        });
    }

    handleHoover(event){
        this.setState({
            render: "form-log-active"
        });
    }

    handleHooverOut(event){
        this.setState({
            render: "form-log"
        });
    }

    handleMethod(event){
        if (event.target.name == 'login' && this.state.method)
            this.setState({
                email: '',
                password: '',
                registro: {
                    nombres: '',
                    apellidos: '',
                    password: '',
                    email: '',
                    tipo_usuario: 1
                },
                render: 'form-changing',
                status: false,
                method: false,
                register_f: false,
                response:'',
                api_response: false
            });
        if (event.target.name == 'signup' && !(this.state.method))
            this.setState({
                email: '',
                password: '',
                registro: {
                    nombres: '',
                    apellidos: '',
                    password: '',
                    email: '',
                    tipo_usuario: 1
                },
                render: 'form-changing2',
                status: false,
                method: true,
                register_f: false,
                response:'',
                api_response: false
            });
    }

    render(){
        this.verificacion();
        var login;
        var comps= this.error()
        var log= comps.log;
        var button= comps.button;
        if (!this.state.status){
            fetch('/api/validate').then(
                    res => {
                        if (res.status == 200)
                            return res.json()
                        else
                            return null;
                    }).then(
                        json => {
                            if (json.api_response){
                                this.setState({
                                    render: 'form-log',
                                    status: true,
                                    register_f: true,
                                    response: json.response,
                                    api_response: json.api_response
                                });
                            }
                        }
                    );
        }
        if (!this.state.method){
            login= (
                    <div>
                        <form className={this.state.render} action="/signin" method="POST">
                            <div className="form-group">
                                <label className="roboto font-weight-bold" for="email">Email</label>
                                <input type="text" name="email" placeholder="Email" id="email" className="form-control" onChange={this.handleChange} value={this.state.email} required></input>
                            </div>
                            <div className="form-group">
                                <label className="roboto font-weight-bold" for="password">Password</label>
                                <input type="password" name="password" placeholder="Password" id="password" className="form-control" onChange={this.handleChange} value={this.state.password} required></input>
                            </div>
                            <div className="row d-flex justify-content-center">
                                <button name="login" type="submit" className="roboto font-weight-bold btn btn-info btn-sp col-sm-6" onClick={this.handleMethod}>Sign-In</button>
                            </div>
                        </form>
                        <div className="row d-flex justify-content-center">
                            <button name="signup" type="" className="roboto font-weight-bold btn btn-info btn-sp col-sm-6" onClick={this.handleMethod}>Sign-Up</button>
                            {log}
                        </div>
                    </div>
            );
        }
        else{
            login= (
                <div>
                    <form className={this.state.render} action="/signup" method="POST">
                        <div className="form-group">
                            <label className="roboto font-weight-bold" for="nombres">Nombres</label>
                            <input type="text" name="nombres" placeholder="Nombres" id="nombres" className="form-control" onChange={this.handleChange} value={this.state.nombres} required></input>
                        </div>
                        <div className="form-group">
                            <label className="roboto font-weight-bold" for="apellidos">Apellidos</label>
                            <input type="text" name="apellidos" placeholder="Apellidos" id="apellidos" className="form-control" onChange={this.handleChange} value={this.state.apellidos} required></input>
                        </div>
                        <div className="form-group">
                            <label className="roboto font-weight-bold" for="registro_email">Email</label>
                            <input type="text" name="registro_email" placeholder="Email" id="registro_email" className="form-control" onChange={this.handleChange} value={this.state.registro_email} required></input>
                        </div>
                        <div className="form-group">
                            <label className="roboto font-weight-bold" for="registro_password">Password</label>
                            <input type="password" name="registro_password" placeholder="Password" id="registro_password" className="form-control" onChange={this.handleChange} value={this.state.registro_password} required></input>
                        </div>
                        <div className="form-group">
                            <label className="roboto font-weight-bold" for="registro_confirm">Confirm Password</label>
                            <input type="password" name="registro_confirm" placeholder="Confirm Password" id="registro_confirm" className="form-control" onChange={this.handleChange} value={this.state.registro_confirm} required></input>
                        </div>
                        <div className="row d-flex justify-content-center">
                            {button}
                        </div>
                    </form>
                    <div className="row d-flex justify-content-center">
                        <button name="login" type="" className="roboto font-weight-bold btn btn-info btn-sp col-sm-6" onClick={this.handleMethod}>Sign-In</button>
                    </div>
                    {log}
                </div>
            );
        }

        return(
            <div className="col-6 card card-body card-pad" onMouseEnter={this.handleHoover} onMouseLeave={this.handleHooverOut}>
                {login}
            </div>
        );
    }

}

export default Login;