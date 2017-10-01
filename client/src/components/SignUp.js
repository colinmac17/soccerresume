import React, { Component } from 'react';
import axios from 'axios';

class SignUp extends Component {
    constructor(props){
        super(props)
        this.state = {
            userData: {
                email: '',
                password: '',
                username: '',
                first_name: '',
                last_name: '',
                home_city: '',
                home_state: '',
                phone_number: '',
                twitter_handle: '',
                birthday: '',
                grad_year: '',
                user_type: '',
                user_plan: ''

            }
        }
    }

    onChange = (e) => {
        // Because we named the inputs to match their corresponding values in state, it's
        // super easy to update the state
        const { userData } = this.state
        userData[e.target.name] = e.target.value;
        this.setState(userData);
      }

    resetForm = () => { 
        document.getElementById('signUpForm').reset();
    }

    handleFormSubmit(){
        axios.post('/signup', ).then(response => {
            
        })
    }
    

    render() {
        const { email, password, username, first_name, last_name, home_city, home_state, phone_number, twitter_handle, birthday, grad_year, user_type, user_plan  } = this.state
        return (
            <div className="container margin-top-75">
            <h1 className="text-center cabin-font">Create a Free Acount</h1>
            <form id="signUpForm" method="POST" action="/newuser" onSubmit={this.handleFormSubmit()}>
            <div className="row">
                <div className="col-xs-6">
                    <div className="form-group">
                        <label for="firstName">First Name:</label>
                        <input name="first_name" type="text" className="form-control" placeholder="Wayne" id="firstName" required value={first_name} onChange={this.onChange}/>
                    </div>
                </div>
                <div className="col-xs-6">
                    <div className="form-group">
                        <label for="lastName">Last Name:</label>
                        <input name="last_name" type="text" className="form-control" placeholder="Rooney" id="firstName" required/>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-xs-6">
                    <div className="form-group">
                        <label for="userName">Username:</label>
                        <input name="username" type="text" className="form-control" placeholder="waynesworld" id="userName" required/>
                    </div>
                </div>
                <div className="col-xs-6">
                    <div className="form-group">
                        <label for="userEmail">Email Address:</label>
                        <input name="email" type="email" className="form-control" placeholder="wayne@gmail.com" id="userEmail" required/>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-xs-6">
                    <div className="form-group">
                        <label for="phoneNumber">Phone Number:</label>
                        <input name="phone_number" type="text" className="form-control" placeholder="Ex: 1234567890"  pattern="(.){10,10}" maxlength="10" id="phoneNumber" required/>
                    </div>
                </div>
                <div className="col-xs-6">
                    <div className="form-group">
                        <label for="email">Twitter Handle:</label>
                        <input name="twitter_handle" type="text" className="form-control" placeholder="WayneRooney" id="twitterHandle"/>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-xs-6">
                    <div className="form-group">
                        <label for="userCity">City:</label>
                        <input name="home_city" type="text" className="form-control" placeholder="Liverpool" id="userCity" required/>
                    </div>
                </div>
                <div className="col-xs-6">
                    <div className="form-group">
                        <label for="userState">State:</label>
                        <input name="home_state" type="text" className="form-control" placeholder="CA" pattern="(.){2,2}" maxlength="2" id="userState" required/>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-xs-6">
                    <div className="form-group">
                        <label for="userBirthday">Birthday:</label>
                        <input name="birthday" type="date" className="form-control" pattern="(.){8,8}" id="userBirthday" required/>
                    </div>
                </div>
                <div className="col-xs-6">
                    <div className="form-group">
                        <label for="gradYear">Grad Year:</label>
                        <input name="grad_year" type="text" className="form-control" placeholder="2018" pattern="(.){4,4}" maxlength="4" id="gradYear" required/>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-xs-6">
                    <div className="form-group">
                        <label for="userType">User Type</label>
                        <select className="form-control" id="userType" name="user_type">
                            <option value="1">Player</option>
                            <option value="2" disabled>Coach</option>
                            <option value="3" disabled>Manager</option>
                        </select>
                    </div>
                </div>
                <div className="col-xs-6">
                    <div className="form-group">
                        <label for="userPassword">Password:</label>
                        <input name="password" type="password" className="form-control" pattern="(.){6,25}" maxlength="25" id="userPassword"/>
                    </div>
                </div>
            </div>
            <div className="form-group">
                <input name="user_plan" type="hidden" className="form-control" value="1" id="userPlan"/>
            </div>
            <button type="submit" className="btn btn-primary btn-lg">Register</button>
            <a className="pointer margin-left-20 text-right"onClick={this.resetForm}>Clear Fields</a>
        </form>
        </div>
        ) 
    }  
}

export default SignUp;