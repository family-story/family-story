import React, { Component } from 'react'

import MediaUploader from '../../Components/MediaUploader/MediaUploader'
import AudioPlayer from '../StoryView/AudioPlayer'
import MapSelector from '../../Components/MapSelector/MapSelector'

const ClickOutHandler = require('react-onclickout')

class EventEditor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            event_title: '',
            date: '',
            event_txt: '',
            media: [],
            location: ''
        }
        this.addUploadedMedia = this.addUploadedMedia.bind(this)
        this.handleLocation = this.handleLocation.bind(this)
    }

    componentDidMount() {
        if (!this.props.newEventBool) {
            this.setState({
                event_title: this.props.event.event_title,
                date: this.props.event.date,
                location: this.props.event.location,
                media: this.props.event.media,
                event_txt: this.props.event.event_txt
            })
        }
    }

    handleLocation(newLocation) {
        this.setState({ location: newLocation })
    }

    clearModel() {
        this.setState = {
            event_title: '',
            date: '',
            event_txt: '',
            media: [],
            location: ''
        }
    }

    handleEditor(key, value) {
        this.setState({ [key]: value })
    }

    addUploadedMedia(media_type, media_ref) {    
        let media = {
            media_type,
            media_ref
        }
        let newMedia = this.state.media.slice()
        newMedia.push(media)

        this.setState({ media: newMedia })
    }

    handleCancel() {
        this.clearModel()
        this.props.closeEditor()
    }

    handleSave() {
        let event = {
            event_title: this.state.event_title,
            date: this.state.date,
            event_txt: this.state.event_txt,
            media: this.state.media,
            location: this.state.location
        }
        console.log(event)
        if (this.props.newEventBool) {
            this.props.addNewEvent(event)
        } else {
            this.props.updateEvent(event)
        }
        this.clearModel()
        this.props.closeEditor()
    }

    handleDelete() {
        this.props.deleteEvent()
        this.clearModel()
        this.props.closeEditor()
    }

    render() {
        
        let photos = this.state.media.filter(media => media.media_type === 'pic').map((image, i) => {
            return (<img className = 'editor-pics' src={image.media_ref} alt="" key={i} />)
        })

        let audio = this.state.media.filter(media => media.media_type === 'audio').map((audio, i) => {
            return (<AudioPlayer audio={audio} key={i} />)
        })
        return (
            <div className="transparent-background">
                <ClickOutHandler onClickOut={() => this.props.closeEditor()}>
                    <div className="editor-container">
                        <div className = 'editor-left'>
                            <div className = 'event-title-input'>
                                <h3 className = 'editor-event-title'>Event Title:</h3>
                                <input className = 'editor-event-input' type="text" value={this.state.event_title} onChange={e => this.handleEditor('event_title', e.target.value)} />
                            </div>

                            <div className = 'event-title-input'>
                                <h3 className = 'editor-event-title'> Location: </h3>
                                <MapSelector handleLocation={this.handleLocation} location={this.state.location} />
                            </div>
                            

                            <div className = 'event-title-input'>
                                <h3 className = 'editor-event-title'>Event Date:</h3>
                                <input className = 'editor-event-input' type="text" value={this.state.date} onChange={e => this.handleEditor('date', e.target.value)} />
                            </div>

                            <div className = 'event-title-input'>
                                <h3 className = 'editor-event-title'>Photos:</h3>
                                <div>
                                    {photos}
                                </div>
                                <MediaUploader addUploadedMedia={this.addUploadedMedia} mediaType='pic' />
                            </div>

                            <div className = 'event-title-input'>
                                <h3 className = 'editor-event-title'>Audio:</h3>
                                <div>
                                    {audio}
                                </div>
                                <MediaUploader addUploadedMedia={this.addUploadedMedia} mediaType='audio' />
                                </div>

                                <div className = 'delete-button'>
                                <button disabled={this.props.newEventBool} onClick={() => this.handleDelete()}>Delete</button>
                                </div>
                            </div>
                        <div className = 'editor-right'>
                            <h3 className = 'editor-event-title'>Event Description: </h3>
                            <input className = 'event-desc-input'type="text" value={this.state.event_txt} onChange={e => this.handleEditor('event_txt', e.target.value)} />
                            <div className = 'right-buttons'>
                                <button className = 'cancel' onClick={() => this.handleCancel()}>Cancel</button>
                                <button onClick={() => this.handleSave()}>Save</button>
                            </div>
                        </div>
                           
                            
                    </div>
                </ClickOutHandler>
            </div>
        )
    }
}

export default EventEditor