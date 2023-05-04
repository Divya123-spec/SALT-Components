/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { MyDetails } from './MyDetails';

export default { 
  title: 'Components/Commerce/MyDetails',
  component: MyDetails
};

type Props = React.ComponentProps<typeof MyDetails>;

export const Default = (args) => <MyDetails {...args} />;
Default.args = {
  exampleProp: 'MyDetails'
} as Props;
