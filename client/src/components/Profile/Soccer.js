import React, { Component } from 'react';
import { Row, Col, Jumbotron, Image } from 'react-bootstrap';

class Soccer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: {
                athletic: this.props.athletic,
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            data: {
                athletic: nextProps.athletic,
            }
        })
    }

    formatHeight = (height) => {
        let dif = height/12 - Math.floor(height/12)
        let inches = Math.round(dif * 12)
        let formattedHeight = `${Math.floor(height/12)}'${inches}`
        return formattedHeight
    }

    render() {
        return(
            <div className="margin-top-30">
                <h3 className="text-center dark-cyan cabin-font bold">Soccer</h3>
                <ul className="summary-academic text-center poppins-font">
                    <li><i className="fa fa-users margin-right-5" aria-hidden="true"></i>{this.state.data.athletic.club_team}<span className="margin-left-5">|</span></li>
                    <li><i className="fa fa-futbol-o margin-right-5" aria-hidden="true"></i>{this.state.data.athletic.primary_position}<span className="margin-left-5">|</span></li>
                    {(this.state.data.athletic.position_2 != null) ? <li><i className="fa fa-futbol-o margin-right-5" aria-hidden="true"></i>{this.state.data.athletic.position_2}<span className="margin-left-5">|</span></li> : ''}
                    <li><i className="fa fa-male margin-right-5" aria-hidden="true"></i>{this.formatHeight(this.state.data.athletic.height_inches)}<span className="margin-left-5">|</span></li>
                    {(this.state.data.athletic.weight != null) ? <li><i className="fa fa-balance-scale margin-right-5" aria-hidden="true"></i>{this.state.data.athletic.weight} lbs </li> : '' }
                </ul> 
                <ul className="summary-academic text-center poppins-font">
                    {(this.state.data.athletic.coach_contact_name != null) ? <li>Coach: {this.state.data.athletic.coach_contact_name}<span className="margin-left-5">|</span></li> : ''}
                    {(this.state.data.athletic.coach_contact_email != null) ? <li>Email: {this.state.data.athletic.coach_contact_email}<span className="margin-left-5">|</span></li> : ''}
                    {(this.state.data.athletic.commitment_status == '1') ? <li>Committed to {this.state.data.athletic.commitment_school}</li> : '' }
                </ul>
            </div>
        )
    }
}

export default Soccer;