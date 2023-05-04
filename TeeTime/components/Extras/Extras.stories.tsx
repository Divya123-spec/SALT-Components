/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { Extras } from './Extras';

export default { 
  title: 'Components/Commerce/Extras',
  component: Extras
};

type Props = React.ComponentProps<typeof Extras>;

export const Default = (args) => <Extras {...args} />;
Default.args = {
  exampleProp: 'Extras'
} as Props;
