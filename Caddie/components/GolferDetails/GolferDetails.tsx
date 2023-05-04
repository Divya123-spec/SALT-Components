/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { Field, isRequired, TextInput, PhoneInput } from '@exo/frontend-components-forms';
import countryTelData from 'country-telephone-data';
import * as S from './GolferDetails.styles';

export const GolferDetails = ({
  id,
  control,
  formState,
  register,
  schema,
  golfersDetails
}) => {
  // eslint-disable-next-line @typescript-eslint/no-array-constructor
  const objCountry = new Array;
  Object.entries(countryTelData.iso2Lookup).forEach(obj => objCountry.push({
    value: `+${obj[1]}`,
    name: `+${obj[1]}`
  }));
  return (
    <S.GolferContainer id={id}>
      <S.DetailsFieldRow widths={['50%', '50%']}>
        <TextInput
          id={'firstName'}
          {...register('firstName')}
          control={control}
          errorText={formState.errors?.firstName?.message}
          isRequired={isRequired(schema, 'firstName', true)}
          value={golfersDetails?.firstName}
          labelText="First name"
          placeholderText="Enter First Name"
        />
        <TextInput
          id={'lastName'}
          {...register('lastName')}
          control={control}
          isRequired={isRequired(schema, 'lastName', true)}
          errorText={formState.errors?.lastName?.message}
          value={golfersDetails?.lastName}
          labelText="Last Name"
          placeholderText="Enter Last Name"
        />
      </S.DetailsFieldRow>
      <Field>
        <TextInput
          id={'email'}
          {...register('email')}
          type="email"
          control={control}

          isRequired={isRequired(schema, 'email', true)}
          helpText={
            'We will use your email address to contact you regarding your request'
          }
          value={golfersDetails?.email}
          errorText={formState.errors?.email?.message}
          labelText="Email address"
          placeholderText="Your email address"
        />

      </Field>
      <Field>
        <PhoneInput
          id={'phoneNumber'}
          {...register('phoneNumber')}
          control={control}
          errorText={formState.errors?.phoneNumber?.message}
          isRequired={isRequired(schema, 'phoneNumber', true)}
          value={golfersDetails?.phoneNumber}
          prefixes={objCountry}
          labelText="Phone number"
          placeholderText="Enter your phone number"
        />
      </Field>
    </S.GolferContainer>
  );
};