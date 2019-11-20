import React from "react";
import styled, { keyframes } from "styled-components/macro";

import { Colors, getColor } from "libs/styles";

const scales = keyframes`
  0%,
  80%,
  100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
  }
`;

const Loader = styled.div`
  position: absolute;
  display: flex;
  justify-content: space-between;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  > div {
    margin-left: 3px;
    background-color: ${props =>
      props.backgroundColor ? getColor(props.backgroundColor) : "white"};

    width: ${props => (props.size ? props.size : 6)}px;
    height: ${props => (props.size ? props.size : 6)}px;
    flex: 1;
    border-radius: 100%;
    display: inline-block;
    animation: ${scales} 1.4s infinite ease-in-out both;

    :nth-child(1) {
      animation-delay: -0.16s;
    }
    :nth-child(2) {
      animation-delay: -0.32s;
    }
  }
`;

interface LoaderInterface {
  show: boolean;
  backgroundColor?: Colors;
  size?: number;
}

export const StyledLoader = React.memo((props: LoaderInterface) => {
  if (!props.show) return null;
  return (
    <Loader {...props}>
      <div></div>
      <div></div>
      <div></div>
    </Loader>
  );
});

export default StyledLoader;
