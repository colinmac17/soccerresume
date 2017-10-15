import React, { Component } from 'react';
import { Row, Col, Jumbotron, Image } from 'react-bootstrap';

class Summary extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: {
                user: this.props.user,
                athletic: this.props.athletic,
                academic: this.props.academic
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            data: {
                user: nextProps.user,
                athletic: nextProps.athletic,
                academic: nextProps.academic
            }
        })
    }

    render() {
        return(
            <h1>Summary</h1>
        )
    }
}

export default Summary