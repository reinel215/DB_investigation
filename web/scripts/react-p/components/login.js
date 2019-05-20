import React, { Component } from 'react';
import fetch from 'node-fetch';

var loginStatus;

class Login extends Component {

    constructor(props){
        super(props);
        this.state={
            email:'',
            password:'',
            render: 'form-log'
        };

        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleHoover = this.handleHoover.bind(this);
        this.handleHooverOut= this.handleHooverOut.bind(this);
    }

    handleChangeEmail(event){
        this.setState({
            email: event.target.value,
            password: this.state.password,
            render: this.state.render
        });
    }

    handleChangePassword(event){
        this.setState({
            email: this.state.email,
            password: event.target.value,
            render: this.state.render
        });
    }

    handleHoover(event){
        this.setState({
            email: this.state.email,
            password: event.target.value,
            render: "form-log-active"
        });
    }

    handleHooverOut(event){
        this.setState({
            email: this.state.email,
            password: event.target.value,
            render: "form-log"
        });
    }

    loginStatus(){
        let sPageUrl= window.location.search.substring(1);
        let variables= sPageUrl.split('&');
        variables.forEach((item) => {
            if(item === 'statusLog')
                return (<div></div>);
        });
    }

    render(){

        /* 
        Seccion del codigo para tomar el error por respuesta del mismo. Se usa el props al hacer el pase.
        
        const error=('');
        if (!this.props.log)
            error= (<div className="d-flex container-fluid justify-content-center">
                <span className="badge badge-danger">Usuario o clave inválida</span>
            </div>);
        */

        const login= (
                    <div className="col-6 card card-body card-pad" onMouseEnter={this.handleHoover} onMouseLeave={this.handleHooverOut}>
                        <form action="/login" method="POST">
                            <div className={this.state.render}>
                                <div className="form-group">
                                    <label className="roboto font-weight-bold" for="email font-weight-bold">Email</label>
                                    <input type="text" name="email" placeholder="Email" id="email" className="form-control" onChange={this.handleChangeEmail} value={this.state.email} required autofocus></input>
                                </div>
                                <div className="form-group">
                                    <label className="roboto font-weight-bold" for="password">Password</label>
                                    <input type="text" name="password" placeholder="Password" id="password" className="form-control" onChange={this.handleChangePassword} value={this.state.password} required></input>
                                </div>
                            </div>
                            <div className="row d-flex justify-content-center">
                                <button type="submit" className="roboto font-weight-bold btn btn-info btn-sp col-sm-6">Sign-In</button>
                            </div>
                        </form>
                        <div className="row d-flex justify-content-center">
                            <button type="" className="roboto font-weight-bold btn btn-info btn-sp col-sm-6">Sign-Up</button>
                        </div>
                    </div>
        );

        return(
            login
        );
    }

}

export default Login;