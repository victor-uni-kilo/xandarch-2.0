import type { NextPage } from "next";
import { server } from "../../utils/apiConfig";
// import connectToMongo from "@utils/connectDB";
// import Project from "models/Project";
import styles from "@styles/Projects.module.scss";
import Link from "next/link";

const Projects: NextPage<any> = ({ projects }) => {
  console.log("projects", typeof projects);
  console.log("projects", projects);

  return (
    <div className={styles.pageContent}>
      <h1 className={styles.color}>Hello from Projects</h1>
      <ul>
        {projects &&
          projects.map((project: any, index: any) => (
            <li key={`project-${index}`}>
              <Link href={`/projects/${project._id}`}>
                <a>{project.title}</a>
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Projects;

export async function getServerSideProps() {
  const projects: JSON = await fetch(`${server}/api/db/projects`, {
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
