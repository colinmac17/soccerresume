import React, { Component } from 'react';
import Contact from './Contact';
import Academic from './Academic';
import Soccer from './Soccer';
import Accolades from './Accolades';
import Media from './Media';
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import NotFound from '../NotFound';
import { Image } from 'react-bootstrap'
import axios from 'axios';

class Profile extends Component {
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
                auth_fail: 'This profile is not yet public'
            }
        }
    }

    static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
      }

    componentDidMount() {
        axios.get(`/api/users/&username=${this.props.match.params.username}`)
        .then(user => {
          console.log(user)
          this.setState({
              user: {
                  first_name: user.data.first_name,
                  last_name: user.data.last_name,
                  grad_year: user.data.grad_year,
                  email: user.data.email,
                  username: user.data.username,
                  profile_pic: user.data.profile_pic,
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
              media_links: user.data.media_links 
          })
      }).catch(err => {
          this.setState({
              errors: {
                  get_user_data_err: err
              }
          })
      })
    }

    render() {
        const { match, location, history } = this.props
        if (this.state.user_settings.bProfilePublic) {
            return (
                <div className="container resume-border">
                    <Image className="center-block" src={this.state.user.profile_pic} width={175} height={200} circle/>
                    <h1 className="profile-name text-center cabin-font">{this.state.user.first_name} {this.state.user.last_name}</h1>
                    <Contact user={this.state.user} contact={this.state.contact_info} academic={this.state.academic_stats}/>
                    <Academic contact={this.state.contact_info} athletic={this.state.athletic_stats} academic={this.state.academic_stats}/>
                    <Soccer athletic={this.state.athletic_stats} />
                    <Accolades accolades={this.state.accolades} />
                    <Media media={this.state.media_links} />
                </div>
            )
        }

        {/*if profile is not found return NotFound component*/}
        return (
            <NotFound/>
        )
    }
}

export default Profile;