import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { getStoriesArray, getStory, deleteStory, createNewStory, getUserInfo } from '../../ducks/reducer'
import NavBar from '../../Components/NavBar/NavBar'

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stories: [],
      filterString: ''
    }
  }

  async componentDidMount() {
    await this.props.getUserInfo()
    this.props.getStoriesArray(this.props.user.user_id)
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

  async handleSelectedStory(story_id, view) {
    await this.props.getStory(story_id)

    if (view) {
      window.location.assign(`http://localhost:3000/story/${story_id}`)
    }
  }

  async handleDeleteButton(story_id) {
    await this.props.deleteStory(story_id)
    this.props.getStoriesArray(this.props.user.user_id)
      .then(resp => {
        let stories = resp.value
        this.setState({ stories: stories })
      })

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
            <span className='home-tags' key={tag.tag_id}>{tag.tag_str}</span>
          )
        })
        return (
          <div className='story' key={story.story_id}>
            <div className='home-title-tags-container'>
              <h3 onClick={() => this.handleSelectedStory(story.story_id, true)} className='story-title'>{story.story_title}</h3>

              <div className='home-tags-container'>
                <span className='your-tags'>Your Tags:</span>
                {tags}
              </div>
            </div>

            <div className='home-button-container'>
              <Link to='/createStory'>
                <button className='home-edit' onClick={() => this.handleSelectedStory(story.story_id, false)}>Edit</button>
              </Link>

              <button className='home-delete' onClick={() => this.handleDeleteButton(story.story_id)}>Delete</button>
            </div>
          </div>
        )
      })


    if (typeof stories[0] === 'undefined' || stories[0] == null) {
      stories = <p className='search-sorry'>Sorry, your search did not find any results.</p>
    }

    return (
      <div>
        <NavBar logout={true} />
        <div className='divider-1'></div>
        <div className='your-stories-search'>
          <span className='your-stories'> Your Stories: </span>
          <div className='search-stories-input'>
            <span className='search-stories'>Search stories by title or tag:</span>
            <input type='search' onChange={e => this.handleFilterTags(e.target.value)} className='search-input' />
          </div>
        </div>
        <div className='divider-3'></div>
        <div className='story-container'>
          {this.state.stories[0] ? stories : null}
          <div className='handle-link'>
            <Link to='/createStory'><div className='add-story-link' onClick={() => this.handleCreateNewStory()}>
              <div className='add-story-container'>
                <div className='circle-add'>
                  <span className='home-plus'> + </span>
                </div>
                <h3 className='add-story'> Add Story </h3>
              </div>
            </div>
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    storiesArray: state.storiesArray,
    user: state.user
  }
}

export default connect(mapStateToProps, { getUserInfo, getStoriesArray, getStory, deleteStory, createNewStory })(Home)