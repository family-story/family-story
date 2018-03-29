import React, {Component} from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import axios from 'axios';
const style ={
  width: '100%',
  height:'100%'
}
export class MapSelector extends Component {
    constructor(props){
        super(props)
    this.state = {
      location: '',
      center: {lat: 39.5, lng: -98.35},
      zoom: 3
    }
  }

  componentDidMount=()=> {
    this.google = this.props.google
  }

  handleChange(value) {
    this.setState({
      location: value
    })
  }

  onMapReady=(mapProps)=> {
    const {google} = this.props;
    this.geocoder = new google.maps.Geocoder();
  }

  geoCodeAddress(geocoder) {
    this.geocoder.geocode({'address': this.state.location}, (results, status) => {
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

  render() {
    if (!this.props.loaded) {
      return (<div>Loading...</div>)
    }

    return (
      <div className = "MapBody">
        <input type="text" value={this.state.location} onChange={event => this.handleChange(event.target.value)}/>
        <button onClick={() => this.geoCodeAddress(this.geocoder)}>Search</button>
        <div className = "MapContainer">
          <Map id='map' google={this.props.google} initialCenter={{lat: 39.5, lng: -98.35}} center={this.state.center} zoom={this.state.zoom} style ={style} onReady={this.onMapReady}>
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
})(MapSelector)