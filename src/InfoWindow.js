import React, { Component } from 'react'

export default class InfoWindow extends Component {
  render() {
    let windowClass = 'infoWindow';
    if (this.props.selectedPlace) {
      windowClass += ' selected';
    }
    return (
      <div className='infoWindow'>
        <h2>{this.props.place.title}</h2>
        <p id='info-win'>Loading ZOMATO data.</p>
      </div>
    )
  }
}
