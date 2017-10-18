import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl, Row, Col, Checkbox, Modal, ModalDialog, ModalBody, ModalFooter, ModalHeader } from 'react-bootstrap';
import axios from 'axios';
var LZUTF8 = require('lzutf8');

class ProfPic extends Component {
    constructor(props){
        super(props)
        this.state = {
            userId: this.props.userId,
            data: {
                user: this.props.user
            },
            allMedia: []
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
        axios.get(`/api/cloudinary/&id=${this.state.userId}`)
        .then(result => {
            console.log(result)
            if (result.data !== null) {
                this.setState({
                    data: {
                        user:  {
                            profile_picture: result.data.profile_picture
                        }
                    }
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
        var selectedPic = e.target.files[0]
        var filePath = document.getElementById('ProfPic').value
        var reader = new FileReader()
        var imgTag = document.getElementById('profpic')
        imgTag.title = selectedPic.name
        let data;
        reader.onload = (e) => {
            console.log(e.target)
            var output = LZUTF8.compress(e.target.result);
            console.log(output)
             axios.post('/api/cloudinary/upload', {imgCode: output})
                .then((result) => {
                    console.log(result.data.imgCode)
                }).catch(err => console.log(err))
        }
        reader.readAsDataURL(selectedPic)
        console.log(data)
      }

    render() {

        return (
            <div className="container">
            <h2 className="poppins-font">Profile Picture</h2>
            <hr/>
            <Row>
            <form action={'/api/cloudinary/upload'} method="POST" onChange={this.handleSubmit} enctype="multipart/form-data">
                    <Col xs={6}>
                        <FormGroup>
                            <ControlLabel htmlFor="ProfPic">Profile Picture: </ControlLabel>
                            <FormControl name="profile_picture" type="file" id="ProfPic"/>
                        </FormGroup>
                    </Col>
            </form>
                <Col xs={6}>
                    <img id="profpic" height="200" />
                </Col>
            </Row>
            </div>
        )
  }
}

export default ProfPic;