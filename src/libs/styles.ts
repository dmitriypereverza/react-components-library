import { curry, is, memoizeWith, identity } from "ramda";
import { css } from "styled-components/macro";

import { colors } from "./colors";

export type Colors = (keyof typeof colors) | string;

export const getColor = curry(function(color: Colors) {
  const currentColor = colors[color];
  return currentColor || color;
});

export const stringOrPixels = (value: number | string) =>
  is(String, value) ? value : `${value}px`;

export const stringOrPixelsProp = curry((propertyName: string, props: any) =>
  stringOrPixels(props[propertyName]),
);

export const toPixelsProp = curry(
  (val: number | string, props: any) => `${props[val]}px`,
);

export function backgroundColor(backgroundColor: Colors) {
  return css`
    background-color: ${getColor(backgroundColor)};
  `;
}

export function backgroundImage(value) {
  return css`
    background-image: ${value};
  `;
}

export function border(size: number, color: Colors) {
  return css`
    border: ${size}px solid ${getColor(color)};
  `;
}

export function borderBottom(size: number, color: Colors) {
  return css`
    border-bottom: ${size}px solid ${getColor(color)};
  `;
}

export function borderLeft(size: number, color: Colors) {
  return css`
    border-left: ${size}px solid ${getColor(color)};
  `;
}

export function borderTop(size: number, color: Colors) {
  return css`
    border-top: ${size}px solid ${getColor(color)};
  `;
}

export function borderRight(size: number, color: Colors) {
  return css`
    border-right: ${size}px solid ${getColor(color)};
  `;
}

export const width = memoizeWith(identity, function(width: string | number) {
  return css`
    width: ${stringOrPixels(width)};`;
});

export const minWidth = memoizeWith(identity, function(
  minWidth: string | number,
) {
  return css`
    min-width: ${stringOrPixels(minWidth)};
  `;
});

export const maxWidth = memoizeWith(identity, function(
  maxWidth: string | number,
) {
  return css`
    max-width: ${stringOrPixels(maxWidth)};
  `;
});

export const height = memoizeWith(identity, function(height: string | number) {
  return css`
    height: ${stringOrPixels(height)};`;
});

export const minHeight = memoizeWith(identity, function(
  minHeight: string | number,
) {
  return css`
    min-height: ${stringOrPixels(minHeight)};
  `;
});

export const maxHeight = memoizeWith(identity, function(
  maxHeight: string | number,
) {
  return css`
    max-height: ${stringOrPixels(maxHeight)};
  `;
});

export const flex = css`
  display: flex;
`;

export const flexWrap = css`
  flex-wrap: wrap;
`;

export const flexValue = memoizeWith(identity, function(value: string) {
  return css`
    flex: ${value};`;
});

export const flexGrow = memoizeWith(identity, function(grow: number) {
  return css`
    flex-grow: ${grow};`;
});

export const flexBasis = memoizeWith(identity, function(
  basis: number | string,
) {
  return css`
    flex-basis: ${stringOrPixels(basis)};
  `;
});

export const flexShrink = memoizeWith(identity, function(shrink: number) {
  return css`
    flex-shrink: ${shrink};`;
});

export const fullWidth = css`
  width: 100%;
`;

export const fullHeight = css`
  height: 100%;
`;

export const flexColumn = css`
  flex-direction: column;
`;

export const margin = memoizeWith(identity, function(margin: string | number) {
  return css`
    margin: ${stringOrPixels(margin)};`;
});

export const marginLeft = memoizeWith(identity, function(marginLeft: number) {
  return css`
    margin-left: ${marginLeft}px;`;
});

export const marginRight = memoizeWith(identity, function(marginRight: number) {
  return css`
    margin-right: ${marginRight}px;`;
});

export const marginTop = memoizeWith(identity, function(marginTop: number) {
  return css`
    margin-top: ${marginTop}px;`;
});

export const marginBottom = memoizeWith(identity, function(
  marginBottom: number,
) {
  return css`
    margin-bottom: ${marginBottom}px;
  `;
});

export const padding = memoizeWith(identity, function(
  padding: string | number,
) {
  return css`
    padding: ${stringOrPixels(padding)};
  `;
});

export const paddingLeft = memoizeWith(identity, function(paddingLeft: number) {
  return css`
    padding-left: ${paddingLeft}px;`;
});

export const paddingRight = memoizeWith(identity, function(
  paddingRight: number,
) {
  return css`
    padding-right: ${paddingRight}px;
  `;
});

export const paddingTop = memoizeWith(identity, function(paddingTop: number) {
  return css`
    padding-top: ${paddingTop}px;`;
});

export const paddingBottom = memoizeWith(identity, function(
  paddingBottom: number,
) {
  return css`
    padding-bottom: ${paddingBottom}px;
  `;
});

export const borderRadius = memoizeWith(identity, function(
  borderRadius: number | string,
) {
  return css`
    border-radius: ${stringOrPixels(borderRadius)};
  `;
});

type BoxShadow = [number | string, number | string, number | string, Colors];

export const boxShadow = memoizeWith(
  ([offsetX, offsetY, blurRadius, color]) =>
    `${offsetX}_${offsetY}_${blurRadius}_${color}`,
  function([offsetX, offsetY, blurRadius, color]: BoxShadow) {
    return css`
      box-shadow: ${stringOrPixels(offsetX)} ${stringOrPixels(offsetY)}
        ${stringOrPixels(blurRadius)} ${getColor(color)};
    `;
  },
) as (config: BoxShadow) => any;

type Position = "fixed" | "static" | "relative" | "absolute";

export const position = memoizeWith(identity, function(position: Position) {
  return css`
    position: ${position};`;
});

export const left = memoizeWith(identity, function(left: string | number) {
  return css`
    left: ${stringOrPixels(left)};`;
});

export const right = memoizeWith(identity, function(right: string | number) {
  return css`
    right: ${stringOrPixels(right)};`;
});

export const top = memoizeWith(identity, function(top: string | number) {
  return css`
    top: ${stringOrPixels(top)};`;
});

export const bottom = memoizeWith(identity, function(bottom: string | number) {
  return css`
    bottom: ${stringOrPixels(bottom)};`;
});

export const transform = memoizeWith(identity, function(transform: string) {
  return css`
    transform: ${transform};`;
});

export const absoluteCenter = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export enum Aligns {
  START = "flex-start",
  END = "flex-end",
  CENTER = "center",
  SPACE_AROUND = "space-around",
  SPACE_BETWEEN = "space-between",
  STRETCH = "stretch",
}

export const jc = memoizeWith(identity, function(value: Aligns) {
  return css`
    justify-content: ${value};`;
});

export const ai = memoizeWith(identity, function(value: Aligns) {
  return css`
    align-items: ${value};`;
});

export const zIndex = memoizeWith(identity, function(value: number) {
  return css`
    z-index: ${value};`;
});

export const transition = memoizeWith(identity, function(value: string) {
  return css`
    transition: ${value};`;
});

export const verticalScroll = css`
  overflow-y: auto;
`;

export const horizontalScroll = css`
  overflow-x: auto;
`;

export const overflow = memoizeWith(identity, function(value: string) {
  return css`
    overflow: ${value};`;
});

export const testOverflow = memoizeWith(identity, function(value: string) {
  return css`
    text-overflow: ${value};`;
});

export const display = memoizeWith(identity, function(value: string) {
  return css`
    display: ${value};`;
});

export const opacity = memoizeWith(identity, function(value: string) {
  return css`
    opacity: ${value};`;
});

export const pointer = css`
  cursor: pointer;
`;

export const lineHeight = memoizeWith(identity, function(value: number) {
  return css`
    line-height: ${stringOrPixels(value)};`;
});

export const fontSize = memoizeWith(identity, function(value: number) {
  return css`
    font-size: ${stringOrPixels(value)};`;
});

export const fontWeight = memoizeWith(identity, function(
  value: string | number,
) {
  return css`
    font-weight: ${value};
  `;
});

export const noWrapText = css`
  white-space: nowrap;
`;

export const capitalizeFirstLetter = css`
  display: block;
  ::first-letter {
    text-transform: uppercase;
  }
`;

export const textTransform = memoizeWith(identity, function(
  value: string | number,
) {
  return css`
    text-transform: ${value};
  `;
});

export const color = memoizeWith(identity, function(value: string) {
  const color = getColor(value);
  return css`
    color: ${color};
    fill: ${color};`;
});

export const hoverColor = memoizeWith(
  function(color: string, important: boolean) {
    return important ? color : `${color}_important`;
  },
  function(value: string, important = false) {
    return css`
      :hover,
      :hover span {
        color: ${getColor(value)} ${important && " !important"};
      }
    `;
  },
) as (value: string, important?: boolean) => any;

export const mediaScreen = function(mediaQueries: string, values: string[]) {
  return css`
    @media screen and ${mediaQueries} {
      ${values}
    }
  `;
};

export const float = memoizeWith(identity, function(value: "left" | "right") {
  return css`
    float: ${value};`;
});

export const textAlign = memoizeWith(identity, function(
  value: "left" | "right" | "center",
) {
  return css`
    text-align: ${value};
  `;
});
