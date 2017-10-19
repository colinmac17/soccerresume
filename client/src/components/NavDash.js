import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Navbar, Image } from 'react-bootstrap';
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
            <Navbar>
                <Grid>
                    <Navbar.Header>
                        <Navbar.Brand>
                        <Link to="/"><span className="bold">SOCCER</span><span className="dark-cyan bold">RESU.ME</span><i className="fa fa-futbol-o margin-left-5" aria-hidden="true"></i></Link>
                        </Navbar.Brand>
                        <Navbar.Toggle data-toggle="collapsed" data-target="#navbar-collapsed"/>
                    </Navbar.Header>
                    <Navbar.Collapse id="navbar-collapsed">
                        <form className="navbar-form navbar-right" action="api/auth/logout" method="GET" onSubmit={this.handleLogout}>
                            <Link to="/dashboard" className="btn btn-primary margin-right-30">Dashboard</Link>
                            <button type="submit" className="btn btn-danger">LOGOUT</button>
                        </form>
                    </Navbar.Collapse>
                </Grid>
            </Navbar>
        )
    }
}

export default NavDash;