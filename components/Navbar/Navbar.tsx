import Link from "next/link";
import cx from "classnames";
import React, { FC, useState } from "react";
import { siteAreaEnum, SITE_AREA } from "../../types/index";

import Logotype from "../../public/images/xa_logo.svg";

import styles from "./Navbar.module.scss";
import SvgComponent from "@components/SvgComponent/SvgComponent";
import LocaleSwitch from "./LocaleSwitch/LocaleSwitch";
import { DASHBOARD_LINKS, PAGE_LINKS } from "@constants/maps";

interface INavbarProps {
  currentRoute: string;
  siteArea: siteAreaEnum;
}

const Navbar: FC<INavbarProps> = ({ currentRoute, siteArea }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleActiveClass = { [styles.active]: isOpen };
  const toggleMenu = () => setIsOpen(!isOpen);

  const pageLinks = siteArea === SITE_AREA.presentation ? PAGE_LINKS : DASHBOARD_LINKS;

  return (
    <nav className={styles.navbar}>
      <div className={styles.accesibilityWidget}>Access</div>

      <div className={styles.navContainer}>
        <SvgComponent svg={Logotype} alt={"Home link"} className={styles.logotype} />

        <div className={styles.navList}>
          <ul>
            {pageLinks.map((link, index) => (
              <li key={`${link.text}-${index}`}>
                <Link href={link.href} className={styles.listItem}>
                  <a
                    className={cx({
                      [styles.activeLink]: currentRoute === link.href,
                    })}
                  >
                    {link.text.en}
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        {siteArea === SITE_AREA.presentation && <LocaleSwitch />}
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
