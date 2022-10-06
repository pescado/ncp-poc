import Head from 'next/head';
import FlightSearch from './flight-search';
import styles from '../styles/index.module.scss';
import Link from 'next/link';
import cn from 'classnames';

export const siteTitle = 'Low Fares Done Right | Frontier Airlines';

export default function Home() {
  return (
    <div className={cn('flex-column', 'flex-center', styles.container)}>
      <Head>
        <title>{siteTitle}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Frontier Airlines book flights" />
        <meta name="og:title" content={siteTitle} />
      </Head>
      <FlightSearch></FlightSearch>
      <Link href="./add-city">Add Cities</Link>
    </div>
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals(console.log);
