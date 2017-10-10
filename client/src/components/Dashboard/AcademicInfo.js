import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl, Row, Col, Radio } from 'react-bootstrap';
import axios from 'axios';

class AcademicInfo extends Component {
    constructor(props){
        super(props)
        this.state = {
            userId: this.props.userId,
            method: '',
            user: {
                grad_year: '',
                gpa: '',
                sat_score: '',
                act_score: '',
                highschool: '',
                ncaa_eligibility_status: ''
            }
        }
    }
    componentDidMount() {
        axios.get(`/api/academic/&id=${this.state.userId}`)
        .then(result => {
            if (result) {
                this.setState({
                    method: 'PUT'
                })
            } else {
                this.setState({
                    method: 'POST'
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
        if (this.state.method == 'POST') {
            axios.post(`/api/academic/&id=${this.state.userId}`, data)
                .then(result => {

                }).catch(err => console.log(err));
        }
    }

    render() {
    return (
        <div className="contaienr">
        <h2 className="poppins-font">Academic Information</h2>
        <form action={`/api/academic/&id=${this.state.userId}`} method={this.state.method} onSubmit={this.handleSubmit}>
            <Row>
                <Col xs={6}>
                    <FormGroup>
                        <ControlLabel htmlFor="gradYear">Grad Year: </ControlLabel>
                        <FormControl name="grad_year" placeholder="2020" type="text" id="gradYear" maxLength="4" pattern=".{4,4}" required />
                    </FormGroup>
                </Col>
                <Col xs={6}>
                    <FormGroup>
                        <ControlLabel htmlFor="gpa">GPA: </ControlLabel>
                        <FormControl name="gpa" type="text" placeholder="3.50" id="gpa" maxlength="4" pattern=".{4,4}" required/>
                    </FormGroup>
                </Col>
            </Row>
            <Row>
                <Col xs={6}>
                    <FormGroup>
                        <ControlLabel htmlFor="satScore">SAT Score: </ControlLabel>
                        <FormControl name="sat_score" placeholder="1850" type="text" id="satScore" maxLength="4" pattern=".{4,4}" />
                    </FormGroup>
                </Col>
                <Col xs={6}>
                    <FormGroup>
                        <ControlLabel htmlFor="actScore">ACT Score: </ControlLabel>
                        <FormControl name="act_score" type="text" placeholder="29" id="actScore" maxLength="2" pattern=".{2,2}" />
                    </FormGroup>
                </Col>
            </Row>
            <Row>
                <Col xs={6}>
                    <FormGroup>
                        <ControlLabel htmlFor="highschool">HighSchool: </ControlLabel>
                        <FormControl name="highschool" placeholder="Torrey Pines" type="text" id="hishschool" pattern=".{2,40}" />
                    </FormGroup>
                </Col>
                <Col xs={6}>
                    <FormGroup>
                        <ControlLabel>NCAA Eligibility Status: </ControlLabel>
                        <br/>
                        <Radio name="ncaa_eligibility_status" inline value="1" checked={this.props.isChecked}>Eligible</Radio>
                        <Radio name="ncaa_eligibility_status" inline value="0" checked={this.props.isChecked}>Not Yet Eligible</Radio>
                    </FormGroup>
                </Col>
            </Row>
            <button type="submit" class="btn btn-primary">Update</button>
        </form>
    </div>
    )
  }
}

export default AcademicInfo;