import type { NextPage } from "next";
import { server } from "../../../utils/apiConfig";
import styles from "@styles/PreviewProjects.module.scss";
import { IProject } from "types";

const PreviewProjects: NextPage<any> = ({ projects }) => {
  return (
    <div className={styles.pageContent}>
      <h1 className={styles.color}>Hello from PreviewProjects</h1>
      {projects &&
        projects.map((project: IProject, index: number) => (
          <div className={styles.projectContainer} key={`project-${index}`}>
            <h2>{project.projectTextEN.title}</h2>
            <span>{project.projectTextEN.caption}</span>
            <p>{project.projectTextEN.description}</p>
          </div>
        ))}
    </div>
  );
};

export default PreviewProjects;

export async function getServerSideProps() {
  const allProjects: JSON = await fetch(`${server}/api/db/projects`, {
    method: "GET",
  }).then(response => response.json());

  try {
    return {
      props: {
        projects: allProjects,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        notFound: true,
      },
    };
  }
}
