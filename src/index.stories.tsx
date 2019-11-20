import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text } from '@storybook/addon-knobs/react';

import Typography from 'primitives/Typography';
import ButtonComponent, { ButtonType } from "primitives/Button";

const stories = storiesOf('Components', module);
stories.addDecorator(withKnobs);
stories.add(
  'Typography',
  () => <Typography type={"regularBody1"}>{text("Text", "Тестовый текст111")}</Typography>,
  { info: { text: 'sdfsdf sd fsdf' } }
);

stories.add(
  'Button',
  () => <ButtonComponent type={ButtonType.primary} onClick={action("onClick")}>Hello</ButtonComponent>,
  { info: { inline: true } }
);
