import type { NextPage } from "next";

import styles from "@styles/Projects.module.scss";

const Projects: NextPage = () => {
  return (
    <>
      <h1 className={styles.color}>Hello from Projects</h1>
      <ul>
        <li>Project 1</li>
        <li>Project 2</li>
        <li>Project 3</li>
      </ul>
    </>
  );
};

export default Projects;
