import React, { ReactNode } from "react";
import ReactDOM from "react-dom";
import { isNil } from "ramda";
import debounce from "lodash/debounce";

interface ClickOutSideInterface {
  children: ReactNode;
  handleEnabled?: boolean;
  handleClickOut: () => void;
  delay?: number;
}

class ClickOutside extends React.Component<ClickOutSideInterface> {
  componentDidMount() {
    document.addEventListener(
      "mouseup",
      this.props.delay
        ? debounce(this.handleClickOut, this.props.delay)
        : this.handleClickOut,
      true,
    );
  }

  componentWillUnmount() {
    document.removeEventListener("mouseup", this.handleClickOut, true);
  }

  handleClickOut = event => {
    const { handleEnabled, handleClickOut } = this.props;
    if (!isNil(handleEnabled) && !handleEnabled) return;
    const domNode = ReactDOM.findDOMNode(this);
    if (!domNode || !domNode.contains(event.target)) {
      handleClickOut();
    }
  };

  render() {
    return this.props.children;
  }
}

export default ClickOutside;
