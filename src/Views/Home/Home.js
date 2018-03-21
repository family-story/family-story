import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import NavBar from '../../Components/NavBar/NavBar'

class Home extends Component {
  
  render(){
    return(
      <div>
          <NavBar/>
        <input/>
        <div>
          <Link to = '/story'><button> Stories Here </button></Link>
        </div> 

        <div>
          Create Your Story 
          <Link to = '/createStory'><button> start </button></Link>
        </div>
      </div>
    )
  }
}

export default Home