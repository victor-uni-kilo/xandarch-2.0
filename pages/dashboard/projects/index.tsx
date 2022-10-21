import type { NextPage } from "next";
import { server } from "../../../utils/apiConfig";
import styles from "@styles/PreviewProjects.module.scss";
import { IProjectData } from "types";
import { Head } from "next/document";

const PreviewProjects: NextPage<any> = ({ projects }) => {
  return (
    <>
      <div className={styles.pageContent}>
        <h1 className={styles.color}>Hello from PreviewProjects</h1>
        {projects &&
          projects.map((project: IProjectData, index: number) => (
            <div className={styles.projectContainer} key={`project-${index}`}>
              <h2>{project.title.en}</h2>
              <span>{project.caption?.en}</span>
              <p>{project.description?.en}</p>
            </div>
          ))}

        {!projects && <p>Projects Not Added Yet.</p>}
      </div>
    </>
  );
};

export default PreviewProjects;

export async function getServerSideProps() {
  const existingProjects: IProjectData[] = await fetch(`${server}/api/db/projects`, {
    method: "GET",
  }).then(response => response.json());

  try {
    return {
      props: {
        projects: existingProjects,
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
