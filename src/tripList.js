import React from 'react'

const tripList = ({tripList})=>{

  const listStyle={
    maxHeight:window.innerHeight-
    document.getElementsByTagName("header")[0].offsetHeight -
    document.getElementsByTagName("h1")[0].offsetHeight
  }

  return (
    <div className="sideBar">
    <h1>Taxi Pickup Times</h1>
  <ol style={listStyle}>
    {tripList.map((trip) => {
      return (
        <li key={tripList.indexOf(trip)}>
          <a href={`#${trip.pickup_datetime}`}>
            {new Date(Date.parse(trip.pickup_datetime)).toLocaleString("en")}
          </a>
        </li>
      );
    })}
  </ol>
  </div>
  )
}

export default tripList
