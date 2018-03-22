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

            location: '',
        }
    }

    handleEditor(key, value) {
        this.setState({ [key]: value })
    }

    render() {
        console.log(this.state)
        return (
            <div className="transparent-background" style={{ display: 'absolute' }}>
                <ClickOutHandler onClickOut={() => this.props.closeModal()}>
                    <div className="editor-container" style={{ background: '#ccc', margin: '25px' }}>
                        <h3>Event Title</h3>
                        <input type="text" value={this.state.event_title} onChange={e => this.handleEditor('event_title', e.target.value)} />

                        <h3>Event Date</h3>
                        <input type="text" value={this.state.date} onChange={e => this.handleEditor('date', e.target.value)} />

                        <h3>Photos</h3>
                        <h3>Audio</h3>

                        <h3>Event</h3>
                        <textarea type="text" value={this.state.event_txt} onChange={e => this.handleEditor('event_txt', e.target.value)} />

                        <button onClick={() => this.setState({ display: 'none' })}>Save</button>
                    </div>
                </ClickOutHandler>
            </div>
        )
    }
}

export default EventEditor