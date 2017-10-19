import React, { Component } from 'react';
import Landing from './Landing';
import Nav from './Nav';
import NavDash from './NavDash'
import Login from './Login';
import SignUp from './SignUp';
import HowItWorks from './Marketing/HowItWorks';
import Features from './Marketing/Features';
import Pricing from './Marketing/Pricing';
import FAQS from './Marketing/FAQS';
import NotFound from './NotFound';
import Dashboard from './Dashboard/Dashboard';
import Profile from './Profile/Profile';
import Record from './WebRTC/Record';
import axios from 'axios';
import { BrowserRouter as Router, Route, Switch, Match} from 'react-router-dom';

class Root extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoggedIn: false,
            user: {
                profile_picture: '',
                first_name: '',
                last_name: ''
            }
        }
    }

    date = () => {
        var d = new Date().getFullYear()
        return d
    }

    render() {
    return (
        <Router>
            <div>
                {window.location.pathname == '/dashboard' || window.location.pathname == '/dashboard/' ? 
                <NavDash auth={true}/> :
                <Nav isLoggedIn={this.state.isLoggedIn} />
                }
                <Switch>
                    <Route exact path="/" component={Landing}/>
                    <Route exact path="/howitworks" component={HowItWorks}/>
                    <Route exact path="/features" component={Features}/>
                    <Route exact path="/pricing" component={Pricing}/>
                    <Route exact path="/faqs" component={FAQS}/>
                    <Route exact path="/login" component={Login}/>
                    <Route exact path="/signup" component={SignUp}/>
                    <Route exact path="/dashboard" component={Dashboard} />
                    {/*<Route exact path="/record" component={Record} />*/}
                    <Route path="/:username" component={Profile}/>
                    <Route component={NotFound}/>
                </Switch>
                <hr/>
                <p className="text-center poppins-font">&copy; {this.date()} soccerresu.me</p>
            </div>
        </Router>
        )
  }
}

export default Root;