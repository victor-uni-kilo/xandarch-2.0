import { FC } from "react";
import Link from "next/link";
import { IBilingualObject, ICategory, IProject } from "types";
import { selectPage } from "store/pageSlice";
import { useSelector } from "react-redux";

import styles from "./ProjectCard.module.scss";

interface IProjectCardProps {
  project: IProject;
}

const ProjectCard: FC<IProjectCardProps> = ({ project }) => {
  const pageData = useSelector(selectPage);
  const key = pageData.localeKey as keyof IBilingualObject;
  // @TODO Fix Types
  const categories = project.categories as unknown as ICategory[];

  return (
    <div className={styles.card}>
      <div className={styles.heroContainer}>...</div>

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
