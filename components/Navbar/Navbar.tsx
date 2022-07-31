import Link from 'next/link';
import React, { FC } from 'react';
import { PAGE_LINK } from '../../types/index';

import styles from './Navbar.module.scss';

interface INavbarProps {
  PAGE_LINKS: PAGE_LINK[];
}

const Navbar: FC<INavbarProps> = ({ PAGE_LINKS }) => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logoContainer}>
        Logotype
      </div>
      <div className={styles.navContainer}>
        <ul>
          {PAGE_LINKS.map((link, index) => (
              <li key={'nav-link' + index}>
                {/* custom link had locale={router.locale} dunno why */}
                <Link href={link.url} className={styles.listItem}>
                  <a>{link.text}</a>
                </Link>
              </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

