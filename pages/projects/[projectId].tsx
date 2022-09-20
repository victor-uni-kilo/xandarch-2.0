import type { GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import { server } from "@utils/apiConfig";
import styles from "@styles/Project.module.scss";
import { IProject } from "models/Project";
import { ContextType } from "react";

const Project: NextPage<any> = ({ project }) => {
  const projectId = project._id;

  return (
    <>
      <h1 className={styles.color}>Project Details for {projectId}</h1>
    </>
  );
};

export default Project;

export const getStaticPaths = async () => {
  const projects = await fetch(`${server}/api/db/projects`).then(response => response.json());

  const paths: string = projects.map((project: any) => {
    const projectId = encodeURI(project._id);

    return {
      // URL ENCODE
      params: { projectId: projectId },
    };
  });

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
