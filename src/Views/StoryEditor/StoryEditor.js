import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import NavBar from '../../Components/NavBar/NavBar'
import EventEditor from '../EventEditor/EventEditor'

class StoryEditor extends Component {
  constructor() {
    super()
    this.state = {
      displayModal: false,

      story_title: '',
      tag_str: ''
    }
    
    this.closeModal = this.closeModal.bind(this)
  }

  closeModal() {
    this.setState({
      displayModal: false
    })
  }

  render() {
    return (
      <div>
        <NavBar logout={true} />

        {this.state.displayModal ? <EventEditor closeModal={this.closeModal} /> : null}

        <div>
          Story Title
          <input />
        </div>
        <div>
          <h1> Import from Family Search </h1>
          <p> Lorem ipsum dolor sit amet. </p>
        </div>
        <div>
          Events
          <button onClick={() => this.setState({ displayModal: true })}> Add an Event </button>
        </div>
        <div>
          <h1> These are your events </h1>
          <p> Lorem ipsum dolor sit amet. </p>
        </div>
        <div>
          Tags
          <input />
        </div>
        <div>
          <h1> These are your tags </h1>
          <p> Lorem ipsum dolor sit amet. </p>
        </div>
        <div>
          <Link to='/home'><button> Save </button></Link>
          <button> Cancel </button>
        </div>
      </div>
    )
  }
}

export default StoryEditor