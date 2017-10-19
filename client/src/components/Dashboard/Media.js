import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl, Row, Col, Checkbox, Modal, ModalDialog, ModalBody, ModalFooter, ModalHeader } from 'react-bootstrap';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Spinner from './Spinner';
import AlertMessage from './Alert';

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
            allMedia: [],
            isLoading: false,
            alertOpen: false,
            alertAction: ''
        }
    }
    componentDidMount() {
        this.setState({
            isLoading: true
        })
        axios.get(`/api/media/&id=${this.state.userId}`)
        .then(result => {
            console.log(result)
            if (result.data !== null) {
                this.setState({
                    allMedia: result.data,
                    isLoading: false
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
   
    handleSubmit = (e) => {
        this.setState({
            isLoading: true
        })
        e.preventDefault()
        const mediaInfo = this.state.user
        const youtube_id = this.getYoutubeID()
        mediaInfo.youtube_id = youtube_id
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
                                allMedia: result.data,
                                alertAction: 'update',
                                isLoading: false,
                                alertOpen: true
                            })
                        } else {
                            this.setState({
                                alertAction: 'danger',
                                isLoading: false,
                                alertOpen: true
                            })
                        }
                    }).catch(err => console.log(err))
                }).catch(err => console.log(err))
    }

    handleDelete = (e) => {
        this.setState({
            isLoading: true
        })
        e.preventDefault()
        axios.delete(`/api/media/&id=${e.target.id}`)
            .then(data =>{
                console.log(data)
            }).then(links => {
                axios.get(`/api/media/&id=${this.state.userId}`)
                .then(result => {
                    console.log(result)
                    if (result.data !== null) {
                        this.setState({
                            allMedia: result.data,
                            alertAction: 'delete',
                            isLoading: false,
                            alertOpen: true
                        })
                    }
                }).catch(err => console.log(err))
            }).catch(err => console.log(err))
    }

    getYoutubeID = () => {
        let vid = this.state.user.link
        let vidArr = vid.split('=')
        let id = vidArr[1] 
        return id
    }

    handleDismiss = () => {
        this.setState({
            alertOpen: false
        })
    }

    render() {
        const { user, allMedia } = this.state
        const spinner = (this.state.isLoading) ? <Spinner /> : ''
        const allLinks = allMedia.map((row, index) => {
            return (
                <li className="media-link" key={row.id}>
                    <Row>
                        <form action={`/api/media/&id=${row.id}`} id={row.id} method="DELETE" onSubmit={this.handleDelete}>
                            <Col xs={6}>
                                <a href={row.link} target="_blank">{row.title}</a>
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
            <h2 className="poppins-font">Media {spinner}</h2>
            {(this.state.alertOpen && this.state.alertAction == 'update') ? <AlertMessage bsStyle="success" handleDismiss={this.handleDismiss} title="Success!" message="Video submitted successfully"/> : '' }
            {(this.state.alertOpen && this.state.alertAction == 'danger') ? <AlertMessage bsStyle="danger" handleDismiss={this.handleDismiss} title="Error!" message="Video failed to submit. Please try again."/> : '' }
            {(this.state.alertOpen && this.state.alertAction == 'delete') ? <AlertMessage bsStyle="success" handleDismiss={this.handleDismiss} title="Success!" message="Video has been successfully removed"/> : '' }
            {/*<p>Want to stand out? <Link to="/record">Record Yourself</Link></p>*/}
            <hr/>
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
                                    <option value="vimeo" disabled>Vimeo</option>
                                </select>
                        </FormGroup>
                        <FormControl name="youtube_id" type="hidden" />
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
                <ul>{allLinks}</ul>
                <div class="pad-med"></div>
            </div>
        )
  }
}

export default Media;