import type { NextPage } from "next";
import { useRouter } from "next/router";
import { LOCALE } from "types";

import styles from "@styles/Page.module.scss";

const About: NextPage = () => {
  const router = useRouter();
  const greeting = router.locale === LOCALE.sr ? "Zdravo brate!" : "Hello World";

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.intentionalyHigh}>
        <h1>Hello from Home=About</h1>
        <h2>H2 TAG Do I need it like this?</h2>
        <h3>H3 TAG Do I need it like this?</h3>
        <h4>H4 TAG Do I need it like this?</h4>
        <h5>H5 TAG Do I need it like this?</h5>
        <h6>H6 TAG Do I need it like this?</h6>
      </div>
    </div>
  );
};

export default About;
