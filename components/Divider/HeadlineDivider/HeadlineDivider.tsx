import React, { FC, MouseEventHandler } from "react";

import SvgComponent from "@components/SvgComponent/SvgComponent";
import uiMark01 from "../../../public/icons/ui-mark-01.svg";

import styles from "./HeadlineDivider.module.scss";

interface IHeadlineDividerProps {
  info?: string;
}

const HeadlineDivider: FC<IHeadlineDividerProps> = ({ info }) => {
  return (
    <div className={styles.dividerWrapper}>
      <div className={styles.infoLine}>
        <SvgComponent svg={uiMark01} alt={"Decorative Element"} aria-hidden="true" />
        {info && <div className={styles.info}>{"info"}</div>}
      </div>
      <div className={styles.thickBorder}></div>
    </div>
  );
};

export default HeadlineDivider;
