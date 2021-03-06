import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl, Row, Col, Checkbox } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AlertMessage from './Alert';
import Spinner from './Spinner';

class Settings extends Component {
    constructor(props){
        super(props)
        this.state = {
            userId: this.props.userId,
            isPublicChecked: false,
            isPdfChecked: false,
            user: {
                userId: this.props.userId
            },
            isLoading: false,
            alertOpen: false,
            errors: '',
            bsStyle: '',
            alertMessage: '',
            alertTitle: ''
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({settings: nextProps.userSettings});
    }

    componentDidMount() {
        this.setState({
            isLoading: true
        })
        axios.get(`/api/settings/&id=${this.state.userId}`)
        .then(result => {
            if (result.data !== null) {
                this.setState({
                    isPublicChecked: result.data.bProfilePublic,
                    isPdfChecked: result.data.bAllowDownloadAsPDF,
                    isLoading: false
                })
            } 
        }).catch(err => {
            this.setState({
                alertAction: 'danger',
                isLoading: false,
                alertOpen: true,
                alertMessage: 'Sorry, There was an internal error. Please contact us if you need additional support.',
                alertTitle: 'Error!',
                bsStyle: 'danger'
            })
        });
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
        this.setState({
            isLoading: true
        })
        e.preventDefault();
        const settingsInfo = {}
        settingsInfo.bAllowDownloadAsPDF = this.state.isPdfChecked
        settingsInfo.bProfilePublic = this.state.isPublicChecked
            axios.put(`/api/settings/&id=${this.state.userId}`, settingsInfo)
                .then(result => {
                }).then(() => {
                    axios.get(`/api/settings/&id=${this.state.userId}`)
                        .then(result => {
                            this.setState({
                                isPublicChecked: result.data.bProfilePublic,
                                isPdfChecked: result.data.bAllowDownloadAsPDF,
                                isLoading: false,
                                alertOpen: true,
                                alertMessage: 'Settings have been updated',
                                alertTitle: 'Success',
                                bsStyle: 'success'
                            })
                        })
                        
                }).catch(err => {
                    this.setState({
                        alertAction: 'danger',
                        isLoading: false,
                        alertOpen: true,
                        alertMessage: 'Sorry, There was an internal error. Please contact us if you need additional support.',
                        alertTitle: 'Error!',
                        bsStyle: 'danger'
                    })
                })
        }

        handleDismiss = () => {
            this.setState({
                alertOpen: false
            })
        }    

    render() {
    const { user } = this.state
    const spinner = (this.state.isLoading) ? <Spinner /> : ''
    const profileMessage = (this.state.isPublicChecked) ? <p className="font-size-16" id="profileMsg">You can find your profile at <a target="_blank" href={`${window.location.origin}/${this.props.user.username}`}>{window.location.origin}/{this.props.user.username}</a>. If you have just changed the public profile setting, you will need to click update to make your profile public. Note, if you have not filled out all other required fields in the <span className="dark-cyan bold">Academic, Athletic, Contact, Account, and Accolades (at least one) sections, your profile will not render.</span></p> : <p className="font-size-16" id="profileMsg2">You have not set your profile to public. Until you do, you will not have a custom shareable link.  If you have just changed the public profile setting, you will need to click update to remove your profile from the public.</p>
    return (
        <div className="container">
        <h2 className="poppins-font">Settings {spinner}</h2>
        {profileMessage}
        {(this.state.alertOpen) ? <AlertMessage bsStyle={this.state.bsStyle} handleDismiss={this.handleDismiss} title={this.state.alertTitle} message={this.state.alertMessage}/> : '' }
        <hr/>
        <br/>
        <form action={`/api/settings/&id=${this.state.userId}`} method="PUT" onSubmit={this.handleSubmit}>
            <Row>
                <Col xs={12}>
                    <FormGroup>
                        <ControlLabel htmlFor="bAllowPublic">Make Profile Public: </ControlLabel>
                        <br/>
                        <Checkbox name="bProfilePublic" onChange={this.handlePublicChange} id="bAllowPublic" inline value="1" checked={this.state.isPublicChecked}>Profile Public</Checkbox>
                    </FormGroup>
                 </Col>
            </Row>
            <button type="submit" className="btn btn-primary">Update {spinner}</button>
        </form>
        <div class="pad-med"></div>
    </div>
    )
  }
}

export default Settings;

// <Col xs={6}>
// <FormGroup>
//     <ControlLabel htmlFor="bAllowPDF">Allow Profile to Be Downloaded as PDF: (Not Yet Available) </ControlLabel>
//     <br/>
//     <Checkbox disabled name="bAllowDownloadAsPDF" onChange={this.handlePDFChange} id="bAllowPDF" inline value="1" checked={this.state.isPdfChecked}>Downloadable as PDF</Checkbox>
// </FormGroup>
// </Col>