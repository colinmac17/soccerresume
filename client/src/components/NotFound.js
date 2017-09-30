import React from 'react';
import { Button } from 'react-bootstrap';

const NotFound = () => {
    return (
        <div>
            <h1 className="center-align">Sorry, We Could Not Find This Page!</h1>
            <Button className="btn-success">Take Me Home</Button>
        </div>
    )
}

export default NotFound;