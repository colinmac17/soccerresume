import React, { Component } from 'react';
import { Link}  from 'react-router-dom';
class Landing extends Component {
    render(){
        return(   
            <div className="container-fluid margin-top-75">
                <h1 className="text-center aqua bold">Create a Soccer Resume in Minutes</h1>
                <hr className="landing-hr"/>
                <div className="jumbotron stadium-background">
                    <div className="row">
                        <div className="col-sm-6 col-xs-12">
                            <h1 className="text-center bold margin-top-50"><Link className="aqua-background pointer white signup-btn" to="signup">Sign Up To Get Started</Link></h1>
                        </div>
                        <div className="col-sm-6 col-xs-12">
                            <h1 className="tagline">Giving all <span className="text-underlined bold">high school soccer players</span> the <span className="bold aqua">oppotunity</span> to market there personal brand</h1>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Landing;