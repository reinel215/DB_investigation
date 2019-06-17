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
            status: false
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
            render: this.state.render,
            status: this.state.status
        });
    }

    handleChangePassword(event){
        this.setState({
            email: this.state.email,
            password: event.target.value,
            render: this.state.render,
            status: this.state.status
        });
    }

    handleHoover(event){
        this.setState({
            email: this.state.email,
            password: event.target.value,
            render: "form-log-active",
            status: this.state.status
        });
    }

    handleHooverOut(event){
        this.setState({
            email: this.state.email,
            password: event.target.value,
            render: "form-log",
            status: this.state.status
        });
    }

    render(){
        
        var error= null;
        if (!this.state.status){
            fetch('/validate').then(
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

        const login= (
                    <div>
                        <form className={this.state.render} action="/ingreso" method="POST">
                            <div className="form-group">
                                <label className="roboto font-weight-bold" for="email font-weight-bold">Email</label>
                                <input type="text" name="email" placeholder="Email" id="email" className="form-control" onChange={this.handleChangeEmail} value={this.state.email} required autofocus></input>
                            </div>
                            <div className="form-group">
                                <label className="roboto font-weight-bold" for="password">Password</label>
                                <input type="text" name="password" placeholder="Password" id="password" className="form-control" onChange={this.handleChangePassword} value={this.state.password} required></input>
                            </div>
                            <div className="row d-flex justify-content-center">
                                <button type="submit" className="roboto font-weight-bold btn btn-info btn-sp col-sm-6">Sign-In</button>
                            </div>
                        </form>
                        <div className="row d-flex justify-content-center">
                            <button type="" className="roboto font-weight-bold btn btn-info btn-sp col-sm-6">Sign-Up</button>
                            {error}
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