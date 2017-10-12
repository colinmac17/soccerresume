import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl, Row, Col, Checkbox } from 'react-bootstrap';
import axios from 'axios';

class Media extends Component {
    constructor(props){
        super(props)
        this.state = {
            userId: this.props.userId,
            user: {
                link: '',
                media_source: '',
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
                    user: {
                        allMedia: result.data
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

      handleCheckBoxChange = (e) => {
        this.setState({
          isChecked: e.target.checked
        });
      }

      renderAlert = (type, msg) => {
          if (type = 'error') alert(msg)
      }
   
    handleSubmit = (e) => {
        e.preventDefault();
        const mediaInfo = this.state.user
        mediaInfo.commitment_status = this.state.isChecked
            axios.post(`/api/media/create`, mediaInfo)
                .then(result => {
                    console.log(result.data)
                    this.setState({
                        method: 'PUT'
                    })
                }).catch(err => console.log(err))
    }
    // let linkId = 1
    // axios.put(`/api/media/&id=${linkId}`, mediaInfo)
    //     .then(result => {
    //         console.log(result)
    //     }).catch(err => console.log(err))
    render() {
        const { user, allMedia } = this.state
        const allLinks = allMedia.map((row, index) => {
            return (
                <li key={row.id}>
                    <form action={`/api/media/&id=${row.id}`} method="PUT" onSubmit={this.handleSubmit}>
                        <Row>
                            <Col xs={12}>
                                <FormGroup>
                                    <FormControl type="text" name="link" value={row.link} onchange={this.onChange} required/>
                                </FormGroup>
                                <button type="submit" className="btn btn-success">Update</button>
                            </Col>
                        </Row>
                    </form>  
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
                <button type="submit" className="btn btn-primary">Add Link</button>
            </form>

                <h3>All My Links</h3>
                <hr/>
                <ul>{allLinks}</ul>
            </div>
        )
  }
}

export default Media;