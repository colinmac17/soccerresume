import React from 'react';

const HowItWorks = () => {
    return (
        <div className="container-fluid margin-top-100">
            <div className="container">
                <div className="section-header text-center cabin-font margin-bottom-30">
                    <h1 className="black-text bold">How It Works</h1>
                    <h4>We make it easy to create an online soccer resume.</h4>
                </div>
                <div className="row text-center">
                    <div className="col-xs-12 col-sm-4">
                        <div className="feature">
                            <i className="fa fa-user fa-5x aqua" aria-hidden="true"></i>
                            <h2 className="black-text feature-header">Create a Profile</h2>
                            <p className="black-text"> Sign up for free right here on our website.</p>
                        </div>
                    </div>
                    <div className="col-xs-12 col-sm-4">
                        <div className="feature">
                            <i className="fa fa-star fa-5x aqua" aria-hidden="true"></i>
                            <h2 className="black-text feature-header">Fill in the Details</h2>
                            <p className="black-text"> Add your academic and athletic stats, notable accolades, and contact information.</p>
                        </div>
                    </div>
                    <div className="col-xs-12 col-sm-4">
                        <div className="feature">
                            <i  className="fa fa-retweet fa-5x aqua" aria-hidden="true"></i>
                            <h2 className="black-text feature-header">Share with Coaches</h2>
                            <p className="black-text">Share your resume with the world using your custom profile link, or download your resume as a PDF right in the app.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HowItWorks;