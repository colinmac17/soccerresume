import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl, Row, Col, Checkbox, Modal, ModalDialog, ModalBody, ModalFooter, ModalHeader } from 'react-bootstrap';
import axios from 'axios';

class Media extends Component {
    constructor(props){
        super(props)
        this.state = {
            userId: this.props.userId,
            user: {
                link: '',
                media_source: '',
                title: '',
                userId: this.props.userId
            },
            allMedia: []
        }
    }
    componentDidMount() {
        axios.get(`/api/media/&id=${this.state.userId}`)
        .then(result => {
            console.log(result)
            if (result.data !== null) {
                this.setState({
                    allMedia: result.data
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
        const mediaInfo = this.state.user
        mediaInfo.commitment_status = this.state.isChecked
            axios.post(`/api/media/create`, mediaInfo)
                .then(result => {
                    console.log(result.data)
                    this.state.user.link = ''
                    this.state.user.media_source = ''
                    this.state.user.title = ''
                }).then(links => {
                    axios.get(`/api/media/&id=${this.state.userId}`)
                    .then(result => {
                        console.log(result)
                        if (result.data !== null) {
                            this.setState({
                                allMedia: result.data
                            })
                        }
                    }).catch(err => console.log(err))
                }).catch(err => console.log(err))
    }

    handleDelete = (e) => {
        e.preventDefault()
        axios.delete(`api/media/&id=${this.state.keyToDelete}`)
            .then(data =>{
                console.log(data)
            }).then(links => {
                axios.get(`/api/media/&id=${this.state.userId}`)
                .then(result => {
                    console.log(result)
                    if (result.data !== null) {
                        this.setState({
                            allMedia: result.data
                        })
                    }
                }).catch(err => console.log(err))
            }).catch(err => console.log(err))
    }

    render() {
        const { user, allMedia } = this.state
        const allLinks = allMedia.map((row, index) => {
            return (
                <li className="media-link" key={row.id}>
                    <h5>{row.title}</h5>
                    <Row>
                        <form action={`/api/media/&id=${row.id}`} method="PUT" onSubmit={this.handleSubmit}>
                            <Col xs={6}>
                                <FormGroup>
                                    <FormControl type="text" name="link" value={row.link} onChange={this.onChange} required/>
                                </FormGroup>
                            </Col>
                            <Col xs={3}>
                                <button type="submit" className="btn btn-success">Update</button>
                            </Col>
                        </form>  
                        <Col xs={3}>
                            <form action={`/api/media&id=${row.id}`} method="DELETE" onSubmit={this.handleDelete}>
                                <button type="submit" className="btn btn-danger">Delete</button>
                            </form>
                        </Col>
                    </Row>
                </li>
            )
        })

        return (
            <div className="container">
            <h2 className="poppins-font">Media</h2>
            <form action={'/api/media/create'} method="POST" onSubmit={this.handleSubmit}>
                <Row>
                    <Col xs={6}>
                        <FormGroup>
                            <ControlLabel htmlFor="link">Video Link: <span className="red">*</span> </ControlLabel>
                            <FormControl name="link" type="text" value={user.link} onChange={this.onChange} placeholder='https://www.youtube.com/watch?v=RN9G2VVtbK8' id="link"  required/>
                        </FormGroup>
                    </Col>
                    <Col xs={6}>
                        <FormGroup>
                            <ControlLabel htmlFor="mediaSource">Video Source: <span className="red">*</span>  </ControlLabel>
                                <select className="form-control" name="media_source" type="text" value={user.media_source} onChange={this.onChange}  id="mediaSource" required>
                                    <option>-----</option>
                                    <option value="youtube">Youtube</option>
                                    <option value="vimeo">Vimeo</option>
                                </select>
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        <FormGroup>
                            <ControlLabel htmlFor="title">Title: <span className="red">*</span> </ControlLabel>
                            <FormControl type="text" name="title" value={user.title} onChange={this.onChange} placeholder="Wayne Rooney - 2017 Highlights" id="title" required />
                        </FormGroup>
                    </Col>
                </Row>
                <button type="submit" className="btn btn-primary">Add Link</button>
            </form>

                <h3>All My Links</h3>
                <hr/>
                <ul>
                    {allLinks}
                </ul>
            </div>
        )
  }
}

export default Media;