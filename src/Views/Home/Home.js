import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { getStoriesArray, getStory, deleteStory, createNewStory } from '../../ducks/reducer'
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
      .then(resp => {
        let stories = resp.value
        this.setState({ stories: stories })
      })
  }

  handleFilterTags(val) {
    this.setState({
      filterString: val
    })
  }

  handleSelectedStory(story_id) {
    this.props.getStory(story_id)
  }

  handleDeleteButton(story_id) {
    this.props.deleteStory(story_id)
  }

  handleCreateNewStory() {
    this.props.createNewStory()
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
            <span className = 'home-tags' key={tag.tag_id}>{tag.tag_str}</span>
          )
        })
        return (
          <Link key={story.story_id} to={`/story/${story.story_id}`}>
            <div onClick={() => this.handleSelectedStory(story.story_id)} className='story' key={story.story_id}>

              <h3 className = 'story-title'>{story.story_title}</h3>

              <span className = 'your-tags'>Your Tags:</span> {tags}

              <Link to='/createStory'>
                <button className = 'home-edit' onClick={() => this.handleSelectedStory(story.story_id)}>Edit</button>
              </Link>

              <Link to='/home'>
                <button className = 'home-delete' /*onClick={() => this.handleDeleteButton(story.story_id)}*/>Delete</button>
              </Link>

            </div>
          </Link>
        )
      })

    if (typeof stories[0] === 'undefined' || stories[0] == null) {
      stories = <p className = 'search-sorry'>Sorry, your search did not find any results.</p>
    }

    return (
      <div>
        <NavBar logout={true} />
        <div className = 'divider-1'></div>
        <div className = 'your-stories-search'>
          <span className = 'your-stories'> Your Stories: </span>
          <div className = 'search-stories-input'>
            <span className = 'search-stories'>Search stories by title or tag:</span>
            <input type='search' onChange={e => this.handleFilterTags(e.target.value)} className = 'search-input'/>
          </div>
        </div>
        <div className = 'divider-3'></div>
        <div>
          {this.state.stories[0] ? stories : null}
        </div>

         <Link to='/createStory'><div className = 'story' onClick={() => this.handleCreateNewStory()}>
          <div className = 'add-story-container'>
            <div className = 'circle-add'>
              <span className = 'home-plus'> + </span>
            </div>
            <h3 className = 'add-story'> Add Story </h3>
          </div>
        </div> </Link>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    storiesArray: state.storiesArray,
  }
}

export default connect(mapStateToProps, { getStoriesArray, getStory, deleteStory, createNewStory })(Home)