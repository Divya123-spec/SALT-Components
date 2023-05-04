/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { TeeTimeDetails } from './TeeTimeDetails';

export default { 
  title: 'Components/Commerce/TeeTimeDetails',
  component: TeeTimeDetails
};

type Props = React.ComponentProps<typeof TeeTimeDetails>;

export const Default = (args) => <TeeTimeDetails {...args} />;
Default.args = {
  exampleProp: 'TeeTimeDetails'
} as Props;
