import { FC } from "react";
import Link from "next/link";
import { IBilingualObject, ICategory, IFsFilesData, IProject } from "types";
import { selectPage } from "store/pageSlice";
import { useSelector } from "react-redux";

import styles from "./ProjectCard.module.scss";
import { server } from "@utils/db/apiConfig";
import { fsFilesFetcher } from "@utils/fetchers";
import useSWR from "swr";
import Image from "next/image";

interface IProjectCardProps {
  project: IProject;
}

const ProjectCard: FC<IProjectCardProps> = ({ project }) => {
  const pageData = useSelector(selectPage);
  const key = pageData.localeKey as keyof IBilingualObject;
  // @TODO Fix Types
  const categories = project.categories as unknown as ICategory[];
  // @TODO Display only project.hero
  const { data, isValidating, error } = useSWR<IFsFilesData[]>(
    `${server}/api/db/images`,
    fsFilesFetcher,
  );

  let dbImagePaths: string[] = [];

  if (data) {
    console.log("fuu", data);

    dbImagePaths = data.map(file => `/api/db/images/${file._id.toString()}`);
  }
  return (
    <div className={styles.card}>
      <div className={styles.heroContainer}>
        {dbImagePaths &&
          dbImagePaths.map((url, index) => {
            return <Image key={`project-image-${index}`} src={url} layout="fill" />;
          })}
      </div>

      <div className={styles.textContainer}>
        <div>
          <Link href={`/projects/${project._id}`}>
            <a>
              <h2 className={styles.titleLink}>{project.title[key]}</h2>
            </a>
          </Link>
        </div>

        <div className={styles.projectInfo}>
          <div className={styles.mainText}>
            <p className={styles.caption}>{project.caption[key].toUpperCase()}</p>
            <p>{project.description[key]}</p>
          </div>

          <div className={styles.sideText}>
            {categories && (
              <ul>
                {categories.map((category, index) => (
                  <li key={`category-${index}`}>{category.text[key].toUpperCase()}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
