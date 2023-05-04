/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React, { useContext } from 'react';
import { emitCustomEvent } from 'react-custom-events';
import { Link, useHistory } from 'react-router-dom';
import {
  FieldRow,
  Field,
  isRequired,
  TextInput,
  FormHeader,
  FormBody,
  Dropdown,
  DateInput,
  Checkbox,
  FormFooter
} from '@exo/frontend-components-forms';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import countryTelData from 'country-telephone-data';
import { Loading } from 'carbon-components-react';
import { ButtonUI } from '../../../../ButtonUI/ButtonUI';
import { CompetitionContext } from '../../context/CompetitionContext';
import { useCompetitionSubmit } from '../../hooks/useCompetitionSubmit';
import * as S from './CompetitionForm.styles';
import { CountryOptions } from '../../components/CountryOptions/CountryOptions';

const schema = yup.object().shape({
  firstName: yup.string().max(50).required('Please enter your first name'),
  lastName: yup.string().max(50).required('Please enter your last name'),
  emailAddress: yup
    .string()
    .email('Email must be valid')
    .required('Please enter your email address in the correct format: yourname@example.com'),
  country: yup.number().required('Please select your country'),
  termsAndConditions: yup.boolean().required(),
  mailPreferences: yup.boolean().notRequired(),
  gender: yup.string().required('Please select your gender'),
  dateOfBirth: yup.string().required('Please select your date of birth').nullable()
});

export const CompetitionForm = React.forwardRef<HTMLFormElement>(
  ({ idPrefix = 'competition_form', marketingListID = '' }, ref) => {
    const { myDetails } = useContext(CompetitionContext);

    const { register, handleSubmit, formState, control, reset, watch } = useForm({
      mode: 'all',
      defaultValues: {
        firstName: myDetails.firstName,
        lastName: myDetails.lastName,
        emailAddress: myDetails.emailAddress,
        country: myDetails.country,
        termsAndConditions: myDetails.termsAndConditions,
        mailPreferences: myDetails.mailPreferences,
        gender: myDetails.gender,
        dateOfBirth: myDetails.dateOfBirth
      },
      resolver: yupResolver(schema)
    });

    const { submitCompetition, loading } = useCompetitionSubmit();

    const { isValid } = formState;

    const history = useHistory();
    const canSubmit = watch('termsAndConditions') && isValid;

    const onError = (error) => {
      throw new Error(error);
    };

    const onSubmit = (formData) => {
      const {
        firstName,
        lastName,
        emailAddress,
        country,
        mailPreferences,
        gender,
        dateOfBirth
      } = formData;

      submitCompetition({
        variables: {
          contactInfo: {
            firstName,
            lastName,
            emailAddress,
            country,
            mailPreferences,
            gender,
            dateOfBirth,
            marketingListID
          }
        },
        errorPolicy: 'all'
      }).then(({ errors }) => {
        if (errors) {
          emitCustomEvent('salt-submission-error', {
            title: 'Submission Error',
            message: errors[0]?.message ?? 'Please try again later'
          });
        } else {
          history.push({ pathname: '/page/request_competition_submitted' });
        }
      }).catch(_ =>
        emitCustomEvent('salt-submission-error', {
          title: 'Submission Error',
          message: 'Please try again later'
        }));
    };

    // eslint-disable-next-line @typescript-eslint/no-array-constructor
    const objCountry = new Array();
    Object.entries(countryTelData.iso2Lookup).forEach((obj) =>
      objCountry.push({
        value: `+${obj[1]}`,
        name: `+${obj[1]}`
      })
    );

    return (
      <S.PressAreaForm
        onSubmit={(event) => handleSubmit(onSubmit)(event)}
        onError={onError}
        data={{
          firstName: myDetails.firstName,
          lastName: myDetails.lastName,
          emailAddress: myDetails.emailAddress,
          country: myDetails.country,
          termsandconditions: myDetails.termsAndConditions,
          mailPreferences: myDetails.mailPreferences,
          gender: myDetails.gender,
          dateOfBirth: myDetails.dateOfBirth
        }}
        form={{ reset, handleSubmit, formState }}
        ref={ref}
      >
        <FormHeader>
          <S.Headline>My details</S.Headline>
        </FormHeader>

        <FormBody>
          <FieldRow widths={['50%', '50%']}>
            <TextInput
              id={`${idPrefix}_first_name`}
              {...register('firstName')}
              control={control}
              errorText={formState.errors.firstName?.message}
              isRequired={isRequired(schema, 'firstName', true)}
              value={myDetails?.firstName}
              labelText="First name"
              placeholderText="Enter first name"
            />
            <TextInput
              id={`${idPrefix}_last_name`}
              {...register('lastName')}
              control={control}
              errorText={formState.errors.lastName?.message}
              isRequired={isRequired(schema, 'lastName', true)}
              value={myDetails?.lastName}
              labelText="Last name"
              placeholderText="Enter last name"
            />
          </FieldRow>
          <Field>
            <TextInput
              id={`${idPrefix}_email`}
              {...register('emailAddress')}
              control={control}
              errorText={formState.errors.emailAddress?.message}
              isRequired={isRequired(schema, 'emailAddress', true)}
              value={myDetails?.emailAddress}
              labelText="Email address"
              placeholderText="Enter email address"
              helpText="We will only use your email address to update you about your competition entry"
            />
          </Field>
          <FieldRow widths={['50%', '50%']}>
            <Dropdown
              id={`${idPrefix}_gender`}
              {...register('gender')}
              control={control}
              errorText={formState.errors.gender?.message}
              isRequired={isRequired(schema, 'gender', true)}
              value={myDetails?.gender}
              labelText="Gender"
              placeholderText="Select one option"
              items={[
                {
                  value: 'Male',
                  name: 'Male'
                },
                {
                  value: 'Female',
                  name: 'Female'
                },
                {
                  value: 'Other',
                  name: 'Other'
                },
                {
                  value: 'Prefer not to answer',
                  name: 'Prefer not to answer'
                }
              ]}
            />
            <DateInput
              id={`${idPrefix}_dateOfBirth`}
              {...register('dateOfBirth')}
              value={myDetails?.dateOfBirth}
              control={control}
              // @ts-ignore
              isRequired={isRequired(schema, 'dateOfBirth', true) ?? true}
              errorText={formState.errors.dateOfBirth?.message}
              labelText="Date of birth"
              placeholderText="Select date"
              className="formDate"
              maxDate={new Date().toISOString()}
            />
          </FieldRow>
          <Field>
            <CountryOptions
              id={`${idPrefix}_country`}
              {...register('country')}
              control={control}
              isRequired={isRequired(schema, 'country', true) ?? true}
              value={myDetails?.country}
              errorText={formState.errors.country?.message!}
              labelText="Country of residence"
              placeholderText="Select your country"
              ref={ref}
            />
          </Field>
          <Field>
            <Checkbox
              id={`${idPrefix}_mailPreferences`}
              {...register('mailPreferences')}
              control={control}
              value={myDetails.mailPreferences}
              errorText={formState.errors.mailPreferences}
              labelText="Click here to sign up to our mailing list"
              helpText="Marketing preferences (optional)"
            />
          </Field>
          <Field>
            <Checkbox
              id={`${idPrefix}_termsandconditions`}
              {...register('termsAndConditions')}
              control={control}
              value={myDetails.termsAndConditions}
              errorText={formState.errors.termsAndConditions}
              helpText="Please agree in order to submit your competition entry"
              labelText={
                // @ts-ignore
                <label>
                  I accept the{' '}
                  <Link to="/legends_competition_terms_and_conditions" target={'_blank'}>
                    competition and marketing terms &amp; conditions
                  </Link>
                </label>
              }
            />
          </Field>
          {loading && <Loading />}

        </FormBody>

        <FormFooter>
          {canSubmit && (
            <ButtonUI
              variant="primary"
              type="submit"
              label="Submit registration request"
              icon="ArrowRight32"
              disabled={loading}
              key={'competition-submit'}
            />
          )}
        </FormFooter>
      </S.PressAreaForm>
    );
  }
);
