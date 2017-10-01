import React from 'react';

const Features = () => {
    return (
        <div className="container-fluid margin-top-150">
            <div className="container">
                <div className="section-header text-center cabin-font margin-bottom-30">
                    <h1 className="black-text bold">Features</h1>
                    <h4>We make the College Soccer Recruiting Process easier for you.</h4>
                </div>
                <div className="row text-center">
                    <div className="col-xs-12 col-sm-4">
                        <div className="feature">
                            <i className="fa fa-universal-access fa-5x dark-cyan" aria-hidden="true"></i>
                            <h2 className="black-text feature-header">Custom Resume Link</h2>
                            <p className="black-text">We provide you with a unique public link so that your online resume can be easily identified on mobile, tablet, or desktop.</p>
                        </div>
                    </div>
                    <div className="col-xs-12 col-sm-4">
                        <div className="feature">
                            <i className="fa fa-line-chart fa-5x dark-cyan" aria-hidden="true"></i>
                            <h2 className="black-text feature-header">Define Your Brand</h2>
                            <p className="black-text">Make your resume stand out with your GPA, ACT Score, Greatest Achievements, Highlight Videos, and more.</p>
                        </div>
                    </div>
                    <div className="col-xs-12 col-sm-4">
                        <div className="feature">
                            <i  className="fa fa-binoculars fa-5x dark-cyan" aria-hidden="true"></i>
                            <h2 className="black-text feature-header">Expand Your Search</h2>
                            <p className="black-text">Become discovered by coaches with minimal effort. Coaches can search our database of athletes to find recruits.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Features;