import React from "react";

import Wrapper from "../Wrapper";
import SVG from "../SVG";
import Typography from "../Typography";

import DropdownListWrapper from "./DropdownListWrapper";

import {
  border,
  borderRadius,
  capitalizeFirstLetter,
  color,
  flex,
  fullWidth,
  height,
  margin,
  marginBottom,
  pointer,
} from "libs/styles";
import { InputWrapper, SelectedItems } from "./styled";

import { DropdownElementInterface } from "../Dropdown/types";

interface DropdownInterface {
  title?: string;
  defaultElement: DropdownElementInterface;
  defaultElementTitle?: string;
  suggests: DropdownElementInterface[];
  suggestHeight: number;
  suggestWidth: number;
  disable?: boolean;
  placeholder?: string;
  selectedElement: DropdownElementInterface;
  styles?: any[];
  onSelect: (data: DropdownElementInterface) => void;
}

const DropdownComponent = ({
  styles,
  title,
  suggests,
  suggestHeight,
  suggestWidth,
  selectedElement,
  defaultElement,
  disable,
  onSelect,
}: DropdownInterface) => {
  return (
    <DropdownListWrapper
      listPosition={{ top: 8 }}
      onSelect={onSelect}
      suggests={suggests}
      suggestHeight={suggestHeight}
      suggestWidth={suggestWidth}
      defaultElement={defaultElement}
    >
      {(toggle, setToggle) => (
        <Wrapper styles={styles}>
          {title ? (
            <Typography
              useDotes={true}
              type="regularBody1"
              styles={[color("dimmedBlue3"), marginBottom(8)]}
            >
              {title}:
            </Typography>
          ) : null}
          <Wrapper
            styles={[
              flex,
              fullWidth,
              border(1, "dimmedBlue1"),
              borderRadius(4),
              height(40),
              pointer,
            ]}
          >
            <InputWrapper
              disable={disable}
              onClick={() => !disable && setToggle()}
            >
              <SelectedItems>
                <Typography
                  useDotes
                  type="regularBody1"
                  styles={[
                    capitalizeFirstLetter,
                    color(
                      isNotEmptySelectedElement(selectedElement, defaultElement)
                        ? "dimmedBlue4"
                        : "dimmedBlue2",
                    ),
                  ]}
                >
                  {selectedElement
                    ? selectedElement.title
                    : defaultElement.title}
                </Typography>
              </SelectedItems>
              <SVG
                width={24}
                height={24}
                styles={[margin(8)]}
                color="dimmedBlue2"
                iconName={toggle ? "arrowUp" : "arrowDown"}
              />
            </InputWrapper>
          </Wrapper>
        </Wrapper>
      )}
    </DropdownListWrapper>
  );
};

DropdownComponent.defaultProps = {
  disable: false,
  styles: [],
  suggestHeight: 250,
  selectedSteps: [],
};

export default React.memo(DropdownComponent);

export function isNotEmptySelectedElement(
  selected: DropdownElementInterface,
  defaultSelected: DropdownElementInterface,
) {
  if (!selected) return false;
  return selected.code !== defaultSelected.code;
}

export function createDefaultElement(title: string): DropdownElementInterface {
  return { code: "none", title };
}
