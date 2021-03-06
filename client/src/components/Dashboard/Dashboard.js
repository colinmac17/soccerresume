import React, { Component } from 'react';
import { Image } from 'react-bootstrap';
import axios from 'axios';
import TabBar from './TabBar';
import Spinner from './Spinner';

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
                profile_pic: '',
                plan: '',
                type: '',
                last_updated: '',
                date_joined: '',
            },
            user_settings: '',
            athletic_stats: '',
            academic_stats: '',
            contact_info: '',
            additional_stats: '',
            accolades: '',
            media_links: '',
            isAuthenticated: '',
            errors: {
                auth_fail: '',
                auth_success: ''
            },
            isLoading: false,
            firstTime: ''
        }
    }

    componentDidMount() {
        this.setState({
            isLoading: true
        })
        axios.get('/api/auth/authenticated')
        .then((result) => {
            if (!result.data.isAuthenticated) {
                this.setState({
                    errors: {
                        auth_fail: 'You must be signed in to view this page'
                    }
                })
                return window.location.href = '/login';
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
                        id: user.data.id,
                        first_name: user.data.first_name,
                        last_name: user.data.last_name,
                        grad_year: user.data.grad_year,
                        email: user.data.email,
                        profile_pic: user.data.profile_pic,
                        username: user.data.username,
                        plan: user.data.user_plan == 1 ? 'Basic' : 'Pro',
                        type: user.data.user_plan == 1 ? 'Player' : 'Coach',
                        last_updated: user.data.updatedAt,
                        date_joined: user.data.createdAt,
                    },
                    user_settings: user.data.user_setting,
                    athletic_stats: user.data.athletic_stat,
                    academic_stats: user.data.academic_stat,
                    contact_info: user.data.contact_info,
                    additional_stats: user.data.additional_stats,
                    accolades: user.data.accolades,
                    media_links: user.data.media_links,
                    isAuthenticated: true,
                    isLoading: false
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

    // compareDates = () => {
    //     let firstTime = true;
    //     var dCreated = new Date(this.state.user.date_joined)
    //     var dNow = new Date()
    //     if (dNow - dCreated >  86400000) {
    //         firstTime = false
    //     }
    //     return firstTime
    // }

    handleLogout = (e) => {
        e.preventDefault()
        axios.get('/api/auth/logout')
            .then(result => {
                if(!result.data.isAuthenticated) window.location.href = '/';
            }).catch(err => {})
    }

    validateData = () => {
        (this.state.academic_stats !== null && this.state.athletic_stats !== null && this.state.user !== null && this.state.user_settings !== null && this.state.accolades !== null && this.state.contact_info !== null && this.state.user_settings.bProfilePublic == '1') ? true : false
    }

    render() {
            const spinner = (this.state.isLoading) ? <Spinner /> : ''
            const publicMsg = 'You can make your profile public by updating your settings.'
            const profPic = (this.state.user.profile_pic) ? <Image circle width={100} height={125} src={this.state.user.profile_pic} /> : ''

            const isLoggedIn = this.state.isAuthenticated

            const dashMsg = <p className="cabin-font font-size-16 margin-bottom-20">Welcome to the dashboard <span className="dark-cyan bold">{this.state.user.first_name}</span>. Please fill out the information in the tabs below to complete your profile. All fields with a <span className="red">*</span> are required, but we reccommend you fill out all fields to make your profile more complete. {publicMsg}</p>
            
            if (isLoggedIn) { 
                return (
                <div className="container">
                    <h1 className="cabin-font padding black-text bold">Dashboard {profPic} {spinner}</h1>
                    {dashMsg}
                    <TabBar user={this.state}/>
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