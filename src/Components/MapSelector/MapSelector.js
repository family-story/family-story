import React, {Component} from 'react';
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';
const style ={
  width: '100%',
  height:'100%'
}
export class MapSelector extends Component {
    constructor(props){
        super(props)
    this.state = {
      newLocation: '',
      center: {lat: 39.5, lng: -98.35},
      zoom: 3
    }
  }

  componentDidMount=()=> {
    this.google = this.props.google
  }

  componentWillReceiveProps(newProps){
    if(newProps.location !== this.state.newLocation){
      this.setState({
        newLocation: this.props.location
      })
    }
  }

  handleChange(value) {
    this.setState({
      newLocation: value
    })
  }

  onMapReady=(mapProps)=> {
    const {google} = this.props;
    this.geocoder = new google.maps.Geocoder();
  }

  geoCodeAddress(geocoder) {
    this.geocoder.geocode({'address': this.state.newLocation}, (results, status) => {
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
        <div className = 'location-container'> 
          <input className = 'location-input' type="text" value={this.state.newLocation} onChange={event => this.handleChange(event.target.value)}/>
          <div className = 'search-save-buttons'> 
            <button onClick={() => this.geoCodeAddress(this.geocoder)}>Search</button>
            <button className = 'save-location' onClick={()=>this.props.handleLocation(this.state.newLocation)} >Save Location</button>
          </div>
        </div>
        <div className = "map-container">
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