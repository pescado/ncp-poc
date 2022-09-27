import { useRouter } from 'next/router';
import InputAutocomplete from '../components/inputAutocomplete';
import styles from '../styles/flight-search.module.scss';
import { useState } from 'react';
import { FlightSelectData } from '../models/FlightSelectData';
import useSWR from 'swr';

export default function FlightSearch(props: { flightSelectData: FlightSelectData }) {
  const router = useRouter();

  const [fromFlightSearch, setFromFlightSearch] = useState('');
  const [toFlightSearch, setToFlightSearch] = useState('');

  const submitFromFlightSearch = (value: string) => {
    setFromFlightSearch(value);
  };
  const submitToFlightSearch = (value: string) => {
    setToFlightSearch(value);
  };
  const submitFlightSearch = () => {
    alert('Submitting from location: ' + fromFlightSearch + '. Submitting to location: ' + toFlightSearch);
    router.push('/flight-select');
  };

  const states = props.flightSelectData.data.states.map((state) => state.name);

  return (
    <>
      <h2>Search Flights</h2>
      <div className={styles.container}>
        <div className={styles.searchInputs}>
          <InputAutocomplete
            suggestions={states}
            placeholder="From"
            onClickFlightReference={submitFromFlightSearch}
          ></InputAutocomplete>
          <InputAutocomplete
            suggestions={states}
            placeholder="To"
            onClickFlightReference={submitToFlightSearch}
          ></InputAutocomplete>
        </div>
        <div className={styles.searchButtonContainer}>
          <button onClick={submitFlightSearch} disabled={fromFlightSearch && toFlightSearch ? false : true}>
            Search
          </button>
        </div>
      </div>
    </>
  );
}
