import React from "react";

import Wrapper from "../../Wrapper";
import Typography from "../../Typography";
import SVG from "../../SVG";

import {
  Aligns,
  capitalizeFirstLetter,
  flex,
  fullWidth,
  jc,
  overflow,
  padding,
  paddingLeft,
  pointer,
} from "libs/styles";

import { SuggestRowWrapper } from "./styled";

interface DropdownRowInterface {
  title: string;
  selected: boolean;
  haveChild: boolean;
  onSelect: () => void;
  onHover: () => void;
  onLeave?: () => void;
}

const SuggestRowComp = (props: DropdownRowInterface) => {
  const { title, haveChild, onSelect, selected, onLeave, onHover } = props;
  return (
    <SuggestRowWrapper
      active={selected}
      onClick={onSelect}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <Wrapper
        styles={[
          fullWidth,
          pointer,
          overflow("hidden"),
          padding(10),
          paddingLeft(12),
          paddingLeft(12),
          flex,
          jc(Aligns.SPACE_BETWEEN),
        ]}
      >
        <Typography
          useDotes
          type="regularBody1"
          styles={[capitalizeFirstLetter]}
        >
          {title}
        </Typography>
        {haveChild ? (
          <SVG
            width={24}
            height={24}
            iconName="arrowRight"
            color="dimmedBlue2"
          />
        ) : null}
      </Wrapper>
    </SuggestRowWrapper>
  );
};

SuggestRowComp.defaultProps = {
  suggests: [],
  haveChild: false,
  marginTop: 0,
  selected: false,
};

export default React.memo(SuggestRowComp);
