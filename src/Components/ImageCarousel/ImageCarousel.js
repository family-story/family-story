import React, { Component } from 'react'
import Slider from 'react-slick'

const data = require('../../Views/StoryViewModal/dummy')

class ImageCarousel extends Component {
  constructor(props){
    super(props);
  
    this.state = {
        pics: [
            {
                "media_id": 1,
                "media_type": "pic",
                "media_ref": "https://www.familysearch.org/dzpatron/v1/TH-301-41540-135-27/scale?width=800&ctx=ArtCtxPublic&angle=0"
            },
            {
                "media_id": 2,
                "media_type": "pic",
                "media_ref": "https://www.familysearch.org/dzpatron/v1/TH-303-45428-574-53/scale?width=800&ctx=ArtCtxPublic&angle=0"
            },
            {
                "media_id": 3,
                "media_type": "pic",
                "media_ref": "https://www.familysearch.org/dzpatron/v1/TH-300-45428-733-1/scale?width=800&ctx=ArtCtxPublic&angle=0"
            },
            {
                "media_id": 4,
                "media_type": "pic",
                "media_ref": "https://www.familysearch.org/dzpatron/v1/TH-300-48239-1135-19/scale?width=800&ctx=ArtCtxPublic&angle=0"
            }
        ]
    }
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.pics){
        this.setState({
            pics: nextProps.pics
        })
    }
  }

  render(){
      let eventPics = this.state.pics.map(picture=>{
          
          return (
              <div className = 'carousel-image-container' key = {picture.media_id}>
                <img src = {picture.media_ref} alt =''/>
              </div>
          )
      })

    let settings = {
        dots: true,
        arrows: true,
        speed: 500,
    
      }
    return(
      <div className = 'carousel-container'>
        <Slider {...settings}>
            {eventPics}
        </Slider>
      </div>
    )
  }
}

export default ImageCarousel