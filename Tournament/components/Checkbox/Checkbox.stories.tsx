/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { Checkbox } from './Checkbox';
// import { FieldPanel } from '../../layout/FieldPanel/FieldPanel';
// import { FormTest } from '../../helpers/FormTest';

export default {
  title: 'Components/Forms/Fields/Checkbox',
  component: Checkbox
};

type Props = React.ComponentProps<typeof Checkbox>;

export const Default = (args: Props) => <Checkbox {...args} />;
Default.args = {
  id: 'id',
  name: 'name',
  labelText: 'A label'
} as Props;

// ---------------------------------------------------------------------------------------------------

export const WithError = (args: Props) => <Checkbox {...args} />;
WithError.args = {
  ...Default.args,
  errorText: 'Some error text'
} as Props;

// ---------------------------------------------------------------------------------------------------

export const WithHelpText = (args: Props) => <Checkbox {...args} />;
WithHelpText.args = {
  ...Default.args,
  helpText: 'Some help text'
} as Props;

// ---------------------------------------------------------------------------------------------------

// export const OnFieldPanel = (args: Props) => (
//   <FieldPanel title="A fieldpanel">
//     <Checkbox {...args} />
//   </FieldPanel>
// );
// OnFieldPanel.storyName = 'On FieldPanel';
// OnFieldPanel.args = {
//   ...Default.args
// } as Props;

// ---------------------------------------------------------------------------------------------------

// export const TestOnForm = (args: Props) => (
//   <FormTest
//     data={true}
//     render={({ register, control }) => (
//       <Checkbox id="field" {...args} {...register('field', { required: true })} control={control} />
//     )}
//     renderStandalone={({ value, onChangeValue }) => (
//       <Checkbox id="field2" onChangeValue={onChangeValue} value={value} />
//     )}
//   />
// );
// TestOnForm.args = {
//   ...Default.args
// } as Props;
