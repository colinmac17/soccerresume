import React from 'react';
import { Button, Icon, Row, Col } from 'react-materialize';

const NotFound = () => {
    return (
        <div>
            <h1 className="center-align">Sorry, We Could Not Find This Page!</h1>
            <Button waves='center light'><Icon>home</Icon>Take Me Home</Button>
        </div>
    )
}

export default NotFound;