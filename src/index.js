import React from "react";
import reactDOM from "react-dom";
import axios from "axios";
import TripList from './tripList'
import TripDetails from './tripDetails'


class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      tripList: [],
      selectedTrip:null
    };

  }

  async selectTrip(){
    const time =window.location.hash.slice(1);
    if(!!time) {
    const trip = await axios.get(`api/trips/${time}`)

    /*setting selectedTrip to null before passing it the new trip allows
    the conditional render logic to trigger, otherwise clicking on a new trip
    before unmounting the trip details has no effect*/

    this.setState({selectedTrip:null})
    this.setState({
      selectedTrip:trip.data
    })
  } else this.setState({selectedTrip:null})


  }

  async componentDidMount() {
    //data is stale, so if data is already loaded there is no need to not query again
    if(this.state.tripList.length===0){
    const trips = await axios.get("api/trips");
    this.setState({
      tripList: trips.data,
    });
  }

   this.selectTrip();



    window.addEventListener('hashchange', ()=>{

      this.selectTrip();
    })


  }

  render() {
    const display = !!this.state.selectedTrip ? <TripDetails trip={this.state.selectedTrip}/>:null

    return (
      <div className="flex">
        <TripList tripList={this.state.tripList}/>
        {display}
      </div>
    );
  }
}

reactDOM.render(<Main />, document.getElementById("main"));
