import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import MapDisplay from '../../Components/MapDisplay/MapDisplay';
import ImageCarousel from '../../Components/ImageCarousel/ImageCarousel';
import AudioPlayer from './AudioPlayer';


class StoryView extends Component {
  constructor(props){
    super(props);
  
    this.state = {
        eventIndex: 0
    }
  }

  handleNextButton(){
    let next = this.state.eventIndex+1
  this.setState({
      eventIndex: next
  })
}

handlePreviousButton(){
  let prev = this.state.eventIndex-1
  this.setState({
      eventIndex: prev 
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
    
    let audioTags = null;

    if (this.props.story[0].events[this.state.eventIndex].media.filter(obj => obj.media_type === "audio").length > 0) {
      audioTags = this.props.story[0].events[this.state.eventIndex].media.filter(obj => obj.media_type === "audio").map((obj, i) => <AudioPlayer audio = {obj} key = {i}/>)
    }
    return(
      
      <div className = 'transparent-background'>
        <div className = 'mid-modal'>
        <div className = 'story-view-modal'>
        <h1>{this.props.story[0].story_title}</h1>
        <section className = 'eventViewer'>
          <MapDisplay location={this.props.story[0].events[this.state.eventIndex].location}/>
          <aside>
            <h3>{this.props.story[0].events[this.state.eventIndex].event_title}</h3>
            <p>{this.props.story[0].events[this.state.eventIndex].event_txt}</p>
          </aside>
          <ImageCarousel pics = {this.props.story[0].events[this.state.eventIndex].media.filter(obj => obj.media_type === "pic")}/>
          {audioTags}
        </section>
          
        <button disabled={this.state.eventIndex===0} onClick = {()=>this.handlePreviousButton()}> Prev </button>

        <button disabled={this.state.eventIndex===(this.props.story[0].events.length - 1)} id='next' onClick = {()=>this.handleNextButton()}> Next </button>
        
        <Link to="/home"><button>Back To Your Stories</button></Link>

        
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

export default connect(mapStateToProps) (StoryView)