import type { NextPage } from "next";
// import { useState, useEffect } from "react";
// import { getSession } from "next-auth/client";

import styles from "@styles/Dashboard.module.scss";

const Dashboard: NextPage = () => {
  //   const [session, loading] = useSession();

  // useEffect(() => {
  //   const securePage = async () => {
  //     const session = await getSession();
  //     if (!session) {
  //       signIn();
  //     } else {
  //       setLoading(false);
  //     }
  //   };

  //   securePage();
  // }, []);

  // if (loading) {
  //   return <h2>Loading...</h2>;
  // }

  return (
    <>
      <h1 className={styles.color}>Hello from Dashboard</h1>
    </>
  );
};

export default Dashboard;
