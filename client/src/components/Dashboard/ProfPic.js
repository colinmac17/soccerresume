import React, { Component } from 'react';
import { FormGroup, ControlLabel, Image, FormControl, Row, Col, Checkbox, Modal, ModalDialog, ModalBody, ModalFooter, ModalHeader } from 'react-bootstrap';
import axios from 'axios';
import request from 'superagent';
import Dropzone from 'react-dropzone';
import Spinner from './Spinner';
import AlertMessage from './Alert';

require('dotenv').config();
const CLOUDINARY_UPLOAD_PRESET = 'tahd85bb';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/soccerresume/image/upload'

class ProfPic extends Component {
    constructor(props){
        super(props)
        this.state = {
            uploadedFileCloudinaryURL: '',
            uploadedFile: '',
            userId: this.props.user.id,
            isLoading: false,
            alertOpen: false,
            dropzoneStatus: ''
        }
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            data: {
                user: nextProps.user
            }
        })
    }

    componentDidMount() {
        this.setState({
            isLoading: true
        })
        axios.get(`/api/users/&id=${this.state.userId}`)
        .then(result => {
            console.log(result)
            if (result.data !== null) {
                this.setState({
                   uploadedFileCloudinaryURL: result.data.profile_pic,
                   isLoading: false,
                   dropzoneStatus: (this.state.uploadedFileCloudinaryURL != null) ? true : false
                })
            }
        }).catch(err => console.log(err));
    }

    onImageDrop = (files) => {
        this.setState({
            uploadedFile: files[0],
            isLoading: true
        })
        this.handleImageUpload(files[0]);
      }
    
      async handleImageUpload(file) {
        const data = new FormData();
        data.append('file', file);
        data.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
        const upload = await fetch(CLOUDINARY_UPLOAD_URL, {
          method: 'POST',
          body: data,
        });
        const image = await upload.json();
        if(image.secure_url !== '') {
        this.setState({
            uploadedFileCloudinaryURL: image.secure_url
        })

        var uploadLink = { profile_pic: image.secure_url}
        axios.put(`/api/users/&id=${this.state.userId}`, uploadLink)
            .then((res) => {
                console.log(res)
                this.setState({
                    isLoading: false,
                    alertOpen: true
                })
            }).catch(err => console.log(err))
      }
    }

    handleDismiss = () => {
        this.setState({
            alertOpen: false
        })
    }

    getCloudinaryId = () => {
        let link = this.state.uploadedFileCloudinaryURL
        return link.split('/')[6]
    }

    // handleDelete = () => {
    //     const data= {public_id: this.getCloudinaryId()}
    //     console.log(data)
    //     axios.delete('/api/cloudinary/delete', data)
    //         .then((result) => {
    //             console.log(result)
    //         }).catch((err) => console.log(err))
    // }
 
    render() {

        const profPic = (this.state.uploadedFileCloudinaryURL) ? <Image circle width={100} height={125} src={this.state.uploadedFileCloudinaryURL} /> : ''

        const spinner = (this.state.isLoading) ? <Spinner /> : ''

        const dropZoneMsg = (this.state.dropzoneStatus) ? 'Profile picture is set' : 'Drag a picture here, or click to set your profile picture!'

        return (
            <div className="container">
            <h2 className="poppins-font">Profile Picture {spinner}</h2>
            {(this.state.alertOpen) ? <AlertMessage bsStyle="success" handleDismiss={this.handleDismiss} title="Success!" message="Profile Picture submitted successfully"/> : '' }
            <hr/>
            <Row>
                <Col xs={12} md={3}>
                <form action={`/api/users/&id=${this.state.userId}`} method="PUT">
                    <Dropzone multiple={false} accept="image/*" onDrop={this.onImageDrop}>
                    <p class="pad-sm bold font-16 poppins-font">Drag a picture here, or click to set your profile picture!</p>
                    </Dropzone>
                </form>
                </Col>
                <br/><br/>
                <Col xs={12} md={3} className="text-center pad-md margin-top-20">
                    <div className="FileUpload">
                    </div>
                    <div>
                        {this.state.uploadedFileCloudinaryUrl === '' ? null :
                        <div>
                        {profPic}
                        <p>Current Profile Picture</p>
                        {/*<form action={'/api/cloudinary/delete'} method="DELETE" onSubmit={this.handleDelete}>
                            <button type="submit" className="btn btn-danger">Delete</button>
                        </form>*/}
                        </div>}
                    </div>
                </Col>
            </Row>
            <div className="pad-med"></div>
            </div>
        )
  }
}

export default ProfPic;
