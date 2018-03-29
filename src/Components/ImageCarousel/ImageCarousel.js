import React from 'react'
import Slider from 'react-slick'

function ImageCarousel(props) {
  let eventPics = props.pics.map(picture=>{
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


export default ImageCarousel