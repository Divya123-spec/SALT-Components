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
  const objCountry = new Array;
  Object.entries(countryTelData.iso2Lookup).forEach(obj => objCountry.push({
    value: `+${obj[1]}`,
    name: `+${obj[1]}`
  }));
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
            isRequired={isRequired(schema, `${idPrefix}_firstName`, !idPrefix.startsWith('golfer'))}
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
            isRequired={isRequired(schema, `${idPrefix}_lastName`, !idPrefix.startsWith('golfer'))}
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

            isRequired={isRequired(schema, `${idPrefix}_email`, idPrefix.startsWith('my'))}
            helpText={
              'We will only use your email address to send you confirmation of your tee time'
            }
            value={golfersDetails?.email}
            errorText={formState.errors[`${idPrefix}_email`]?.message}
            labelText="Email address"
            placeholderText="Your email address"
          />
        </fieldset>

      </Field>
      <Field>

      </Field>
      {idPrefix.startsWith('my') ?
        <>
          <Field>

            <fieldset disabled={isLeadGolfer}>
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
            </fieldset>
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
          <Field>
            <fieldset disabled={isLeadGolfer}>
              <TextInput
                id={`${idPrefix}_address`}
                {...register(`${idPrefix}_address`)}
                control={control}
                isDisabled={isLeadGolfer}
                isRequired={isRequired(schema, `${idPrefix}_address`, true)}
                value={golfersDetails?.address}
                errorText={formState.errors[`${idPrefix}_address`]?.message}
                labelText="Your Address "
                placeholderText="Enter your address"
              />
            </fieldset>


          </Field>
        </>
        :
        <>
          <Field>
            <TextInput
              id={`${idPrefix}_homeGolfClub`}
              {...register(`${idPrefix}_homeGolfClub`)}
              control={control}
              isRequired={isRequired(schema, `${idPrefix}_homeGolfClub`, false)}
              value={golfersDetails?.homeGolfClub}
              errorText={formState.errors[`${idPrefix}_homeGolfClub`]?.message}
              labelText="Home golf club "
              placeholderText="Enter your home golf club"
            />
          </Field>
          <Field>
            <TextInput
              id={`${idPrefix}_handicap`}
              {...register(`${idPrefix}_handicap`)}
              control={control}
              isRequired={isRequired(schema, `${idPrefix}_handicap`, false)}
              value={golfersDetails?.handicap}
              errorText={formState.errors[`${idPrefix}_handicap`]?.message}
              labelText="Handicap "
              placeholderText="Enter your handicap"
            />
          </Field>
        </>
      }

    </S.GolferContainer>
  );
};