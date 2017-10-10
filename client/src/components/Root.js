import React, { Component } from 'react';
import Landing from './Landing';
import Nav from './Nav';
import Login from './Login';
import SignUp from './SignUp';
import HowItWorks from './Marketing/HowItWorks';
import Features from './Marketing/Features';
import Pricing from './Marketing/Pricing';
import FAQS from './Marketing/FAQS';
import NotFound from './NotFound';
import Dashboard from './Dashboard/Dashboard';
import axios from 'axios';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';

class Root extends Component {
    constructor(props) {
        super()
        this.state = {
            isLoggedIn: false,
            user: {
                profile_picture: '',
                first_name: '',
                last_name: ''
            }
        }
    }

    checkAuth = () => {
        axios.get('/api/auth/authenticated')
            .then((result) => {
                if (result.data.isAuthenticated) {
                    this.setState({
                        isLoggedIn: true
                    })
                    return true;
                } else {
                    this.setState({
                        isLoggedIn: false
                    })
                }
            }).catch(err => console.log(err))
    }

    render() {
    return (
        <Router>
            <div>
                <Nav isLoggedIn={this.state.isLoggedIn}/>
                <Switch>
                    <Route exact path="/" component={Landing}/>
                    <Route exact path="/howitworks" component={HowItWorks}/>
                    <Route exact path="/features" component={Features}/>
                    <Route exact path="/pricing" component={Pricing}/>
                    <Route exact path="/faqs" component={FAQS}/>
                    <Route exact path="/login" component={Login}/>
                    <Route exact path="/signup" component={SignUp}/>
                    <Route exact path="/dashboard" component={Dashboard}/>
                    <Route component={NotFound}/>
                </Switch>
            </div>
        </Router>
        )
  }
}

export default Root;