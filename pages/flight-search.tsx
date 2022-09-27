import { useRouter } from 'next/router';
import InputAutocomplete from '../components/inputAutocomplete';
import styles from '../styles/flight-search.module.scss';

export default function FlightSearch() {
  const router = useRouter();
  const suggestions: string[] = ['Bananas', 'Apples', 'Mangos'];

  return (
    <>
      <h2>Search Flights</h2>
      <div className={styles.container}>
        <div className={styles.searchInputs}>
          <label>From</label>
          <InputAutocomplete suggestions={suggestions} id=""></InputAutocomplete>
          <label>To</label>
          <InputAutocomplete suggestions={suggestions} id=""></InputAutocomplete>
        </div>
        <div className={styles.searchButtonContainer}>
          <button onClick={() => router.push('/flight-select')}>Search</button>
        </div>
      </div>
    </>
  );
}
