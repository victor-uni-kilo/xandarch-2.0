import React, { FC } from 'react';

import styles from './GridLines.module.scss';


const GridLines: FC = () => {
  return (
    <div className={styles.gridLines}>
      {/* divs for grid lines (border-right) */}
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default GridLines;
