import React, { FC } from 'react';
import GridLines from '../GridLines/GridLines';
import { PAGE_LINKS } from '../../constants/maps';


import styles from './Layout.module.scss';
import Navbar from '../Navbar/Navbar';

interface ILayoutProps {
    children: React.ReactNode;
}

const Layout: FC<ILayoutProps> = ({ children }) => {
  return (
    <div className={styles.wrapper}>
      <Navbar PAGE_LINKS={PAGE_LINKS} />
      <main>{children}</main>
      <GridLines />
    </div>
  );
};

export default Layout;
