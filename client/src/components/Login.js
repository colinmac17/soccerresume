import React, { Component } from 'react';
import axios from 'axios';

class Login extends Component {
    constructor(props){
        super(props)
        this.state = {
            user: {
                username: '',
                password: ''
            },
            errors: {}
        }
    }

    handleLogin = (e) => {
        e.preventDefault()
        const user = this.state.user;
        axios.post('api/auth/login', user)
            .then(result => {
                if(result.data.isAuthenticated) {
                    window.location.pathname = `/dashboard/`
                } else {
                    this.setState({
                        errors: {
                            login: result.data.errors.signup
                        }
                    })
                }
                }).catch((err) => {
                    this.setState({
                        errors: err
                    })
                })
    }

    onChange = (e) => {
        // Because we named the inputs to match their corresponding values in state, it's
        // super easy to update the state
        const user = this.state.user
        const field = e.target.name
        user[field] = e.target.value;
        this.setState({user});
    }

    render() {
        const { user } = this.state
        return (
            <div className="container margin-top-50">
                <h1>Login</h1>
                <form method="POST" action='api/auth/login' id="login-form" onSubmit={this.handleLogin}>
                <div className="row">
                <div className="col-xs-6">
                    <div className="form-group">
                        <label htmlFor="email">Username:</label>
                        <input name="username" type="text" className="form-control" placeholder="cristiano" id="username" required value={user.email} onChange={this.onChange}/>
                    </div>
                </div>
                <div className="col-xs-6">
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input name="password" type="text" className="form-control" placeholder="Password" id="password" required value={user.password} onChange={this.onChange}/>
                    </div>
                </div>
            </div>
            <button type="submit" className="btn btn-primary btn-lg">Login</button>
                </form>
            </div>
        )
    }
}

export default Login;