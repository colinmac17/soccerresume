import React, {Component} from 'react';

class Webcam extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <video autoPlay muted src={this.props.src} />
    )
  }
}

export default Webcam;