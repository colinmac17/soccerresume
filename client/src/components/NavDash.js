import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Navbar } from 'react-bootstrap';
import axios from 'axios';

class NavDash extends Component {
    constructor(props){
        super(props)
        this.state = {
            isAuthenticated: true,
            user: {
                id: '',
                prof_pic_url: '',
                first_name: '',
                last_name: ''
            }
        }
    }

    componentDidUpdate() {
        axios.get('api/auth/authenticated')
            .then(result => {
                if(!result.data.isAuthenticated) {
                    
                } else {
                    this.setState({
                        user: {
                            id: result.data.user_id,
                            isAuthenticated: true
                        }
                    })
                }
            }).then(user => {
                if (this.state.isAuthenticated) {
                    this.setState({
                        user: {
                            first_name: user.first_name,
                            last_name: user.last_name
                        }
                    })
                }
            }).catch(err => console.log(err))
    }

    handleLogout = (e) => {
        e.preventDefault()
        axios.get('/api/auth/logout')
            .then(result => {
                if(!result.data.isAuthenticated) window.location.href = '/';
                console.log(result)
            }).catch(err => console.log(err))
    }

    render(){
       
        return(
            <Navbar fixedTop>
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
                        <form className="navbar-form navbar-right" action="api/auth/logout" method="GET" onSubmit={this.handleLogout}>
                            <Link to="/dashboard" className="btn btn-primary margin-right-20">Dashboard</Link>
                            <button type="submit" className="btn btn-danger">LOGOUT</button>
                        </form>
                    </Navbar.Collapse>
                </Grid>
            </Navbar>
        )
    }
}

export default NavDash;