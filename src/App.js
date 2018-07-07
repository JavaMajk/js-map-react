import React, { Component } from 'react'
import MyPlaces from './MyPlaces.json'
import './App.css'
import MapCustom from './MapCustom'
<<<<<<< HEAD
||||||| merged common ancestors
import GoogleMapReact from 'google-map-react';
=======
import GoogleMapReact from 'google-map-react'
>>>>>>> google-maps-react
import * as zomatoAPI from './ZomatoAPI'
import * as ariaAlly from './AriaAlly';
import Marker from './Marker'
import InfoWindow from './InfoWindow'
import Header from './Header'
import Footer from './Footer'
import Sidebar from './Sidebar'

export default class App extends Component {

  state = {
    zoom: 14,
    defaultCenter: {
      lat: 53.129636,
      lng: 23.158537
    }, 
    center: {
      lat: 53.129636,
      lng: 23.158537
    },
    myPlaces: [],
    markers: [],
    placeType: 'All',
    selectedPlace: null
  }

  componentWillMount() {
    this.setState({
      myPlaces: MyPlaces,
      markers: MyPlaces
    });
  }
  componentDidMount() {
<<<<<<< HEAD
    this.initializeMaps();
  }
  
  /* *************** CREATE MAP *************** */
||||||| merged common ancestors
    // this.initializeMaps();
  }
  
  /* *************** CREATE MAP *************** */
=======
    ariaAlly.labelIframe();
    }

  /* ********** FILTER PLACES LIST ************ */
>>>>>>> google-maps-react
  /* ------------------------------------------ */
<<<<<<< HEAD
  initializeMaps = () => {
    const map = new window.google.maps.Map(document.getElementById('map'), {
      center: this.state.center,
      zoom: this.state.zoom,
      mapTypeId: this.state.maptype,
      styles: MapCustom,
      mapTypeControl: false,
      clickableIcons: false
    });
    
    map.addListener('zoom_changed', () => {
||||||| merged common ancestors
  initializeMaps = () => {
    const map = new window.google.maps.Map(document.getElementById('map'), {
      center: this.state.center,
      zoom: this.state.zoom,
      mapTypeId: this.state.maptype,
      
      mapTypeControl: false,
      clickableIcons: false
    });
    
    map.addListener('zoom_changed', () => {
=======
  filterPlaces = (type) => {
    if (type === 'All') {
      this.setState({
        markers: this.state.myPlaces
      });
    } else {
>>>>>>> google-maps-react
      this.setState({
        markers: this.state.myPlaces.filter(place => place.type === type)
      });
    }
    this.setState({
      selectedPlace: null,
      placeType: type,
      zoom: 15,
      center: this.state.defaultCenter
    });
  }

  /* *********** SELECT A PLACE *************** */
  /* ------------------------------------------ */
  selectPlace = (place) => {
    setTimeout(() => {
      zomatoAPI.getZomato(place.title);
      this.setState({
        zoom: 15,
        selectedPlace: place,
        center: {
          lat: place.location.lat,
          lng: place.location.lng
        }
      })
    }, 100)
  }

  /* *********** CLOSE WINDOWS **************** */
  /* ------------------------------------------ */
  closeWindows = () => this.state.selectedPlace ? this.setState({
    selectedPlace: null
  }) : null;

  render() {
    return (
    <div className="app">
      <Header />
      <Sidebar
        placeType={this.state.placeType}
        zoom={this.state.zoom}
        markers={this.state.markers}
        filterPlaces={this.filterPlaces}
        selectPlace={this.selectPlace}
      />
<<<<<<< HEAD
      {/* MAP */}
      <div className='map' id='map' />
||||||| merged common ancestors
      {/* MAP */}
      <div className='map' id='map'>
      <GoogleMapReact
          bootstrapURLKeys={{ key: `AIzaSyCRFtX0yCoxc-RXXU5u2jGUkaQI2zM1bJk` }}
          center={this.state.center}
          zoom={this.state.zoom}
          options={{
            styles: MapCustom
          }}
        >
          
        </GoogleMapReact>
      </div>
=======
      {/********************** MAP ***********************/}
      <div className='map'>
      <GoogleMapReact
          bootstrapURLKeys={{ key: `AIzaSyCRFtX0yCoxc-RXXU5u2jGUkaQI2zM1bJk` }}
          center={this.state.center}
          zoom={this.state.zoom}
          options={{
            styles: MapCustom,
            clickableIcons: false
          }}
          onClick={this.closeWindows}
        >
        {/****************** MARKERS ********************/}
        {this.state.markers.map(marker =>
            <Marker
            key={marker.id}
            lat={marker.location.lat}
            lng={marker.location.lng} 
            marker={marker}
            selectPlace={this.selectPlace}
            selectedMarker={marker === this.state.selectedPlace}
            />
        )}
        {/****************** INFO-WIN *******************/}
        {this.state.markers.map(infoWin =>
            infoWin === this.state.selectedPlace && 
            <InfoWindow 
            key={infoWin.id}
            lat={infoWin.location.lat}
            lng={infoWin.location.lng} 
              place={infoWin}
            />
        )}
        </GoogleMapReact> {/* END OF MAP COMPONENT */}
      </div>

        <Footer />
>>>>>>> google-maps-react
    </div>
    );
  }
};