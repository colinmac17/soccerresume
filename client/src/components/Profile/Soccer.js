import React, { Component } from 'react';
import { Row, Col, Jumbotron, Image } from 'react-bootstrap';

class Soccer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: {
                athletic: this.props.athletic,
                media: this.props.media,
                accolades: this.props.accolades
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            data: {
                athletic: nextProps.athletic,
                media: nextProps.media,
                accolades: nextProps.accolades
            }
        })
    }

    render() {
        return(
            <h1>Soccer</h1>
        )
    }
}

export default Soccer;