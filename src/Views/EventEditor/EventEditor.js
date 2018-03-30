import React, { Component } from 'react'

import MediaUploader from '../../Components/MediaUploader/MediaUploader'
import AudioPlayer from '../StoryViewModal/AudioPlayer'
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
    }

    componentDidMount() {
        if (!this.props.newEvent) {
            this.setState({
                event_title: this.props.event.event_title,
                date: this.props.event.date,
                location: this.props.event.location,
                media: this.props.event.media,
                event_text: this.props.event.event_text
            })
        }
    }

    handleLocation(location) {
        this.setState({ location: location })
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

    addUploadedMedia(media) {
        let newMedia = this.state.media
        newMedia.push(media)
        this.setState({ media: newMedia })
    }

    handleCancel() {
        this.clearModel()
        this.props.closeEventEditorModal()
    }

    handleSave() {
        let event = {
            event_title: this.state.event_title,
            date: this.state.date,
            event_txt: this.state.event_txt,
            media: this.state.media,
            location: this.state.location
        }
        if (this.props.newEvent) {
            this.props.addNewEvent(event)
        } else {
            this.props.updateEvent(event)
        }
        this.clearModel()
        this.props.closeEventEditorModal()
    }

    handleDelete() {
        this.props.deleteEvent()
        this.clearModel()
        this.props.closeEventEditorModal()
    }

    render() {
        let photos = this.state.media.filter(media => media.media_type === 'pic').map(image => {
            return (<img src={image.media_ref} alt="" />)
        })

        let audio = this.state.media.filter(media => media.media_type === 'audio').map(audio => {
            return (<AudioPlayer audio={audio} key={i} />)
        })
        return (
            <div className="transparent-background">
                <ClickOutHandler onClickOut={() => this.props.closeEventEditorModal()}>
                    <div className="editor-container" style={{ background: '#ccc', margin: '25px' }}>
                        <h3>Event Title</h3>
                        <input type="text" value={this.state.event_title} onChange={e => this.handleEditor('event_title', e.target.value)} />

                        <MapSelector />

                        <h3>Event Date</h3>
                        <input type="text" value={this.state.date} onChange={e => this.handleEditor('date', e.target.value)} />

                        <h3>Photos</h3>
                        <div>
                            {photos}
                        </div>
                        <MediaUploader mediaType='pic' />

                        <h3>Audio</h3>
                        <div>
                            {audio}
                        </div>
                        <MediaUploader mediaType='audio' />

                        <h3>Event</h3>
                        <textarea type="text" value={this.state.event_txt} onChange={e => this.handleEditor('event_txt', e.target.value)} />

                        <button onClick={this.handleCancel}>Cancel</button>
                        <button onClick={this.handleSave}>Save</button>
                        <button onClick={this.handleDelete}>Delete</button>
                    </div>
                </ClickOutHandler>
            </div>
        )
    }
}

export default EventEditor