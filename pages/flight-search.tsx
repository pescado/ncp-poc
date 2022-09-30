import { useRouter } from 'next/router';
import InputAutocomplete from '../components/inputAutocomplete';
import styles from '../styles/flight-search.module.scss';
import { useState } from 'react';
import useSWR, { useSWRConfig } from 'swr';
import { getCities } from '../api/city';
import { ApiRoutes } from '../api/apiRoutes';

export default function FlightSearch() {
  const router = useRouter();

  const [fromFlightSearch, setFromFlightSearch] = useState('');
  const [toFlightSearch, setToFlightSearch] = useState('');
  // const [loading, setLoading] = useState(true);
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

  const { cache } = useSWRConfig();
  const { data, error, isValidating } = useSWR(ApiRoutes.CITIES, getCities, {
    revalidateOnMount: !cache.get(ApiRoutes.CITIES),
  });

  // const { data, error, isValidating } = useSWR(ApiRoutes.CITIES, getCities, { revalidateOnMount: true });

  return (
    <div className={styles.container}>
      <h2 className={styles.header}>Search Flights</h2>
      <div className={styles.panel}>
        <div className={styles.searchInputs}>
          <InputAutocomplete
            suggestions={data}
            placeholder="From"
            onClickFlightReference={submitFromFlightSearch}
            loading={isValidating}
          ></InputAutocomplete>
          <InputAutocomplete
            suggestions={data}
            placeholder="To"
            onClickFlightReference={submitToFlightSearch}
            loading={isValidating}
          ></InputAutocomplete>
        </div>
        {/* <div hidden={data && !error}>Loading...</div>
        <ul hidden={!data && !error}>
          {data
            ? data.map((city) => {
                return <li key={city.id}>{city.name}</li>;
              })
            : null}
        </ul> */}
        <div className={styles.searchButtonContainer}>
          <button onClick={submitFlightSearch} disabled={fromFlightSearch && toFlightSearch ? false : true}>
            Search
          </button>
        </div>
      </div>
    </div>
  );
}
