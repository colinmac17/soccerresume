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
                ncaa_eligibility_status: '',
                userId: this.props.userId
            }
        }
    }
    componentDidMount() {
        axios.get(`/api/academic/&id=${this.state.userId}`)
        .then(result => {
            console.log(result)
            if (result.data !== null) {
                this.setState({
                    method: 'PUT',
                    user: {
                        grad_year: result.data.grad_year,
                        gpa: result.data.gpa,
                        sat_score: result.data.sat_score,
                        act_score: result.data.act_score,
                        highschool: result.data.highschool,
                        ncaa_eligibility_status: result.data.ncaa_eligibility_status
                    }
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

      toggleChange = () => {
        this.setState({
          user: {
              ncaa_eligibility_status: !this.state.user.ncaa_eligibility_status
          }
        });
      }
   
    handleSubmit = (e) => {
        e.preventDefault();
        const academicInfo = this.state.user

        if (this.state.method == 'POST') {
            axios.post(`/api/academic/create`, academicInfo)
                .then(result => {
                    console.log(result.data)
                    this.setState({
                        method: 'PUT'
                    })
                }).catch(err => console.log(err))
        } else {
            axios.put(`/api/academic/&id=${this.state.userId}`, academicInfo)
                .then(result => {
                    console.log(result)
                }).catch(err => console.log(err))
        }
    }

    render() {
    const { user } = this.state
    return (
        <div className="contaienr">
        <h2 className="poppins-font">Academic Information</h2>
        <form action={(this.state.method === 'POST') ? '/api/academic/create' : `/api/academic/&id=${this.state.userId}`} method={this.state.method} onSubmit={this.handleSubmit}>
            <Row>
                <Col xs={6}>
                    <FormGroup>
                        <ControlLabel htmlFor="gradYear">Grad Year: </ControlLabel>
                        <FormControl name="grad_year" value={(this.state.method === "POST") ? user.grad_year.trim() : user.grad_year} onChange={this.onChange} placeholder="2020" type="text" id="gradYear" maxLength="4" pattern=".{4,4}" required />
                    </FormGroup>
                </Col>
                <Col xs={6}>
                    <FormGroup>
                        <ControlLabel htmlFor="gpa">GPA: </ControlLabel>
                        <FormControl name="gpa" type="text" value={(this.state.method === "POST") ? user.gpa.trim() : user.gpa} onChange={this.onChange} placeholder="3.50" id="gpa" maxLength="4" pattern=".{4,4}" required/>
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
                        <ControlLabel htmlFor="highschool">HighSchool: </ControlLabel>
                        <FormControl name="highschool" value={(this.state.method === "POST") ? user.highschool : user.highschool} onChange={this.onChange} placeholder="Torrey Pines" type="text" id="hishschool" pattern=".{2,40}" />
                    </FormGroup>
                </Col>
                <Col xs={6}>
                    <FormGroup>
                        <ControlLabel>NCAA Eligibility Status: </ControlLabel>
                        <br/>
                        <Radio name="ncaa_eligibility_status" inline value="true" onChange={this.onChange} checked={this.state.user.ncaa_eligibility_status === "true"}>Eligible</Radio>
                        <Radio name="ncaa_eligibility_status" inline value="false" onChange={this.onChange} checked={this.state.user.ncaa_eligibility_status === "false"}>Not Yet Eligible</Radio>
                    </FormGroup>
                </Col>
            </Row>
            <button type="submit" class="btn btn-primary">{(this.state.method === 'POST') ? 'Submit' : 'Update'}</button>
        </form>
    </div>
    )
  }
}

export default AcademicInfo;

//checked={(this.state.user.ncaa_eligibility_status) ? false : true}
// checked={(this.state.user.ncaa_eligibility_status) ? true : false}