import React, { ReactNode, useState } from "react";
import { pluck } from "ramda";

import Wrapper from "primitives/Wrapper";
import DropdownList from "primitives/Dropdown/SuggestList";
import ClickOutside from "primitives/ClickOutside/ClickOutside";

import { useToggle } from "libs/hooks";

import { flex, left, position, right, top, zIndex } from "libs/styles";

import { DropdownElementInterface } from "primitives/Dropdown/types";

function indexesMap(data: DropdownElementInterface[] = [], level?: number) {
  return data.map((item, index) => ({ ...item, index: index + 1, level }));
}

const dropDownElementHeight = 47;

interface DropdownListWrapperInterface {
  listPosition?: { top?: number; left?: number; right?: number };
  open: boolean;
  children: (isOpen: boolean, setOpen: (isOpen?: boolean) => void) => ReactNode;
  suggests: DropdownElementInterface[];
  suggestHeight?: number;
  suggestWidth?: number;
  defaultElement?: DropdownElementInterface;
  styles?: any[];
  onSelect: (data: DropdownElementInterface) => void;
}
const DropdownListWrapper = ({
  listPosition,
  open,
  children,
  suggests,
  suggestHeight,
  suggestWidth,
  defaultElement,
  onSelect,
}: DropdownListWrapperInterface) => {
  const [isOpen, setOpen] = useToggle(open);
  const [selectedIndexes, setSelectedIndexes] = useState<string[]>([]);
  const [selectedStepsVal, setSteps] = useState<DropdownElementInterface[]>([]);

  const onSelectTarget = (suggest: DropdownElementInterface) => {
    onSelect(suggest);
    setOpen(false);
  };

  const setSelectedSteps = (step: DropdownElementInterface) => {
    const cutSelectedRows = selectedStepsVal.slice(0, step.level - 1);
    const values = [...cutSelectedRows, step];
    setSteps(values);
    setSelectedIndexes(pluck("code", values));
  };

  const closeDropdown = () => {
    setSteps([]);
    setOpen(false);
  };

  const startSuggests = defaultElement ? [defaultElement] : [];
  return (
    <>
      <ClickOutside handleEnabled={isOpen} handleClickOut={closeDropdown}>
        <div>
          {children(isOpen, setOpen)}
          {isOpen ? (
            <Wrapper styles={[position("relative")]}>
              <Wrapper
                styles={[
                  position("absolute"),
                  zIndex(5),
                  top(listPosition && listPosition.top),
                  left(listPosition && listPosition.left),
                  right(listPosition && listPosition.right),
                ]}
              >
                <Wrapper styles={[flex]}>
                  <DropdownList
                    elementHeight={dropDownElementHeight}
                    suggestHeight={suggestHeight}
                    suggestWidth={suggestWidth}
                    selectedKey={selectedIndexes[0]}
                    suggests={startSuggests.concat(indexesMap(suggests, 1))}
                    onHover={setSelectedSteps}
                    onSelect={onSelectTarget}
                  />
                  {selectedStepsVal && selectedStepsVal.length
                    ? selectedStepsVal.map(
                        (selectedStep: DropdownElementInterface, index) => (
                          <DropdownList
                            key={index}
                            elementHeight={dropDownElementHeight}
                            suggestHeight={suggestHeight}
                            suggestWidth={suggestWidth}
                            selectedKey={selectedIndexes[index + 1]}
                            marginTopValue={
                              dropDownElementHeight * (selectedStep.index - 1) +
                              selectedStep.marginTop -
                              1 +
                              (index === 0 ? dropDownElementHeight : 0)
                            }
                            suggests={indexesMap(
                              selectedStep.children,
                              index + 2,
                            )}
                            onHover={setSelectedSteps}
                            onSelect={onSelectTarget}
                          />
                        ),
                      )
                    : null}
                </Wrapper>
              </Wrapper>
            </Wrapper>
          ) : null}
        </div>
      </ClickOutside>
    </>
  );
};

DropdownListWrapper.defaultProps = {
  open: false,
  suggestHeight: 480,
  suggestWidth: 260,
};

export default React.memo(DropdownListWrapper);
