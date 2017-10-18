import React, { Component } from 'react';
import { Row, Col, Jumbotron, Image } from 'react-bootstrap';

class Academic extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: {
                user: this.props.user,
                athletic: this.props.athletic,
                academic: this.props.academic,
                contact: this.props.contact
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            data: {
                user: nextProps.user,
                athletic: nextProps.athletic,
                academic: nextProps.academic,
                contact: nextProps.contact
            }
        })
    }

    render() {
        const ncaa = ( this.state.data.academic.ncaa_eligibility_status ) ? 'NCAA Eligible' : ''
        const birthday = this.state.data.contact.birthday
        return(
            <div>
                <h3 className="text-center dark-cyan cabin-font bold">Academic</h3>
                <ul className="summary-academic text-center poppins-font">
                    <li><i class="fa fa-line-chart margin-right-5" aria-hidden="true"></i>{this.state.data.academic.gpa} GPA <span className="margin-left-5">|</span></li>
                    {(this.state.data.academic.sat_score != null) ? <li><i class="fa fa-pencil-square margin-right-5" aria-hidden="true"></i>{this.state.data.academic.sat_score} SAT <span className="margin-left-5">|</span></li> : ''}
                    {(this.state.data.academic.act_score != null) ? <li><i class="fa fa-pencil-square-o margin-right-5" aria-hidden="true"></i>{this.state.data.academic.act_score} ACT <span className="margin-left-5">|</span></li> : ''}
                    {(this.state.data.academic.ncaa_eligibility_status == '1') ? <li><i class="fa fa-check-circle margin-right-5" aria-hidden="true"></i>{ncaa}</li> : '' }
                </ul> 
            </div>
        )
    }
}

export default Academic