import React, { Component } from 'react';
import fetch from 'node-fetch';

var loginStatus;

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
            status: false,
            method: false
        };

        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleHoover = this.handleHoover.bind(this);
        this.handleHooverOut= this.handleHooverOut.bind(this);
        this.handleChangeRegistroApellido = this.handleChangeRegistroApellido.bind(this);
        this.handleChangeRegistroNombre = this.handleChangeRegistroNombre.bind(this);
        this.handleChangeRegistroPassword = this.handleChangeRegistroPassword.bind(this);
        this.handleChangeRegistroEmail = this.handleChangeRegistroEmail.bind(this);
        this.handleMethod = this.handleMethod.bind(this);
    }

    handleChangeEmail(event){
        this.setState({
            email: event.target.value,
            password: this.state.password,
            registro: {
                nombres: this.state.nombres,
                apellidos: this.state.registro.apellidos,
                password: this.state.registro.password,
                email: this.state.registro.email
            },
            render: this.state.render,
            status: this.state.status,
            mmethod: this.state.method
        });
    }

    handleChangePassword(event){
        this.setState({
            email: this.state.email,
            password: event.target.value,
            registro: {
                nombres: this.state.nombres,
                apellidos: this.state.registro.apellidos,
                password: this.state.registro.password,
                email: this.state.registro.email
            },
            render: this.state.render,
            status: this.state.status,
            method: this.state.method
        });
    }

    handleChangeRegistroNombre(event){
        this.setState({
            email: this.state.email,
            password: this.state.password,
            registro: {
                nombres: event.target.value,
                apellidos: this.state.registro.apellidos,
                password: this.state.registro.password,
                email: this.state.registro.email
            },
            render: this.state.render,
            status: this.state.status,
            method: this.state.method
        });
    }

    handleChangeRegistroApellido(event){
        this.setState({
            email: this.state.email,
            password: this.state.password,
            registro: {
                nombres: this.state.registro.nombres,
                apellidos: event.target.value,
                password: this.state.registro.password,
                email: this.state.registro.email
            },
            render: this.state.render,
            status: this.state.status,
            method: this.state.method
        });
    }

    handleChangeRegistroPassword(event){
        this.setState({
            email: this.state.email,
            password: this.state.password,
            registro: {
                nombres: this.state.registro.nombres,
                apellidos: this.state.registro.apellidos,
                password: event.target.value,
                email: this.state.registro.email
            },
            render: this.state.render,
            status: this.state.status,
            method: this.state.method
        });
    }

    handleChangeRegistroEmail(event){
        this.setState({
            email: this.state.email,
            password: this.state.password,
            registro: {
                nombres: this.state.registro.nombres,
                apellidos: this.state.registro.apellidos,
                password: this.state.registro.password,
                email: event.target.value
            },
            render: this.state.render,
            status: this.state.status,
            method: this.state.method
        });
    }

    handleHoover(event){
        this.setState({
            email: this.state.email,
            password: event.target.value,
            registro: {
                nombres: this.state.nombres,
                apellidos: this.state.registro.apellidos,
                password: this.state.registro.password,
                email: this.state.registro.email
            },
            render: "form-log-active",
            status: this.state.status,
            method: this.state.method
        });
    }

    handleHooverOut(event){
        this.setState({
            email: this.state.email,
            password: this.state.password,
            registro: {
                nombres: this.state.nombres,
                apellidos: this.state.registro.apellidos,
                password: this.state.registro.password,
                email: this.state.registro.email
            },
            render: "form-log",
            status: this.state.status,
            method: this.state.method
        });
    }

    handleMethod(event){
        console.log(this.state.method);
        if (event.target.name == 'login' && this.state.method)
            this.setState({
                email: this.state.email,
                password: this.state.password,
                registro: {
                    nombres: this.state.nombres,
                    apellidos: this.state.registro.apellidos,
                    password: this.state.registro.password,
                    email: this.state.registro.email
                },
                render: 'form-changing',
                status: this.state.status,
                method: false
            });
        if (event.target.name == 'signup' && !(this.state.method))
            this.setState({
                email: this.state.email,
                password: event.target.value,
                registro: {
                    nombres: this.state.nombres,
                    apellidos: this.state.registro.apellidos,
                    password: this.state.registro.password,
                    email: this.state.registro.email
                },
                render: 'form-changing2',
                status: this.state.status,
                method: true
            });
    }

    render(){
        
        var error= null;
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
                            if (json.status){
                                this.setState({
                                    email: '',
                                    password: '',
                                    render: "form-log",
                                    status: true
                                });
                            }
                        }
                    );
        }
        else
            error= (<div className="row d-flex justify-content-center">
                        <span class="badge badge-danger mt-3"> Intento de conexion fallido, intente denuevo.</span>
                    </div>);
        if (!this.state.method)
            login= (
                    <div>
                        <form className={this.state.render} action="/api/ingreso" method="POST">
                            <div className="form-group">
                                <label className="roboto font-weight-bold" for="email font-weight-bold">Email</label>
                                <input type="text" name="email" placeholder="Email" id="email" className="form-control" onChange={this.handleChangeEmail} value={this.state.email} required autofocus></input>
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
                        </div>
                    </div>
            );
        else
            login= (
                <div>
                    <form className={this.state.render} action="/api/registro" method="POST">
                        <div className="form-group">
                            <label className="roboto font-weight-bold" for="email font-weight-bold">Nombres</label>
                            <input type="text" name="nombres" placeholder="Nombres" id="nombre" className="form-control" onChange={this.handleChangeRegistroNombre} value={this.state.registro.nombres} required autofocus></input>
                        </div>
                        <div className="form-group">
                            <label className="roboto font-weight-bold" for="email font-weight-bold">Apellidos</label>
                            <input type="text" name="apellidos" placeholder="Apellidos" id="apellidos" className="form-control" onChange={this.handleChangeRegistroApellido} value={this.state.registro.apellidos} required autofocus></input>
                        </div>
                        <div className="form-group">
                            <label className="roboto font-weight-bold" for="email font-weight-bold">Email</label>
                            <input type="text" name="email" placeholder="Email" id="email" className="form-control" onChange={this.handleChangeRegistroEmail} value={this.state.registro.email} required autofocus></input>
                        </div>
                        <div className="form-group">
                            <label className="roboto font-weight-bold" for="password">Password</label>
                            <input type="text" name="password" placeholder="Password" id="password" className="form-control" onChange={this.handleChangeRegistroPassword} value={this.state.registro.password} required></input>
                        </div>
                        <div className="form-group">
                            <label className="roboto font-weight-bold" for="password">Confirm Password</label>
                            <input type="text" name="password" placeholder="Password" id="password" className="form-control" onChange={this.handleChangeConfirmPassword} required></input>
                        </div>
                        <div className="row d-flex justify-content-center">
                            <button name="signup" type="submit" className="roboto font-weight-bold btn btn-info btn-sp col-sm-6" onClick={this.handleMethod}>Sign-Up</button>
                        </div>
                    </form>
                    <div className="row d-flex justify-content-center">
                        <button name="login" type="" className="roboto font-weight-bold btn btn-info btn-sp col-sm-6" onClick={this.handleMethod}>Sign-In</button>
                    </div>
                </div>
            );

        return(
            <div className="col-6 card card-body card-pad" onMouseEnter={this.handleHoover} onMouseLeave={this.handleHooverOut}>
                {login}
            </div>
        );
    }

}

export default Login;