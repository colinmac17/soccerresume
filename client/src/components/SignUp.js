import React, { Component } from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import Message from './Message';
import { FormGroup, ControlLabel, HelpBlock, FormControl, InputGroup, Row, Col } from 'react-bootstrap';
import Spinner from './Dashboard/Spinner';
import AlertMessage from './Dashboard/Alert';
const validator = require('validator');

class SignUp extends Component {
    constructor(props){
        super(props)
        this.state = {
            user: {
                email: '',
                password: '',
                username: '',
                first_name: '',
                last_name: '',
                user_type: '1'
            },
            errors: {
                signup: ''
            },
            isLoading: false,
            validation: {
                first_name: {
                    state: '',
                    help: ''
                },
                last_name: {
                    state: '',
                    help: ''
                },
                username: {
                    state: '',
                    help: ''
                },
                email: {
                    state: '',
                    help: ''
                },
                password: {
                    state: '',
                    help: ''
                },
                user_type: {
                    state: 'success',
                    help: ''
                }
            },
            isLoading: false,
            alertOpen: false,
            alertAction: ''
        }
    }

    checkForUsername = (username) => {
        axios.get(`/api/users/&username=${username}`)
            .then(result => {
                if (result.data.username == username) {
                    this.setState({
                        validation: {
                            username: {
                                state: 'error',
                                help: 'That username is already taken, please try a new one'
                            }
                        }
                    })
                } else if (result.data.username != username & this.state.user.username >= 4) {
                    this.setState({
                        validation: {
                            username: {
                                state: 'success'
                            }
                        }
                    })
                }
            }).catch(err => console.log(err));
    }

    validateFields = () => {
        let emailValidation = (validator.isEmail(this.state.user.email)) ? 'success' : 'error'
        let emailValMessage = (validator.isEmail(this.state.user.email)) ? '' : 'Please enter a valid email'
        this.setState({
            validation: {
                first_name: {
                    state: '',
                    help: ''
                },
                last_name: {
                    state: '',
                    help: ''
                },
                username: {
                    state: '',
                    help: ''
                },
                email: {
                    state: emailValidation,
                    help: emailValMessage
                },
                password: {
                    state: '',
                    help: ''
                },
                user_type: {
                    state: '',
                    help: ''
                }
            }
        });
    }

    onChange = (e) => {
        const user = this.state.user
        const field = e.target.name
        user[field] = e.target.value;
        this.setState({
            user: user
        });
      }

    handleFormSubmit = (e) => {
        this.setState({
            isLoading: true
        })
        const { validation } = this.state.validation
        e.preventDefault()
        const user_plan = document.querySelector("input[name='user_plan']").value;
        const user = this.state.user;
        user.user_plan = user_plan;

        axios.post('/api/auth/signup', user)
            .then((result) => {
            console.log(result)
            if(result.data.isAuthenticated) {
                this.setState({
                    isLoading: false,
                    alertAction: 'update',
                    alertOpen: true
                })
            window.location.pathname = `/dashboard/`
        } else {
            this.setState({
                errors: {
                    signup: result.data.errors.signup
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

    handleDismiss = () => {
        this.setState({
            alertOpen: false
        })
    } 
    
    render() {
        const { errors, user, validation } = this.state
        const spinner = (this.state.isLoading) ? <Spinner /> : ''
        return (
            <div className="container">
            <h1 className="text-center cabin-font">Create a Free Acount {spinner}</h1>
            {(this.state.alertOpen && this.state.alertAction == 'update') ? <AlertMessage bsStyle="success" handleDismiss={this.handleDismiss} title="Success!" message="Registration success"/> : '' }
            {(this.state.alertOpen && this.state.alertAction == 'fail') ? <AlertMessage bsStyle="danger" handleDismiss={this.handleDismiss} title="Failure" message="Registration was unsuccessfull, the username already exisits. Please try a new one"/> : '' }
            <form id="signUpForm" action='api/auth/signup' method="POST" onSubmit={this.handleFormSubmit}>
            <Row>
                <Col xs={6}>
                    <FormGroup validationState={validation.first_name.state}>
                        <ControlLabel htmlFor="firstName">First Name: </ControlLabel>
                        <FormControl name="first_name" value={user.first_name.trim()} placeholder="wayne" type="text" id="firstName" onChange={this.onChange} required/>
                        <FormControl.Feedback />
                        <HelpBlock>{validation.first_name.help}</HelpBlock>
                    </FormGroup>
                </Col>
                <Col xs={6}>
                    <FormGroup validationState={validation.last_name.state}>
                        <ControlLabel htmlFor="lastName">Last Name: </ControlLabel>
                        <FormControl name="last_name" value={user.last_name.trim()} type="text" placeholder="Rooney" id="lastName" onChange={this.onChange} required/>
                        <FormControl.Feedback />
                        <HelpBlock>{validation.last_name.help}</HelpBlock>
                    </FormGroup>
                </Col>
            </Row>
            <Row>
                <Col xs={6}>
                    <FormGroup validationState={validation.username.state}>
                        <ControlLabel htmlFor="username">Username: </ControlLabel>
                        <FormControl name="username" value={user.username.trim()} placeholder="waynesworld" type="text" id="username" onChange={this.onChange} required/>
                        <FormControl.Feedback />
                        <HelpBlock>{validation.username.help}</HelpBlock>
                    </FormGroup>
                </Col>
                <Col xs={6}>
                    <FormGroup validationState={validation.email.state}>
                        <ControlLabel htmlFor="email">Email: </ControlLabel>
                        <FormControl name="email" value={user.email.trim()} type="email" placeholder="wayne@gmail.com" id="email" onChange={this.onChange} required/>
                        <FormControl.Feedback />
                        <HelpBlock>{validation.email.help}</HelpBlock>
                    </FormGroup>
                </Col>
            </Row>
            <Row>
                <Col xs={6}>
                    <FormGroup validationState={validation.user_type.state}>
                        <ControlLabel htmlFor="userType">User Type: </ControlLabel>
                        <select className="form-control" id="userType" name="user_type" value={user.user_type.trim()} onChange={this.onChange}>
                            <option value="1">Player</option>
                            <option value="2" disabled>Coach</option>
                            <option value="3" disabled>Manager</option>
                        </select>
                        <FormControl.Feedback />
                        <HelpBlock>{validation.user_type.help}</HelpBlock>
                    </FormGroup>
                </Col>
                <Col xs={6}>
                    <FormGroup validationState={validation.password.state}>
                        <ControlLabel htmlFor="password">Password: </ControlLabel>
                        <FormControl name="password" value={user.password.trim()} type="password" id="password" maxLength="25" onChange={this.onChange} required/>
                        <FormControl.Feedback />
                        <HelpBlock>{validation.password.help}</HelpBlock>
                    </FormGroup>
                </Col>
            </Row>
            <FormGroup>
                <FormControl name="user_plan" type="hidden" value="1" id="userPlan"></FormControl>
            </FormGroup>
            <button type="submit" className="btn btn-primary btn-lg">Register {spinner}</button>
            <br/>
            <p className="bold margin-top-10">Already have an account? <Link to={'/login'}>Log in</Link> </p>
        </form>
        </div>
        ) 
    }  
}

export default SignUp;