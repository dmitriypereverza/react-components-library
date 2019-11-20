import styled from "styled-components/macro";

import isIE from "projectLibs/isIE";

export const ModalWrapper = styled.div`
  position: fixed;
  z-index: 10;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(54, 62, 74, 0.3);
  max-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  > div {
    ${() => !isIE && "margin: auto"};
  }
`;
