/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { TeeTime } from './TeeTime';

export default { 
  title: 'Components/Commerce/TeeTime',
  component: TeeTime
};

type Props = React.ComponentProps<typeof TeeTime>;

export const Default = (args) => <TeeTime {...args} />;
Default.args = {
  exampleProp: 'TeeTime'
} as Props;
