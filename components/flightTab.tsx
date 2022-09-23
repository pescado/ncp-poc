import React, { FC } from 'react';
import InputAutocomplete from './inputAutocomplete';
import styles from './tabs.module.scss';

const FlightTab: FC<{}> = () => {
  return (
    <>
      <h2>Search Flights</h2>
      <div className={styles.item}>
        <label>From</label>
        <InputAutocomplete suggestions={suggestions} id=""></InputAutocomplete>
      </div>
    </>
  );
};
export default FlightTab;

const suggestions: string[] = ['Bananas', 'Apples', 'Mangos'];
