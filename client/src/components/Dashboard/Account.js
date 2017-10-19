import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl, Row, Col, Checkbox } from 'react-bootstrap';
import axios from 'axios';
import Spinner from './/Spinner';
import AlertMessage from './Alert';

class Account extends Component {
    constructor(props){
        super(props)
        this.state = {
            userId: this.props.userId,
            user: {
                id: '',
                username: '',
                email: '',
                first_name: '',
                last_name: '',
            },
            isLoading: false,
            alertOpen: false
        }
    }

    componentDidMount() {
        axios.get(`/api/users/&id=${this.state.userId}`)
        .then(result => {
            console.log(result)
            if (result.data !== null) {
                this.setState({
                    user: {
                        id: result.data.id,
                        username: result.data.username,
                        email: result.data.email,
                        first_name: result.data.first_name,
                        last_name: result.data.last_name,
                        user_type: "1",
                        user_plan: "1"
                    }
                })
            }
        }).catch(err => console.log(err));
    }

    onChange = (e) => {
        const user = this.state.user
        const field = e.target.name
        user[field] = e.target.value;
        this.setState({
            user: user
        });
      }
   
    handleSubmit = (e) => {
        e.preventDefault();
        const accountInfo = this.state.user
        axios.put(`/api/users/&id=${this.state.user.id}`, accountInfo)
            .then(result => {
                console.log(result.data)
            }).catch(err => console.log(err))
    }

    render() {
    const { user } = this.state
    return (
        <div className="container">
        <h2 className="poppins-font">Account Information</h2>
        <hr/>
        <form action={`/api/users/&id=${this.state.user.id}`} method="PUT" onSubmit={this.handleSubmit}>
            <Row>
                <Col xs={6}>
                    <FormGroup>
                    <ControlLabel htmlFor="firstName">First Name: <span className="star">*</span> </ControlLabel>
                        <FormControl name="first_name" type="text" value={user.first_name} onChange={this.onChange} placeholder="Wayne" id="firstName" pattern=".{1,255}" required/>
                    </FormGroup>
                </Col>
                <Col xs={6}>
                    <FormGroup>
                        <ControlLabel htmlFor="lastName">Last Name: <span className="star">*</span> </ControlLabel>
                        <FormControl name="last_name" type="text" value={user.last_name} onChange={this.onChange} placeholder="Rooney" id="lastName" pattern=".{1,255}" required/>
                    </FormGroup>
                </Col>
            </Row>
            <Row>
                <Col xs={6}>
                    <FormGroup>
                        <ControlLabel htmlFor="username">Username: <span className="star">*</span> </ControlLabel>
                        <FormControl name="username" value={user.username} onChange={this.onChange} placeholder="waynesworld" type="text" id="username" pattern=".{1,255}" required />
                    </FormGroup>
                </Col>
                <Col xs={6}>
                    <FormGroup>
                        <ControlLabel htmlFor="email">Email: <span className="star">*</span> </ControlLabel>
                        <FormControl name="email" type="email" value={user.email} onChange={this.onChange} placeholder="wayne@gmail.com" id="email" pattern=".{1,255}" required/>
                    </FormGroup>
                </Col>
            </Row>
            <button type="submit" className="btn btn-primary">Update</button>
        </form>
        <div class="pad-med"></div>
    </div>
    )
  }
}

export default Account;