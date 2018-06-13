import React, { Component } from 'react';
import MyPlaces from './MyPlaces.json'
import './App.css';
import MapCustom from './MapCustom'

export default class App extends Component {

  state = {
    zoom: 13,
    maptype: 'roadmap',
    center: {
      lat: 53.13248859999999,
      lng: 23.168840300000056
    },
    place_formatted: '',
    place_id: '',
    place_location: '',
    markers: [],
    typeOfPlace: 'all'
  }

  componentWillMount() {
    this.setState({markers: MyPlaces})
  }


  componentDidMount() {
    this.initializeMaps();
  }


  // BREAK !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  
initializeMaps = () => {
  let map = new window.google.maps.Map(document.getElementById('map'), {
    center: {
      lat: 53.13248859999999,
      lng: 23.168840300000056
    },
    zoom: this.state.zoom,
    mapTypeId: this.state.maptype,
    styles: MapCustom,
    mapTypeControl: false
  });

  window.google.maps.event.addListener(map, 'click', function() {
    infowindow.close();
});

    let infowindow = new window.google.maps.InfoWindow(); 
    let bounds = new window.google.maps.LatLngBounds();
    let marker;
  
    this.state.markers.map((mark, i) => {
      bounds.extend(mark.location);
      marker = new window.google.maps.Marker({
        map: map,
        position: mark.location,
        title: mark.title,
        animation: window.google.maps.Animation.DROP
      });
      (function(marker) {
        window.google.maps.event.addDomListener(document.getElementById('list').childNodes[i], 'click', function () {
          map.fitBounds(bounds);
          window.google.maps.event.trigger(marker, 'click', {});
        });
      })(marker);
      marker.addListener('click', (function(marker) {
        return function () {
          infowindow.setContent(`<h3>${mark.title}</h3>
                                  <p>Rating: *****<p>`);
          infowindow.open(map, marker);
        }
      })(marker));
    }
  );

  setTimeout(() => {map.fitBounds(bounds);}, 500);

      map.addListener('zoom_changed', () => {
      this.setState({
        zoom: map.getZoom(),
      });
    });
    
    map.addListener('maptypeid_changed', () => {
      this.setState({
        maptype: map.getMapTypeId(),
      });
    });

    // initialize the autocomplete functionality using the #pac-input input box
    let inputNode = document.getElementById('pac-input');
    map.controls[window.google.maps.ControlPosition.TOP_LEFT].push(inputNode);
    let autoComplete = new window.google.maps.places.Autocomplete(inputNode);
    
    autoComplete.addListener('place_changed', () => {
      let place = autoComplete.getPlace();
      let location = place.geometry.location;
    
      this.setState({
        place_formatted: place.formatted_address,
        place_id: place.place_id,
        place_location: location.toString(),
      });
    });
}

  
  render() {
    return (
      <div className="app">
      
      {/* HEADER */}
        <header className="map-header">
          <h1 className="map-title">Miejsca.</h1>
        </header>
      
      {/* LIST SIDEBAR */}
        <div className='sidebar'>
          <h1>State</h1>
            <p>
              Zoom level: {this.state.zoom}<br />
              Map type: {this.state.maptype}
            </p>
            <p>Place: {this.state.place_formatted}</p>
            <p>Place ID: {this.state.place_id}</p>
            <p>Location: {this.state.place_location}</p>
            <ul className='places-list' id='list'>
              {this.state.markers.map(place => 
              <li key={place.id}>
                <a className='place' onClick={() => console.log('clicked')}> 
                  {place.title}
                </a>
              </li>)}
            </ul>
        </div>

        {/* SEARCH BOX */}
        <div className='pac-container'>
        <input id='pac-input' type='text' placeholder='Enter a location' />
        </div>

        {/* MAP */}
        <div className='map' id='map' />
      </div>
    );
  }
};