import Link from "next/link";
import React, { FC, useState } from "react";
import { IPagesMap } from "../../types/index";
import cx from "classnames";

import styles from "./Navbar.module.scss";

interface INavbarProps {
  PAGE_LINKS: IPagesMap[];
  currentRoute: string;
}

const Navbar: FC<INavbarProps> = ({ PAGE_LINKS, currentRoute }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleActiveClass = { [styles.active]: isOpen };
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className={styles.navbar}>
      <div className={styles.accesibilityWidget}>Access</div>

      <div className={styles.navContainer}>
        <div className={styles.logo}>Logotype</div>
        <div className={styles.navList}>
          <ul>
            {PAGE_LINKS.map((link, index) => (
              <li key={`${link.text}-${index}`}>
                {/* custom link had locale={router.locale} dunno why */}
                <Link href={link.href} className={styles.listItem}>
                  <a
                    className={cx({
                      [styles.activeLink]: currentRoute === link.href,
                    })}
                  >
                    {link.text}
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={styles.navMenu}>
        <button className={cx(styles.hamburger, toggleActiveClass)} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
