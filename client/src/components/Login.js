import React, { Component } from 'react';
import { FormGroup, ControlLabel, HelpBlock, FormControl, InputGroup, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import Spinner from './Dashboard/Spinner';
import AlertMessage from './Dashboard/Alert';

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
            },
            isLoading: false,
            alertOpen: false,
            alertAction: ''
        }
    }

    handleLogin = (e) => {
        this.setState({
            isLoading: true
        })
        e.preventDefault()
        const user = this.state.user;
        axios.post('api/auth/login', user)
            .then(result => {
                if(result.data.isAuthenticated) {
                    this.setState({
                        isLoading: false,
                        alertAction: 'update',
                        alertOpen: true
                    })
                    window.location.pathname = `/dashboard`
                } else {
                    this.setState({
                        errors: {
                            login: result.data.errors.signup
                        },
                        isLoading: false,
                        alertAction: 'fail',
                        alertOpen: true
                    })
                }
                }).catch((err) => {
                    console.log(err)
                    this.setState({
                        errors: err,
                        isLoading: false,
                        alertAction: 'fail',
                        alertOpen: true
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

    handleDismiss = () => {
        this.setState({
            alertOpen: false
        })
    }

    render() {
        const { user, validation } = this.state
        const spinner = (this.state.isLoading) ? <Spinner /> : ''
        return (
            <div className="container">
                <h1>Login {spinner}</h1>
                {(this.state.alertOpen && this.state.alertAction == 'update') ? <AlertMessage bsStyle="success" handleDismiss={this.handleDismiss} title="Success!" message="Login success"/> : '' }
                {(this.state.alertOpen && this.state.alertAction == 'fail') ? <AlertMessage bsStyle="danger" handleDismiss={this.handleDismiss} title="Failure" message="Login was unsuccessfull, please try again"/> : '' }
                <form method="POST" action='api/auth/login' id="login-form" onSubmit={this.handleLogin}>
                    <Row>
                        <Col xs={12} md={6}>
                            <FormGroup controlId="formValidationUsername" validationState={validation.username.state}>
                                <ControlLabel htmlFor="username">Username: </ControlLabel>
                                <FormControl name="username" value={user.username.trim()} placeholder="cristiano7" type="text" id="username" onChange={this.onChange} required/>
                                <FormControl.Feedback />
                                <HelpBlock>{validation.username.help}</HelpBlock>
                            </FormGroup>
                        </Col>
                        <Col xs={12} md={6}>
                            <FormGroup controlId="formValidationPassowrd" validationState={validation.password.state}>
                                <ControlLabel htmlFor="password">Password: </ControlLabel>
                                <FormControl name="password" value={user.password.trim()} type="password" id="password" onChange={this.onChange} required/>
                                <FormControl.Feedback />
                                <HelpBlock>{validation.password.help}</HelpBlock>
                            </FormGroup>
                        </Col>
                    </Row>
                    <button type="submit" className="btn btn-primary btn-lg">Login {spinner}</button>
                </form>
            </div>
        )
    }
}

export default Login;