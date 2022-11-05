import type { NextPage } from "next";
import { server } from "@utils/apiConfig";

import styles from "@styles/Page.module.scss";
import { setPageTitle } from "store/pageSlice";
import { wrapper } from "store";
import { IBilingualObject, IProject } from "types";

const Project: NextPage<any> = ({ project }) => {
  const projectId = project._id;

  return (
    <div className={styles.pageWrapper}>
      <h1 className={styles.color}>Project Details for {projectId}</h1>
    </div>
  );
};

export default Project;

export const getStaticPaths = async ({ locales }: { locales: string[] }) => {
  const projects = await fetch(`${server}/api/db/projects`).then(response => response.json());

  let paths: any = [];

  projects.forEach((project: IProject) => {
    for (const locale of locales) {
      paths.push({
        params: {
          projectId: project._id,
        },
        locale,
      });
    }
  });

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

  store.dispatch(setPageTitle(project.title[context.locale as keyof IBilingualObject]));

  return {
    props: {
      project,
    },
  };
});
