import React from 'react';

const FAQS = () => {
    return (
        <div className="container-fluid">
            <div className="container">
                <div className="section-header text-center cabin-font margin-bottom-30 margin-top-100">
                    <h1 className="black-text bold">FAQS</h1>
                    <h4>Some of our most frequently asked questions.</h4>
                </div>
                <div className="panel-group" id="faqAccordion">
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <h4 className="panel-title text-center">
                                <a>Is my account free?</a>
                            </h4>
                        </div>
                        <div>
                            <div className="panel-body">
                                <p>Yes, your basic account is free and will always be free! However, we may add upgraded plans in the future with additional features with a small monthly cost.</p>
                            </div>
                        </div>
                    </div>
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <h4 className="panel-title text-center">
                                <a>Can you guarantee I will be contacted or receive a roster spot or scholarship offer?</a>
                            </h4>
                        </div>
                        <div>
                            <div className="panel-body">
                                <p>No, we cannot make any guarantees regarding the outcome of your recruitment. We are merely a platform that you can utilize to make the recruiting process more personalized and convenient for you.</p>
                            </div>
                        </div>
                    </div>
            </div>
            </div>
        </div>
    )
}

export default FAQS;