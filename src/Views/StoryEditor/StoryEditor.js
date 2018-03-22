import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import NavBar from '../../Components/NavBar/NavBar'
class StoryEditor extends Component {

  render() {
    return (
      <div>
        <NavBar logout={true} />
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
          <button> Add an Event </button>
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