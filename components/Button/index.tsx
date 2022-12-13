import React, { FC, MouseEventHandler } from "react";
import { buttonType } from "./types";

interface IButtonProps {
  type?: buttonType;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className: string;
  children?: React.ReactNode;
  activated?: boolean;
  disabled?: boolean;
  value?: string;
}

const Button: FC<IButtonProps> = ({ children, activated, ...rest }) => {
  return (
    <button data-activated={activated} {...rest}>
      {children}
    </button>
  );
};

export default Button;
