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
        this.setState((state,props) => ({
            email: event.target.value,
            password: state.password
        }));
    }

    handleChangePassword(event){
        this.setState((state,props) => ({
            email: state.email,
            password: event.target.value
        }));
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
        <form action="/login" method="POST">
            <div className="form-group">
                <label for="email">Email</label>
                <input type="text" name="email" placeholder="Email" id="email" class="form-control" onChange="Metodo de cambio para el estado" value={this.state.email}></input>
            </div>
            <div className="form-group">
                <label for="password">Password</label>
                <input type="text" name="password" placeholder="Password" id="password" class="form-control" onChange="Metodo de cambio para el estado" value={this.state.password}></input>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
        );
    }

}

export default Login;