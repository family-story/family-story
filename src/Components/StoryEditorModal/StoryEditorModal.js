import React, { Component } from 'react'
import image from '../../Assets/FamilySearchTutorial.png'

const ClickOutHandler = require('react-onclickout')

class StoryEditorModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fsPin: ''
    }
  }

  handleInput(value) {
    this.setState({ fsPin: value })
  }

  render() {
    return (
      <div className='transparent-background'>
        <ClickOutHandler onClickOut={() => this.props.closeStoryEditorModal()}>
          <div className='mid-modal'>
            <div className='modal-style'>
              <input placeholder='FamilySearch ID' onChange={e => this.handleInput(e.target.value)} />
              <button onClick={() => this.props.closeStoryEditorModal}> Import from Family Search </button>
              <a href={image}><img src={image} className='fs-tutorial' alt=""></img></a>
              <p> To import from Family Search, login to your Family Search account and navigate to your family tree. Find the person you would like to import stories, pictures or audio from. You will then find a seven digit number. Take the seven digit number and enter it into the field above.</p>
            </div>
          </div>
        </ClickOutHandler>
      </div>
    )
  }
}

export default StoryEditorModal