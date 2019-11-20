import React from "react";
import styled, { css } from "styled-components/macro";

import Button, { ButtonType } from "primitives/Button";
import ClickOutside from "primitives/ClickOutside/ClickOutside";
import Wrapper from "primitives/Wrapper";
import SVG from "primitives/SVG";

import ContentPanel from "components/ContentPanel";

import { useBoolean } from "libs/hooks";

import {
  Aligns,
  flex,
  flexColumn,
  getColor,
  jc,
  padding,
  position,
  right,
  textAlign,
  top,
  zIndex,
} from "libs/styles";
import withPerformance from "libs/decorators/performance/withPerformance";

interface DropdownMenu {
  dropdownMenuStyle?: any;
  items: {
    name: string;
    onClick: () => void;
  }[];
  children?: (toggle: () => void) => JSX.Element;
}

const TriplePointButton = styled.button`
  height: 27px;
  width: 38px;
  outline: none;
  cursor: pointer;
  fill: ${getColor("dimmedBlue2")};
  :hover {
    fill: ${getColor("dimmedBlue3")};
  }
`;

const contentPanelCSS = css`
  > button {
    border-radius: 0;
    border-bottom: 1px solid ${getColor("dimmedBlue1")};
    &:last-child {
      border-bottom-color: transparent;
    }
    &:hover {
      background-color: ${getColor("dimmedBlue0")};
    }

    * {
      color: ${getColor("dimmedBlue4")};
    }
  }
`;

export const DropdownMenuPanel = withPerformance(["style", "close"])(
  ({
    items,
    dropdownMenuStyle,
    close,
  }: DropdownMenu & { close: () => void }) => {
    return (
      <ContentPanel
        styles={[
          contentPanelCSS,
          flex,
          flexColumn,
          padding("4px 0"),
          position("absolute"),
          top("auto"),
          right(0),
          zIndex(1),
          dropdownMenuStyle,
        ]}
      >
        {items.map(({ name, onClick }) => (
          <Button
            textStyles={[jc(Aligns.START), textAlign("left")]}
            key={name}
            type={ButtonType.text}
            onClick={() => {
              close();
              onClick();
            }}
          >
            {name}
          </Button>
        ))}
      </ContentPanel>
    );
  },
);

export default React.memo(function({
  items,
  dropdownMenuStyle,
  children,
}: DropdownMenu) {
  const [opened, open, close] = useBoolean(false);
  return (
    <ClickOutside handleEnabled={opened} handleClickOut={close}>
      <Wrapper styles={[position("relative")]}>
        {children ? (
          children(opened ? close : open)
        ) : (
          <TriplePointButton onClick={opened ? close : open}>
            <SVG iconName="triplePoint" width={24} height={24} />
          </TriplePointButton>
        )}
        {opened && (
          <DropdownMenuPanel
            items={items}
            dropdownMenuStyle={dropdownMenuStyle}
            close={close}
          />
        )}
      </Wrapper>
    </ClickOutside>
  );
});
