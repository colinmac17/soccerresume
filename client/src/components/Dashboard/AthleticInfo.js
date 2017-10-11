import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl, Row, Col, Checkbox } from 'react-bootstrap';
import axios from 'axios';

class AthleticInfo extends Component {
    constructor(props){
        super(props)
        this.state = {
            userId: this.props.userId,
            method: '',
            isChecked: '',
            user: {
                grad_year: '',
                gpa: '',
                sat_score: '',
                act_score: '',
                highschool: '',
                userId: this.props.userId
            }
        }
    }
    componentDidMount() {
        axios.get(`/api/athletic/&id=${this.state.userId}`)
        .then(result => {
            console.log(result)
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

      handleCheckBoxChange = (e) => {
        this.setState({
          isChecked: e.target.checked
        });
      }
   
    handleSubmit = (e) => {
        e.preventDefault();
        const academicInfo = this.state.user
        academicInfo.ncaa_eligibility_status = this.state.isChecked
        if (this.state.method == 'POST') {
            axios.post(`/api/athletic/create`, academicInfo)
                .then(result => {
                    console.log(result.data)
                    this.setState({
                        method: 'PUT'
                    })
                }).catch(err => console.log(err))
        } else {
            axios.put(`/api/athletic/&id=${this.state.userId}`, academicInfo)
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
        <form action={(this.state.method === 'POST') ? '/api/athletic/create' : `/api/athletic/&id=${this.state.userId}`} method={this.state.method} onSubmit={this.handleSubmit}>
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
                        <ControlLabel htmlFor="ncaaStatus">NCAA Eligibility Status: </ControlLabel>
                        <br/>
                        <Checkbox name="ncaa_eligibility_status" onChange={this.handleCheckBoxChange} id="ncaaStatus" inline value="1" checked={this.state.isChecked}>Eligible</Checkbox>
                    </FormGroup>
                </Col>
            </Row>
            <button type="submit" className="btn btn-primary">{(this.state.method === 'POST') ? 'Submit' : 'Update'}</button>
        </form>
    </div>
    )
  }
}

export default AthleticInfo;