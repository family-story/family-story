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

      tag: '',

      story: [{
        story_title: '',
        tags: [],
        events: []
      }]

    }

    this.closeEventEditorModal = this.closeEventEditorModal.bind(this)
  }

  handleTitle(value) {
    this.setState({ story: [{ story_title: value }] })
  }

  handleTag() {
    let tagsArray = this.state.story[0].tags.slice()
    tagsArray.push({ tag_str: this.state.tag })
    this.setState({
      story: [{
        tags: tagsArray
      }]
    })
    this.setState({
      tag: ''
    })
  }

  handleTagStr(value) {
    this.setState({
      tag: value
    })
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

  handleRemoveTag() {

  }

  render() {
    console.log(this.state.story[0].tags)

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

    let currentTags = null
    if (this.props.currentStory.tags !== 'undefined') {
      currentTags = this.props.currentStory[0].tags.map(tag => {
        return (
          <p key={tag.tag_id} onClick={() => this.handleRemoveTag(tag.tag_id)}>{tag.tag_str}</p>
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
          <input type="text" onChange={e => this.handleTitle(e.target.value)} />
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
          <input type="text" value={this.state.tag} onChange={e => this.handleTagStr(e.target.value)} />
          <button onClick={() => this.handleTag()}>Add</button>
        </div>

        <div>
          <h3>Current tags, click to remove:</h3>
          <div>
            {currentTags}
          </div>
        </div>

        {/* <div>
          <h1> These are your tags </h1>
          <p> Lorem ipsum dolor sit amet. </p>
        </div> */}

        <div>
          <Link to='/home'><button> Save </button></Link>
          <Link to='/home'><button> Cancel </button></Link>
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