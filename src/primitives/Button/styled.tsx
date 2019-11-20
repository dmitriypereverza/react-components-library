import React from "react";
import styled from "styled-components/macro";
import { memoizeWith } from "ramda";

import {
  ai,
  Aligns,
  flex,
  flexGrow,
  fullWidth,
  jc,
  marginLeft,
  marginRight,
} from "libs/styles";
import SVG, { Icons } from "../SVG";

export const BaseButtonStyle = styled.button`
  outline: none;
  padding: 0 8px;
  position: relative;
  cursor: ${props => (!props.disabled ? "pointer" : "")};
  height: 40px;
  min-height: 40px;
  text-align: center;
  border-radius: 4px;
  * {
    display: flex;
    align-items: center;
    font-size: 13px;
    line-height: 20px;
  }
`;

export const getStylesForTextWrapper = memoizeWith(
  ([iconLeft, iconRight]) => `${!!iconLeft}${!!iconRight}`,
  ([iconLeft, iconRight]) => [
    flex,
    flexGrow(1),
    fullWidth,
    jc(Aligns.CENTER),
    ai(Aligns.CENTER),
    iconLeft
      ? iconRight
        ? null
        : marginRight(8)
      : iconRight
      ? marginLeft(8)
      : [marginLeft(8), marginRight(8)],
  ],
);

interface RenderIconInterface {
  icon: Icons;
  isLeft: boolean;
  iconStyles?: any;
}

export const RenderIcon = React.memo(function({
  icon,
  isLeft,
  iconStyles,
}: RenderIconInterface) {
  if (!icon) return null;
  return (
    <SVG
      styles={[isLeft ? marginRight(8) : marginLeft(8), iconStyles]}
      width={24}
      height={24}
      iconName={icon}
    />
  );
});
