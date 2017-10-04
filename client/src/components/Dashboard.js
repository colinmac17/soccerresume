import React, { Component } from 'react';
import axios from 'axios';

class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: {},
            settings: {},
            athletic: {},
            academic: {},
            media: {},
            isAuthenticated: false,
            errors: {
                auth_fail: '',
                auth_success: ''
            }
        }
    }

    componentWillMount() {
        axios.get('/api/auth/authenticated')
            .then((result) => {
                if (!result.data.isAuthenticated) {
                    this.setState({
                        errors: {
                            auth_fail: 'You must be signed in to view this page'
                        }
                    })
                } else {
                    this.setState({
                        isAuthenticated: true
                    })
                }
            })
    }

    componentDidMount() {
        const user_id = window.location.pathname.split('/')[2];
        console.log(user_id);
        axios.get(`/api/users/&id=${user_id}`)
            .then((result) => {
                console.log(result)
                this.setState({
                    user: {
                        first_name: result.data.first_name,
                        last_name: result.data.last_name,
                        email: result.data.email
                    }
                })
            }).catch(err => console.log(err))
    }

    render() {
            const isLoggedIn = this.state.isAuthenticated
            if (isLoggedIn) { 
                return (
                <div className="container margin-top-50">
                    <h1>This is the Dashboard</h1>
                    <h3>Hey There {this.state.user.first_name}</h3>
                </div>
              )
            } 
                return  (
                    <div className="container margin-top-50">
                        <h2 className="auth-fail">{this.state.errors.auth_fail}</h2>
                    </div>
                ) 
        }
}

export default Dashboard;