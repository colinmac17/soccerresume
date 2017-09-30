import React, { Component } from 'react';
import $ from 'jquery';


class Landing extends Component {
    render(){
        return(   
        <div className="stadium-background">
            <div class="row">
                <div class="col-s12">
                    <h1 id="welcomeText" class="center-align ">Create a Soccer Resume In Minutes</h1>
                </div>
                <button id="signUpBtn" type="button" class="btn waves" data-toggle="modal" data-target="#signUpModal">SIGN UP</button>
            </div>
        </div>
        )
    }
}

export default Landing;