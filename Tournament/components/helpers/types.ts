/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { ChangeEventHandler, FocusEventHandler } from 'react';
import { Control, FieldValues } from 'react-hook-form';

export type CommonFieldProps<T> = {
  id: string;
  name: string;
  value?: T | undefined;

  errorText?: string;
  labelText?: string;
  helpText?: string;
  isDisabled?: boolean;
  isInFieldPanel?: boolean;

  onChangeValue?: (v: any) => void;

  control?: Control<FieldValues>;
};

export type UncontrolledFieldProps<T> = CommonFieldProps<T> & {
  onChange?: ChangeEventHandler;
  onBlur?: FocusEventHandler;
};

export type ControlledFieldProps<T> = CommonFieldProps<T> & {};
