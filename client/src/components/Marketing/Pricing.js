import React from 'react';
import { Link } from 'react-router-dom';

const Pricing = () => {
    return (
        <div className="container-fluid">
            <div className="container">
                <div className="section-header text-center cabin-font margin-bottom-30">
                    <h1 className="black-text bold">Pricing</h1>
                    <h4>Our Basic Plan is always free.</h4>
                </div>
                <div className="row db-padding-btm db-attached">
                    <div className="col-xs-12 col-sm-4 col-sm-offset-4 col-md-4 col-lg-4">
                        <div className="db-wrapper">
                        <div className="db-pricing-eleven db-bk-color-two popular">
                            <div className="price">
                                <sup>$</sup>0
                                <small>per month</small>
                            </div>
                            <div className="type">
                            Basic Plan
                            </div>
                            <ul>
                                <li><i className="fa fa-universal-access"></i>Custom Resume Link</li>
                                <li><i className="fa fa-line-chart"></i>Define Your Brand</li>
                                <li><i className="fa fa-binoculars"></i>Expand Your Search</li>
                                <li><i className="fa fa-file-pdf-o"></i>Download as PDF</li>
                            </ul>
                            <div className="pricing-footer">
                                <Link to="/signup" className="btn db-button-color-square btn-lg">SIGN UP</Link>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Pricing;