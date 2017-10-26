import React, { Component } from 'react';
import axios from 'axios';
import AthleticInfo from './AthleticInfo';
import AcademicInfo from './AcademicInfo';
import Media from './Media';
import ContactInfo from './ContactInfo';
import Account from './Account';
import Settings from './Settings';
import Accolades from './Accolades';
import ProfPic from './ProfPic';
import { Tabs, Tab, FormGroup, ControlLabel, HelpBlock, FormControl, InputGroup, Row, Col } from 'react-bootstrap';

class TabBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: this.props.user
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({data: nextProps.user});
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
        //   console.log('tab changed');
      }

    render() {
        const { user } = this.state

        return (
            <Tabs animation={false} onSelect={this.changeTab} defaultActiveKey={1} id="dashboard-tab-bar">
                <Tab eventKey={1} title="Academic">
                    <AcademicInfo userId={this.state.data.user.id} academicStats={this.state.data.academic_stats} />
                </Tab>
                <Tab eventKey={2} title="Athletic">
                    <AthleticInfo userId={this.state.data.user.id} />
                </Tab>
                <Tab eventKey={3} title="Accolades">
                    <Accolades userId={this.state.data.user.id} />
                </Tab>
                <Tab eventKey={4} title="Media">
                    <Media userId={this.state.data.user.id}/>
                </Tab>
                <Tab eventKey={5} title="Contact">
                    <ContactInfo userId={this.state.data.user.id} />
                </Tab>
                <Tab eventKey={6} title="Account">
                    <Account userId={this.state.data.user.id} accountInfo={this.state.data.user} />
                </Tab>
                <Tab eventKey={7} title="Profile Picture">
                    <ProfPic userId={this.state.data.user.id} user={this.state.data.user} />
                </Tab>
                <Tab eventKey={8} title="Settings">
                    <Settings userId={this.state.data.user.id} userSettings={this.state.data.user_settings} user={this.state.data.user}  />
                </Tab>
            </Tabs>
        )
    }
}

export default TabBar;