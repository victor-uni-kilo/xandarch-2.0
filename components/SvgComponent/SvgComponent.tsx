// import classNames from 'classnames';
import React, { FC } from "react";

interface ISvgComponentProps {
  svg: React.SVGAttributes<SVGElement>;
  alt: string;
  className: string;
}
const SvgComponent: FC<ISvgComponentProps> = ({ svg, alt, className }) => {
  const SvgReactComponent = svg as typeof React.Component;

  return <SvgReactComponent className={className} alt={alt} />;
};

export default SvgComponent;
