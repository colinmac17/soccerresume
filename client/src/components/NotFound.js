import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="container text-center">
            <h1 className="center-align">Sorry, We Could Not Find This Page!</h1>
            <Link to="/" className="btn btn-success btn-lg">Take Me Home</Link>
        </div>
    )
}

export default NotFound;