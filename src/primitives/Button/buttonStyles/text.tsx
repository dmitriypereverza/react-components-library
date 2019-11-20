import React from "react";
import styled from "styled-components/macro";

import Wrapper from "../../Wrapper";
import LoadSpinner from "../../LoadSpinner";

import {
  BaseButtonStyle,
  getStylesForTextWrapper,
  RenderIcon,
} from "../styled";

import { ai, Aligns, flex, getColor, opacity } from "libs/styles";

const ButtonLinkWrapper = styled(BaseButtonStyle)`
  background-color: transparent;

  * {
    color: ${getColor("dimmedBlue3")};
    fill: ${getColor("dimmedBlue2")};
  }

  :hover * {
    color: ${getColor("dimmedBlue4")};
    fill: ${getColor("dimmedBlue4")};
  }
`;

export default styled(
  ({
    className,
    styles,
    outerStyles,
    iconStyles,
    textStyles,
    loading,
    iconLeft,
    iconRight,
    children,
    onClick,
  }) => (
    <ButtonLinkWrapper
      className={className}
      css={outerStyles}
      onClick={onClick}
    >
      <Wrapper
        styles={[flex, opacity(loading ? "0" : "1"), ai(Aligns.CENTER), styles]}
      >
        <RenderIcon icon={iconLeft} isLeft iconStyles={iconStyles} />
        <Wrapper
          styles={[getStylesForTextWrapper([iconLeft, iconRight]), textStyles]}
        >
          {children}
        </Wrapper>
        <RenderIcon icon={iconRight} isLeft={false} iconStyles={iconStyles} />
      </Wrapper>
      <LoadSpinner show={loading} />
    </ButtonLinkWrapper>
  ),
)``;
