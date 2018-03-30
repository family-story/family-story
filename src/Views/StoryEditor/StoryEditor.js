import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { cancelStoryChanges, updateStory, updateStoryDB, saveNewStory } from '../../ducks/reducer'

import NavBar from '../../Components/NavBar/NavBar'
import EventEditor from '../EventEditor/EventEditor'

class StoryEditor extends Component {
  constructor() {
    super()
    this.state = {
      selectedEvent: null,
      newEvent: false,
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
  }

  componentDidMount() {
    let { tags, events, story_title, story_id } = this.props.currentStory[0]
    events.sort((a, b) => a.event_num - b.event_num)

    this.setState({
      story_title: story_title,
      story_id: story_id,
      tags: tags,
      events: events
    })
  }

  componentWillReceiveProps(newProps) {
    if (newProps.currentStory[0]) {
      let { tags, events, story_title } = this.props.currentStory[0]
      this.setState({
        story_title: story_title,
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

  updateEvent(index) {
    this.setState({
      selectedEvent: index,
      eventEditor: true
    })
  }

  newEvent() {
    this.setState({
      newEvent: true,
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

  updateEvent(event, index) {
    let events = this.state.events
    events.splice(index, 1, event)
  }

  addNewEvent(event) {
    let events = this.state.events
    event.event_num = events[events.length - 1].event_num + 1
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
      story = [{
        user_id: this.props.user.user_id,
        story_id: story_id,
        story_title: story_title,
        tags: tags,
        events: events
      }];
      await this.props.updateStoryDB(story)
    } else {
      story = [{
        user_id: this.props.user.user_id,
        story_title: story_title,
        tags: tags,
        events: events
      }];
      await this.props.saveNewStory(story)
    }
    window.location.assign('http://localhost:3000/home')
  }

  render() {
    let eventsList = this.state.events.map((event, index) => {
      return (
        <div onClick={() => this.updateEvent(index)} key={index}>
          {index === 0 ? null :
            <button onClick={() => this.moveEvents('up', index)}>up</button>}
          {index === this.state.events.length - 1 ? null :
            <button onClick={() => this.moveEvents('down', index)}>down</button>}
          <h3>{event.event_title}</h3>
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

    return (
      <div>
        <NavBar logout={true} />

        {this.state.eventEditor ?
          <EventEditor
            newEvent={this.state.newEvent}
            closeEditor={this.closeEditor}
            event={this.state.events[this.state.selectedEvent]}
            updateEvent={this.state.updateEvent}
            addNewEvent={this.state.addNewEvent} /> :
          null}

        <div>
          <h3>Story Title</h3>
          <input type="text" value={this.state.story_title} onChange={e => this.handleTitle(e.target.value)} />
        </div>

        {/* <div>
          <h1> These are your events </h1>
          <p> Lorem ipsum dolor sit amet. </p>
        </div> */}

        <div>
          <h3>Tags</h3>
          <input type="text" value={this.state.tag} onChange={e => this.handleTagStr(e.target.value)} />
          <button onClick={() => this.handleAddTag()}>Add</button>
        </div>

        <div>
          <h3>Current tags, click to remove:</h3>
          <div>
            {currentTags}
          </div>
        </div>

        <div>
          <h3>Events</h3>
          {eventsList}
          <button onClick={() => this.newEvent()}> Add an Event </button>
        </div>

        {/* <div>
          <h1> These are your tags </h1>
          <p> Lorem ipsum dolor sit amet. </p>
        </div> */}

        <div>
          <button onClick={() => this.handleSave()}> Save </button>
          <Link to='/home'><button onClick={() => this.props.cancelStoryChanges()}> Cancel </button></Link>
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

export default connect(mapStateToProps, { cancelStoryChanges, updateStory, updateStoryDB, saveNewStory })(StoryEditor)