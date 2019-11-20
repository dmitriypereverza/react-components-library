import React from "react";

import ButtonPrimary from "./buttonStyles/primary";
import ButtonText from "./buttonStyles/text";
import ButtonLine from "./buttonStyles/line";
import ButtonIcon from "./buttonStyles/icon";
import { Icons } from "../SVG";

export enum ButtonType {
  primary,
  line,
  text,
  icon,
}

const styleMap = {
  [ButtonType.primary]: ButtonPrimary,
  [ButtonType.line]: ButtonLine,
  [ButtonType.text]: ButtonText,
  [ButtonType.icon]: ButtonIcon,
};

interface ButtonInterface {
  type?: ButtonType;
  loading?: boolean;
  iconLeft?: Icons;
  iconRight?: Icons;
  disabled?: boolean;
  styles?: any;
  textStyles?: any;
  outerStyles?: any;
  iconStyles?: any;
  children?: React.ReactNode;
  onClick: () => void;
}

function ButtonComponent(props: ButtonInterface) {
  const { children, type, disabled, loading } = props;
  const CustomWrapper = styleMap[type];
  return (
    <CustomWrapper {...props} disabled={disabled || loading}>
      {children}
    </CustomWrapper>
  );
}

ButtonComponent.defaultProps = {
  disabled: false,
  type: ButtonType.primary,
  loading: false,
};

export default React.memo(ButtonComponent);
