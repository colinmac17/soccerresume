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
        const accolades = this.state.data.accolades.map((accolade) => {
            return <li key={accolade.id}>{accolade.accolade_description}</li>
        })
        return(
            <div className="margin-top-30">
                <h3 className="text-center dark-cyan cabin-font bold">Accolades</h3> 
                <ul className="accolade-section font-size-16 poppins-font">
                    {accolades}
                </ul>
            </div>
        )
    }
}

export default Accolades