import React, { Component } from 'react'

class EventEditor extends Component {
    constructor(){
        super()
        this.state = {
            event_title: '',
            location: '',
            date: '',
            lat: '',
            long: '',
            photo: '',
            audio: '',
            description: ''

        }
    }

    render(){
        return(
            <div className="transparent-background">
                <div className="editor-container">
                    <p>Event Title</p>
                    <input />
                </div>
            </div>
        )
    }
}