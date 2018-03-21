import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import NavBar from '../../Components/NavBar/NavBar'

class Home extends Component {
  constructor(props){
    super(props);
  
    this.state = {
      stories: []
    }
  }

  componentDidMount(){
    this.setState({
      stories: [
        {
            "story_id": 1,
            "user_id": 1,
            "story_title": "My Proposal",
            "tags": [
                {
                    "tag_id": 1,
                    "tag_str": "Stuart Harper"
                },
                {
                    "tag_id": 2,
                    "tag_str": "Summer Harper"
                },
                {
                    "tag_id": 3,
                    "tag_str": "Provo, Utah"
                },
                {
                    "tag_id": 4,
                    "tag_str": "Orem, Utah"
                }
            ]
        },
        {
            "story_id": 2,
            "user_id": 1,
            "story_title": "Mary Cook, Handcart Pioneer",
            "tags": [
                {
                    "tag_id": 5,
                    "tag_str": "Mary Cook"
                },
                {
                    "tag_id": 6,
                    "tag_str": "Convert"
                },
                {
                    "tag_id": 7,
                    "tag_str": "Pioneer"
                },
                {
                    "tag_id": 8,
                    "tag_str": "Scotland"
                }
            ]
        }
     ]
    })
  }
  

  render(){
    let stories = this.state.stories.map(story=>{
        let tags = story.tags.map(tag=>{
          return (
            <p>{tag.tag_str}</p>
          )
        })
      return (
        <div> 
          <h3>{story.story_title}</h3>
          {tags}
        </div>
      )
    })
    return(
      <div>
        <NavBar logout = {true}/>
        <input/>
        <div>
          {stories}
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