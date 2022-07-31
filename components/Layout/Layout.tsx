import React, { FC, ReactNode } from "react";
import { useRouter } from "next/router";

import GridLines from "../GridLines/GridLines";
import { PAGE_LINKS } from "../../constants/maps";
import Head from "next/head";

import styles from "./Layout.module.scss";
import Navbar from "../Navbar/Navbar";

interface ILayoutProps {
  children: ReactNode;
}

const Layout: FC<ILayoutProps> = ({ children }) => {
  const router = useRouter();
  const currentRoute = router.pathname;

  const getPageTitle = () => {
    let pageTitle;
    PAGE_LINKS.find(pageProps => {
      if (pageProps.href === currentRoute) {
        pageTitle = pageProps.text;
      }
    });
    return pageTitle;
  };

  return (
    <>
      <Head>
        <title>{`XANDarch | ${getPageTitle()}`}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.wrapper}>
        <Navbar PAGE_LINKS={PAGE_LINKS} currentRoute={currentRoute} />
        <main>{children}</main>
        <GridLines />
      </div>
    </>
  );
};

export default Layout;
