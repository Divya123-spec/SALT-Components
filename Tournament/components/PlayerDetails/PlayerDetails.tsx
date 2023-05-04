/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React, { useEffect, useState } from 'react';
import { Field, isRequired, TextInput, PhoneInput, DateInput } from '@exo/frontend-components-forms';
import countryTelData from 'country-telephone-data';
import { Checkbox, Dropdown, FileUploader } from 'carbon-components-react';
import * as S from './PlayerDetails.styles';
import { useCountryCodes } from '../hooks/useCountryCodes';

export const PlayerDetails = ({
  id,
  idPrefix = '',
  control,
  formState,
  register,
  schema,
  isLeadGolfer = false
}) => {
  const { dataCountryCodes } = useCountryCodes();
  const [ccOptions, setCcOptions] = useState<Array<{ value: any; name: any }>>([
    { value: 'Loading...', name: 'Loading...' }
  ]);
  useEffect(() => {
    const mapped = dataCountryCodes?.map((item) => ({ value: item, name: item.name }));
    if (mapped && mapped?.length > 0) setCcOptions(mapped);
  }, [dataCountryCodes]);
  // eslint-disable-next-line @typescript-eslint/no-array-constructor
  const objCountry = new Array();
  Object.entries(countryTelData.iso2Lookup).forEach((obj) =>
    objCountry.push({
      value: `+${obj[1]}`,
      name: `+${obj[1]}`
    })
  );  
  const handleCountryChange = (e) => {
    const selectedCountry = e.selectedItem.value;
    const element =  document.getElementById('displayBrowse');
    if(element){
      switch(selectedCountry){
        case 'England':
          element.style.display = 'none';
          break;
        case 'Scotland':
          element.style.display = 'none';
          break;
        default:
          element.style.display = 'block';
          break;
      }
    }
  };
  return (
    <S.TournamentFormContainer id={id}>
      <S.DetailsFieldRow widths={['50%', '50%']}>
        <fieldset disabled={isLeadGolfer}>
          <TextInput
            id={`${idPrefix}_firstName`}
            {...register(`${idPrefix}_firstName`)}
            isDisabled={isLeadGolfer}
            control={control}
            errorText={formState.errors[`${idPrefix}_firstName`]?.message}
            isRequired={isRequired(idPrefix !== 'leadGolfer' ? schema : undefined, `${idPrefix}_firstName`, true)}
            // value={golfersDetails?.firstName}
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
            // value={golfersDetails?.lastName}
            labelText="Last Name"
            placeholderText="Enter Last Name"
          />
        </fieldset>
      </S.DetailsFieldRow>
      <S.DetailsFieldRow widths={['50%', '50%']}>
        <fieldset disabled={isLeadGolfer}>
          <TextInput
            id={`${idPrefix}_email`}
            {...register(`${idPrefix}_email`)}
            type="email"
            control={control}
            isDisabled={isLeadGolfer}
            isRequired={isRequired(idPrefix !== 'leadGolfer' ? schema : undefined, `${idPrefix}_email`, true)}
            helpText={
              'Please use the email address for setting up your Scottish Golf account'
            }
            // value={golfersDetails?.email}
            errorText={formState.errors[`${idPrefix}_email`]?.message}
            labelText="Email address"
            placeholderText="Your email address"
          />
        </fieldset>
        <fieldset disabled={isLeadGolfer}>          
          <DateInput
            id={`${idPrefix}_userDob`}
            placeholderText="Select Date of Birth"
            control={control}
            {...register('my_userDob')}
            isRequired={isRequired(idPrefix !== 'leadGolfer' ? schema : undefined, `${idPrefix}_userDob`, true)}
            labelText="Date of Birth:"
            errorText={formState.errors.my_userDob?.message}
            // maxDate={endDate}
            // minDate={startDate}
           // value={golferInfoObject.userDob === 'Invalid date' ? null : ((golferInfoObject.userDob) ? formatAccToDatePicker(golferInfoObject.userDob) : null)} // eslint-disable-line no-nested-ternary 
          />
        </fieldset>
        </S.DetailsFieldRow>
          <Field>
            <PhoneInput
              id={`${idPrefix}_phoneNumber`}
              {...register(`${idPrefix}_phoneNumber`)}
              control={control}
              isDisabled={isLeadGolfer}
              errorText={formState.errors[`${idPrefix}_phoneNumber`]?.message}
              isRequired={isRequired(schema, `${idPrefix}_phoneNumber`, true)}
              // value={golfersDetails?.phoneNumber}
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
              isRequired={isRequired(schema, `${idPrefix}_address`, true) ?? true}
              // value={golfersDetails?.address}
              errorText={formState.errors[`${idPrefix}_address`]?.message}
              labelText="Address"
              placeholderText="Enter your address"
            />
          </Field>
          <Field>
            <Dropdown
              id={`${idPrefix}_country`}
              {...register(`${idPrefix}_country`)}
              control={control}
              items={ccOptions.length > 0 ? ccOptions: [{ value: 'Loading...', name: 'Loading...' }]}
              // itemToString={item => item.name }
              onChange={handleCountryChange}
              isDisabled={isLeadGolfer}
              isRequired={isRequired(schema, `${idPrefix}_country`, true) ?? true}
              errorText={formState.errors[`${idPrefix}_country`]?.message}
              label="Select your country"
              titleText="Country of residence"
              helperText="All competitors entering from overseas must provide handicap verification from the Secretary of the recognised authority controlling golf in the country from which they elect to enter."
            />
          </Field>
          <S.BrowseContainer>
          <div id='displayBrowse' className='display-browse'>
            <Field>
              <FileUploader 
                labelTitle="Enter the Handicap Document:"
                labelDescription="Max file size is 500kb. Only .doc, .pdf files are supported."
                buttonLabel="Browse file"
                filenameStatus="edit"
                accept={['.doc', '.pdf']}
                // onChange={console.log}
                name="file"
                multiple={false}
              />
            </Field>
          </div>  
        </S.BrowseContainer>  
      <Field>
        <fieldset disabled={isLeadGolfer}>
          <TextInput
            id={`${idPrefix}_cdh_number`}
            {...register('cdhNumber')}
            control={control}
            isDisabled={isLeadGolfer}
            isRequired={isRequired(idPrefix !== 'leadGolfer' ? schema : undefined, `${idPrefix}_cdh_number`, true)}
            helpText={
              'Please note the email address used to set up your Scottish Golf account.'
            }
            // value={golfersDetails?.email}
            errorText={formState.errors.cdhNumber?.message}
            labelText="CDH Number"
            placeholderText="Enter CDH Number"
          />
        </fieldset>
      </Field>
      <Field>
        <fieldset disabled={isLeadGolfer}>
        <TextInput
            id={`${idPrefix}_handicap_index`}
            {...register('handicapIndex')}
            control={control}
            errorText={formState.errors.handicapIndex?.message}
            isRequired={isRequired(idPrefix !== 'leadGolfer' ? schema : undefined, `${idPrefix}_handicap_index`, true)}
            // value={golferDetails.handicap}
            labelText="Handicap Index"
            placeholderText="Enter Handicap Index"
        />  
          <Checkbox
            id={`${idPrefix}_mailPreferences`}
            // {...register('mailPreferences')}
            // control={control}
            // value={myDetails.mailPreferences}
            // errorText={formState.errors.mailPreferences}
            labelText="please tick this box if this is a plus handicap. This should then filter through as a 
            plus handicap to the entrants entry profile."
          />
        </fieldset>
      </Field>
      <Field>
        <fieldset disabled={isLeadGolfer}>
        <TextInput
            id={`${idPrefix}_home_golf_club`}
            {...register('homeOfGolf')}
            isDisabled={isLeadGolfer}
            control={control}
            isRequired={isRequired(idPrefix !== 'leadGolfer' ? schema : undefined, `${idPrefix}_home_golf_club`, true)}
            errorText={formState.errors.homeOfGolf?.message}
            // value={golfersDetails?.lastName}
            labelText="Home Golf Club"
            placeholderText="Enter Home Golf Club"
          />
        </fieldset>
      </Field>      
    </S.TournamentFormContainer>
  );
};
