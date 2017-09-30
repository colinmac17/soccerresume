import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Navbar } from 'react-bootstrap';

class Nav extends Component {
    
    render(){
        return(
            <Navbar  fixedTop>
                <Grid>
                    <Navbar.Header>
                        <Navbar.Brand>
                        <Link to="/"><span className="bold">SOCCER</span><span className="aqua bold">RESU.ME</span><i className="fa fa-futbol-o margin-left-5" aria-hidden="true"></i></Link>
                        </Navbar.Brand>
                        <Navbar.Toggle data-toggle="collapsed" data-target="#navbar-collapsed"/>
                    </Navbar.Header>
                    <Navbar.Collapse id="navbar-collapsed">
                        <ul className="nav navbar-nav">
                            <li name="#howitworks" className="pointer"><Link to="/howitworks">How It Works</Link></li>
                            <li className="pointer"><Link to="/features">Features</Link></li>
                            <li className="pointer"><Link to="/pricing">Pricing</Link></li>
                            <li className="pointer"><Link to="/faqs">FAQS</Link></li>
                        </ul>
                        <ul className="nav navbar-nav navbar-right">
                            <li className="pointer"><Link to="/login">Login</Link></li>
                            <li className="pointer"><Link to="/signup">SignUp</Link></li>
                        </ul>
                    </Navbar.Collapse>
                </Grid>
            </Navbar>
        )
    }
}

export default Nav;