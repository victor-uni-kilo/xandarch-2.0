import type { NextPage } from "next";
import { server } from "../../utils/apiConfig";
import Link from "next/link";
import styles from "@styles/Page.module.scss";

const Projects: NextPage<any> = ({ projects }) => {
  return (
    <div className={styles.pageWrapper}>
      <h1 className={styles.color}>Hello from Projects</h1>
      <ul>
        {projects &&
          projects.map((project: any, index: any) => (
            <li key={`project-${index}`}>
              <Link href={`/projects/${project._id}`}>
                <a>{project.title.en}</a>
              </Link>
            </li>
          ))}
        {!projects && <p>No Projects Added Yet</p>}
      </ul>
    </div>
  );
};

export async function getServerSideProps() {
  const projects = await fetch(`${server}/api/db/projects`, {
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
