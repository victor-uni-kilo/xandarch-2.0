import React, { FC, MouseEventHandler } from "react";
import cx from "classnames";

import Button from "@components/Button";
import Typography from "@components/Typography";

import { BASIC_BUTTON_VARIANT, buttonType, buttonVariant } from "../types";
import SvgComponent, { ISvgComponentProps } from "@components/SvgComponent/SvgComponent";
import buttonShape from "../../../public/shapes/buttonShape.svg";

import styles from "./BasicButton.module.scss";

interface IBasicButtonProps {
  children: React.ReactNode;
  variant: buttonVariant;
  className?: string;
  icon?: FC<ISvgComponentProps>;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: buttonType;
  activated?: boolean;
  disabled?: boolean;
  value?: string;
}
{
  /* <Button icon={<Hamburger class={}></>} */
}
const BasicButton: FC<IBasicButtonProps> = ({
  children,
  variant,
  className,
  icon,
  activated = false,
  ...rest
}) => {
  let variantStyle: string;

  switch (variant) {
    case BASIC_BUTTON_VARIANT.text:
      variantStyle = styles.buttonText;
      break;
    case BASIC_BUTTON_VARIANT.outlined:
      variantStyle = styles.buttonOutlined;
      break;
    case BASIC_BUTTON_VARIANT.contained:
      variantStyle = styles.buttonContained;
      break;
    default:
      variantStyle = "";
      break;
  }

  // data-active:

  return (
    <Button {...rest} activated={activated} className={cx(styles.button, variantStyle, className)}>
      {children}
    </Button>
  );
};

export default BasicButton;
