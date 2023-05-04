/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React, { useContext } from 'react';
import { emitCustomEvent } from 'react-custom-events';
import { useHistory } from 'react-router-dom';
import {
  FieldRow,
  Field,
  isRequired,
  TextInput,
  FormHeader,
  FormBody
} from '@exo/frontend-components-forms';
import { useIsAuthenticated } from '@azure/msal-react';
import { useMediaQuery } from 'react-responsive';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Loading } from 'carbon-components-react';
import { ButtonUI } from '../../../../ButtonUI/ButtonUI';
import { PressAreaContext } from '../../context/PressAreaContext';
import { usePressAreaSubmit } from '../../hooks/usePressAreaSubmit';
import * as S from './MyDetails.styles';
import { useGetUserDetails } from '../../../Profile/hooks/useGetUserDetails';

const schema = yup.object().shape({
  firstName: yup.string().max(50).required('Please enter your first name'),
  lastName: yup.string().max(50).required('Please enter your last name'),
  emailAddress: yup
    .string()
    .email('Email must be valid')
    .required('Please enter your email address in the correct format: yourname@example.com'),
  nameOfOrganisation: yup.string().required('Please enter your organisation name')
});

type FormData = {
  firstName: string;
  lastName: string;
  emailAddress: string;
  nameOfOrganisation: string;
};

export const MyDetails = () => {
  const isAuthenticated = useIsAuthenticated();
  const idPrefix = 'press_area_details';
  let pageLoading = false;
  if(isAuthenticated) {
    if (typeof window !== 'undefined' && window.sessionStorage.userDetails) {
        const result = JSON.parse(window.sessionStorage.userDetails);
        pageLoading = true;
        const userValues = result.idTokenClaims; 
        let emailID = '';
        if(result && userValues){
          emailID = userValues && userValues.email ? userValues.email: userValues.emails[0];
        }
        // eslint-disable-next-line
        const { userDetails, loading } = useGetUserDetails(emailID)!;
        if(userDetails && !loading)  {
          pageLoading = false;
          const firstName =  document.getElementById(`${idPrefix}_first_name`)! as HTMLInputElement;
          const lastName =  document.getElementById(`${idPrefix}_last_name`)! as HTMLInputElement;
          const email =  document.getElementById(`${idPrefix}_email`)! as HTMLInputElement;
          if(firstName){
            firstName.value = userDetails.firstname;
          }
          if(lastName){
            lastName.value = userDetails.lastname;
          }
          if(email){
            email.value = userDetails.email;
          }
        }
      
    }
  }
  const { register, handleSubmit, formState, control, reset } = useForm({
    mode: 'all',
    resolver: yupResolver(schema)
  });

  const { submitPressArea, loading, error: submitError } = usePressAreaSubmit();

  const { isValid } = formState;

  const history = useHistory();

  const isMobile = useMediaQuery({ query: '(max-width:1023px)' });

  const { pressAreaFormData, setPressAreaFormData } = useContext(PressAreaContext);

  const onError = (error) => {
    throw new Error(error);
  };

  const onSubmit = (formData: FormData) => {
    const { firstName, lastName, emailAddress, nameOfOrganisation } = formData;
    setPressAreaFormData({
      firstName,
      lastName,
      emailAddress,
      nameOfOrganisation
    });
    submitPressArea({
      variables: {
        emailPayload: {
          templateId: 'd-8364a972a16d4ecea5f17efcc8978917',
          data: JSON.stringify(formData)
        }
      },
      errorPolicy: 'all'
    });
    if (submitError) {
      emitCustomEvent('salt-submission-error', {
        title: 'Submission Error',
        message: 'Please try again later'
      });
    } else {
      history.push({ pathname: '/home-of-golf/media/submitted' });
    }
  };

  return (
    <S.PressAreaForm
      onSubmit={(event) => handleSubmit(onSubmit)(event)}
      onError={onError}
      data={pressAreaFormData}
      form={{ reset, handleSubmit, formState }}
    >
      <FormHeader>
        <S.Headline>My details</S.Headline>
        <S.Description>
          You can use this digital form to submit a media enquiry or request assets including course
          images and St Andrews Links press releases.
        </S.Description>
      </FormHeader>
      {pageLoading && <Loading />}
      <FormBody>
        <FieldRow widths={isMobile ? ['100%', '100%'] : ['50%', '50%']}>
          <TextInput
            id={`${idPrefix}_first_name`}
            {...register('firstName')}
            control={control}
            errorText={formState.errors.firstName?.message}
            isRequired={isRequired(schema, 'firstName', true)}
            value={pressAreaFormData?.firstName}
            labelText="First name"
            placeholderText="Enter first name"
          />
          <TextInput
            id={`${idPrefix}_last_name`}
            {...register('lastName')}
            control={control}
            errorText={formState.errors.lastName?.message}
            isRequired={isRequired(schema, 'lastName', true)}
            value={pressAreaFormData?.lastName}
            labelText="Last name"
            placeholderText="Enter last name"
          />
        </FieldRow>

        <Field>
          <TextInput
            id={`${idPrefix}_organisation_name`}
            {...register('nameOfOrganisation')}
            control={control}
            errorText={formState.errors.nameOfOrganisation?.message}
            isRequired={isRequired(schema, 'nameOfOrganisation', true)}
            value={pressAreaFormData?.nameOfOrganisation}
            labelText="Name of organisation"
            placeholderText="Enter name of organisation"
          />
        </Field>

        <Field>
          <TextInput
            id={`${idPrefix}_email`}
            {...register('emailAddress')}
            control={control}
            errorText={formState.errors.emailAddress?.message}
            isRequired={isRequired(schema, 'emailAddress', true)}
            value={pressAreaFormData?.emailAddress}
            labelText="Email address"
            placeholderText="Enter email address"
            helpText="We will only use your email address to contact you regarding your media registration enquiry"
          />
        </Field>
      </FormBody>
      <S.PressAreaFormFooter>
        {isValid && (
          <ButtonUI
            variant="primary"
            type="submit"
            label="Submit registration request"
            icon="ArrowRight32"
            disabled={loading}
          />
        )}
      </S.PressAreaFormFooter>
    </S.PressAreaForm>
  );
};
