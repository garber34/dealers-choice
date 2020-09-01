import React from "react";
import mapboxgl, {Marker} from "mapbox-gl";
mapboxgl.accessToken =
  "pk.eyJ1IjoiZ2FyYmVyMzQiLCJhIjoiY2tkd2FhNXRzMnI0eTJ5cXEyazdnc3pkcSJ9.HW8KtwbuLPe8Gz5jQ_8urg";


class tripDetails extends React.Component {
  constructor({ trip }) {
    super();

    const buildState={};
    for (const key in trip) {
      buildState[key] = trip[key];
    }
    this.state=buildState

  }

  componentDidMount() {

    const buildMarker = (coords) => {
      const image =
        coords.type === "pickup"
          ? "url(https://www.shareicon.net/data/32x32/2015/07/09/66792_ball_256x256.png)"
          : "url(https://www.shareicon.net/data/32x32/2015/07/09/66794_pink_256x256.png)";

      const markerEl = document.createElement("div");
      markerEl.setAttribute("data-coords", coords.coords);
      markerEl.style.backgroundSize = "contain";
      markerEl.style.width = "32px";
      markerEl.style.height = "32px";
      markerEl.style.backgroundImage = image;
      return new Marker(markerEl).setLngLat(coords.coords);
    };

    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-73.9857825, 40.7579529],
      zoom: 10,
    });

    const pudoCoords = [
      { type: "pickup", coords: [this.state.pickup_longitude, this.state.pickup_latitude] },
      {
        type: "dropoff",
        coords: [this.state.dropoff_longitude, this.state.dropoff_latitude],
      },
    ];

    pudoCoords.forEach((coords) => {
      const marker = buildMarker(coords);
      marker.addTo(map);
    });


    let west, south, east, north
    if(pudoCoords[0].coords[0]>pudoCoords[1].coords[0]){
      east=pudoCoords[0].coords[0];
      west=pudoCoords[1].coords[0];
    } else{
      west=pudoCoords[0].coords[0];
      east=pudoCoords[1].coords[0];
    }

    if(pudoCoords[0].coords[1]>pudoCoords[1].coords[1]){

      north=pudoCoords[0].coords[1];
      south = pudoCoords[1].coords[1];
    } else {
      south=pudoCoords[0].coords[1];
      north = pudoCoords[1].coords[1];
    }

    map.fitBounds([west,south,east,north],{padding:50})
  }

  formatCurrency(input) {
    const number = input * 1;
    return number.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  }
  render() {

   const {passenger_count,
trip_distance,
pickup_longitude,
pickup_latitude,
RateCodeID,
store_and_fwd_flag,
dropoff_longitude,
dropoff_latitude,
fare_amount,
extra,
mta_tax,
tip_amount,
tolls_amount,
total_amount,
vendor_id,
pickup_datetime,
dropoff_datetime,
rate_code,
payment_type,
imp_surcharge} = this.state

    return (
      <div className="flex">
        <div>
          <a href="#"><button>Clear Trip</button></a>
          <h1>Trip Summary</h1>
          <p>
            Pickup Time:{" "}
            {new Date(Date.parse(pickup_datetime)).toLocaleString("en")}
          </p>
          <p>
            Dropoff Time:{" "}
            {new Date(Date.parse(dropoff_datetime)).toLocaleString("en")}
          </p>
          <p>Total Distance: {trip_distance} miles </p>
          <p>Number of Passengers: {passenger_count}</p>
          <br></br>
          <strong>Fare</strong>
          <p>Base Amount: {this.formatCurrency(fare_amount)}</p>
          <p>Surcharges: {this.formatCurrency(extra)}</p>
          <p>Tolls: {this.formatCurrency(tolls_amount)}</p>
          <p>
            Taxes:{" "}
            {this.formatCurrency(((imp_surcharge||0) * 1) + (mta_tax * 1))}
          </p>
          <p>Tip: {this.formatCurrency(tip_amount)}</p>
          <strong>Total: {this.formatCurrency(total_amount)}</strong>
          <br></br>
          <br></br>
          <p>
            Paid with:{" "}
            {payment_type === "1"
              ? "credit card"
              : payment_type === "2"
              ? "cash"
              : "unknown"}
          </p>
        </div>
        <div ref={(el) => (this.mapContainer = el)} className="mapContainer" />
      </div>
    );
  }
}

export default tripDetails;
