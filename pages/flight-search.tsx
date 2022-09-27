import { useRouter } from 'next/router';
import InputAutocomplete from '../components/inputAutocomplete';
import styles from '../styles/flight-search.module.scss';
import Link from 'next/link';
import { useState } from 'react';
import { FlightSelectData } from '../models/FlightSelectData';

export default function FlightSearch() {
  const router = useRouter();

  const [fromFlightSelect, setFromFlightSelect] = useState('');
  const [toFlightSelect, setToFlightSelect] = useState('');

  const submitFromFlightSearch = (value: string) => {
    setFromFlightSelect(value);
  };
  const submitToFlightSearch = (value: string) => {
    setToFlightSelect(value);
  };
  const submitFlightSearch = () => {
    alert('Submitting from location: ' + fromFlightSelect + '. Submitting to location: ' + toFlightSelect);
    router.push('/flight-select');
  };
  return (
    <>
      <h2>Search Flights</h2>
      <div className={styles.container}>
        <div className={styles.searchInputs}>
          <InputAutocomplete
            suggestions={props.flightSelectData.data.states.map((state) => state.name)}
            placeholder="From"
            onClickFlightReference={submitFromFlightSearch}
          ></InputAutocomplete>
          <InputAutocomplete
            suggestions={props.flightSelectData.data.states.map((state) => state.name)}
            placeholder="To"
            onClickFlightReference={submitToFlightSearch}
          ></InputAutocomplete>
        </div>
        <div className={styles.searchButtonContainer}>
          <button onClick={submitFlightSearch} disabled={fromFlightSelect && toFlightSelect ? false : true}>
            Search
          </button>
        </div>
      </div>
    </>
  );
}
