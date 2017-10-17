import React, { Component } from 'react';
import { Row, Col, Jumbotron, Image } from 'react-bootstrap';

class Contact extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: {
                user: this.props.user,
                contact: this.props.contact,
                academic: this.props.academic
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            data: {
                user: nextProps.user,
                contact: nextProps.contact,
                academic: nextProps.academic
            }
        })
    }

    formatPhone = (number) => {
        var areaCode = number.slice(0, 3)
        var firstThree = number.slice(3, 6)
        var lastFour = number.slice(6, 10);
        var newNumber = `(${areaCode}) ${firstThree}-${lastFour}`;
        return newNumber; 
    }

    formatDate = (date) => {
        let year = date.slice(0, 4)
        let month = date.slice(5, 7)
        let day = date.slice(8, 10)
        let newDate = `${month}/${day}/${year}`
        return newDate;
    }

    render() {
        const phoneNumber = this.state.data.contact.phone_number
        const birthday = this.state.data.contact.birthday
        return(
            <div>
                <ul className="contact-section poppins-font text-center">
                    <li><i class="fa fa-envelope margin-right-5" aria-hidden="true"></i>{this.state.data.user.email} <span className="margin-left-5">|</span></li>
                    <li><i class="fa fa-mobile margin-right-5" aria-hidden="true"></i>{this.formatPhone(phoneNumber)} <span className="margin-left-5">|</span></li>
                    <li><a target="_blank" href={`https://twitter.com/${this.state.data.contact.twitter_handle}`}><i class="fa fa-twitter margin-right-5" aria-hidden="true"></i>@{this.state.data.contact.twitter_handle}</a></li>
                </ul>
                <ul className="contact-section poppins-font text-center">
                    <li><i class="fa fa-birthday-cake margin-right-5" aria-hidden="true"></i>Born on {this.formatDate(birthday)} <span className="margin-left-5">|</span></li>
                    <li><i class="fa fa-book margin-right-5" aria-hidden="true"></i>{this.state.data.academic.highschool} <span className="margin-left-5">|</span></li>
                    <li><i class="fa fa-graduation-cap margin-right-5" aria-hidden="true"></i>Class of {this.state.data.academic.grad_year}</li>
                </ul>
                <hr/>
            </div>
        )
    }
}

export default Contact;