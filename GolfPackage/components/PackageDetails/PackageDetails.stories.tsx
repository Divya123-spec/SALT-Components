/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { PackageDetails } from './PackageDetails';

export default { 
  title: 'Components/Commerce/PackageDetails',
  component: PackageDetails
};

type Props = React.ComponentProps<typeof PackageDetails>;

export const Default = (args) => <PackageDetails {...args} />;
Default.args = {
  exampleProp: 'PackageDetails'
} as Props;
