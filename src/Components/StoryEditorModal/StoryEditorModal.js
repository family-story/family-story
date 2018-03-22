import React, { Component } from 'react'

import image from '../../Assets/FamilySearchTutorial.png'

class StoryEditorModal extends Component {

  handleClick(type){
    if (type === 'backdrop'){
      this.props.close()
    }
  }

  render(){
    return(
      <div onClick = {()=>this.handleClick('backdrop')} className = 'transparent-background' name = 'backdrop'>
          <div onClick = {()=>this.handleClick('modal')} className = 'modal-style'>
            <img src = {image} className = 'fs-tutorial'></img>
          </div>
      </div>
    )
  }
}

export default StoryEditorModal