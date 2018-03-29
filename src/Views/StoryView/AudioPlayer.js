import React, {Component} from 'react'

class AudioPlayer extends Component{
  constructor( props ) {
    super( props ); 
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (nextProps.audio != this.props.audio)
  }

  componentDidUpdate() {
    this.refs.audio.load();
  }

  render(){
    return(
      <div className='AudioPlayer'>
        <audio controls="controls" ref="audio"><source type="audio/wav" src={this.props.audio.media_ref}/></audio>
      </div>
    )
  }
}

export default AudioPlayer