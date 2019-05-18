import React, { Component } from 'react';

class Login extends Component {

    constructor(props){
        super(props);
        this.state={
            email:'',
            password:''
        };

        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
    }

    handleChangeEmail(event){
        this.setState({
            email: event.target.value,
            password: this.state.password
        });
    }

    handleChangePassword(event){
        this.setState({
            email: this.state.email,
            password: event.target.value
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

        return(
        <div className="card card-body card-pad">
            <form action="/login" method="POST">
                <div className="form-log">
                    <div className="form-group">
                        <label for="email">Email</label>
                        <input type="text" name="email" placeholder="Email" id="email" className="form-control" onChange={this.handleChangeEmail} value={this.state.email}></input>
                    </div>
                    <div className="form-group">
                        <label for="password">Password</label>
                        <input type="text" name="password" placeholder="Password" id="password" className="form-control" onChange={this.handleChangePassword} value={this.state.password}></input>
                    </div>
                </div>
                <div className="row d-flex justify-content-center">
                    <button type="submit" className="btn btn-primary">Sign-In</button>
                    <button type="submit" className="btn btn-sp btn-primary">Sign-Up</button>
                </div>
            </form>
        </div>
        );
    }

}

export default Login;