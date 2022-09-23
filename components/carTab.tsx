import React, { FC } from 'react';
import styles from './tabs.module.scss';

const CarTab: FC<{}> = () => {
  return (
    <>
      <div className={styles.item}>
        <h2>Car</h2>
      </div>
    </>
  );
};
export default CarTab;
