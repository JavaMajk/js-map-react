import React from 'react'

const Sidebar = (props) => {
    return (
      <div className='sidebar'>
            <div className='places-heading'><h2>Places</h2></div>
            <div className="cusine-select">
              <select value={props.placeType} aria-label="Filter by category" onChange={event => props.filterPlaces(event.target.value)}>
              <option value="blank" disabled>Filter by cusine..</option>
              <option value="All">All</option>
              <option value="Cafe">Cafe</option>
              <option value="Dining">Dining</option>
              <option value="Regional">Regional</option>
              </select>
            </div>
            <ul className='places-list' id='list'>
              {props.markers.map(place => 
              <li key={place.id} onClick={() => props.selectPlace(place)}>
                <a className='place'> 
                  {place.title}
                </a>
              </li>)}
            </ul>
        </div>
    )
  }

  export default Sidebar;
