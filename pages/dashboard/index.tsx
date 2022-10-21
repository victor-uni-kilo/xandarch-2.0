import type { NextPage } from "next";

import styles from "@styles/Dashboard.module.scss";

const Dashboard: NextPage = () => {
  return (
    <>
      <div>
        <h1 className={styles.color}>Hello from Dashboard</h1>
      </div>
    </>
  );
};

export default Dashboard;
