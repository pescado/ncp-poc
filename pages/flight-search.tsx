import { useRouter } from 'next/router';

export default function FlightSearch() {
  const router = useRouter();

  return (
    <>
      <div>Search Flights</div>
      <button onClick={() => router.push('/flight-select')}>Search</button>
    </>
  );
}
