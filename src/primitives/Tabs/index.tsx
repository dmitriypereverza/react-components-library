import React from "react";
import styled from "styled-components/macro";

import Typography, { TypographyTypes } from "../Typography";

import { color, getColor } from "libs/styles";

const Tab = styled.div`
  cursor: pointer;
  padding-bottom: 16px;
  ${props => props.active && `border-bottom: 2px solid ${getColor("blue3")}`};
  :hover span {
    color: ${props => (!props.active ? getColor("dimmedBlue4") : "")};
  }

  ${props =>
    props.disabled &&
    `cursor: default; span { color: ${getColor("dimmedBlue2")} !important; }`}
`;

const TabsWrapper = styled.div`
  display: flex;
  white-space: nowrap;
  overflow-x: auto;

  overflow: -moz-scrollbars-none;
  -ms-overflow-style: none;
  ::-webkit-scrollbar {
    width: 0 !important;
  }

  ${Tab} {
    margin-right: 24px;
    :last-child {
      margin-right: 0;
    }
  }
`;

interface TabInterface {
  title: string;
  code: string;
  disabled?: boolean;
}

interface TabsInterface {
  styles?: any[];
  font?: keyof typeof TypographyTypes;
  items: TabInterface[];
  currentTab?: string;
  onChange: (data: string) => void;
}

const TabsComponent = ({
  styles,
  items,
  currentTab,
  font,
  onChange,
}: TabsInterface) => {
  const selectTab = tabCode => {
    if (currentTab !== tabCode) {
      onChange(tabCode);
    }
  };

  return (
    <>
      <TabsWrapper css={styles}>
        {items.map(({ disabled, title, code }) => {
          const active = currentTab === code;
          return (
            <Tab
              key={code}
              active={active}
              disabled={disabled}
              onClick={() => (disabled ? null : selectTab(code))}
            >
              <Typography
                type={font}
                styles={[color(active ? "blue3" : "dimmedBlue3")]}
              >
                {title}
              </Typography>
            </Tab>
          );
        })}
      </TabsWrapper>
    </>
  );
};

TabsComponent.defaultProps = {
  styles: [],
  font: "boldCaps",
};

export default React.memo(TabsComponent);
