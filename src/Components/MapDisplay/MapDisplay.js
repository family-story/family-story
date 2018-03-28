import React, {Component} from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import axios from 'axios';
const style ={
  width: '100%',
  height:'100%'
}
export class MapDisplay extends Component {
    constructor(props){
        super(props)
    this.state = {
      center: {lat: 39.5, lng: -98.35},
      zoom: 3
    }
  }

  componentDidMount=()=> {
    this.google = this.props.google;
  }

  onMapReady=(mapProps)=> {
    const {google} = this.props;
    this.geocoder = new google.maps.Geocoder();
    this.geoCodeAddress(this.geocoder, this.props.location);
  }

  geoCodeAddress(geocoder, address) {
    this.geocoder.geocode({'address': address}, (results, status) => {
      if (status === 'OK') {
        this.setState({
          center: results[0].geometry.location,
          zoom: 10
        })
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    })
  }

  componentWillReceiveProps(nextProps){
    console.log(nextProps)
    if(this.props.location !== nextProps.location) {
      this.geoCodeAddress(this.geocoder, nextProps.location)
    }
  }

  render() {
    if (!this.props.loaded) {
      return (<div>Loading...</div>)
    }

    return (
      <div className = "MapBody">
        <h3>{this.props.location}</h3>
        <div className = "MapContainer">
          <Map id='map' google={this.props.google} center={this.state.center} zoom={this.state.zoom} style ={style} onReady={this.onMapReady}>
             <Marker name={'Current location'} position={this.state.center}/> 
          </Map>
        </div>
      </div>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: `${process.env.REACT_APP_GOOGLE_KEY}`,
  version: '3'
})(MapDisplay)

//redux state subscription rerenders if the store works.