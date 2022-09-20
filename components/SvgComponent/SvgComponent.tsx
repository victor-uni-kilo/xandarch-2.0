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

// export const Logotype = ({ className }: { className: string }) => {
//   return (
//     <SvgComponent
//       className={className}
//       svg={svgImage}
//       alt={'Logo home link'}
//     />
//   );
// };

// export const Icon = (classNames: string) => {
//   return (
//     <SvgComponent
//       classNames={classNames}
//       svg={svgImage}
//       alt={'PLACEHOLDER ALT2'}
//     />
//   );
// };

export default SvgComponent;
