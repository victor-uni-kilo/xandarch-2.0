import type { NextPage } from "next";
import { useRouter } from "next/router";
import { LOCALE } from "types";

import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const router = useRouter();
  const greeting = router.locale === LOCALE.sr ? "Zdravo brate!" : "Hello World";

  return <>{greeting}</>;
};

export default Home;
