import styled from "styled-components/macro";
import { getColor } from "libs/styles";

export const SuggestRowWrapper = styled.div`
  display: flex;
  ${props =>
    props.active ? "background-color: " + getColor("dimmedBlue0") : ""};
  &:hover {
    background-color: ${getColor("dimmedBlue0")};
  }

  border-bottom: 1px solid ${getColor("dimmedBlue1")};
  &:last-child {
    border-bottom: none;
  }
`;
