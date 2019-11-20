import React, { ReactNode, useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";

import Wrapper from "../Wrapper";
import { TypographyTypes } from "../Typography";

import {
  ai,
  Aligns,
  backgroundColor,
  borderRadius,
  boxShadow,
  capitalizeFirstLetter,
  flex,
  jc,
  left,
  padding,
  paddingBottom,
  paddingTop,
  position,
  top,
  zIndex,
} from "libs/styles";
import { Cancelable, debounce } from "lodash";

interface TooltipInterface {
  hostNodeId: string;
  active: boolean;
  text: ReactNode;
  children: (ref: (element: HTMLElement) => void) => ReactNode;
}
const Tooltip = ({ children, hostNodeId, text, active }: TooltipInterface) => {
  const [ref, setRef] = useState<HTMLElement>(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const debounceRef = useRef<Cancelable>();

  useEffect(() => {
    if (!ref || !active) return;
    ref.addEventListener("mouseenter", () => {
      if (!showTooltip) {
        const debouncedFunc = debounce(() => setShowTooltip(true), 200);
        debounceRef.current = debouncedFunc;
        debouncedFunc();
      }
    });
    ref.addEventListener("mouseleave", () => {
      debounceRef.current && debounceRef.current.cancel();
      setTimeout(() => setShowTooltip(false), 200);
    });
  }, [ref]);

  return (
    <>
      {children(setRef)}
      {showTooltip &&
        ref &&
        ReactDOM.createPortal(
          <Wrapper
            styles={[
              flex,
              jc(Aligns.CENTER),
              ai(Aligns.CENTER),
              position("fixed"),
              top(ref.getBoundingClientRect().top + 25),
              left(ref.getBoundingClientRect().left + 20),
              zIndex(999),
              boxShadow([0, 2, 8, "rgba(0, 0, 0, .2)"]),
              borderRadius(2),
              TypographyTypes["regularCaption"],
              padding(8),
              paddingBottom(4),
              paddingTop(4),
              backgroundColor("white"),
              capitalizeFirstLetter,
            ]}
          >
            <span>{text}</span>
          </Wrapper>,
          document.getElementById(hostNodeId),
        )}
    </>
  );
};

Tooltip.defaultProps = {
  hostNodeId: "tooltip",
  active: true,
  text: "Подсказка",
};

export default React.memo(Tooltip);
