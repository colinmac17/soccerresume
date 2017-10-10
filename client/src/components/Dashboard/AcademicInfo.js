import React from 'react';
import { FormGroup, ControlLabel, FormControl, Row, Col } from 'react-bootstrap';

const AcademicInfo = () => {
    return (
        <div className="contaienr">
        <h2 className="poppins-font">Academic Information</h2>
        <form>
            <Row>
                <Col xs={6}>
                    <FormGroup>
                        <ControlLabel htmlFor="gradYear">Grad Year: </ControlLabel>
                        <FormControl name="grad_year" placeholder="2020" type="text" id="gradYear" maxLength="4" pattern=".{4,4}" required />
                    </FormGroup>
                </Col>
                <Col xs={6}>
                    <FormGroup>
                        <ControlLabel htmlFor="gpa">GPA: </ControlLabel>
                        <FormControl name="gpa" type="text" placeholder="3.50" id="gpa" pattern=".{4,4}" required/>
                    </FormGroup>
                </Col>
            </Row>
        </form>
    </div>
    )
}

export default AcademicInfo;