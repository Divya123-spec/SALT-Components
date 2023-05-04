/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { Control, Controller, FieldValues } from 'react-hook-form';

const NOOP = () => {};

export const ControlledField = ({
  control,
  name,
  value,
  render,
  onChangeValue,
  onChange,
  onBlur
}: Props) => {
  if (control) {
    return (
      <Controller
        render={({
          field: { value: innerValue, onChange: innerOnChange, onBlur: innerOnBlur }
        }) => render({
            field: {
              name,
              value: innerValue,
              onChange: (e: any) => {
                innerOnChange(e);
                onChange?.(e);
                onChangeValue?.(e);
              },
              onBlur: () => {
                innerOnBlur();
                onBlur?.();
              }
            }
          })}
        name={name}
        defaultValue={value}
        control={control}
      />
    );
  } else {
    return render({
      field: {
        name,
        value,
        onChange: (s: any) => {
          onChange?.(s);
          onChangeValue?.(s);
        },
        onBlur: onBlur ?? NOOP
      }
    });
  }
};

type Props = {
  onChangeValue?: (v: any) => void;
  onChange?: (v: any) => void;
  onBlur?: () => void;
  render: ({ field: { name, onChange, onBlur, value } }: RenderProps) => React.ReactElement;
  control?: Control<FieldValues>;
  name: string;
  value?: any;
};

type RenderProps = {
  field: {
    name: string;
    onChange: (v: any | undefined) => void;
    onBlur: () => void;
    value?: any;
  };
};
