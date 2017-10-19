import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl, Row, Col, Checkbox } from 'react-bootstrap';
import axios from 'axios';
import Spinner from './/Spinner';
import AlertMessage from './Alert';

class ContactInfo extends Component {
    constructor(props){
        super(props)
        this.state = {
            userId: this.props.userId,
            method: '',
            user: {
                phone_number: '',
                twitter_handle: '',
                birthday: '',
                home_city: '',
                home_state: '',
                userId: this.props.userId
            },
            isLoading: false,
            alertOpen: false,
            alertAction: ''
        }
    }
    componentDidMount() {
        this.setState({
            isLoading: true
        })
        axios.get(`/api/contact/&id=${this.state.userId}`)
        .then(result => {
            console.log(result)
            if (result.data !== null) {
                this.setState({
                    method: 'PUT',
                    user: {
                        phone_number: result.data.phone_number,
                        twitter_handle: result.data.twitter_handle,
                        birthday: result.data.birthday,
                        home_city: result.data.home_city,
                        home_state: result.data.home_state
                    },
                    isLoading: false
                })
            } else {
                this.setState({
                    method: 'POST',
                    isLoading: false
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
        this.setState({
            isLoading: true
        })
        e.preventDefault();
        const contactInfo = this.state.user
        if (this.state.method == 'POST') {
            axios.post(`/api/contact/create`, contactInfo)
                .then(result => {
                    console.log(result.data)
                    this.setState({
                        method: 'PUT',
                        isLoading: false,
                        alertAction: 'update',
                        alertOpen: true
                    })
                }).catch(err => console.log(err))
        } else {
            axios.put(`/api/contact/&id=${this.state.userId}`, contactInfo)
                .then(result => {
                    console.log(result)
                    this.setState({
                        isLoading: false,
                        alertAction: 'update',
                        alertOpen: true
                    })
                }).catch(err => console.log(err))
        }
    }

    handleDismiss = () => {
        this.setState({
            alertOpen: false
        })
    }

    render() {
    const { user } = this.state
    const spinner = (this.state.isLoading) ? <Spinner /> : ''
    return (
        <div className="container">
        <h2 className="poppins-font">Contact Information {spinner}</h2>
        {(this.state.alertOpen && this.state.alertAction == 'update') ? <AlertMessage bsStyle="success" handleDismiss={this.handleDismiss} title="Success!" message="Settings updated successfully"/> : '' }
        <hr/>
        <form action={(this.state.method === 'POST') ? '/api/contact/create' : `/api/contact/&id=${this.state.userId}`} method={this.state.method} onSubmit={this.handleSubmit}>
            <Row>
                <Col xs={6}>
                    <FormGroup>
                        <ControlLabel htmlFor="phoneNumber">Phone Number: <span className="star">*</span> </ControlLabel>
                        <FormControl name="phone_number" value={(this.state.method === "POST") ? user.phone_number.trim() : user.phone_number} onChange={this.onChange} placeholder="1234567890" type="text" id="phoneNumber" maxLength="10" pattern=".{10,10}" required />
                    </FormGroup>
                </Col>
                <Col xs={6}>
                    <FormGroup>
                        <ControlLabel htmlFor="birthday">Birthday: <span className="star">*</span> </ControlLabel>
                        <FormControl name="birthday" type="date" value={(this.state.method === "POST") ? user.birthday : user.birthday} onChange={this.onChange} id="birthday" pattern=".{8,8}" required/>
                    </FormGroup>
                </Col>
            </Row>
            <Row>
                <Col xs={6}>
                    <FormGroup>
                        <ControlLabel htmlFor="homeCity">Home City: <span className="star">*</span> </ControlLabel>
                        <FormControl name="home_city" value={(this.state.method === "POST") ? user.home_city : user.home_city} onChange={this.onChange} placeholder="San Diego" type="text" id="homeCity" pattern=".{1,255}" required />
                    </FormGroup>
                </Col>
                <Col xs={6}>
                    <FormGroup>
                        <ControlLabel htmlFor="homeState">Home State: <span className="star">*</span> </ControlLabel>
                        <FormControl name="home_state" type="text" value={(this.state.method === "POST") ? user.home_state : user.home_state} onChange={this.onChange} placeholder="CA" id="homeState" maxLength="2" pattern=".{2,2}" required />
                    </FormGroup>
                </Col>
            </Row>
            <Row>
                <Col xs={6}>
                    <FormGroup>
                        <ControlLabel htmlFor="twitterHandle">Twitter Handle: </ControlLabel>
                        <FormControl name="twitter_handle" value={(this.state.method === "POST") ? user.twitter_handle.trim() : user.twitter_handle} onChange={this.onChange} placeholder="WayneRooney" type="text" id="twitterHandle" pattern=".{1,255}" />
                    </FormGroup>
                </Col>
            </Row>
            <button type="submit" className="btn btn-primary">{(this.state.method === 'POST') ? 'Submit' : 'Update'} {spinner}</button>
        </form>
        <div class="pad-med"></div>
    </div>
    )
  }
}

export default ContactInfo;