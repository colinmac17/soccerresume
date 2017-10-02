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
                user_type: '1',
            }
        }
    }

    onChange = (e) => {
        // Because we named the inputs to match their corresponding values in state, it's
        // super easy to update the state
        const state = this.state.userData
        state[e.target.name] = e.target.value;
        this.setState(state);
      }

    resetForm = () => { 
        document.getElementById('signUpForm').reset();
    }

    handleFormSubmit = (e) => {
         e.preventDefault();

        const user_plan = document.querySelector("input[name='user_plan']").value;
        const userData = this.state.userData;
        userData.user_plan = user_plan;

        axios.post('/api/auth/signup', userData)
            .then((result) => {
        }).catch((err) => {
            this.setState({
                errors: err
            })
        })
    }
    

    render() {
        const { email, password, username, first_name, last_name, home_city, home_state, phone_number, twitter_handle, birthday, grad_year, user_type } = this.state
        return (
            <div className="container margin-top-75">
            <h1 className="text-center cabin-font">Create a Free Acount</h1>
            <form id="signUpForm" method="POST" action="/api/auth/signup" onSubmit={this.handleFormSubmit}>
            <div className="row">
                <div className="col-xs-6">
                    <div className="form-group">
                        <label htmlFor="firstName">First Name:</label>
                        <input name="first_name" type="text" className="form-control" placeholder="Wayne" id="firstName" required value={first_name} onChange={this.onChange}/>
                    </div>
                </div>
                <div className="col-xs-6">
                    <div className="form-group">
                        <label htmlFor="lastName">Last Name:</label>
                        <input name="last_name" type="text" className="form-control" placeholder="Rooney" id="firstName" required value={last_name} onChange={this.onChange}/>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-xs-6">
                    <div className="form-group">
                        <label htmlFor="userName">Username:</label>
                        <input name="username" type="text" className="form-control" placeholder="waynesworld" id="userName" required value={username} onChange={this.onChange}/>
                    </div>
                </div>
                <div className="col-xs-6">
                    <div className="form-group">
                        <label htmlFor="userEmail">Email Address:</label>
                        <input name="email" type="email" className="form-control" placeholder="wayne@gmail.com" id="userEmail" required value={email} onChange={this.onChange}/>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-xs-6">
                    <div className="form-group">
                        <label htmlFor="phoneNumber">Phone Number:</label>
                        <input name="phone_number" type="text" className="form-control" placeholder="Ex: 1234567890"  pattern="(.){10,10}" maxLength="10" id="phoneNumber" required value={phone_number} onChange={this.onChange}/>
                    </div>
                </div>
                <div className="col-xs-6">
                    <div className="form-group">
                        <label htmlFor="email">Twitter Handle:</label>
                        <input name="twitter_handle" type="text" className="form-control" placeholder="WayneRooney" id="twitterHandle" value={twitter_handle} onChange={this.onChange}/>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-xs-6">
                    <div className="form-group">
                        <label htmlFor="userCity">City:</label>
                        <input name="home_city" type="text" className="form-control" placeholder="Liverpool" id="userCity" required value={home_city} onChange={this.onChange}/>
                    </div>
                </div>
                <div className="col-xs-6">
                    <div className="form-group">
                        <label htmlFor="userState">State:</label>
                        <input name="home_state" type="text" className="form-control" placeholder="CA" pattern="(.){2,2}" maxLength="2" id="userState" required value={home_state} onChange={this.onChange}/>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-xs-6">
                    <div className="form-group">
                        <label htmlFor="userBirthday">Birthday:</label>
                        <input name="birthday" type="date" className="form-control" pattern="[0-9]{4}-(0[1-9]|1[012])-(0[1-9]|1[0-9]|2[0-9]|3[01])" id="userBirthday" required value={birthday} onChange={this.onChange}/>
                    </div>
                </div>
                <div className="col-xs-6">
                    <div className="form-group">
                        <label htmlFor="gradYear">Grad Year:</label>
                        <input name="grad_year" type="text" className="form-control" placeholder="2018" pattern="(.){4,4}" maxLength="4" id="gradYear" required value={grad_year} onChange={this.onChange}/>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-xs-6">
                    <div className="form-group">
                        <label htmlFor="userType">User Type</label>
                        <select className="form-control" id="userType" name="user_type" value={user_type} onChange={this.onChange}>
                            <option value="1">Player</option>
                            <option value="2" disabled>Coach</option>
                            <option value="3" disabled>Manager</option>
                        </select>
                    </div>
                </div>
                <div className="col-xs-6">
                    <div className="form-group">
                        <label htmlFor="userPassword">Password:</label>
                        <input name="password" type="password" className="form-control" pattern="(.){6,25}" maxLength="25" id="userPassword" value={password} onChange={this.onChange}/>
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