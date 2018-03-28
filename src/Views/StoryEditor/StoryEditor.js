import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import NavBar from '../../Components/NavBar/NavBar'
import EventEditor from '../EventEditor/EventEditor'

class StoryEditor extends Component {
  constructor() {
    super()
    this.state = {
      selectedEvent: '',
      selectedEventInfo: '',

      eventEditorModal: false,

      story_title: '',
      tags: []

    }

    this.closeEventEditorModal = this.closeEventEditorModal.bind(this)
  }

  handleEditing(key, value) {
    this.setState({ [key]: value })
  }

  closeEventEditorModal() {
    this.setState({
      eventEditorModal: false
    })
  }


  handleEventEditSelection(eventId) {
    let selected = this.state.events.filter(event => event.event_id === eventId)
    if (selected[0] === 'undefined') {

    }

    this.setState({
      selectedEvent: eventId,
      selectedEventInfo: selected[0],
      eventEditorModal: true
    })
  }

  render() {

    // Maps over events belonging to story, if any.
    let eventsList
    if (typeof this.state.events !== 'undefined') {
      eventsList = this.state.events.map((event, index) => {
        return (
          <div onClick={() => this.handleEventEditSelection(event.event_id)} key={index}>
            <h3>{event.event_title}</h3>
          </div>
        )
      })
    }

    return (
      <div>
        <NavBar logout={true} />

        {this.state.eventEditorModal ?
          <EventEditor
            closeEventEditorModal={this.closeEventEditorModal}
            selectedEvent={this.state.selectedEvent}
            selectedEventInfo={this.state.selectedEventInfo} /> :
          null}


        <div>
          <h3>Story Title</h3>
          <input value={this.state.story_title} onChange={e => this.handleEditing('story_title', e.target.value)} />
        </div>


        <div>
          <h3>Events</h3>
          {eventsList}
          <button onClick={this.handleEventEditSelection}> Add an Event </button>
        </div>

        {/* <div>
          <h1> These are your events </h1>
          <p> Lorem ipsum dolor sit amet. </p>
        </div> */}

        <div>
          <h3>Tags</h3>
          <input />
        </div>

        {/* <div>
          <h1> These are your tags </h1>
          <p> Lorem ipsum dolor sit amet. </p>
        </div> */}

        <div>
          <Link to='/home'><button> Save </button></Link>
          <button> Cancel </button>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentStory: state.currentStory,
    currentStoryOrig: state.currentStoryOrig
  }
}

export default connect(mapStateToProps)(StoryEditor)