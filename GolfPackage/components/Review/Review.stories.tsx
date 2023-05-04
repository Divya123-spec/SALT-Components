/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { Review } from './Review';

export default { 
  title: 'Components/Commerce/Review',
  component: Review
};

type Props = React.ComponentProps<typeof Review>;

export const Default = (args) => <Review {...args} />;
Default.args = {
  exampleProp: 'Review'
} as Props;
