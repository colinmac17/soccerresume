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
            alertOpen: false
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
        axios.get(`/api/users/&id=${this.state.userId}`)
        .then(result => {
            console.log(result)
            if (result.data !== null) {
                this.setState({
                   uploadedFileCloudinaryURL: result.data.profile_pic
                })
            }
        }).catch(err => console.log(err));
    }

    onImageDrop = (files) => {
        this.setState({
            uploadedFile: files[0]
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
            }).catch(err => console.log(err))
      }
    }
 
    render() {

        const profPic = (this.state.uploadedFileCloudinaryURL) ? <Image circle width={100} height={125} src={this.state.uploadedFileCloudinaryURL} /> : ''

        return (
            <div className="container">
            <h2 className="poppins-font">Profile Picture</h2>
            <hr/>
            <Row>
                <Col xs={12} md={3}>
                <form action={`/api/users/&id=${this.state.userId}`} method="PUT">
                    <Dropzone multiple={false} accept="image/*" onDrop={this.onImageDrop}>
                    <p class="pad-sm bold font-16 poppins-font">Drag a picture here to set your profile picture!</p>
                    </Dropzone>
                </form>
                </Col>
                <Col xs={12} md={3} className="text-center pad-md margin-top-20">
                    <div className="FileUpload">
                    </div>
                    <div>
                        {this.state.uploadedFileCloudinaryUrl === '' ? null :
                        <div>
                        {profPic}
                        <p>Current Profile Picture</p>
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

// <form action={'/api/cloudinary/upload'} method="POST" onChange={this.handleSubmit} enctype="multipart/form-data">
// <Col xs={6}>
//     <FormGroup>
//         <ControlLabel htmlFor="ProfPic">Profile Picture: </ControlLabel>
//         <FormControl name="profile_picture" type="file" id="ProfPic"/>
//     </FormGroup>
// </Col>
// </form>
// <Col xs={6}>
// <img id="profpic" height="200" />
// </Col>
