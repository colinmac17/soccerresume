import React, { Component } from 'react';
import NotFound from '../NotFound';
import { Row, Col, Jumbotron, Image } from 'react-bootstrap';
import * as YouTube from 'react-youtube';

class Media extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: {
                media: this.props.media
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            data: {
                media: nextProps.media
            }
        })
    }

    render() {

        const videos = this.state.data.media.map((video) => {
            let ytsrc = 'https://www.youtube.com/embed/'
            let id = video.youtube_id
            return <div><h4 className="cabin-font">{video.title}</h4><iframe key={video.id} className="margin-bottom-30" type="text/html" width="640" height="360"
            src={`${ytsrc}${id}?autoplay=0&origin=https://wwww.soccerresu.me/`}
            frameborder="0"></iframe></div>
        })
            if (this.state.data.media.length > 0) {
                return(
                    <div className="margin-top-30 text-center">
                        <h3 className="text-left dark-cyan cabin-font bold text-center margin-bottom-20">Media</h3> 
                        <ul>
                            {videos}
                        </ul>
                    </div>
                )
            } else {
                return (
                    <p></p>
                )
            }
        }
    }

export default Media