import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="container margin-top-75 text-center">
            <h1 className="center-align">Sorry, We Could Not Find This Page!</h1>
            <Link to="/" className="btn btn-success center-block">Take Me Home</Link>
        </div>
    )
}

export default NotFound;