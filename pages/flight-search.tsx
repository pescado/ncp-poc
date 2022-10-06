import { useRouter } from 'next/router';
import InputAutocomplete from '../components/inputAutocomplete';
import styles from './flight-search.module.scss';
import useSWR, { useSWRConfig } from 'swr';
import { getCities } from '../api/api';
import { ApiRoutes } from '../api/apiRoutes';
import cn from 'classnames';
import { atom, useAtom } from 'jotai';

const departure = atom('');
const arrival = atom('');

export default function FlightSearch() {
  const router = useRouter();

  const [fromFlightSearch, setFromFlightSearch] = useAtom(departure);
  const [toFlightSearch, setToFlightSearch] = useAtom(arrival);

  // const writeOnlyFromFlightSearch = atom(null, (get, set, update: string) => {
  //   set(departure, update);
  // });

  // const writeOnlyToFlightSearch = atom(null, (get, set, update: string) => {
  //   set(arrival, update);
  // });

  // const [, setFromFlightSearch] = useAtom(writeOnlyFromFlightSearch);
  // const [, setToFlightSearch] = useAtom(writeOnlyToFlightSearch);

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
  const { data, isValidating } = useSWR(ApiRoutes.CITIES, getCities, {
    revalidateOnMount: !cache.get(ApiRoutes.CITIES),
  });

  // const { data, error, isValidating } = useSWR(ApiRoutes.CITIES, getCities, { revalidateOnMount: true });

  const test = true;

  return (
    <div className={styles.container}>
      <h3 className={styles.header}>Search Flights</h3>
      {/* <div className={cn('flex-column', 'flex-space-between', test && styles.panel)}> */}
      <div className={cn('flex-column', 'flex-space-between', { [styles.panel]: test })}>
        {/* <div className={`flex-column flex-space-between ${test ? styles.panel : null}`}> */}
        <div className="flex">
          <InputAutocomplete
            suggestions={data}
            placeholder="From"
            onClickFlightReference={submitFromFlightSearch}
            loading={isValidating}
            inputClasses={['input--top', 'input--left']}
          ></InputAutocomplete>
          <InputAutocomplete
            suggestions={data}
            placeholder="To"
            onClickFlightReference={submitToFlightSearch}
            loading={isValidating}
            inputClasses={['input--top']}
          ></InputAutocomplete>
        </div>
        <div className="flex flex-align-end">
          <button
            className={`btn--right btn--bottom`}
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
