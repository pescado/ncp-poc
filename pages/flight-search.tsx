import { useRouter } from 'next/router';
import InputAutocomplete from '../components/inputAutocomplete';
import styles from '../styles/flight-search.module.scss';
import { useEffect, useState } from 'react';
import { FlightSelectData } from '../models/FlightSelectData';
import useSWR from 'swr';

export default function FlightSearch() {
  const router = useRouter();

  const [fromFlightSearch, setFromFlightSearch] = useState('');
  const [toFlightSearch, setToFlightSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [states, setStates] = useState([] as string[]);

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

  // const states = props.flightSelectData.data.states.map((state) => state.name);

  const fetcher = (url: URL, payload?: string) => {
    const options = {
      method: payload ? 'POST' : 'GET',
      ...(payload && { body: payload }),
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };

    return fetch(url, options).then((res) => res.json());
  };

  const bodyContent = { country: 'United States' };

  const { data, error } = useSWR<FlightSelectData>(
    ['https://countriesnow.space/api/v0.1/countries/states', JSON.stringify(bodyContent)],
    fetcher,
  );

  useEffect(() => {
    if (data) {
      setTimeout(() => {
        setLoading(!data && !error);
        const statesData = (data as FlightSelectData).data.states.map((state: { name: string }) => state.name);
        setStates(statesData);
      }, 2000);
    }
  }, [data, error]);

  return (
    <>
      <h2>Search Flights</h2>
      <div className={styles.container}>
        <div className={styles.searchInputs}>
          <InputAutocomplete
            suggestions={states}
            placeholder="From"
            onClickFlightReference={submitFromFlightSearch}
            loading={loading}
          ></InputAutocomplete>
          <InputAutocomplete
            suggestions={states}
            placeholder="To"
            onClickFlightReference={submitToFlightSearch}
            loading={loading}
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
