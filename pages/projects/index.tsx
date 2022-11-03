import type { NextPage } from "next";
import { server } from "../../utils/apiConfig";
import { IProject } from "types";
import ProjectCard from "@components/ProjectCard/ProjectCard";

import styles from "@styles/Page.module.scss";

interface IProjectsPageProps {
  projects: IProject[];
  notFound?: boolean;
}

const Projects: NextPage<IProjectsPageProps> = ({ projects, notFound }) => {
  return (
    <div className={styles.pageWrapper}>
      {projects && (
        <ul>
          {projects.map((project: IProject, index: number) => (
            <li key={`project-${index}`}>
              <ProjectCard project={project} />
            </li>
          ))}
        </ul>
      )}
      {notFound && <h2>No Projects Added Yet</h2>}
    </div>
  );
};

export async function getStaticProps() {
  const projects: IProject[] = await fetch(`${server}/api/db/projects`, {
    method: "GET",
  }).then(response => response.json());

  try {
    return {
      props: {
        projects,
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

export default Projects;
