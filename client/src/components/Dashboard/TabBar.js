import React, { Component } from 'react';
import axios from 'axios';
import { Tabs, Tab, FormGroup, ControlLabel, HelpBlock, FormControl, InputGroup, Row, Col } from 'react-bootstrap';

class TabBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: {
                academic: {
                    userId: '',
                    grad_year: '',
                    gpa: '',
                    sat_score: '',
                    act_score: '',
                    highschool: '',
                    ncaa_eligibility_status: '',
                    ncaa_eligibility_number: '',

                }
            }
        }
    }

    onChange = (e) => {
        const user = this.state.user.academic
        const field = e.target.name
        user[field] = e.target.value;
        this.setState({
            user: user
        });
      }

    
    render() {
        const { user } = this.state
        const Academic = (
            <div className="contaienr">
                <h2 className="poppins-font">Academic Information</h2>
                <form>
                    <Row>
                        <Col xs={6}>
                            <FormGroup>
                                <ControlLabel htmlFor="gradYear">Grad Year: </ControlLabel>
                                <FormControl name="grad_year" value="" placeholder="2020" type="text" id="gradYear" maxLength="4" pattern=".{4,4}" required/>
                            </FormGroup>
                        </Col>
                        <Col xs={6}>
                            <FormGroup>
                                <ControlLabel htmlFor="gpa">GPA: </ControlLabel>
                                <FormControl name="gpa" value="" type="text" placeholder="3.50" id="gpa" pattern=".{4,4}" required/>
                            </FormGroup>
                        </Col>
                    </Row>
                </form>
            </div>
        )

        const Athletic = (
            <h2>Athletic Information</h2>
        )

        const Media = (
            <h2>Media</h2>
        )

        const Contact = (
            <h2>Contact Information</h2>
        )

        const Account = (
            <h2>Account Information</h2>
        )

        const Favorites = (
            <h2>Favorites</h2>
        )

        return (
            <Tabs defaultActiveKey={1} id="dashboard-tab-bar">
                <Tab eventKey={1} title="Academic">
                    {Academic}
                </Tab>
                <Tab eventKey={2} title="Athletic">
                    {Athletic}
                </Tab>
                <Tab eventKey={3} title="Media">
                    {Media}
                </Tab>
                <Tab eventKey={4} title="Contact">
                    {Contact}
                </Tab>
                <Tab eventKey={5} title="Account">
                    {Account}
                </Tab>
                <Tab eventKey={6} title="Favorites">
                    {Favorites}
                </Tab>
            </Tabs>
        )
    }
}

export default TabBar;