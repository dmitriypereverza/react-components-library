import React, { ReactNode } from "react";
import styled from "styled-components/macro";

const StyledWrapper = styled.div``;

interface WrapperInterface {
  styles?: any[];
  as?: string;
  appendProps?: any;
  children?: ReactNode;
}

export default React.memo(function(props: WrapperInterface) {
  const { styles, as, appendProps, children } = props;
  return (
    <StyledWrapper css={styles} as={as} {...appendProps}>
      {children}
    </StyledWrapper>
  );
});
