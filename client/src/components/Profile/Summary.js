import React, { Component } from 'react';
import { Row, Col, Jumbotron, Image } from 'react-bootstrap';

class Summary extends Component {
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
            <Jumbotron className="poppins-font">
                <Row>
                    <Col xs={12} md={6}>
                        <h3 className="text-center">Academic</h3>
                        <ul class="summary-academic">
                            <li><i class="fa fa-line-chart margin-right-5" aria-hidden="true"></i>{this.state.data.academic.gpa} GPA</li>
                            <li>{this.state.data.academic.sat_score} SAT</li>
                            <li>{this.state.data.academic.act_score} ACT</li>
                            <li><i class="fa fa-check-circle margin-right-5" aria-hidden="true"></i>{ncaa}</li>
                        </ul>
                    </Col>
                    <Col xs={12} md={6}>
                        <h3 className="text-center">Athletic</h3>
                        <ul class="summary-athletic">
                            
                        </ul>
                    </Col>
                </Row>
            </Jumbotron>
        )
    }
}

export default Summary