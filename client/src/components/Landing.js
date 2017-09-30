import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link}  from 'react-router-dom';

class Landing extends Component {
    render(){
        return(   
            <div className="container">
            <h1 className="text-center">Create a Soccer Resume in Minutes</h1>
            <ul>
                <li className="nav-link"><Link to="/howitworks">How It Works</Link></li>
                <li className="nav-link"><Link to="/features">Features</Link></li>
                <li className="nav-link"><Link to="/pricing">Pricing</Link></li>
                <li className="nav-link"><Link to="/faqs">FAQS</Link></li>
            </ul>
            </div>
        )
    }
}

export default Landing;