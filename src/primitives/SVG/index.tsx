import React from "react";
import styled from "styled-components/macro";

import { toPixelsProp, pointer, Colors, getColor } from "libs/styles";

const list = {
  settings: require("./list/settings.svg"),
  logo: require("./list/logo.svg"),
  logo_gray: require("./list/logo_gray.svg"),
  logout: require("./list/logout.svg"),
  upload: require("./list/upload.svg"),
  rest: require("./list/rest.svg"),
  plane: require("./list/plane.svg"),
  med: require("./list/med.svg"),
  arrowDown: require("./list/arrow-down.svg"),
  xClose: require("./list/x.svg"),
  xCloseSmall: require("./list/x-small.svg"),
  magnifier: require("./list/magnifier.svg"),
  settingsBox: require("./list/settings-box.svg"),
  arrowUp: require("./list/arrow-up.svg"),
  arrowRight: require("./list/arrow-right.svg"),
  rotateLeft: require("./list/rotate-left.svg"),
  rotateRight: require("./list/rotate-right.svg"),
  trash: require("./list/trash.svg"),
  dashedCircle: require("./list/dashed-circle.svg"),
  thunder: require("./list/thunder.svg"),
  triangleRight: require("./list/triangle-right.svg"),
  waiting: require("./list/waiting.svg"),
  waitingSmall: require("./list/waiting-small.svg"),
  success: require("./list/success.svg"),
  successLined: require("./list/success-lined.svg"),
  dragIndicator: require("./list/drag-indicator.svg"),
  warn: require("./list/sign.svg"),
  triplePoint: require("./list/triple-point.svg"),
  plus: require("./list/plus.svg"),
};

export type Icons = keyof typeof list;

interface StyledSVGInterface {
  width: number;
  height: number;
  css?: any;
  onClick?: any;
}

interface SVGInterface extends StyledSVGInterface {
  iconName: Icons;
  color?: Colors;
  styles?: any[];
}

const StyledSVG = styled.svg<StyledSVGInterface>`
  display: inline-block;
  min-width: ${toPixelsProp("width")};
  min-height: ${toPixelsProp("height")};
`;

const SVGComponent = ({
  iconName,
  width,
  height,
  styles,
  color,
  onClick,
}: SVGInterface) => {
  if (!iconName) return null;
  const { symbol, viewBox } = list[iconName];
  const [ref, setRef] = React.useState<HTMLElement>(null);

  React.useEffect(() => {
    if (!ref) return;
    ref.innerHTML = `<use xlink:href="${symbol}" fill="${getColor(color)}"/>`;
  }, [ref, iconName]);

  return (
    <StyledSVG
      className="icon"
      css={onClick ? [...styles, pointer] : styles}
      width={width}
      height={height}
      viewBox={viewBox}
      onClick={onClick}
      ref={setRef}
    />
  );
};

SVGComponent.defaultProps = {
  width: 24,
  height: 24,
};

export default React.memo(SVGComponent);
