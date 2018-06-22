import React, { Component, Fragment } from 'react'
import MyPlaces from './MyPlaces.json'
import './App.css'
import MapCustom from './MapCustom'
import GoogleMapReact from 'google-map-react'
import * as zomatoAPI from './ZomatoAPI'
import Marker from './Marker'
import InfoWindow from './InfoWindow'
import Header from './Header'
import Sidebar from './Sidebar'

export default class App extends Component {

  state = {
    zoom: 15,
    maptype: 'roadmap',
    center: {
      lat: 53.13248859999999,
      lng: 23.168840300000056
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
  }

  centerMap = () => {
    console.log('Center!');
    this.setState({
      center: {
        lat: 53.12998859999999,
        lng: 23.156140300000056
      }
    });
  }
  
  /* *************** CREATE MAP *************** */
  /* ------------------------------------------ */
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
      this.setState({
        zoom: map.getZoom(),
      });
    });

    this.populateMarkers(map);
  }

  /* ************ CREATE MARKERS ************** */
  /* ------------------------------------------ */
  populateMarkers = (map) => {
    // const map = map;
    let bounds = new window.google.maps.LatLngBounds();
    let infoWindow, 
        marker;
    //Map over markers data to create markers 
    this.state.markers.forEach((mark, i) => {
      //Extend bounds to marker on map in view.
      bounds.extend(mark.location);
      marker = new window.google.maps.Marker({
        map: map,
        position: mark.location,
        title: mark.title,
        animation: window.google.maps.Animation.DROP,
        icon: 'https://image.ibb.co/h3WHsy/map_marker_hi.png'
      });
      //Create new InfoWindow for each marker.
      infoWindow = new window.google.maps.InfoWindow();
      //Use an IIFE to close over the marker and link it with the list
      //of places using the APIs DOMListener to trigger a click.
      (marker => {
        window.google.maps.event.addDomListener(document.getElementById('list').childNodes[i], 'click', () => {
          window.google.maps.event.trigger(marker, 'click', {});
        });
      })(marker);
      //Set the action to return when marker 'click' event occurs.
      marker.addListener('click', (marker => {
        return () => {
          map.fitBounds(bounds);
          zomatoAPI.getZomato(marker.title);
          infoWindow.setContent(`<h2>${mark.title}</h2>
          <p id='info-win'>Loading ZOMATO Info...<p>`);
          setTimeout(() => {
            infoWindow.open(map, marker);
          }, 500);
          
        }
      })(marker));

    });

    //Adjust map bounds after 0.5s.
    setTimeout(() => map.fitBounds(bounds), 500);
    //Add listener to Map to close info when clicking on Map.
    map.addListener('click', () => {
      infoWindow.close();
    });
    map.addListener('zoom_changed', () => {
      infoWindow.close();
    });
  }

  /* ********** FILTER PLACES LIST ************ */
  /* ------------------------------------------ */
  filterPlaces = (type, reInitializeMaps) => {
    if(type === 'All') {
      this.setState({
        markers: this.state.myPlaces
      }, () => {reInitializeMaps();});
    } 
    else { 
      this.setState({
        markers: this.state.myPlaces.filter(place => place.type === type)
      }, () => {reInitializeMaps();});
    }
    this.setState({placeType: type});
  }

  selectPlace = (place) => {
    console.log(place);
    this.setState(
      {
        selectedPlace: place,
        center: {
          lat: place.location.lat,
          lng: place.location.lng
        }
      }
    )
  }

  render() {
    return (
    <div className="app">
      <Header />
      <Sidebar
        placeType={this.state.placeType}
        zoom={this.state.zoom}
        markers={this.state.markers}
        filterPlaces={this.filterPlaces}
        initializeMaps={this.initializeMaps}
        populateMarkers={this.populateMarkers}
      />
      {/* MAP */}
      <div className='map' id='map'>
      <GoogleMapReact
          bootstrapURLKeys={{ key: `AIzaSyCRFtX0yCoxc-RXXU5u2jGUkaQI2zM1bJk` }}
          center={this.state.center}
          zoom={this.state.zoom}
          options={{
            styles: MapCustom,
            clickableIcons: false
          }}
        >
        {this.state.markers.map(marker =>
        <Fragment
        key={marker.id}
          lat={marker.location.lat}
          lng={marker.location.lng}> 
          <Marker
          draggable={true}
          title={marker.title}
          key={marker.id}
          lat={marker.location.lat}
          lng={marker.location.lng}
          selectPlace={this.selectPlace}
          marker={marker}
          />
          <InfoWindow />
          </Fragment>
        )}
        </GoogleMapReact>
        <div> <a onClick={this.centerMap}>Center</a> </div>
      </div>
    </div>
    );
  }
};