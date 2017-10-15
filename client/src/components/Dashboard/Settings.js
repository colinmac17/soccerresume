import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl, Row, Col, Checkbox } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Settings extends Component {
    constructor(props){
        super(props)
        this.state = {
            userId: this.props.userId,
            isPublicChecked: false,
            isPdfChecked: false,
            user: {
                userId: this.props.userId
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({settings: nextProps.userSettings});
    }

    componentDidMount() {
        axios.get(`/api/settings/&id=${this.state.userId}`)
        .then(result => {
            console.log(result)
            console.log(this.props)
            if (result.data !== null) {
                this.setState({
                    isPublicChecked: result.data.bProfilePublic,
                    isPdfChecked: result.data.bAllowDownloadAsPDF
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

      handlePDFChange = (e) => {
        this.setState({
          isPdfChecked: e.target.checked
        });
      }

      handlePublicChange = (e) => {
        this.setState({
          isPublicChecked: e.target.checked
        });
      }
   
    handleSubmit = (e) => {
        e.preventDefault();
        const settingsInfo = {}
        settingsInfo.bAllowDownloadAsPDF = this.state.isPdfChecked
        settingsInfo.bProfilePublic = this.state.isPublicChecked
            axios.put(`/api/settings/&id=${this.state.userId}`, settingsInfo)
                .then(result => {
                    console.log(result.data)
                }).then(() => {
                    axios.get(`/api/settings/&id=${this.state.userId}`)
                        .then(result => {
                            console.log(result.data)
                            this.setState({
                                isPublicChecked: result.data.bProfilePublic,
                                isPdfChecked: result.data.bAllowDownloadAsPDF
                            })
                        })
                        
                }).catch(err => console.log(err))
        }

    render() {
    const { user } = this.state
    const profileMessage = (this.state.isPublicChecked) ? <p id="profileMsg">You can find your profile at <a href={`https://www.soccerresu.me/${this.props.user.username}`}>https://www.soccerresu.me/{this.props.user.username}</a>. If you have just changed the public profile setting, you will need to click update to make your profile public.</p> : <p id="profileMsg2">You have not set your profile to public. Until you do, you will not have a custom shareable link.  If you have just changed the public profile setting, you will need to click update to remove your profile from the public.</p>
    return (
        <div className="container">
        <h2 className="poppins-font">Settings</h2>
        {profileMessage}
        <hr/>
        <br/>
        <form action={`/api/settings/&id=${this.state.userId}`} method="PUT" onSubmit={this.handleSubmit}>
            <Row>
                <Col xs={6}>
                <FormGroup>
                    <ControlLabel htmlFor="bAllowPDF">Allow Profile to Be Downloaded as PDF: <span className="star">*</span> </ControlLabel>
                    <br/>
                    <Checkbox name="bAllowDownloadAsPDF" onChange={this.handlePDFChange} id="bAllowPDF" inline value="1" checked={this.state.isPdfChecked}>Downloadable as PDF</Checkbox>
                </FormGroup>
                </Col>
                <Col xs={6}>
                    <FormGroup>
                        <ControlLabel htmlFor="bAllowPublic">Make Profile Public: <span className="star">*</span> </ControlLabel>
                        <br/>
                        <Checkbox name="bProfilePublic" onChange={this.handlePublicChange} id="bAllowPublic" inline value="1" checked={this.state.isPublicChecked}>Profile Public</Checkbox>
                    </FormGroup>
                 </Col>
            </Row>
            <button type="submit" className="btn btn-primary">Update</button>
        </form>
    </div>
    )
  }
}

export default Settings;