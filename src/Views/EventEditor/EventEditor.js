import React, { Component } from 'react'

const ClickOutHandler = require('react-onclickout')

class EventEditor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            event_title: '',
            date: '',
            lat: '',
            long: '',
            event_txt: '',
            media: '',
            location: ''
        }
    }

    componentDidMount() {
        if (this.props.selectedEvent) {
            this.setState({
                event_title: this.props.selectedEventInfo.event_title
            })
        }
    }

    handleEditor(key, value) {
        this.setState({ [key]: value })
    }

    handleCancel() {

    }

    handleSave() {
        alert('saved!')
    }

    handleDelete() {

    }

    render() {
        return (
            <div className="transparent-background">
                <ClickOutHandler onClickOut={() => this.props.closeEventEditorModal()}>
                    <div className="editor-container" style={{ background: '#ccc', margin: '25px' }}>
                        <h3>Event Title</h3>
                        <input type="text" value={this.state.event_title} onChange={e => this.handleEditor('event_title', e.target.value)} />

                        <h3>Event Date</h3>
                        <input type="text" value={this.state.date} onChange={e => this.handleEditor('date', e.target.value)} />

                        <h3>Photos</h3>
                        <h3>Audio</h3>

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