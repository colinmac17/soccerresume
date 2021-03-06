import React from 'react';
import { Link }  from 'react-router-dom';

const Landing = (props) => {
    return(   
        <div className="container-fluid">
            <h1 className="text-center dark-cyan bold poppins-font">Create a Soccer Resume in Minutes</h1>
            <hr className="landing-hr"/>
            <div className="jumbotron stadium-background">
                <div className="row">
                    <div className="col-sm-6 col-xs-12">
                        <h1 className="text-center bold margin-top-50"><Link className="dark-cyan-background pointer white signup-btn" to="signup">Sign Up To Get Started</Link></h1>
                    </div>
                    <div className="col-sm-6 col-xs-12">
                        <h2 className="tagline bold cabin-font"> We help coaches and recruits simplify the recruiting process, with fast and easy-to-use software solutions</h2>
                    </div>
                </div>
            </div>
        </div>
    ) 
}

export default Landing;