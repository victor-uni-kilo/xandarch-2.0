import React, { FC, MouseEventHandler } from "react";
import cx from "classnames";

import Button from "@components/Button";
import Typography from "@components/Typography";

import { BASIC_BUTTON_VARIANT, buttonType, buttonVariant } from "../types";
import SvgComponent, { ISvgComponentProps } from "@components/SvgComponent/SvgComponent";
import buttonShape from "../../../public/shapes/buttonShape.svg";

import styles from "./DropFileButton.module.scss";

interface IDropFileButtonProps {
  className?: string;
  icon?: FC<ISvgComponentProps>;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const DropFileButton: FC<IDropFileButtonProps> = ({ className, icon }) => {
  return (
    <button>
      <Typography>SelectImages</Typography>
    </button>
  );
};

export default DropFileButton;
