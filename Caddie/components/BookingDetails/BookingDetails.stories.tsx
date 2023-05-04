/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { BookingDetails } from './BookingDetails';

export default {
  title: 'Components/Commerce/BookingDetails',
  component: BookingDetails
};

type Props = React.ComponentProps<typeof BookingDetails>;

export const Default = (args) => <BookingDetails {...args} />;
Default.args = {
  exampleProp: 'BookingDetails'
} as Props;
