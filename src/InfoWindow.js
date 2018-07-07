import React from 'react'

const InfoWindow = (props) => {
    return (
      <div className='infoWindow'>
        <h2>{props.place.title}</h2>
        <p id='info-win'>Loading ZOMATO data...</p>
      </div>
    )
  }

  export default InfoWindow;
