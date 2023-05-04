/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { Checkbox as CarbonCheckbox } from 'carbon-components-react';
import * as S from './Checkbox.styles';
import { UncontrolledFieldProps } from '../helpers/types';

export const Checkbox = React.forwardRef<HTMLInputElement>(
  (
    {
      id,
      name,
      value,
      errorText,
      labelText,
      helpText,
      isDisabled,
      onChange,
      onChangeValue,
      onBlur,
      control
    }: Props,
    ref
  ) => (
      <>
        <S.Checkbox isError={errorText !== undefined}>
          <CarbonCheckbox
            /* @ts-ignore */
            ref={ref}
            id={id}
            name={name}
            onChange={(checked, _id, event) => {
              onChange?.(event);
              onChangeValue?.(checked);
            }}
            onBlur={onBlur}
            disabled={isDisabled}
            labelText={labelText ?? ''}
            defaultChecked={control ? value === true : undefined}
            checked={control ? undefined : !!value}
          />
        </S.Checkbox>
        {errorText !== undefined && <S.Error>{errorText}</S.Error>}
        {helpText !== undefined && errorText === undefined && <S.Help>{helpText}</S.Help>}
      </>
    )
);

type Props = UncontrolledFieldProps<boolean>;
