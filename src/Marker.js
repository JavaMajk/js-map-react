import React from 'react'

const Marker = (props) => {

    let markerClass = 'marker drop';
    props.selectedMarker ? markerClass += ' bounce' : markerClass = 'marker';

    return (
      <div className={markerClass} onClick={() => props.selectPlace(props.marker)}></div>
    )
}

export default Marker;