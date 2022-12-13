import React, { FC, MouseEventHandler } from "react";

import SvgComponent from "@components/SvgComponent/SvgComponent";
import uiMark01 from "../../public/icons/ui-mark-01.svg";

import styles from "./SectionHeadline.module.scss";

interface ISectionHeadlineProps {
  info?: string;
  children?: React.ReactNode;
}

const SectionHeadline: FC<ISectionHeadlineProps> = ({ info, children }) => {
  return (
    <div className={styles.dividerWrapper}>
      <div className={styles.headline}>
        <SvgComponent svg={uiMark01} alt={"Decorative Element"} aria-hidden="true" />
        <div className={styles.content}>{children}</div>
      </div>
      <div className={styles.thickBorder}></div>
    </div>
  );
};

export default SectionHeadline;
