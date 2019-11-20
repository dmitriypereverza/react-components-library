import React, { useEffect, useRef, useState } from "react";

import Wrapper from "../Wrapper";
import SVG, { Icons } from "../SVG";
import { InputWrapper, StyledInput } from "./styled";

import {
  border,
  borderRadius,
  color,
  flex,
  fullHeight,
  height,
  marginBottom,
  padding,
  width,
} from "libs/styles";
import debounce from "lodash/debounce";
import Typography from "primitives/Typography";

export interface InputInterface {
  wrapperAppendProps?: Record<string, any>;
  children?: React.ReactNode;
  value: string;
  title?: string;
  type?: "password" | "text" | "number";
  placeholder?: string;
  styles?: any[];
  inputStyles?: any[];
  icon?: Icons;
  onChange: (value: string) => void;
  onSubmit?: () => void;
  iconOnClick?: (ev: Event) => void;
}

const inputStyle = { width: "100%", marginLeft: 12 };

export default React.memo(
  ({
    wrapperAppendProps,
    children,
    title,
    value,
    type,
    placeholder,
    styles,
    inputStyles,
    icon,
    onChange,
    onSubmit,
    iconOnClick,
  }: InputInterface) => {
    return (
      <Wrapper styles={styles}>
        {title ? (
          <Typography
            type="regularBody1"
            styles={[color("dimmedBlue3"), marginBottom(8)]}
          >
            {title}
          </Typography>
        ) : null}
        <Wrapper
          styles={[
            flex,
            border(1, "dimmedBlue1"),
            borderRadius(4),
            height(40),
            ...inputStyles,
          ]}
          appendProps={wrapperAppendProps}
        >
          <InputWrapper clickableIcon={!!iconOnClick}>
            <StyledInput
              style={inputStyle}
              type={type}
              value={value}
              placeholder={placeholder}
              onChange={event => onChange(event.target.value)}
              onKeyPress={
                onSubmit
                  ? ev => {
                      if (ev.key === "Enter") onSubmit();
                    }
                  : null
              }
            />
            {icon ? (
              <SVG
                width={24}
                height={24}
                styles={[padding(8), width(40), fullHeight]}
                iconName={icon}
                onClick={iconOnClick}
              />
            ) : null}
          </InputWrapper>
          {children}
        </Wrapper>
      </Wrapper>
    );
  },
);

export function useDebouncedInput(
  value: string,
  debounceTime: number,
  onChange: (value: string) => void,
) {
  const [inputValue, setInputValue] = useState<string>(value);
  const debounceRef = useRef<ReturnType<typeof debounce>>();
  useEffect(() => {
    debounceRef.current = debounce(onChange, debounceTime);
    return () => debounceRef.current.cancel();
  }, [onChange]);

  React.useEffect(() => setInputValue(value), [value]);

  return {
    inputValue,
    clear: () => {
      setInputValue("");
      debounceRef.current("");
    },
    onInputChange: value => {
      setInputValue(value);
      if (value.length >= 3 || value.length === 0) debounceRef.current(value);
    },
  };
}
