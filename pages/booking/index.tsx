import styles from './booking.module.scss';
import React, { useState } from 'react';
import Tabs from '../../components/tabs';
import FlightTab from '../../components/flightTab';
import HotelTab from '../../components/hotelTab';
import CarTab from '../../components/carTab';

type TabsType = {
  name: string;
  index: number;
  Panel: React.FC<{}>;
}[];

// Tabs Array
const tabs: TabsType = [
  {
    name: 'Flight',
    index: 1,
    Panel: FlightTab,
  },
  {
    name: 'Hotel',
    index: 2,
    Panel: HotelTab,
  },
  {
    name: 'Car',
    index: 3,
    Panel: CarTab,
  },
];

export default function Booking() {
  const [selectedTabIndex, setSelectedTab] = useState<number>(tabs[0].index);

  return (
    <div className={styles.container}>
      <div className={styles.booking}>
        <Tabs selectedTabIndex={selectedTabIndex} onClick={setSelectedTab} tabs={tabs} />
      </div>
    </div>
  );
}
