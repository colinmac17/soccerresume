import React from 'react';
import { Link } from 'react-router-dom';

const SignUpForm = (props) => {
    const { handleFormSubmit, onChange, user, errors } = props
    return (
        <div className="container margin-top-75">
        <h1 className="text-center cabin-font">Create a Free Acount</h1>
        <form id="signUpForm" method="POST" action="/api/auth/signup" onSubmit={handleFormSubmit}>
        <div className="row">
            <div className="col-xs-6">
                <div className="form-group">
                    <label htmlFor="firstName">First Name:</label>
                    <input name="first_name" type="text" className="form-control" placeholder="Wayne" id="firstName" required value={user.first_name} onChange={onChange}/>
                    <p>{errors.first_name}</p>
                </div>
            </div>
            <div className="col-xs-6">
                <div className="form-group">
                    <label htmlFor="lastName">Last Name:</label>
                    <input name="last_name" type="text" className="form-control" placeholder="Rooney" id="firstName" required value={user.last_name} onChange={onChange}/>
                    <p>{errors.last_name}</p>
                </div>
            </div>
        </div>
        <div className="row">
            <div className="col-xs-6">
                <div className="form-group">
                    <label htmlFor="userName">Username:</label>
                    <input name="username" type="text" className="form-control" placeholder="waynesworld" id="userName" required value={user.username} onChange={onChange}/>
                    <p>{errors.username}</p>
                </div>
            </div>
            <div className="col-xs-6">
                <div className="form-group">
                    <label htmlFor="userEmail">Email Address:</label>
                    <input name="email" type="email" className="form-control" placeholder="wayne@gmail.com" id="userEmail" required value={user.email} onChange={onChange}/>
                    <p>{errors.email}</p>
                </div>
            </div>
        </div>
        <div className="row">
            <div className="col-xs-6">
                <div className="form-group">
                    <label htmlFor="gradYear">Grad Year:</label>
                    <input name="grad_year" type="text" className="form-control" placeholder="2018" pattern="(.){4,4}" maxLength="4" id="gradYear" required value={user.grad_year} onChange={onChange}/>
                    <p>{errors.grad_year}</p>
                </div>
            </div>
            <div className="col-xs-6">
            <div className="form-group">
                <label htmlFor="userType">User Type:</label>
                <select className="form-control" id="userType" name="user_type" value={user.user_type} onChange={onChange}>
                    <option value="1">Player</option>
                    <option value="2" disabled>Coach</option>
                    <option value="3" disabled>Manager</option>
                </select>
                <p>{errors.user_type}</p>
            </div>
        </div>
        </div>
        <div className="row">
            <div className="col-xs-12">
                <div className="form-group">
                    <label htmlFor="userPassword">Password:</label>
                    <input name="password" type="password" className="form-control" maxLength="25" id="userPassword" value={user.password} onChange={onChange}/>
                </div>
                <p>{errors.password}</p>
            </div>
        </div>
        <div className="form-group">
            <input name="user_plan" type="hidden" className="form-control" value="1" id="userPlan"/>
        </div>
        <button type="submit" className="btn btn-primary btn-lg">Register</button>
        <br/>
        <p className="bold margin-top-10">Already have an account? <Link to={'/login'}>Log in</Link> </p>
    </form>
    </div>
    )
}

export default SignUpForm;

