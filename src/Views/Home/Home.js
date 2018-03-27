import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import NavBar from '../../Components/NavBar/NavBar'

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stories: [],
      filterString: ''
    }
  }

  componentDidMount() {
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

  handleFilterTags(val) {
    this.setState({
      filterString: val
    })
  }


  render() {
    let stories = this.state.stories
      .filter(story => {
        let pattern = new RegExp(`${this.state.filterString}`, 'i')

        if (!this.state.filterString) {
          return story
        } else if (pattern.test(story.story_title)) {
          return story
        } else {
          for (let i = 0; i < story.tags.length; i++) {
            if (pattern.test(story.tags[i].tag_str)) {
              return story
            }
          }
        }
        return null
      })
      .map(story => {
        let tags = story.tags.map(tag => {
          return (
            <p key={tag.tag_id}>{tag.tag_str}</p>
          )
        })
        return (
          <div className='story' key={story.story_id}>
            <h3>{story.story_title}</h3>
            {tags}
          </div>
        )
      })

    if (typeof stories[0] === 'undefined' || stories[0] == null) {
      stories = <p>Sorry, your search did not find any results.</p>
    }

    return (
      <div>
        <NavBar logout={true} />
        <input type='search' onChange={e => this.handleFilterTags(e.target.value)} />
        <div>
          {stories}
        </div>

        <div>
          Create Your Story
          <Link to='/createStory'><button> start </button></Link>
        </div>
      </div>
    )
  }
}

export default Home