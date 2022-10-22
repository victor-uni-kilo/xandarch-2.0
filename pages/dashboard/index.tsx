import type { NextPage } from "next";

import styles from "@styles/Page.module.scss";

const Dashboard: NextPage = () => {
  return (
    <div className={styles.pageWrapper}>
      <h1 className={styles.color}>Hello from Dashboard</h1>
    </div>
  );
};

export default Dashboard;
