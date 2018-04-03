import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import {
  cancelStoryChanges,
  updateStory,
  clearState,
  saveNewStory,
  getStory
} from '../../ducks/reducer'

import UpArrow from 'react-icons/lib/fa/caret-up'
import DownArrow from 'react-icons/lib/fa/caret-down'

import NavBar from '../../Components/NavBar/NavBar'
import EventEditor from '../EventEditor/EventEditor'

class StoryEditor extends Component {
  constructor() {
    super()
    this.state = {
      selectedEvent: null,
      newEventBool: false,
      eventEditor: false,
      story_id: null,
      story_title: '',
      tag: '',
      tags: [],
      events: []
    }

    this.closeEditor = this.closeEditor.bind(this)
    this.updateEvent = this.updateEvent.bind(this)
    this.addNewEvent = this.addNewEvent.bind(this)
    this.deleteEvent = this.deleteEvent.bind(this)
  }

  componentDidMount() {
    if (this.props.currentStory[0]) {
      let { tags, events, story_title, story_id } = this.props.currentStory[0]
      events.sort((a, b) => a.event_num - b.event_num)

      this.setState({
        story_title: story_title,
        story_id: story_id,
        tags: tags,
        events: events
      })
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.currentStory[0]) {
      console.log('will recive props hit')
      let { tags, events, story_title, story_id } = newProps.currentStory[0]
      this.setState({
        story_title: story_title,
        story_id: story_id,
        tags: tags,
        events: events
      })
    }
  }

  clearState() {
    this.setState = {
      selectedEvent: 0,
      newEvent: false,
      eventEditor: false,
      tag: '',
      story_title: '',
      tags: [],
      events: []
    }
  }

  editEvent(index) {
    this.setState({
      selectedEvent: index,
      newEventBool: false,
      eventEditor: true
    })
  }

  newEvent() {
    this.setState({
      newEventBool: true,
      eventEditor: true
    })
  }

  handleTitle(value) {
    this.setState({ story_title: value })
  }

  handleTagStr(value) {
    this.setState({ tag: value })
  }

  handleAddTag() {
    let tagsArray = this.state.tags.slice()
    tagsArray.push({ tag_str: this.state.tag })
    this.setState({ tag: '', tags: tagsArray })
  }

  handleRemoveTag(index) {
    let tagsArray = this.state.tags.slice()
    tagsArray.splice(index, 1)
    this.setState({
      tag: '',
      tags: tagsArray
    })
  }

  closeEditor() {
    this.setState({ eventEditor: false })
  }

  updateEvent(event) {
    let events = this.state.events
    events.splice(this.state.selectedEvent, 1, event)
  }

  addNewEvent(event) {
    let events = this.state.events
    events.push(event)
    this.setState({ events: events })
  }

  moveEvents(movement, index) {
    let events = this.state.events.slice()
    let b = events[index]
    if (movement === 'up') {
      events[index] = events[index - 1]
      events[index - 1] = b
    } else {
      events[index] = events[index + 1]
      events[index + 1] = b
    }
    this.setState({ events: events })
  }

  async handleSave() {
    let { events, story_title, story_id, tags } = this.state
    events.forEach((event, i) => event.event_num = i + 1)

    let story = []
    if (this.props.currentStory[0].story_id) {
      console.log('update story db hit')
      story = [{
        user_id: this.props.user.user_id,
        story_id: story_id,
        story_title: story_title,
        tags: tags,
        events: events
      }];
      // await this.props.updateStoryDB(story)
      await axios.put('/api/story', story)
      await this.props.getStory(this.state.story_id)
    } else {
      console.log('new story hit')
      story = [{
        user_id: this.props.user.user_id,
        story_title: story_title,
        tags: tags,
        events: events
      }];
      await axios.post('/api/story', story)
      // await this.props.saveNewStory(story)
    }
    window.location.assign(process.env.REACT_APP_HOME)
  }

  deleteEvent() {
    let eventsArr = this.state.events.slice();
    eventsArr.splice(this.state.selectedEvent, 1)
    this.setState({
      selectedEvent: null,
      events: eventsArr
    })
  }

  render() {
    let eventsList = this.state.events.map((event, index, array) => {
      return (
        <div className="event" key={index}>
          <div className="event-title">
            <h3 onClick={() => this.editEvent(index)}>{event.event_title}</h3>
          </div>
          {index === 0 ? null :
            <button
              className={`up-arrow-button up-arrow-button-${array.length - index}`}
              onClick={() => this.moveEvents('up', index)}><UpArrow /></button>}
          {index === this.state.events.length - 1 ? null :
            <button
              className={`down-arrow-button down-arrow-button-${index}`}
              onClick={() => this.moveEvents('down', index)}><DownArrow /></button>}
        </div>
      )
    })

    let currentTags = null
    if (this.props.currentStory.tags !== 'undefined') {
      currentTags = this.state.tags.map((tag, index) => {
        return (
          <p key={index} onClick={() => this.handleRemoveTag(index)}>{tag.tag_str}</p>
        )
      })
    }

    let disableSave = this.state.events.length === 0
    let disableSaveMsg = disableSave ?
      <p>Please save at least one event before saving a story.</p> :
      null;

    return (
      <div>
        <NavBar logout={true} />
        <div className="divider-1"></div>
        {this.state.eventEditor ?
          <EventEditor
            newEventBool={this.state.newEventBool}
            newEvent={this.newEvent}
            closeEditor={this.closeEditor}
            event={this.state.events[this.state.selectedEvent]}
            updateEvent={this.updateEvent}
            addNewEvent={this.addNewEvent}
            deleteEvent={this.deleteEvent} /> :
          null}
        <div className="story-editor-container">
          <div className="story-title-block">
            <h3>Your Story Title:</h3>
            <input className='story-title-input' type="text" value={this.state.story_title} onChange={e => this.handleTitle(e.target.value)} />
          </div>

          <div className="tags-block">
            <h3>Tags:</h3>
            <input className='story-tags-input' type="text" value={this.state.tag} onChange={e => this.handleTagStr(e.target.value)} />
            <button className='add-tag-button' onClick={() => this.handleAddTag()}>Add</button>

            <h3>Current tags, click to remove:</h3>
            <div>
              {currentTags}
            </div>
          </div>

          <div className="events-block">
            <h3>Events:</h3>
            {eventsList}
            <button className="add-event-button" onClick={() => this.newEvent()}> + Add an Event </button>
          </div>

          <div className="right-side">
            <div className="instructional-1">
              <h2> YOUR TAGS </h2>
              <p> You can add people and places to your stories by tagging them. When searching through stories on your homepage it will search through these tags. </p>
            </div>

            <div className="instructional-2">
              <h2> YOUR EVENTS </h2>
              <p> An event can be anything that happened in your story. Each event can have it's own photos, audio, description, and location. You can add as many events as you like! </p>
            </div>

            {disableSaveMsg}
            <Link to='/home'><button className="cancel-button" onClick={() => this.props.cancelStoryChanges()}> Cancel </button></Link>
            <button className="save-button" disabled={disableSave} onClick={() => this.handleSave()}> Save </button>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentStory: state.currentStory,
    currentStoryOrig: state.currentStoryOrig,
    user: state.user
  }
}

export default connect(mapStateToProps, { cancelStoryChanges, updateStory, clearState, saveNewStory, getStory })(StoryEditor)