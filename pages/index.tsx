import type { NextPage } from "next";
import { useRouter } from "next/router";
import { LOCALE } from "types";

// import styles from "../styles/About.module.css";

const About: NextPage = () => {
  const router = useRouter();
  const greeting = router.locale === LOCALE.sr ? "Zdravo brate!" : "Hello World";

  return (
    <>
      <h1>Hello from Home=About</h1>
    </>
  );
};

export default About;
