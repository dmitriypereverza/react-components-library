import React from "react";
import styled from "styled-components/macro";

const TitleDividerWrapper = styled.span`
  height: 1px;
  background-color: #e5e9eb;
  display: block;
  right: 0;
`;

interface WrapperInterface {
  styles?: any[];
  as?: string;
  appendProps?: any;
}

export default React.memo(function({ styles, as }: WrapperInterface) {
  return (
    <>
      <TitleDividerWrapper css={styles} as={as} />
    </>
  );
});
