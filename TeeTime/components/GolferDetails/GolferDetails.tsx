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
import { CountryOptions } from '../CountryOptions/CountryOptions';

export const GolferDetails = ({
  id,
  idPrefix = '',
  control,
  formState,
  register,
  schema,
  title = '',
  golfersDetails,
  isLeadGolfer = false
}) => {
  // eslint-disable-next-line @typescript-eslint/no-array-constructor
  const objCountry = new Array();
  Object.entries(countryTelData.iso2Lookup).forEach((obj) =>
    objCountry.push({
      value: `+${obj[1]}`,
      name: `+${obj[1]}`
    })
  );
  return (
    <S.GolferContainer id={id}>
      <S.TitleContainer>
        <S.Title>{title}</S.Title>
      </S.TitleContainer>
      <S.DetailsFieldRow widths={['50%', '50%']}>
        <fieldset disabled={isLeadGolfer}>
          <TextInput
            id={`${idPrefix}_firstName`}
            {...register(`${idPrefix}_firstName`)}
            isDisabled={isLeadGolfer}
            control={control}
            errorText={formState.errors[`${idPrefix}_firstName`]?.message}
            isRequired={isRequired(idPrefix !== 'leadGolfer' ? schema : undefined, `${idPrefix}_firstName`, true)}
            value={golfersDetails?.firstName}
            labelText="First name"
            placeholderText="Enter First Name"
          />
        </fieldset>
        <fieldset disabled={isLeadGolfer}>
          <TextInput
            id={`${idPrefix}_lastName`}
            {...register(`${idPrefix}_lastName`)}
            isDisabled={isLeadGolfer}
            control={control}
            isRequired={isRequired(idPrefix !== 'leadGolfer' ? schema : undefined, `${idPrefix}_lastName`, true)}
            errorText={formState.errors[`${idPrefix}_lastName`]?.message}
            value={golfersDetails?.lastName}
            labelText="Last Name"
            placeholderText="Enter Last Name"
          />
        </fieldset>
      </S.DetailsFieldRow>
      <Field>
        <fieldset disabled={isLeadGolfer}>
          <TextInput
            id={`${idPrefix}_email`}
            {...register(`${idPrefix}_email`)}
            type="email"
            control={control}
            isDisabled={isLeadGolfer}
            isRequired={isRequired(idPrefix !== 'leadGolfer' ? schema : undefined, `${idPrefix}_email`, true)}
            helpText={
              'We will use your email address to contact you regarding your request'
            }
            value={golfersDetails?.email}
            errorText={formState.errors[`${idPrefix}_email`]?.message}
            labelText="Email address"
            placeholderText="Your email address"
          />
        </fieldset>
      </Field>
      {idPrefix !== 'leadGolfer' &&
        <>
          <Field>

            <PhoneInput
              id={`${idPrefix}_phoneNumber`}
              {...register(`${idPrefix}_phoneNumber`)}
              control={control}
              isDisabled={isLeadGolfer}
              errorText={formState.errors[`${idPrefix}_phoneNumber`]?.message}
              isRequired={isRequired(schema, `${idPrefix}_phoneNumber`, true)}
              value={golfersDetails?.phoneNumber}
              prefixes={objCountry}
              labelText="Phone number"
              placeholderText="Enter your phone number"
            />
          </Field>
          <Field>
            <TextInput
              id={`${idPrefix}_address`}
              {...register(`${idPrefix}_address`)}
              control={control}
              isDisabled={isLeadGolfer}
              isRequired={isRequired(schema, `${idPrefix}_address`, true)}
              value={golfersDetails?.address}
              errorText={formState.errors[`${idPrefix}_address`]?.message}
              labelText="Address"
              placeholderText="Enter your address"
            />
          </Field>
          <Field>
            <CountryOptions
              id={`${idPrefix}_country`}
              {...register(`${idPrefix}_country`)}
              control={control}
              isDisabled={isLeadGolfer}
              isRequired={isRequired(schema, `${idPrefix}_country`, true) ?? true}
              value={golfersDetails?.country}
              errorText={formState.errors[`${idPrefix}_country`]?.message}
              labelText="Country of residence"
              placeholderText="Select your country"
            />
          </Field>
        </>}

    </S.GolferContainer>
  );
};
