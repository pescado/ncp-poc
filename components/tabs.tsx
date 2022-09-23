import React, { FC } from 'react';
import styles from './tabs.module.scss';

type TabsProps = {
  tabs: {
    name: string;
    index: number;
    Panel: FC<{ index: number }>;
  }[];
  selectedTabIndex: number;
  onClick: (index: number) => void;
};

export default function Tabs({ tabs = [], selectedTabIndex = 0, onClick }: TabsProps) {
  const selectedTab = tabs && tabs.find((tab) => tab.index === selectedTabIndex);

  return (
    <div>
      <div className={styles.nav}>
        {tabs.map((tab) => {
          const activeClass = selectedTabIndex === tab.index ? styles.active : '';
          return (
            <a className={activeClass} key={tab.index} onClick={() => onClick(tab.index)}>
              <span>{tab.name}</span>
            </a>
          );
        })}
      </div>
      <div className={styles.tabPanel} id={`tabpanel-${selectedTabIndex}`}>
        {selectedTab && <selectedTab.Panel index={selectedTabIndex} />}
      </div>
    </div>
  );
}
