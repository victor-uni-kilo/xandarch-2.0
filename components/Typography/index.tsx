import React, { FC } from "react";

export enum TEXT_ELEMENT_TAG {
  h1 = "h1",
  h2 = "h2",
  h3 = "h3",
  h4 = "h4",
  h5 = "h5",
  h6 = "h6",
  p = "p",
}

type textElementTag = `${TEXT_ELEMENT_TAG}`;

interface ITypographyProps {
  elementTag?: textElementTag;
  className?: string;
  children?: React.ReactNode;
}

const Typography: FC<ITypographyProps> = ({ elementTag, className, children }) => {
  const Component = elementTag || "span";
  return <Component className={className}>{children}</Component>;
};

export default Typography;
