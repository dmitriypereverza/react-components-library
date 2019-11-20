import React from 'react';
import { storiesOf } from '@storybook/react';

import Typography from 'primitives/Typography';

const stories = storiesOf('Components', module);

stories.add(
  'Button',
  () => <Typography type={"regularBody1"}>Hello</Typography>,
  { info: { inline: true } }
);
