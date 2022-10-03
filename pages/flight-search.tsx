import { useRouter } from 'next/router';
import InputAutocomplete from '../components/inputAutocomplete';
import styles from '../styles/flight-search.module.scss';
import { useState } from 'react';
import useSWR, { useSWRConfig } from 'swr';
import { getCities } from '../api/api';
import { ApiRoutes } from '../api/apiRoutes';
import cn from 'classnames';

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
      <div className={cn('flex-column', 'flex-space-between', styles.panel)}>
        <div className="flex">
          <InputAutocomplete
            suggestions={data}
            placeholder="From"
            onClickFlightReference={submitFromFlightSearch}
            loading={isValidating}
            inputClasses={['input-top', 'input-left']}
          ></InputAutocomplete>
          <InputAutocomplete
            suggestions={data}
            placeholder="To"
            onClickFlightReference={submitToFlightSearch}
            loading={isValidating}
            inputClasses={['input-top']}
          ></InputAutocomplete>
        </div>
        <div className="flex flex-align-end">
          <button
            className="f9-btn-primary btn-right btn-bottom"
            onClick={submitFlightSearch}
            disabled={fromFlightSearch && toFlightSearch ? false : true}
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
}
