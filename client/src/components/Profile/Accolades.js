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
            return <li key={accolade.id}><span className="bullet">&bull;</span> {accolade.accolade_description} ({accolade.year_achieved})</li>
        })
        return(
            <div className="margin-top-30 text-center">
                <h3 className="text-left dark-cyan cabin-font bold text-center">Accolades</h3> 
                <ul className="accolade-section font-size-16 poppins-font ">
                    {accolades}
                </ul>
                <hr/>
            </div>
        )
    }
}

export default Accolades