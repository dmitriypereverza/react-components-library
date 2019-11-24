import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withInfo } from "@storybook/addon-info";
import { withKnobs, text, select  } from '@storybook/addon-knobs/react';

import Typography, { TypographyTypes } from './primitives/Typography';
import Button, { ButtonType } from "./primitives/Button";


const stories = storiesOf('Components', module);
stories.addDecorator(withKnobs);

stories.add(
  'Typography',
  withInfo({
    inline: true,
  })(() => (
    <Typography type={select("Тип текста", Object.keys(TypographyTypes), "regularBody1")}>{text("Text", "Тестовый текст")}</Typography>
  )),
);

stories.add(
  'Button',
  withInfo({
    inline: true,
  })(() => (
    <Button type={ButtonType.primary} onClick={action("onClick")}>Hello</Button>
  )),
);
