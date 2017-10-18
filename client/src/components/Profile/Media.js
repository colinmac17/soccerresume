import React, { Component } from 'react';
import { Row, Col, Jumbotron, Image } from 'react-bootstrap';

class Academic extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: {
                media: this.props.media
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            data: {
                media: nextProps.media
            }
        })
    }

    render() {
        return(
            <h1>Media</h1>
        )
    }
}

export default Academic