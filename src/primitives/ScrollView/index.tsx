import React from "react";
import { Scrollbars } from "react-custom-scrollbars";

export interface ScrollViewRefInterface {
  getScrollTop: () => number;
}

interface ScrollViewProps {
  onScroll: (data) => void;
  className?: string;
  children: any;
  autoHeight?: boolean;
  autoHeightMax?: number;
  style?: any;
  appendProps?: any;
  ref?: (data: ScrollViewRefInterface) => void;
}

const ScrollView = React.forwardRef(function(
  {
    onScroll,
    className,
    autoHeight,
    autoHeightMax,
    children,
    style,
    appendProps,
  }: ScrollViewProps,
  ref,
) {
  return (
    <Scrollbars
      onScroll={onScroll}
      className={className}
      style={style}
      autoHeight={autoHeight}
      autoHeightMax={autoHeightMax}
      {...appendProps}
      ref={ref}
    >
      {children}
    </Scrollbars>
  );
});

export default React.memo(ScrollView);
