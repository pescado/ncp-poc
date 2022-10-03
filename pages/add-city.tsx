import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import useSWR from 'swr';

import { getCities, addCity } from '../api/api';
import { ApiRoutes } from '../api/apiRoutes';
import { ICity } from '../models/FlightSearchData';
import { capitalizeInput } from '../utils/strings';

const swrOptions = {
  populateCache: false, // default true; unnecessary if optimisticData is used
  revalidate: false, // default true
};

export default function AddCity() {
  const [city, setCity] = useState('');
  const { data, isValidating, mutate } = useSWR(ApiRoutes.CITIES, getCities);

  return (
    <div>
      <Toaster toastOptions={{ position: 'bottom-center' }} />
      <h1>Cities </h1>
      <form onSubmit={(ev) => ev.preventDefault()}>
        <input value={city} onChange={(e) => setCity(e.target.value)} autoFocus />
        <button
          type="submit"
          onClick={async () => {
            setCity('');

            const newCity = {
              id: Date.now(),
              name: capitalizeInput(city),
            };

            try {
              await mutate(addCity(newCity), { ...swrOptions, optimisticData: [...(data as ICity[]), newCity] });
              toast.success('Successfully added the new city.');
            } catch (e) {
              console.log(e);
              // If the API errors, the original data will be
              // rolled back by SWR automatically.
              toast.error('Failed to add the new city.');
            }
          }}
        >
          Add
        </button>
      </form>
      <div hidden={!isValidating}>Loading...</div>
      <ul hidden={isValidating}>
        {data
          ? data.map((city) => {
              return <li key={city.id}>{city.name}</li>;
            })
          : null}
      </ul>
    </div>
  );
}
