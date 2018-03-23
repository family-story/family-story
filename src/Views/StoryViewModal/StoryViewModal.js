import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class StoryViewModal extends Component {
  
  render(){
    return(
      <div>
        <div>
          <Link to = '/home'><button>Home</button></Link>
        </div>
      </div>
    )
  }
}

export default StoryViewModal