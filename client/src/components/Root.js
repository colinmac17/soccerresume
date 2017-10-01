import React from 'react';
import Landing from './Landing';
import Nav from './Nav';
import Login from './Login';
import SignUp from './SignUp';
import HowItWorks from './Marketing/HowItWorks';
import Features from './Marketing/Features';
import Pricing from './Marketing/Pricing';
import FAQS from './Marketing/FAQS';
import NotFound from './NotFound';
import { BrowserRouter, Route, Switch} from 'react-router-dom';

const Root = () => {
    return (
    <BrowserRouter>
        <div>
            <Nav />
            <Switch>
                <Route exact path="/" component={Landing}/>
                <Route exact path="/howitworks" component={HowItWorks}/>
                <Route exact path="/features" component={Features}/>
                <Route exact path="/pricing" component={Pricing}/>
                <Route exact path="/faqs" component={FAQS}/>
                <Route exact path="/login" component={Login}/>
                <Route exact path="/signup" component={SignUp}/>
                <Route component={NotFound}/>
            </Switch>
        </div>
    </BrowserRouter>
    )
}

export default Root;