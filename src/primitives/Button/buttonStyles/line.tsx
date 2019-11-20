import React from "react";
import styled from "styled-components/macro";

import Wrapper from "../../Wrapper";
import LoadSpinner from "../../LoadSpinner";

import {
  BaseButtonStyle,
  getStylesForTextWrapper,
  RenderIcon,
} from "../styled";

import { getColor, opacity } from "libs/styles";

const ButtonLineWrapper = styled(BaseButtonStyle)`
  background-color: transparent;

  color: ${getColor("dimmedBlue3")};
  fill: ${getColor("dimmedBlue2")};
  border: 1px solid ${getColor("dimmedBlue1")};

  :hover {
    background-color: ${props => !props.disabled && getColor("dimmedBlue1")};
    color: ${getColor("dimmedBlue4")};
    fill: ${getColor("dimmedBlue4")};
  }

  opacity: ${props => (props.disabled ? ".15" : "1")};
`;

export default styled(
  ({
    className,
    styles,
    outerStyles,
    iconStyles,
    textStyles,
    disabled,
    loading,
    iconLeft,
    iconRight,
    children,
    onClick,
  }) => (
    <ButtonLineWrapper
      className={className}
      css={outerStyles}
      disabled={disabled}
      onClick={onClick}
    >
      <Wrapper styles={[opacity(loading ? "0" : "1"), styles]}>
        <RenderIcon icon={iconLeft} isLeft iconStyles={iconStyles} />
        <Wrapper
          styles={[getStylesForTextWrapper([iconLeft, iconRight]), textStyles]}
        >
          {children}
        </Wrapper>
        <RenderIcon icon={iconRight} isLeft={false} iconStyles={iconStyles} />
      </Wrapper>
      <LoadSpinner show={loading} backgroundColor="white" size={6} />
    </ButtonLineWrapper>
  ),
)<{ onClick: () => void }>``;
