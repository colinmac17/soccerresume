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
                        <Link to="/"><span className="bold">SOCCER</span><span className="dark-cyan bold">RESU.ME</span><i className="fa fa-futbol-o margin-left-5" aria-hidden="true"></i></Link>
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
                        <form className="navbar-form navbar-right">
                            <Link to="/login" className="btn btn-default btn-primary margin-right-20">LOGIN</Link>
                            <Link to="/signup" className="btn btn-default btn-success">SIGN UP</Link>
                        </form>
                    </Navbar.Collapse>
                </Grid>
            </Navbar>
        )
    }
}

export default Nav;