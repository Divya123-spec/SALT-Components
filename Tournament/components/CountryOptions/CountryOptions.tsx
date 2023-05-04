/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { useState, useEffect } from 'react';
import { useCountryCodes } from '../hooks/useCountryCodes';
import * as S from './CountryOptions.styles';

export const CountryOptions = ({
  id,
  control,
  isRequired,
  value,
  errorText,
  labelText,
  placeholderText,
  onChange,
  onBlur,
  name,
  ref,
  isDisabled
}: CountryOptionsProps) => {
  const { dataCountryCodes } = useCountryCodes();
  const [ccOptions, setCcOptions] = useState<Array<{ value: string; name: string }>>([
    { value: 'Loading...', name: 'Loading...' }
  ]);

  useEffect(() => {
    const mapped = dataCountryCodes?.map((item) => ({ value: item.name, name: item.name }));
    if (mapped && mapped?.length > 0) setCcOptions(mapped);
  }, [dataCountryCodes]);

  return (
    <S.StyledDropdown
      id={id}
      control={control}
      isRequired={isRequired}
      value={value}
      errorText={errorText}
      labelText={labelText}
      placeholderText={placeholderText}
      items={ccOptions.length > 0 ? ccOptions : [{ value: 'Loading...', name: 'Loading...' }]}
      onChange={onChange}
      onBlur={onBlur}
      name={name}
      ref={ref}
      isDisabled={isDisabled}
    />
  );
};

interface CountryOptionsProps {
  id: string;
  control: any;
  isRequired: boolean;
  value: string;
  errorText: string;
  labelText: string;
  placeholderText: string;
  onChange: (e: any) => void;
  onBlur: (e: any) => void;
  name: string;
  ref: any;
  isDisabled?: boolean;
}
