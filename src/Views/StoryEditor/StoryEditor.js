import React, { Component } from 'react'

class StoryEditor extends Component {
  
  render(){
    return(
      <div>
        <div>
          Story Title
          <input/>
        </div>
        <div>
          <h1> Import from Family Search </h1>
          <p> Lorem ipsum dolor sit amet.</p>
        </div>
        <div>
          Events
          <button> Add an Event </button>
        </div>
        <div>
          <h1> These are your events </h1>
          <p> Lorem ipsum dolor sit amet.</p>
        </div>
        <div>
          Tags
          <input/>
        </div>
        <div>
          <h1> These are your tags </h1>
          <p> Lorem ipsum dolor sit amet.</p>
        </div>
      </div>
    )
  }
}

export default StoryEditor