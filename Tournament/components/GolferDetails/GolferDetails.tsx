/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { Field, isRequired, TextInput, Checkbox } from '@exo/frontend-components-forms';
import countryTelData from 'country-telephone-data';
import * as S from './GolferDetails.styles';

export const GolferDetails = ({
  id,
  idPrefix = '',
  control,
  formState,
  register,
  schema,
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
      <S.DetailsFieldRow widths={['50%', '50%']}>
        <fieldset disabled={isLeadGolfer}>
          <TextInput
            id={`${idPrefix}_handicapLevel`}
            {...register(`${idPrefix}_handicapLevel`)}
            isDisabled={isLeadGolfer}
            control={control}
            errorText={formState.errors[`${idPrefix}_handicapLevel`]?.message}
            isRequired={isRequired(idPrefix !== 'leadGolfer' ? schema : undefined, `${idPrefix}_firstName`, true)}
            // value={golfersDetails?.firstName}
            labelText="Handicap Level"
            placeholderText="Enter Handicap Level"
          />
        </fieldset>
        <fieldset disabled={isLeadGolfer}>
          <TextInput
            id={`${idPrefix}_homeGulfClub`}
            {...register(`${idPrefix}_homeGulfClub`)}
            isDisabled={isLeadGolfer}
            control={control}
            isRequired={isRequired(idPrefix !== 'leadGolfer' ? schema : undefined, `${idPrefix}_lastName`, true)}
            errorText={formState.errors[`${idPrefix}_homeGulfClub`]?.message}
            // value={golfersDetails?.lastName}
            labelText="Home Gulf Club"
            placeholderText="Enter Home Gulf Club"
          />
        </fieldset>
      </S.DetailsFieldRow>
      <Field>
        <fieldset disabled={isLeadGolfer}>
          <TextInput
            id={`${idPrefix}_CDHNumber`}
            {...register(`${idPrefix}_CDHNumber`)}
            type="CDHNumber"
            control={control}
            isDisabled={isLeadGolfer}
            isRequired={isRequired(idPrefix !== 'leadGolfer' ? schema : undefined, `${idPrefix}_email`, true)}
            // value={golfersDetails?.email}
            errorText={formState.errors[`${idPrefix}_CDHNumber`]?.message}
            labelText="CDH Number"
            placeholderText="Enter CDH Number"
          />
        </fieldset>
      </Field>
      <Field>
         <Checkbox
            id={`${idPrefix}_mailPreferences`}
            // {...register('mailPreferences')}
            control={control}
            // value={myDetails.mailPreferences}
            // errorText={formState.errors.mailPreferences}
            labelText="I have read and accepted St. Andrews Terms & conditions. I also given information & photos for St. Andrews brand promotions."
          />
      </Field>
    </S.GolferContainer>
  );
};
