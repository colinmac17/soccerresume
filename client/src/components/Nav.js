import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, NavItem } from 'react-materialize';

class Nav extends Component {
    constructor(props){
        super(props)

    }

    render(){
        return(
            <Navbar brand={<img src="../public/images/logo.png" alt="SOCCERREUME"/>} className="nav-link nav-background" right>
                <li className="nav-link"><Link to="/">Home</Link></li>
                <li className="nav-link"><Link to="/login">Login</Link></li>
                <li className="nav-link"><Link to="/signup">Sign Up</Link></li>
            </Navbar>
        )
    }
}

export default Nav;