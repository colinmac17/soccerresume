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
            isAuthenticated: false
        }
    }

    componentDidMount(){
        const user_id = window.location.pathname.split('/')[2];
        console.log(user_id);
        axios.get(`/api/users/&id=${user_id}`)
            .then((result) => {
                console.log(result)
                this.setState({
                    user:{
                        first_name: result.data.first_name,
                        last_name: result.data.last_name,
                        email: result.data.email
                    }
                })
            }).catch(err => console.log(err))
    }

    render() {
        const isAuthenticated = this.state.isAuthenticated
            return (
                <div className="container margin-top-50">
                    <h1>This is the Dashboard</h1>
                    <h3>Hey There {this.state.user.first_name}</h3>
                </div>
            )

    }
}

export default Dashboard;