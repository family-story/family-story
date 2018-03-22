import React, { Component } from 'react'

import image from '../../Assets/FamilySearchTutorial.png'

class StoryEditorModal extends Component {

  // handleClick(type){
  //   if (type === 'backdrop'){
  //     this.props.close()
  //   }
  // }

  render(){
    return(
      <div //onClick = {()=>this.handleClick('backdrop')} 
        className = 'transparent-background' name = 'backdrop'>
        <div className = 'mid-modal'>
          <div 
          //onClick = {()=>this.handleClick('modal')} 
            className = 'modal-style'>
            <input placeholder = 'FamilySearch ID'/>
            <button> Import from Family Search </button>
            <a href = {image}><img src = {image} className = 'fs-tutorial'></img></a>
            <p> To import from Family Search, login to your Family Search account and navigate to your family tree. Find the person you would like to import stories, pictures or audio from. You will then find a seven digit number. Take the seven digit number and enter it into the field above.</p>
          </div>
        </div>
      </div>
    )
  }
}

export default StoryEditorModal