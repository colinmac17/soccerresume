import React, { Component } from 'react';
import axios from 'axios';
import AthleticInfo from './AthleticInfo';
import AcademicInfo from './AcademicInfo';
import Media from './Media';
import ContactInfo from './ContactInfo';
import Account from './Account';
import Favorites from './Favorites';
import { Tabs, Tab, FormGroup, ControlLabel, HelpBlock, FormControl, InputGroup, Row, Col } from 'react-bootstrap';

class TabBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: {
                academic: {
                    userId: this.props.userId,
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

    componentDidMount () {
        axios.get('/api/user/&id')
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

        return (
            <Tabs animation={false} onSelect={this.changeTab} defaultActiveKey={1} id="dashboard-tab-bar">
                <Tab eventKey={1} title="Academic">
                    <AcademicInfo userId={this.state.user.academic.userId}/>
                </Tab>
                <Tab eventKey={2} title="Athletic">
                    <AthleticInfo userId={this.state.user.academic.userId} />
                </Tab>
                <Tab eventKey={3} title="Media">
                    <Media userId={this.state.user.academic.userId}/>
                </Tab>
                <Tab eventKey={4} title="Contact">
                    <ContactInfo userId={this.state.user.academic.userId} />
                </Tab>
                <Tab eventKey={5} title="Account">
                    <Account userId={this.state.user.academic.userId} />
                </Tab>
                <Tab eventKey={6} title="Favorites">
                    <Favorites userId={this.state.user.academic.userId} />
                </Tab>
            </Tabs>
        )
    }
}

export default TabBar;