import React from "react";
import styled from "styled-components/macro";

import Wrapper from "../../Wrapper";
import SVG from "../../SVG";
import LoadSpinner from "../../LoadSpinner";

import { BaseButtonStyle } from "../styled";

import { ai, Aligns, flex, getColor, opacity } from "libs/styles";

const ButtonOnlyIconWrapper = styled(BaseButtonStyle)`
  background-color: transparent;
  fill: ${getColor("dimmedBlue2")};
  border: 1px solid ${getColor("dimmedBlue1")};
  :hover {
    background-color: ${getColor("dimmedBlue1")};
    fill: ${getColor("dimmedBlue4")};
  }
`;

export default styled(
  ({
    className,
    styles,
    outerStyles,
    iconStyles,
    loading,
    iconLeft,
    onClick,
  }) => (
    <ButtonOnlyIconWrapper
      className={className}
      css={outerStyles}
      onClick={onClick}
    >
      <Wrapper
        styles={[flex, opacity(loading ? "0" : "1"), ai(Aligns.CENTER), styles]}
      >
        <SVG styles={[iconStyles]} width={24} height={24} iconName={iconLeft} />
      </Wrapper>
      <LoadSpinner show={loading} />
    </ButtonOnlyIconWrapper>
  ),
)``;
