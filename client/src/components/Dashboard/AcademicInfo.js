import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl, Row, Col, Checkbox } from 'react-bootstrap';
import axios from 'axios';
import Spinner from './Spinner';
import AlertMessage from './Alert';

class AcademicInfo extends Component {
    constructor(props){
        super(props)
        this.state = {
            userId: this.props.userId,
            method: '',
            isChecked: false,
            user: {
                grad_year: '',
                gpa: '',
                sat_score: '',
                act_score: '',
                highschool: '',
                userId: this.props.userId
            },
            isLoading: false,
            alertOpen: false,
            errors: '',
            bsStyle: '',
            alertMessage: '',
            alertTitle: ''
        }
    }

    componentDidMount() {
        this.setState({
            isLoading: true
        })
        axios.get(`/api/academic/&id=${this.state.userId}`)
        .then(result => {
            if (result.data !== null) {
                this.setState({
                    method: 'PUT',
                    isChecked: result.data.ncaa_eligibility_status,
                    user: {
                        grad_year: result.data.grad_year,
                        gpa: result.data.gpa,
                        sat_score: result.data.sat_score,
                        act_score: result.data.act_score,
                        highschool: result.data.highschool
                    },
                    isLoading: false
                })
            } else {
                this.setState({
                    method: 'POST',
                    isLoading: false
                })
            }
        }).catch(err => {
            this.setState({
                isLoading: false,
                alertOpen: true,
                errors: err,
                alertMessage: 'Sorry, There was an internal error. Please contact us if you need additional support.',
                alertTitle: 'Error!',
                bsStyle: 'danger'
            })
        })
    }

    onChange = (e) => {
        const user = this.state.user
        const field = e.target.name
        user[field] = e.target.value;
        this.setState({
            user: user
        });
      }

      handleCheckBoxChange = (e) => {
        this.setState({
          isChecked: e.target.checked
        });
      }
   
    handleSubmit = (e) => {
        this.setState({
            isLoading: true
        })
        e.preventDefault();
        const academicInfo = this.state.user
        academicInfo.ncaa_eligibility_status = this.state.isChecked
        if (this.state.method == 'POST') {
            axios.post(`/api/academic/create`, academicInfo)
                .then(result => {
                    this.setState({
                        method: 'PUT',
                        isLoading: false,
                        alertOpen: true,
                        alertMessage: 'Athletic information has been updated successfully',
                        alertTitle: 'Success',
                        bsStyle: 'success'
                    })
                }).catch(err => {
                    this.setState({
                        errors: err,
                        isLoading: false,
                        alertOpen: true,
                        alertMessage: 'Sorry, There was an internal error. Please contact us if you need additional support.',
                        alertTitle: 'Error!',
                        bsStyle: 'danger'
                    })
                })
        } else {
            axios.put(`/api/academic/&id=${this.state.userId}`, academicInfo)
                .then(result => {
                    this.setState({
                        isLoading: false,
                        alertOpen: true,
                        alertMessage: 'Academic information has been updated successfully',
                        alertTitle: 'Success',
                        bsStyle: 'success'
                    })
                }).catch(err => {
                    this.setState({
                        errors: err,
                        isLoading: false,
                        alertOpen: true,
                        alertMessage: 'Sorry, There was an internal error. Please contact us if you need additional support.',
                        alertTitle: 'Error!',
                        bsStyle: 'danger'
                    })
                })
        }
    }

    handleDismiss = () => {
        this.setState({
            alertOpen: false
        })
    }

    render() {
    const { user } = this.state
    const academicMessage = 'Please fill in your academic information accurately below.'
    const spinner = (this.state.isLoading) ? <Spinner /> : ''
    return (
        <div className="container">
        <h2 className="poppins-font">Academic Information {spinner}</h2>
        {(this.state.alertOpen) ? <AlertMessage bsStyle={this.state.bsStyle} handleDismiss={this.handleDismiss} title={this.state.alertTitle} message={this.state.alertMessage}/> : '' }
        <hr/>
        <form action={(this.state.method === 'POST') ? '/api/academic/create' : `/api/academic/&id=${this.state.userId}`} method={this.state.method} onSubmit={this.handleSubmit}>
            <Row>
                <Col xs={6}>
                    <FormGroup>
                        <ControlLabel htmlFor="gradYear">Grad Year: <span className="star">*</span> </ControlLabel>
                        <FormControl name="grad_year" value={(this.state.method === "POST") ? user.grad_year.trim() : user.grad_year} onChange={this.onChange} placeholder="2020" type="text" id="gradYear" maxLength="4" pattern=".{4,4}" required />
                    </FormGroup>
                </Col>
                <Col xs={6}>
                    <FormGroup>
                        <ControlLabel htmlFor="gpa">GPA: </ControlLabel>
                        <FormControl name="gpa" type="text" value={(this.state.method === "POST") ? user.gpa.trim() : user.gpa} onChange={this.onChange} placeholder="3.50" id="gpa" maxLength="4" pattern=".{3,4}"/>
                    </FormGroup>
                </Col>
            </Row>
            <Row>
                <Col xs={6}>
                    <FormGroup>
                        <ControlLabel htmlFor="satScore">SAT Score: </ControlLabel>
                        <FormControl name="sat_score" value={(this.state.method === "POST") ? user.sat_score.trim() : user.sat_score} onChange={this.onChange} placeholder="1850" type="text" id="satScore" maxLength="4" pattern=".{4,4}" />
                    </FormGroup>
                </Col>
                <Col xs={6}>
                    <FormGroup>
                        <ControlLabel htmlFor="actScore">ACT Score: </ControlLabel>
                        <FormControl name="act_score" type="text" value={(this.state.method === "POST") ? user.act_score.trim() : user.act_score} onChange={this.onChange} placeholder="29" id="actScore" maxLength="2" pattern=".{2,2}" />
                    </FormGroup>
                </Col>
            </Row>
            <Row>
                <Col xs={6}>
                    <FormGroup>
                        <ControlLabel htmlFor="highschool">HighSchool: <span className="star">*</span> </ControlLabel>
                        <FormControl name="highschool" value={(this.state.method === "POST") ? user.highschool : user.highschool} onChange={this.onChange} placeholder="Torrey Pines" type="text" id="hishschool" pattern=".{2,40}" required/>
                    </FormGroup>
                </Col>
                <Col xs={6}>
                    <FormGroup>
                        <ControlLabel htmlFor="ncaaStatus">NCAA Eligibility Status: </ControlLabel>
                        <br/>
                        <Checkbox name="ncaa_eligibility_status" onChange={this.handleCheckBoxChange} id="ncaaStatus" inline value="1" checked={this.state.isChecked}>Eligible</Checkbox>
                    </FormGroup>
                </Col>
            </Row>
            <button type="submit" className="btn btn-primary">{(this.state.method === 'POST') ? 'Submit' : 'Update'} {spinner} </button>
        </form>
        <div class="pad-med"></div>
    </div>
    )
  }
}

export default AcademicInfo;

//checked={(this.state.user.ncaa_eligibility_status) ? false : true}
// checked={(this.state.user.ncaa_eligibility_status) ? true : false}