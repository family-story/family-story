import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import MapDisplay from '../../Components/MapDisplay/MapDisplay';
import ImageCarousel from '../../Components/ImageCarousel/ImageCarousel';
import AudioPlayer from './AudioPlayer';
import NavBar from '../../Components/NavBar/NavBar'


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
    
    let audioTags = null;

    if (this.props.story[0].events[this.state.eventIndex].media.filter(obj => obj.media_type === "audio").length > 0) {
      audioTags = this.props.story[0].events[this.state.eventIndex].media.filter(obj => obj.media_type === "audio").map((obj, i) => <div className = 'story-audio'><AudioPlayer audio = {obj} key = {i}/></div>)
    }
    return(
      <div className = 'story-view-container'>
        <div className = 'story-view-title'>
          <h1>{this.props.story[0].story_title}</h1>
        </div>
        <div className = 'divider-1'></div>
        <section className = 'eventViewer'>
          <div className = 'story-left'>
            <MapDisplay location={this.props.story[0].events[this.state.eventIndex].location}/>
            <h3 className = 'location'>{this.props.story[0].events[this.state.eventIndex].location}</h3>
            <div className = 'carousel'>
              <ImageCarousel pics = {this.props.story[0].events[this.state.eventIndex].media.filter(obj => obj.media_type === "pic")}/>
            </div>
            {audioTags} 
          </div>
          <aside className = 'story-right'>
            <h3 className = 'event-title'>{this.props.story[0].events[this.state.eventIndex].event_title}</h3>
            <span className = 'event-date'>{this.props.story[0].events[this.state.eventIndex].date}</span>
            <p className = 'event-desc'>{this.props.story[0].events[this.state.eventIndex].event_txt}</p>
          </aside>
        </section>
        <div className = 'story-buttons'>
          <Link to="/home"><button className = 'story-button-back'>Back to stories</button></Link>
          <button className = 'story-button' disabled={this.state.eventIndex===0} onClick = {()=>this.handlePreviousButton()}> Prev </button>
          <button className = 'story-button' disabled={this.state.eventIndex===(this.props.story[0].events.length - 1)} id='next' onClick = {()=>this.handleNextButton()}> Next </button>
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