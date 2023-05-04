/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { LessonDetails } from './LessonDetails';

export default {
  title: 'Components/Commerce/LessonDetails',
  component: LessonDetails
};

type Props = React.ComponentProps<typeof LessonDetails>;

export const Default = (args) => <LessonDetails {...args} />;
Default.args = {
  exampleProp: 'PackageDetails'
} as Props;
