import React, { Component } from 'react';
import fetch from 'node-fetch';

var errorLog;
var confirmPasw;

class Login extends Component {

    constructor(props){
        super(props);
        this.state={
            email:'',
            password:'',
            render: 'form-log',
            registro : {
                nombres: "",
                apellidos: "",
                password: "",
                email: "",
                tipo_usuario: 1,
            },
            render: "",
            status: false,
            method: false,
            response: "",
            register_f: false
        };

        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleHoover = this.handleHoover.bind(this);
        this.handleHooverOut= this.handleHooverOut.bind(this);
        this.handleChangeRegistroApellido = this.handleChangeRegistroApellido.bind(this);
        this.handleChangeRegistroNombre = this.handleChangeRegistroNombre.bind(this);
        this.handleChangeRegistroPassword = this.handleChangeRegistroPassword.bind(this);
        this.handleChangeRegistroEmail = this.handleChangeRegistroEmail.bind(this);
        this.handleChangeConfirmPassword = this.handleChangeConfirmPassword.bind(this);
        this.handleMethod = this.handleMethod.bind(this);
        this.actualizacionEmail = this.actualizacionEmail.bind(this);
        this.actualizacionPassword = this.actualizacionPassword.bind(this);
    }

    actualizacionEmail(){
        if (confirmPasw != this.state.registro.password || this.state.registro.password < 6){
            errorLog="Contraseña invalida."
            this.setState({
                register_f: true
            });
        }
    }

    actualizacionPassword(){
        if (!( /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(this.state.registro.email) || this.state.registro.email == '')){
            errorLog="Email invalido para registro";
            this.setState({
                register_f: true
            });
        }
    }

    handleChangeEmail(event){
        if ( /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(this.state.email) || event.target.value == ''){
            console.log(this.state)
            this.setState({
                email: event.target.value
            });
        }
        else{
            errorLog="Email invalido para ingreso"
            this.setState({
                email: event.target.value,
                status: true
            });
        }
    }

    handleChangePassword(event){
        this.setState({
            password: event.target.value
        });
    }

    handleChangeRegistroNombre(event){
        this.setState({
            registro: {
                nombres: event.target.value,
                apellidos: this.state.registro.apellidos,
                password: this.state.registro.password,
                email: this.state.registro.email,
                tipo_usuario: this.state.registro.tipo_usuario,
            }
        });
    }

    handleChangeRegistroApellido(event){
        this.setState({
            registro: {
                nombres: this.state.registro.nombres,
                apellidos: event.target.value,
                password: this.state.registro.password,
                email: this.state.registro.email,
                tipo_usuario: this.state.registro.tipo_usuario,
            }
        });
    }

    handleChangeRegistroPassword(event){
        if (event.target.value.length < 6){
            errorLog="Password invalida"
            this.setState({
                registro: {
                    nombres: this.state.registro.nombres,
                    apellidos: this.state.registro.apellidos,
                    password: event.target.value,
                    email: this.state.registro.email,
                    tipo_usuario: this.state.registro.tipo_usuario,
                },
                register_f: true
            });
        }
        else{
            this.actualizacionPassword();
            this.setState({
                registro: {
                    nombres: this.state.registro.nombres,
                    apellidos: this.state.registro.apellidos,
                    password: event.target.value,
                    email: this.state.registro.email,
                    tipo_usuario: this.state.registro.tipo_usuario,
                },
                register_f: false
            });
        }
    }

    handleChangeRegistroEmail(event){
        if ( /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(event.target.value) || event.target.value == ''){
            this.actualizacionEmail();
            this.setState({
                registro: {
                    nombres: this.state.registro.nombres,
                    apellidos: this.state.registro.apellidos,
                    password: this.state.registro.password,
                    email: event.target.value,
                    tipo_usuario: this.state.registro.tipo_usuario,
                },
                register_f: false
            });
        }
        else{
            errorLog="Email invalido para registro."
            this.setState({
                registro: {
                    nombres: this.state.registro.nombres,
                    apellidos: this.state.registro.apellidos,
                    password: this.state.registro.password,
                    email: event.target.value,
                    tipo_usuario: this.state.registro.tipo_usuario,
                },
                register_f: true
            });
        }
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

    handleChangeConfirmPassword(event){
        confirmPasw= event.target.value;
        if (event.target.value != this.state.registro.password && event.target.value != ''){
            errorLog="Contraseña invalida."
            this.setState({
                register_f: true
            });
        }
        else {
            this.actualizacionPassword();
            this.setState({
                register_f: false
            });
        }
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
                register_f: false
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
                register_f: false
            });
        if ( event.target.name == 'signup' && this.state.register_f){
            errorLog = 'Campos invalidos.';
            this.setState(this.state);
        }
    }

    render(){
        console.log(this.state);
        var error;
        var login;
        if (!this.state.status){
            fetch('/api/validate').then(
                    res => {
                        if (res.status == 200)
                            return res.json()
                        else
                            return null;
                    }).then(
                        json => {
                            if (json.status || json.register_f){
                                errorLog= json.response;
                                this.setState({
                                    render: 'form-log',
                                    status: json.status,
                                    register_f: json.register_f
                                });
                            }
                        }
                    );
        }
        if (!this.state.method){
            var error;
            var button;
            var logReg;
            if(this.state.status){
                error= (<div className="row container d-flex justify-content-center error-bg">
                            <span class="col-12 badge badge-danger mt-3"> {errorLog} </span>
                        </div>);
            }
            if(errorLog == 'Registro completado.'){
                logReg = (<div className="row container d-flex justify-content-center error-bg">
                            <span class="col-12 badge badge-success mt-3"> {errorLog} </span>
                          </div>);
            }
            login= (
                    <div>
                        <form className={this.state.render} action="/signin" method="POST">
                            <div className="form-group">
                                <label className="roboto font-weight-bold" for="email font-weight-bold">Email</label>
                                <input type="text" name="email" placeholder="Email" id="email" className="form-control" onChange={this.handleChangeEmail} value={this.state.email} required></input>
                            </div>
                            <div className="form-group">
                                <label className="roboto font-weight-bold" for="password">Password</label>
                                <input type="text" name="password" placeholder="Password" id="password" className="form-control" onChange={this.handleChangePassword} value={this.state.password} required></input>
                            </div>
                            <div className="row d-flex justify-content-center">
                                <button name="login" type="submit" className="roboto font-weight-bold btn btn-info btn-sp col-sm-6" onClick={this.handleMethod}>Sign-In</button>
                            </div>
                        </form>
                        <div className="row d-flex justify-content-center">
                            <button name="signup" type="" className="roboto font-weight-bold btn btn-info btn-sp col-sm-6" onClick={this.handleMethod}>Sign-Up</button>
                            {error}
                            {logReg}
                        </div>
                    </div>
            );
        }
        else{
            var errorsign="";
            var button;
            if (this.state.register_f){
                errorsign= (<div className="row container d-flex justify-content-center error-bg">
                                <span class="badge col-12 badge-danger mt-3">{errorLog}</span>
                            </div>);
                button=(<button name="signup" type="submit" className="roboto font-weight-bold btn btn-info btn-sp col-sm-6" onClick={this.handleMethod} disabled>Sign-Up</button>);
            }
            else{
                button=(<button name="signup" type="submit" className="roboto font-weight-bold btn btn-info btn-sp col-sm-6" onClick={this.handleMethod}>Sign-Up</button>);
            }
            login= (
                <div>
                    <form className={this.state.render} action="/signup" method="POST">
                        <div className="form-group">
                            <label className="roboto font-weight-bold" for="email font-weight-bold">Nombres</label>
                            <input type="text" name="nombres" placeholder="Nombres" id="nombre" className="form-control" onChange={this.handleChangeRegistroNombre} value={this.state.registro.nombres} required></input>
                        </div>
                        <div className="form-group">
                            <label className="roboto font-weight-bold" for="email font-weight-bold">Apellidos</label>
                            <input type="text" name="apellidos" placeholder="Apellidos" id="apellidos" className="form-control" onChange={this.handleChangeRegistroApellido} value={this.state.registro.apellidos} required></input>
                        </div>
                        <div className="form-group">
                            <label className="roboto font-weight-bold" for="email font-weight-bold">Email</label>
                            <input type="text" name="email" placeholder="Email" id="email" className="form-control" onChange={this.handleChangeRegistroEmail} value={this.state.registro.email} required></input>
                        </div>
                        <div className="form-group">
                            <label className="roboto font-weight-bold" for="password">Password</label>
                            <input type="text" name="password" placeholder="Password" id="password" className="form-control" onChange={this.handleChangeRegistroPassword} value={this.state.registro.password} required></input>
                        </div>
                        <div className="form-group">
                            <label className="roboto font-weight-bold" for="password">Confirm Password</label>
                            <input type="text" name="confirmPassword" placeholder="Confirm Password" id="confirmPassword" className="form-control" onChange={this.handleChangeConfirmPassword} required></input>
                        </div>
                        <div className="row d-flex justify-content-center">
                            {button}
                        </div>
                    </form>
                    <div className="row d-flex justify-content-center">
                        <button name="login" type="" className="roboto font-weight-bold btn btn-info btn-sp col-sm-6" onClick={this.handleMethod}>Sign-In</button>
                    </div>
                    {errorsign}
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