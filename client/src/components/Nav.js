import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Navbar } from 'react-bootstrap';
import axios from 'axios';

class Nav extends Component {
    constructor(props){
        super(props)
        this.state = {
            isAuthenticated: this.props.isLoggedIn,
            user: {
                id: '',
                prof_pic_url: '',
                first_name: '',
                last_name: ''
            }
        }
    }

    componentDidMount() {
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
                        {this.state.isAuthenticated ? 
                        <form className="navbar-form navbar-right" action="api/auth/logout" method="GET" onSubmit={this.handleLogout}>
                            <button type="submit" className="btn btn-danger margin-right-20">LOGOUT</button>
                        </form>
                        :
                        <form className="navbar-form navbar-right">
                            <Link to="/login" className="btn btn-default btn-primary margin-right-20">LOGIN</Link>
                            <Link to="/signup" className="btn btn-default btn-success">SIGN UP</Link>
                        </form>
                        }
                    </Navbar.Collapse>
                </Grid>
            </Navbar>
        )
    }
}

export default Nav;