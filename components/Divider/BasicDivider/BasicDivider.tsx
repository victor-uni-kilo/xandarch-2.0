import React, { FC } from "react";

import SvgComponent from "@components/SvgComponent/SvgComponent";
import uiMark01 from "../../../public/icons/ui-mark-01.svg";

import styles from "./BasicDivider.module.scss";

const BasicDivider: FC = () => {
  return (
    <div className={styles.dividerWrapper}>
      <div className={styles.box}></div>
      <div className={styles.box}></div>
    </div>
  );
};

export default BasicDivider;
