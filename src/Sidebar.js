import React, { Component } from 'react'
import './App.css'

export default class Sidebar extends Component {
  render() {
    return (
      <div className='sidebar'>
            <div className='places-heading'><h2>Places</h2></div>
            <div className="cusine-select">
              <select value={this.props.placeType} onChange={event => this.props.filterPlaces(event.target.value)}>
              <option value="blank" disabled>Filter by cusine..</option>
              <option value="All">All</option>
              <option value="Cafe">Cafe</option>
              <option value="Dining">Dining</option>
              <option value="Regional">Regional</option>
              </select>
            </div>
            <ul className='places-list' id='list'>
              {this.props.markers.map(place => 
              <li key={place.id} onClick={() => this.props.selectPlace(place)}>
                <a className='place'> 
                  {place.title}
                </a>
              </li>)}
            </ul>
            <div className='sidebar-info'>
            <p>MAP ZOOM: {this.props.zoom}</p>
            </div>
        </div>
    )
  }
}
