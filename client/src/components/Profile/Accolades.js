import React, { Component } from 'react';
import { Row, Col, Jumbotron, Image } from 'react-bootstrap';

class Accolades extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: {
                accolades: this.props.accolades
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            data: {
                accolades: nextProps.accolades
            }
        })
    }

    render() {
        return(
            <h1>Accolades</h1>
        )
    }
}

export default Accolades