import React from "react";

import ClickOutside from "primitives/ClickOutside/ClickOutside";

import Input, { InputInterface, useDebouncedInput } from "../Input";

import { DropdownMenuPanel } from "../DropdownMenu";

import { position, zIndex, top, overflow, maxHeight, left } from "libs/styles";
import { useBoolean } from "libs/hooks";

interface PredictiveInputInterface
  extends Omit<InputInterface, "wrapperAppendProps" | "children" | "icon"> {
  items: string[];
  dropdownStyles?: any;
}

export default React.memo(
  ({
    items,
    value,
    type,
    title,
    placeholder,
    styles,
    dropdownStyles,
    iconOnClick,
    onChange,
    onSubmit,
  }: PredictiveInputInterface) => {
    const [opened, open, close] = useBoolean(false);
    const searchValue = value.toLowerCase();

    function select(index: number) {
      onChange(items[index]);
    }

    const { inputValue, onInputChange, clear } = useDebouncedInput(
      value,
      600,
      onChange,
    );

    const resultItems = React.useMemo(() => {
      return items
        .map((name, key) => ({
          name,
          onClick: () => select(key),
        }))
        .filter(item => item.name.toLowerCase().includes(searchValue));
    }, [searchValue, items]);

    return (
      <ClickOutside handleEnabled={opened} handleClickOut={close}>
        <Input
          wrapperAppendProps={{
            onClick: () => !opened && open(),
          }}
          value={inputValue}
          type={type}
          placeholder={placeholder}
          title={title}
          styles={[styles, position("relative"), zIndex(2)]}
          icon={inputValue ? "xClose" : null}
          onChange={onInputChange}
          onSubmit={onSubmit}
          iconOnClick={ev => {
            close();
            clear();
            ev.stopPropagation();
            if (iconOnClick) iconOnClick(ev);
          }}
        >
          {opened && resultItems.length !== 0 && (
            <DropdownMenuPanel
              dropdownMenuStyle={[
                top(title ? 82 : 48),
                left(0),
                overflow("auto"),
                maxHeight(170),
                dropdownStyles,
              ]}
              items={resultItems}
              close={close}
            />
          )}
        </Input>
      </ClickOutside>
    );
  },
);
