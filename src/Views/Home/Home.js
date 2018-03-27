import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import {getStoriesArray} from '../../ducks/reducer'

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
    this.props.getStoriesArray()
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
function mapStateToProps(state) {
  return {
    storiesArray: state.storiesArray,
  }
}

export default connect(mapStateToProps, { getStoriesArray })(Home)