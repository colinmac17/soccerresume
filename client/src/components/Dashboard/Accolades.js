import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl, Row, Col, Checkbox, Modal, ModalDialog, ModalBody, ModalFooter, ModalHeader } from 'react-bootstrap';
import axios from 'axios';

class Accolades extends Component {
    constructor(props){
        super(props)
        this.state = {
            userId: this.props.userId,  
            user: {
                accolade_description: '',
                year_achieved: '',
                userId: this.props.userId
            },
            allAccolades: []
        }
    }

    componentDidMount() {
        axios.get(`/api/accolades/&id=${this.state.userId}`)
        .then(result => {
            console.log(result)
            if (result.data !== null) {
                this.setState({
                    allAccolades: result.data
                })
            }
        }).catch(err => console.log(err));
    }

    onChange = (e) => {
        const user = this.state.user
        const field = e.target.name
        user[field] = e.target.value;
        this.setState({
            user: user
        });
      }

      renderAlert = (type, msg) => {
          if (type = 'error') alert(msg)
      }
   
    handleSubmit = (e) => {
        e.preventDefault()
        const accoladeInfo = this.state.user
            axios.post(`/api/accolades/create`, accoladeInfo)
                .then(result => {
                    console.log(result.data)
                    this.state.user.accolade_description = ''
                    this.state.user.year_achieved = ''
                }).then(links => {
                    axios.get(`/api/accolades/&id=${this.state.userId}`)
                    .then(result => {
                        console.log(result)
                        if (result.data !== null) {
                            this.setState({
                                allAccolades: result.data
                            })
                        }
                    }).catch(err => console.log(err))
                }).catch(err => console.log(err))
    }

    handleDelete = (e) => {
        e.preventDefault()
        axios.delete(`/api/accolades/&id=${e.target.id}`)
            .then(data =>{
                console.log(data)
            }).then(links => {
                axios.get(`/api/accolades/&id=${this.state.userId}`)
                .then(result => {
                    console.log(result)
                    if (result.data !== null) {
                        this.setState({
                            allAccolades: result.data
                        })
                    }
                }).catch(err => console.log(err))
            }).catch(err => console.log(err))
    }

    render() {
        const { user, allAccolades } = this.state
        const Accolades = allAccolades.map((row, index) => {
            return (
                <li className="media-link" key={row.id}>
                    <Row>
                        <form action={`/api/accolades/&id=${row.id}`} id={row.id} method="DELETE" onSubmit={this.handleDelete}>
                            <Col xs={6}>
                                <h5>{row.accolade_description}</h5>
                            </Col>
                            <Col xs={3}>
                                <button type="submit" className="btn btn-danger">Delete</button>
                            </Col>
                        </form>  
                    </Row>
                </li>
            )
        })

        return (
            <div className="container">
            <h2 className="poppins-font">Accolades</h2>
            <form action={'/api/accolades/create'} method="POST" onSubmit={this.handleSubmit} id="accoladeForm">
                <Row>
                    <Col xs={12}>
                        <FormGroup>
                            <ControlLabel htmlFor="description">Description: <span className="red">*</span> </ControlLabel>
                            <br/>
                            <textarea className="form-control" form="accoladeForm" name="accolade_description" type="text" value={user.accolade_description} onChange={this.onChange} placeholder='Gatorade High School Player of the Year' id="textarea" required></textarea>
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        <FormGroup>
                            <ControlLabel htmlFor="yearAchieved">Year Achieved: <span className="red">*</span> </ControlLabel>
                            <FormControl type="text" name="year_achieved" value={user.year_achieved} onChange={this.onChange} placeholder="2017" id="yearAchieved" maxLength="4" pattern=".{4,4}" required />
                        </FormGroup>
                    </Col>
                </Row>
                <button type="submit" className="btn btn-primary">Add Link</button>
            </form>

                <h3>My Accolades</h3>
                <hr/>
                <ul>{Accolades}</ul>
            </div>
        )
  }
}

export default Accolades;