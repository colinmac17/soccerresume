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
                club_team: '',
                primary_position: '',
                position_2: '',
                height_inches: '',
                weight: '',
                coach_contact_name: '',
                coach_contact_email: '',
                commitment_school: '',
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
                    isChecked: result.data.commitment_status,
                    user: {
                        club_team: result.data.club_team,
                        primary_position: result.data.primary_position,
                        position_2: result.data.position_2,
                        height_inches: result.data.height_inches,
                        weight: result.data.weight,
                        coach_contact_name: result.data.coach_contact_name,
                        coach_contact_email: result.data.coach_contact_email,
                        commitment_school: result.data.commitment_school
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

      renderAlert = (type, msg) => {
          if (type = 'error') alert(msg)
      }
   
    handleSubmit = (e) => {
        e.preventDefault();
        const athleticInfo = this.state.user
        athleticInfo.commitment_status = this.state.isChecked
        if (this.state.method == 'POST') {
            axios.post(`/api/athletic/create`, athleticInfo)
                .then(result => {
                    console.log(result.data)
                    this.setState({
                        method: 'PUT'
                    })
                }).catch(err => console.log(err))
        } else {
            if (!this.state.isChecked) athleticInfo.commitment_school = ' '
            axios.put(`/api/athletic/&id=${this.state.userId}`, athleticInfo)
                .then(result => {
                    console.log(result)
                }).catch(err => console.log(err))
        }
    }

    render() {
    const { user } = this.state
    return (
        <div className="container">
        <h2 className="poppins-font">Athletic Information</h2>
        <hr/>
        <form action={(this.state.method === 'POST') ? '/api/athletic/create' : `/api/athletic/&id=${this.state.userId}`} method={this.state.method} onSubmit={this.handleSubmit}>
            <Row>
                <Col xs={6}>
                    <FormGroup>
                        <ControlLabel htmlFor="primaryPosition">Primary Position: <span className="red">*</span>  </ControlLabel>
                            <select className="form-control" name="primary_position" type="text" value={(this.state.method === "POST") ? user.primary_position.trim() : user.primary_position} onChange={this.onChange}  id="primaryPosition" pattern=".{2,255}" required>
                                <option>-----</option>
                                <option value="GoalKeeper">Goalkeeper</option>
                                <option value="Right Back">Right Back</option>
                                <option value="Left Back">Left Back</option>
                                <option value="Center Back">Center Back</option>
                                <option value="Defensive Mid">Defensive Center Mid</option>
                                <option value="Attacking Mid">Attacking Center Mid</option>
                                <option value="Outside Mid/Winger">Outside Mid / Winger</option>
                                <option value="Forward">Forward</option>
                            </select>
                    </FormGroup>
                </Col>
                <Col xs={6}>
                    <FormGroup>
                        <ControlLabel htmlFor="position2">Secondary Position: </ControlLabel>
                        <select className="form-control" name="position_2" type="text" value={(this.state.method === "POST") ? user.position_2.trim() : user.position_2} onChange={this.onChange}  id="position2" pattern=".{2,255}">
                            <option>-----</option>
                            <option value="GoalKeeper">Goalkeeper</option>
                            <option value="Right Back">Right Back</option>
                            <option value="Left Back">Left Back</option>
                            <option value="Center Back">Center Back</option>
                            <option value="Defensive Mid">Defensive Center Mid</option>
                            <option value="Attacking Mid">Attacking Center Mid</option>
                            <option value="Outside Mid/Winger">Outside Mid / Winger</option>
                            <option value="Forward">Forward</option>
                        </select>
                    </FormGroup>
                </Col>
            </Row>
            <Row>
                <Col xs={6}>
                    <FormGroup>
                        <ControlLabel htmlFor="actScore">Height (inches): <span className="red">*</span> </ControlLabel>
                        <FormControl name="height_inches" type="text" value={(this.state.method === "POST") ? user.height_inches.trim() : user.height_inches} onChange={this.onChange} placeholder="72" id="heightInches" maxLength="2" pattern=".{2,2}" required/>
                    </FormGroup>
                </Col>
                <Col xs={6}>
                    <FormGroup>
                        <ControlLabel htmlFor="weight">Weight: (lbs) </ControlLabel>
                        <FormControl name="weight" value={(this.state.method === "POST") ? user.weight.trim() : user.weight} onChange={this.onChange} placeholder="175" type="text" id="weight" maxLength="3" pattern=".{2,3}" />
                    </FormGroup>
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    <FormGroup>
                        <ControlLabel htmlFor="clubTeam">Club Team: <span className="red">*</span> </ControlLabel>
                        <FormControl name="club_team" value={(this.state.method === "POST") ? user.club_team : user.club_team} onChange={this.onChange} placeholder="San Diego Surf U-16 Academy" type="text" id="clubTeam" pattern=".{2,255}" required />
                    </FormGroup>
                </Col>
            </Row>
            <Row>
                <Col xs={6}>
                    <FormGroup>
                        <ControlLabel htmlFor="coachName">Coach Contact Name: </ControlLabel>
                        <FormControl name="coach_contact_name" value={(this.state.method === "POST") ? user.coach_contact_name : user.coach_contact_name} onChange={this.onChange} placeholder="Alex Ferguson" type="text" id="coachName" pattern=".{2,255}" />
                    </FormGroup>
                </Col>
                <Col xs={6}>
                    <FormGroup>
                        <ControlLabel htmlFor="coachEmail">Coach Contact Email: </ControlLabel>
                        <FormControl name="coach_contact_email" value={(this.state.method === "POST") ? user.coach_contact_email.trim() : user.coach_contact_email} onChange={this.onChange} placeholder="alex@siralex.com" type="email" id="coachEmail" pattern=".{5,55}" />
                    </FormGroup>
                </Col>
            </Row>
            <Row>
            <Col xs={6}>
                <FormGroup>
                    <ControlLabel htmlFor="commitmentStatus">Committment Status: </ControlLabel>
                    <br/>
                    <Checkbox name="commitment_status" onChange={this.handleCheckBoxChange} id="commitmentStatus" inline value="1" checked={this.state.isChecked} >Committed</Checkbox>
                </FormGroup>
            </Col>
            <Col xs={6}>
                <FormGroup>
                    <ControlLabel htmlFor="commitmentSchool">Commitment School: </ControlLabel>
                    <FormControl name="commitment_school" value={(this.state.isChecked) ? user.commitment_school : ''} onChange={this.onChange} disabled={!this.state.isChecked} required={this.state.isChecked} placeholder="University of Michigan" type="text" id="commitmentSchool" pattern=".{2,255}" />
                </FormGroup>
            </Col>
        </Row>
            <button type="submit" className="btn btn-primary">{(this.state.method === 'POST') ? 'Submit' : 'Update'}</button>
        </form>
        <div class="pad-med"></div>
    </div>
    )
  }
}

export default AthleticInfo;