import React, { Component } from 'react'
import Slider from 'react-slick'

class ImageCarousel extends Component {
  constructor(props){
    super(props);
  
    this.state = {
        pics: []
    }
  }

  render(){
    let settings = {
        dots: true,
        arrows: true,
        speed: 500,
    
      }
    return(
      <div className = 'carousel-container'>
        <Slider {...settings}>
            {this.props.pics}
        </Slider>
      </div>
    )
  }
}

export default ImageCarousel