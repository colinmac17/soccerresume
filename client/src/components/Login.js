import React, { Component } from 'react';
import { FormGroup, ControlLabel, HelpBlock, FormControl, InputGroup, Row, Col } from 'react-bootstrap';
import axios from 'axios';

class Login extends Component {
    constructor(props){
        super(props)
        this.state = {
            user: {
                username: '',
                password: ''
            },
            errors: {},
            validation: {
                username: {
                    state: '',
                    help: ''
                },
                password: {
                    state: '',
                    help: ''
                }
            }
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
        const { user, validation } = this.state
        return (
            <div className="container margin-top-50">
                <h1>Login</h1>
                <form method="POST" action='api/auth/login' id="login-form" onSubmit={this.handleLogin}>
                    <Row>
                        <Col xs={6}>
                            <FormGroup controlId="formValidationUsername" validationState={validation.username.state}>
                                <ControlLabel htmlFor="username">Username: </ControlLabel>
                                <FormControl name="username" value={user.username.trim()} placeholder="cristiano7" type="text" id="username" onChange={this.onChange} required/>
                                <FormControl.Feedback />
                                <HelpBlock>{validation.username.help}</HelpBlock>
                            </FormGroup>
                        </Col>
                        <Col xs={6}>
                            <FormGroup controlId="formValidationPassowrd" validationState={validation.password.state}>
                                <ControlLabel htmlFor="password">Username: </ControlLabel>
                                <FormControl name="password" value={user.password.trim()} type="text" id="password" onChange={this.onChange} required/>
                                <FormControl.Feedback />
                                <HelpBlock>{validation.password.help}</HelpBlock>
                            </FormGroup>
                        </Col>
                    </Row>
                    <button type="submit" className="btn btn-primary btn-lg">Login</button>
                </form>
            </div>
        )
    }
}

export default Login;