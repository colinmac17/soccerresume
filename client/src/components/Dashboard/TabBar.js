import React, { Component } from 'react';
import axios from 'axios';
import AthleticInfo from './AthleticInfo';
import AcademicInfo from './AcademicInfo';
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

      changeTab = (e) => {
          console.log('tab changed');
      }

    
    render() {
        const { user } = this.state
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
            <Tabs animation={false} onSelect={this.changeTab} defaultActiveKey={1} id="dashboard-tab-bar">
                <Tab eventKey={1} title="Academic">
                    <AcademicInfo />
                </Tab>
                <Tab eventKey={2} title="Athletic">
                    <AthleticInfo />
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