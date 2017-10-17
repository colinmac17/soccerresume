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
        const birthday = this.state.data.contact.birthday
        return(
            <Jumbotron className="poppins-font">
                <Row>
                    <Col xs={12} md={6}>
                        <ul class="summary-academic">
                            <li></li>
                        </ul>
                    </Col>
                    <Col xs={12} md={6}>
                    
                    </Col>
                </Row>
            </Jumbotron>
        )
    }
}

export default Summary