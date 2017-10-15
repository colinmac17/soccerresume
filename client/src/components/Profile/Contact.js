import React, { Component } from 'react';
import { Row, Col, Jumbotron, Image } from 'react-bootstrap';

class Contact extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: {
                user: this.props.user,
                contact: this.props.contact
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            data: {
                user: nextProps.user,
                contact: nextProps.contact
            }
        })
    }

    render() {
        return(
            <h1>Contact</h1>
        )
    }
}

export default Contact;