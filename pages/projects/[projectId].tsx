import type { NextPage } from "next";
import { useRouter } from "next/router";

import styles from "@styles/Project.module.scss";

const Project: NextPage = () => {
  const router = useRouter();
  const projectId = router.query.projectId;
  return (
    <>
      <h1 className={styles.color}>Project Details for {projectId}</h1>
    </>
  );
};

export default Project;
