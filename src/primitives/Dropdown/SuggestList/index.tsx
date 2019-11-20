import React, { useRef } from "react";
import styled from "styled-components/macro";

import SuggestRow from "../SuggestRow";
import ScrollView, { ScrollViewRefInterface } from "../../ScrollView";
import Wrapper from "../../Wrapper";

import { backgroundColor, borderRadius, boxShadow } from "libs/styles";

import { DropdownElementInterface } from "../types";

const StyledScrollView = styled(ScrollView)`
  > :first-child {
    padding: 4px 0;
  }
`;

interface DropdownListInterface {
  elementHeight: number;
  suggests: DropdownElementInterface[];
  onHover: (val: DropdownElementInterface) => void;
  onSelect: (val: DropdownElementInterface) => void;
  onLeave?: () => void;
  suggestHeight: number;
  suggestWidth: number;
  selectedKey: string;
  styles?: any[];
  marginTopValue?: number;
}

const SuggestList = (props: DropdownListInterface) => {
  const {
    elementHeight,
    suggests,
    onHover,
    onSelect,
    onLeave,
    selectedKey,
    styles,
    marginTopValue,
    suggestHeight,
    suggestWidth,
  } = props;

  if (!suggests || !suggests.length) {
    return null;
  }

  const ref = useRef<ScrollViewRefInterface>();

  const scroll = (
    <StyledScrollView
      onScroll={event => event.target}
      ref={element => {
        ref.current = element;
      }}
      css={[
        ...styles,
        backgroundColor("white"),
        borderRadius(5),
        boxShadow([0, 0, 16, "blackTransparent"]),
      ]}
      style={{
        marginTop: marginTopValue,
        width: suggestWidth,
        maxHeight: suggestHeight,
        height: suggests.length * elementHeight + 7,
      }}
    >
      {suggests.map((suggest, index) => (
        <SuggestRow
          key={index}
          onLeave={onLeave}
          selected={selectedKey === suggest.code}
          onHover={() => {
            suggest.marginTop = marginTopValue - ref.current.getScrollTop();
            onHover(suggest);
          }}
          onSelect={() => onSelect(suggest)}
          haveChild={!!(suggest.children && suggest.children.length)}
          title={suggest.title}
        />
      ))}
    </StyledScrollView>
  );

  return <Wrapper>{scroll}</Wrapper>;
};

SuggestList.defaultProps = {
  styles: [],
  marginTopValue: 0,
};

export default React.memo(SuggestList);
