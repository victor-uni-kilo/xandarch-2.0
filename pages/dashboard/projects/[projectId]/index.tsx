import type { GetStaticProps, NextPage } from "next";
import { server } from "@utils/apiConfig";
import styles from "@styles/PreviewProject.module.scss";

const PreviewProject: NextPage<any> = ({ project }) => {
  const projectId = project._id;

  return (
    <>
      <h1 className={styles.color}>PreviewProject Details for {projectId}</h1>
    </>
  );
};

export default PreviewProject;

export const getStaticPaths = async () => {
  const projects = await fetch(`${server}/api/db/projects`).then(response => response.json());

  const paths = projects.map((project: any) => {
    const projectId = encodeURI(project._id);
    return {
      // URL ENCODE
      params: { projectId: projectId },
    };
  });

  console.log("paths", paths);
  return {
    paths: paths,
    fallback: false,
  };
};

export const getStaticProps = async (context: { params: { projectId: any } }) => {
  const id = context.params.projectId;
  const project = await fetch(`${server}/api/db/projects/${id}`, {
    method: "GET",
  }).then(response => response.json());

  return {
    props: {
      project,
    },
  };
};
