import React from 'react';
import { Alert } from 'react-bootstrap';

const AlertMessage = (props) => {
    return (
        <Alert bsStyle={props.bsStyle} >
            <h4>{props.title}</h4>
            <p>{props.message}</p>
            <button onClick={props.handleDismiss}>Hide</button>
        </Alert>
    )
}

export default AlertMessage;