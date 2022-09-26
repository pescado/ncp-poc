import { useState } from "react";
import InputAutocomplete from "../components/inputAutocomplete";
import { FlightSelectData } from "../models/FlightSelectData";
import styles from "../styles/flight-search.module.scss";



export default function FlightSearch(props: { flightSelectData: FlightSelectData}) {

  const [fromFlightSelect, setFromFlightSelect] = useState("");
  const [toFlightSelect, setToFlightSelect] = useState("");

  const submitFromFlightSearch = (value: string) => {
    setFromFlightSelect(value)
  }
  const submitToFlightSearch = (value: string) => {
    setToFlightSelect(value);
  }
  const submitFlightSearch = () => {
    alert('Submitting from location: ' + fromFlightSelect + '. Submitting to location: ' + toFlightSelect);
  }
  return (
    <>
    <div className={styles.flexContainer}>
      <div>
        <InputAutocomplete suggestions={props.flightSelectData.data.states.map((state) => state.name)} placeholder="From" onClickFlightReference={submitFromFlightSearch}></InputAutocomplete>
      </div>
      <div>
        <InputAutocomplete suggestions={props.flightSelectData.data.states.map((state) => state.name)} placeholder="To" onClickFlightReference={submitToFlightSearch}></InputAutocomplete>
      </div>
      <div>
        <button onClick={submitFlightSearch} disabled ={fromFlightSelect && toFlightSelect ? false : true }>Submit</button>
      </div>
    </div>
    </>
  )
}