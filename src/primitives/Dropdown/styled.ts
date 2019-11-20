import styled from "styled-components/macro";

export const InputWrapper = styled.div`
  display: flex;
  font-size: 13px;
  width: 100%;
  opacity: ${props => (props.disable ? ".2" : "1")};
`;

export const SelectedItems = styled.div`
  width: 100%;
  margin-left: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
`;
