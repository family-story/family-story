import React, { Component } from 'react'

import { connect } from 'react-redux'

import ImageCarousel from '../../Components/ImageCarousel/ImageCarousel'


class StoryViewModal extends Component {
  constructor(props){
    super(props);
  
    this.state = {
        event: 0,
    }
  }

  handleNextButton(){
    let next = this.state.event+1
  this.setState({
      event: next
  })
}

handlePreviousButton(){
  let prev = this.state.event-1
  this.setState({
      event: prev 
  })
}

  render(){
    // let sortedEvents = this.state.story[0].events.sort((a, b)=>a.event_id - b.event_id)
    // let pics = sortedEvents[this.state.event].media.filter(media => media.media_type === 'pic').map(mediaObj => {
    //     return (
    //       <div>
    //           <img src = {mediaObj.media_ref} alt={mediaObj.media_id}/>
    //       </div>
    //   )
    // })

    return(
      
      <div className = 'transparent-background'>
        <div className = 'mid-modal'>
        <div className = 'story-view-modal'>
          <span className = 'x'>X </span>
          Map Component
          <ImageCarousel event = {this.state.event}/>
          Audio

        <button onClick = {()=>this.handleNextButton()}> Next </button>
        <button onClick = {()=>this.handlePreviousButton()}> Prev </button>

        </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    story: state.currentStory 
  }
}

export default connect(mapStateToProps) (StoryViewModal)