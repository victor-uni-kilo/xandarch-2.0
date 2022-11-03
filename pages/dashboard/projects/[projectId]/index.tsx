import type { NextPage } from "next";
import { server } from "@utils/apiConfig";
import { useContext, useEffect } from "react";
import { PageLayoutContext } from "@components/Layout/Layout";

import styles from "@styles/Page.module.scss";
import { wrapper } from "store";
import { setPageTitle } from "store/pageSlice";

const PreviewProject: NextPage<any> = ({ project }) => {
  const projectId = project._id;

  return (
    <div className={styles.pageWrapper}>
      <h1 className={styles.color}>PreviewProject Details for {projectId}</h1>
    </div>
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

export const getStaticProps = wrapper.getStaticProps(store => async context => {
  const id = context?.params?.projectId;
  const project = await fetch(`${server}/api/db/projects/${id}`, {
    method: "GET",
  }).then(response => response.json());

  store.dispatch(setPageTitle(project.title.en));

  return {
    props: {
      project,
    },
  };
});
