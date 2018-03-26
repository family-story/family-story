import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import NavBar from '../../Components/NavBar/NavBar'
import EventEditor from '../EventEditor/EventEditor'
import StoryEditorModal from '../../Components/StoryEditorModal/StoryEditorModal'

class StoryEditor extends Component {
  constructor() {
    super()
    this.state = {
      selectedEvent: '',
      selectedEventInfo: '',

      eventEditorModal: false,
      storyEditorModal: false,

      story: {
        story_title: '',
        tags: [],
        events: []
      }


    }

    this.closeEventEditorModal = this.closeEventEditorModal.bind(this)
    this.closeStoryEditorModal = this.closeStoryEditorModal.bind(this)
  }

  handleEditing(key, value) {
    this.setState({ [key]: value })
  }

  closeEventEditorModal() {
    this.setState({
      eventEditorModal: false
    })
  }

  closeStoryEditorModal() {
    this.setState({
      storyEditorModal: false
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
    console.log(this.state.events)
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
    console.log(eventsList)
    return (
      <div>
        <NavBar logout={true} />

        {this.state.eventEditorModal ?
          <EventEditor
            closeEventEditorModal={this.closeEventEditorModal}
            selectedEvent={this.state.selectedEvent}
            selectedEventInfo={this.state.selectedEventInfo} /> :
          null}

        {this.state.storyEditorModal ?
          <StoryEditorModal
            closeStoryEditorModal={this.closeStoryEditorModal} /> :
          null}

        <div>
          <h3>Story Title</h3>
          <input onChange={e => this.handleEditing('story_title', e.target.value)} />
        </div>

        {/* <div>
          <h1> Import from Family Search </h1>
          <p> Lorem ipsum dolor sit amet. </p>
          <button onClick={() => this.setState({ storyEditorModal: true })}>Import from Family Search</button>
        </div> */}

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

export default StoryEditor