import React, { ReactNode, useState } from "react";
import styled from "styled-components/macro";
import { Link, LinkProps } from "react-router-dom";

import Tooltip from "../Tooltip";

import {
  ai,
  Aligns,
  color,
  Colors,
  flex,
  fontSize,
  fontWeight,
  lineHeight,
  noWrapText,
  overflow,
  paddingBottom,
  paddingTop,
  testOverflow,
  textTransform,
  getColor,
  display,
} from "libs/styles";

function getOnlyTypographyProps({
  children,
  className,
  onMouseEnter,
  onMouseLeave,
  innerRef,
}) {
  const res = { children, className, onMouseEnter, onMouseLeave };
  return innerRef ? Object.assign(res, { innerRef }) : res;
}

const TypographyWrapper = styled(
  React.forwardRef((props: any, ref) => (
    <span
      {...getOnlyTypographyProps(props)}
      // @ts-ignore
      ref={ref}
    />
  )),
)`
  display: block;
`;

export const TypographyTypes = {
  regularCaps: [
    fontSize(10),
    lineHeight(12),
    textTransform("uppercase"),
    color("dimmedBlue4"),
  ],
  regularCaption: [fontSize(12), lineHeight(16), color("dimmedBlue4")],
  regularBody1: [fontSize(13), lineHeight(20), color("dimmedBlue4")],
  regularBody2: [fontSize(14), lineHeight(20), color("dimmedBlue4")],
  regularHeadLine: [fontSize(18), lineHeight(24), color("dimmedBlue4")],
  regularTitle: [fontSize(24), lineHeight(32), color("dimmedBlue4")],

  mediumCaps: [
    fontSize(10),
    lineHeight(12),
    textTransform("uppercase"),
    color("dimmedBlue4"),
    fontWeight(500),
  ],
  mediumCaption: [
    fontSize(12),
    lineHeight(16),
    fontWeight(500),
    color("dimmedBlue4"),
  ],
  mediumBody1: [
    fontSize(13),
    lineHeight(20),
    fontWeight(500),
    color("dimmedBlue4"),
  ],
  mediumBody2: [
    fontSize(14),
    lineHeight(20),
    fontWeight(500),
    color("dimmedBlue4"),
  ],
  mediumHeadLine: [
    fontSize(18),
    lineHeight(24),
    fontWeight(500),
    color("dimmedBlue4"),
  ],
  mediumTitle: [
    fontSize(24),
    lineHeight(32),
    fontWeight(500),
    color("dimmedBlue4"),
  ],

  boldCaps: [
    fontSize(10),
    lineHeight(12),
    fontWeight("bold"),
    textTransform("uppercase"),
    color("dimmedBlue4"),
  ],
  boldCaption: [
    fontSize(12),
    lineHeight(16),
    fontWeight("bold"),
    color("dimmedBlue4"),
  ],
  boldBody1: [
    fontSize(13),
    lineHeight(20),
    fontWeight("bold"),
    color("dimmedBlue4"),
  ],
  boldBody2: [
    fontSize(14),
    lineHeight(20),
    fontWeight("bold"),
    color("dimmedBlue4"),
  ],
  boldHeadLine: [
    fontSize(18),
    lineHeight(24),
    fontWeight("bold"),
    color("dimmedBlue4"),
  ],
  boldTitle: [
    fontSize(24),
    lineHeight(32),
    fontWeight("bold"),
    color("dimmedBlue4"),
  ],
};

interface TypographyInterface {
  className?: string;
  as?: keyof JSX.IntrinsicElements;
  type?: keyof typeof TypographyTypes;
  color?: Colors;
  styles?: any[];
  children?: ReactNode;
  useDotes?: boolean;
  hoverColor?: Colors;
}

function Typography({
  as,
  className,
  styles,
  children,
  type,
  useDotes,
  hoverColor,
  color: colorProp,
}: TypographyInterface) {
  const [typoRef, setTypoRef] = useState<HTMLElement>(null);

  return (
    <Tooltip
      hostNodeId="tooltip"
      text={children}
      active={typoRef && typoRef.offsetWidth < typoRef.scrollWidth}
    >
      {setRef => (
        <TypographyWrapper
          as={as}
          className={className}
          hovercolor={hoverColor}
          ref={ref => {
            setRef(ref);
            setTypoRef(ref);
          }}
          css={[
            flex,
            ai(Aligns.CENTER),
            paddingTop(3),
            paddingBottom(3),
            ...(type ? TypographyTypes[type] : []),
            ...(useDotes
              ? [
                  display("block"),
                  testOverflow("ellipsis"),
                  overflow("hidden"),
                  noWrapText,
                ]
              : []),
            colorProp ? color(colorProp) : null,
            styles,
          ]}
        >
          {children}
        </TypographyWrapper>
      )}
    </Tooltip>
  );
}

Typography.defaultProps = {
  styles: [],
  useDotes: false,
  type: "regularBody1",
};

export default React.memo(Typography);

const StyledLink = styled(
  React.forwardRef((props: any, ref) => (
    <Link
      {...getOnlyTypographyProps(props)}
      to={props.to}
      // @ts-ignore
      ref={ref}
    />
  )),
)`
  :hover {
    color: ${props => getColor(props.hovercolor || "dimmedBlue3")};
  }
`;

function asLinkTo(to: string, native = false) {
  return React.forwardRef((data: any, ref: any) => {
    if (native) {
      return (
        <StyledLink
          {...data}
          href={to}
          as="a"
          ref={element => ref && ref(element)}
        />
      );
    }

    return (
      <StyledLink {...data} to={to} innerRef={element => ref && ref(element)} />
    );
  });
}

export const TypographyLink = React.memo(function(
  props: TypographyInterface &
    LinkProps & { native?: boolean; hoverColor?: Colors },
) {
  return (
    <Typography
      type="mediumBody1"
      useDotes
      {...props}
      // @ts-ignore
      as={asLinkTo(props.to, props.native)}
    />
  );
});
