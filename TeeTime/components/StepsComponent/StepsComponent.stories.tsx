/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { StepsComponent } from './StepsComponent';

export default {
  title: 'SALT/Components/StepsComponent',
  component: StepsComponent
};

const WRAPPER_STYLE = {
  backgroundColor: '#041117',
  width: '100%',
  display: 'flex',
  minHeight: '100vh',
  alignItems: 'center',
  justifyContent: 'center'
};
type Props = React.ComponentProps<typeof StepsComponent>;

export const Default = (args) => (
  <div style={WRAPPER_STYLE}>
    <StepsComponent {...args} />
  </div>
);

Default.args = {
  steps: [
    {
      title: 'My details'
    },
    {
      title: 'Time of play'
    },
    {
      title: 'Golfer details'
    },
    {
      title: 'Extras and add ons'
    },
    {
      title: 'Review and submit'
    }
  ],
  current: 1
} as Props;
