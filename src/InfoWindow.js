import React, { Component } from 'react'

export default class InfoWindow extends Component {
  render() {
    let windowClass = 'infoWindow';
    if (this.props.selectedPlace) {
      windowClass += ' selected';
    }
    return (
      <div className={windowClass}>
        
      </div>
    )
  }
}
