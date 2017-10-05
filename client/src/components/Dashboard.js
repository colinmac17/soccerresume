import React, { Component } from 'react';
import axios from 'axios';

class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: {
                id: '',
                first_name: '',
                last_name: '',
                grad_year: '',
                email: '',
                username: '',
                plan: '',
                type: '',
                last_updated: '',
                date_joined: ''
            },
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

    componentDidMount() {
        axios.get('/api/auth/authenticated')
        .then((result) => {
            if (!result.data.isAuthenticated) {
                this.setState({
                    errors: {
                        auth_fail: 'You must be signed in to view this page'
                    }
                })
                return false;
            } else {
                this.setState({
                    isAuthenticated: true,
                    user: {
                        id: result.data.user_id
                    }
                })
            }
        }).then(user => {
            axios.get(`/api/users/&id=${this.state.user.id}`)
            .then(user => {
                this.setState({
                    user: {
                        first_name: user.data.first_name,
                        last_name: user.data.last_name,
                        grad_year: user.data.grad_year,
                        email: user.data.email,
                        username: user.data.username,
                        plan: user.data.user_plan == 1 ? 'Basic' : 'Pro',
                        type: user.data.user_plan == 1 ? 'Player' : 'Coach',
                        last_updated: user.data.updatedAt,
                        date_joined: user.data.createdAt
                    }
                })
            }).catch(err => {
                this.setState({
                    errors: {
                        get_user_data_err: err
                    }
                })
            })
        }).catch(err => {
            this.setState({
                errors: {
                    auth_catch_err: err
                }
            })
        })
    }

    handleLogout = (e) => {
        e.preventDefault()
        axios.post('api/auth/logout')
            .then(result => {
                console.log(result)
                window.location.replace('/')
            }).catch(err => console.log(err))
    }

    render() {
            const isLoggedIn = this.state.isAuthenticated
            if (isLoggedIn) { 
                return (
                <div className="container margin-top-50">
                    <h1>This is the Dashboard</h1>
                    <h3>Hey There {this.state.user.first_name}</h3>
                    <form action='api/auth/logout' onSubmit={this.handleLogout}>
                        <button type="submit" className="btn btn-danger">Logout</button>
                    </form>
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