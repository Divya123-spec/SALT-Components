/* eslint-disable react/boolean-prop-naming */
/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React, { useEffect, useState } from 'react';
import { Redirect, useHistory, useLocation } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { emitCustomEvent } from 'react-custom-events';
import {
  Field,
  FieldRow,
  isRequired,
  TextInput,
  FormHeader,
  FormBody,
  Checkbox
} from '@exo/frontend-components-forms';
import { LoadingIndicator } from '@exo/frontend-components-base';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { ButtonUI } from '../../../ButtonUI/ButtonUI';
import * as S from './EmailPreferences.styles';
import { useEmailPreferences, useUpdateEmailPreferences } from '../hooks/useEmailPreferences';

const schema = yup.object().shape({
  shouldDisplayNameFields: yup.boolean(),
  firstName: yup
    .string()
    .when('shouldDisplayNameFields', {
      is: true,
      then: yup.string().required('Please enter your first name')
    }),
  lastName: yup
    .string()
    .when('shouldDisplayNameFields', {
      is: true,
      then: yup.string().required('Please enter your last name')
    }),
  emailAddress: yup
    .string()
    .email('Email must be valid')
    .required('Please enter your email address in the correct format: yourname@example.com')
});

const buildInitialState = (currentPreferences: QueryData, tempMail: string) => {
  if (currentPreferences.getEmailPreferences === null) {
    return {
      emailAddress: tempMail,
      teeTimesAndGolfPackages: false,
      academyNewsAndUpdates: false,
      officialMerchAndShoppingUpdates: false,
      clubhouses: false,
      latestNewsAndUpdates: false,
      careersUpdates: false,
      unubscribeFromAll: false,
      isNewContact: true
    };
  }
  const actualPreferences = currentPreferences.getEmailPreferences;
  return {
    emailAddress: actualPreferences?.emailaddress1,
    firstname: actualPreferences?.firstname,
    lastname: actualPreferences?.lastname,
    teeTimesAndGolfPackages: actualPreferences?.ibm_play,
    academyNewsAndUpdates: actualPreferences?.ibm_learn,
    officialMerchAndShoppingUpdates: actualPreferences?.ibm_shop,
    clubhouses: actualPreferences?.ibm_relax,
    latestNewsAndUpdates: actualPreferences?.ibm_news,
    careersUpdates: actualPreferences?.ibm_careers,
    unubscribeFromAll: false,
    isNewContact: false
  };
};

export const EmailPreferences = () => {
  const idPrefix = 'email_preferences';

  // eslint-disable-next-line no-control-regex
  const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

  const history = useHistory();

  const location = useLocation();
  const locationState = location.state as LocationState;

  const isMobile = useMediaQuery({ query: '(max-width:1023px)' });
 
  const { register, handleSubmit, formState, control, reset, setValue, trigger } = useForm({
    mode: 'all',
    resolver: yupResolver(schema)
  });



  const [formData, setFormData] = useState<FormData | undefined>({});

  const [isUnsubscribed, setIsUnsubscribed] = useState(false);

  const [emailValue, setEmailValue] = useState('');

  const [shouldDisplayNameFields, setShouldDisplayNameFields] = useState(false);

  const { isValid } = formState;
  let userEmail = '';
  const { refetch, loading, error, data } = useEmailPreferences(userEmail);
  const {
    submitPreferencesUpdate,
    loading: updateLoading,
    error: updateError
  } = useUpdateEmailPreferences();
 
  useEffect(() => {
    if (data) {
      const prefFormState = buildInitialState(data, emailValue);
      setValue('emailAddress', prefFormState.emailAddress);
      setValue('teeTimesAndGolfPackages', prefFormState.teeTimesAndGolfPackages);
      setValue('academyNewsAndUpdates', prefFormState.academyNewsAndUpdates);
      setValue('officialMerchAndShoppingUpdates', prefFormState.officialMerchAndShoppingUpdates);
      setValue('clubhouses', prefFormState.clubhouses);
      setValue('latestNewsAndUpdates', prefFormState.latestNewsAndUpdates);
      setValue('careersUpdates', prefFormState.careersUpdates);
      setValue('unubscribeFromAll', prefFormState.unubscribeFromAll);
      setValue('shouldDisplayNameFields', prefFormState.isNewContact);
      setShouldDisplayNameFields(prefFormState.isNewContact);
      trigger();
    }
  }, [data]);

  const handleUnsubscribeFromAll = (value) => {
    if (value === true) {
      setValue('teeTimesAndGolfPackages', false);
      setValue('academyNewsAndUpdates', false);
      setValue('officialMerchAndShoppingUpdates', false);
      setValue('clubhouses', false);
      setValue('latestNewsAndUpdates', false);
      setValue('careersUpdates', false);
    }
    setIsUnsubscribed(value);
  };

  useEffect(() => {
    setEmailValue(userEmail);
  }, []);

  useEffect(() => {
    if (emailRegex.test(emailValue) && emailValue) {
      const timeOutInterval = 800;
      const timeOutVar = setTimeout(() => {
        refetch({ emailAddress: emailValue });
      }, timeOutInterval);
      return () => clearTimeout(timeOutVar);
    }
    return () => {};
  }, [emailValue]);

  if(!locationState){
    return <Redirect to={{ pathname: '/email_newsletter_sign_up', search: '' }}  />;
 
  }else{
    userEmail =locationState.emailAddress;
  }
  
  const handleDisableUnsubscribe = (value) => {
    if (value === true && isUnsubscribed === true) {
      setIsUnsubscribed(false);
      setValue('unubscribeFromAll', false);
      setFormData((prevData) => ({ ...prevData, unubscribeFromAll: false }));
    }
  };

  const onSubmit = (formDataSubmit: FormData) => {
    submitPreferencesUpdate({
      variables: {
        newEmailPreferences: {
          contactid: data.getEmailPreferences?.contactid || null,
          emailaddress1: data.getEmailPreferences?.emailaddress1 || emailValue,
          firstname: data.getEmailPreferences?.firstname || formDataSubmit.firstName,
          lastname: data.getEmailPreferences?.lastname || formDataSubmit.lastName,
          ibm_careers: isUnsubscribed ? false : formDataSubmit.careersUpdates,
          ibm_learn: isUnsubscribed ? false : formDataSubmit.academyNewsAndUpdates,
          ibm_news: isUnsubscribed ? false : formDataSubmit.latestNewsAndUpdates,
          ibm_play: isUnsubscribed ? false : formDataSubmit.teeTimesAndGolfPackages,
          ibm_relax: isUnsubscribed ? false : formDataSubmit.clubhouses,
          ibm_shop: isUnsubscribed ? false : formDataSubmit.officialMerchAndShoppingUpdates
        }
      }
    });
    if (error || updateError) {
      emitCustomEvent('salt-submission-error', {
        title: 'Submission Error',
        message: 'Please try again later'
      });
    } else if (!loading && !updateLoading) {
      setFormData({});
      history.push({ pathname: '/email-preferences/submitted' });
    }
  };

  return (
    <>
      {loading ? (
        <LoadingIndicator />
      ) : (
        <S.EmailPrefFrom
          onSubmit={(event) => handleSubmit(onSubmit)(event)}
          data={formData}
          form={{ reset, handleSubmit, formState }}
        >
          <FormHeader>
            <S.Headline>My preferences</S.Headline>
            <S.Description>
              Want to hear from us? Subscribe to our mailing list or edit your existing email
              preferences below.
            </S.Description>
          </FormHeader>

          <FormBody>
            <Field>
              <TextInput
                id={`${idPrefix}_email`}
                {...register('emailAddress')}
                control={control}
                errorText={formState.errors.emailAddress?.message}
                isRequired={isRequired(schema, 'emailAddress', true)}
                value={formData?.emailAddress}
                labelText="Email address"
                placeholderText="Enter email address"
                helpText="We will only use your email address to send you updates based on your subscription preferences"
                onChange={(e) => {
                  setEmailValue(e.target.value);
                }}
              />
            </Field>

            {shouldDisplayNameFields && (
              <FieldRow widths={isMobile ? ['100%', '100%'] : ['50%', '50%']}>
                <Field>
                  <TextInput
                    id={`${idPrefix}_firsName`}
                    {...register('firstName')}
                    control={control}
                    errorText={formState.errors.firstName?.message}
                    isRequired={true}
                    value={formData?.firstName}
                    labelText="First name"
                    placeholderText="Enter first name"
                  />
                </Field>

                <Field>
                  <TextInput
                    id={`${idPrefix}_lastName`}
                    {...register('lastName')}
                    control={control}
                    errorText={formState.errors.lastName?.message}
                    isRequired={true}
                    value={formData?.lastName}
                    labelText="Last name"
                    placeholderText="Enter last name"
                  />
                </Field>
              </FieldRow>
            )}

            <S.CheckboxGroupDescription>
              Please select the emails you would like to receive from us
            </S.CheckboxGroupDescription>

            <Checkbox
              id={`${idPrefix}_teeTimesCheckbox`}
              {...register('teeTimesAndGolfPackages')}
              control={control}
              isRequired={false}
              value={formData?.teeTimesAndGolfPackages}
              labelText="Tee times and golf packages"
              onChange={(e) => {
                handleDisableUnsubscribe(e.target.checked);
              }}
            />

            <Checkbox
              id={`${idPrefix}academyNewsAndUpdates`}
              {...register('academyNewsAndUpdates')}
              control={control}
              isRequired={false}
              value={formData?.academyNewsAndUpdates}
              labelText="Academy news and updates"
              onChange={(e) => {
                handleDisableUnsubscribe(e.target.checked);
              }}
            />

            <Checkbox
              id={`${idPrefix}_officialMerchAndShoppingUpdates`}
              {...register('officialMerchAndShoppingUpdates')}
              control={control}
              isRequired={false}
              value={formData?.officialMerchAndShoppingUpdates}
              labelText="Official merchandise and shopping updates"
              onChange={(e) => {
                handleDisableUnsubscribe(e.target.checked);
              }}
            />

            <Checkbox
              id={`${idPrefix}_clubhouses`}
              {...register('clubhouses')}
              control={control}
              isRequired={false}
              value={formData?.clubhouses}
              labelText="Clubhouses, events and dining news and updates"
              onChange={(e) => {
                handleDisableUnsubscribe(e.target.checked);
              }}
            />

            <Checkbox
              id={`${idPrefix}_latestNewsAndUpdates`}
              {...register('latestNewsAndUpdates')}
              control={control}
              isRequired={false}
              value={formData?.latestNewsAndUpdates}
              labelText="Latest news and updates"
              onChange={(e) => {
                handleDisableUnsubscribe(e.target.checked);
              }}
            />

            <Checkbox
              id={`${idPrefix}_careersUpdates`}
              {...register('careersUpdates')}
              control={control}
              isRequired={false}
              value={formData?.careersUpdates}
              labelText="Careers updates"
              onChange={(e) => {
                handleDisableUnsubscribe(e.target.checked);
              }}
            />

            <S.CheckboxGroupDescription>or</S.CheckboxGroupDescription>

            <Checkbox
              id={`${idPrefix}_unubscribeFromAll`}
              {...register('unubscribeFromAll')}
              control={control}
              isRequired={false}
              value={formData?.unubscribeFromAll}
              onChange={(e) => handleUnsubscribeFromAll(e.target.checked)}
              labelText="Unsubscribe from all marketing emails"
            />
          </FormBody>

          <S.EmailPrefFormFooter>
            {isValid && (
              <ButtonUI
                variant="primary"
                type="submit"
                label="Submit email preferences"
                icon="ArrowRight32"
                disabled={loading || updateLoading}
              />
            )}
          </S.EmailPrefFormFooter>
        </S.EmailPrefFrom>
      )}
    </>
  );
};

type FormData = {
  emailAddress?: string;
  firstName?: string;
  lastName?: string;
  teeTimesAndGolfPackages?: boolean;
  academyNewsAndUpdates?: boolean;
  officialMerchAndShoppingUpdates?: boolean;
  clubhouses?: boolean;
  latestNewsAndUpdates?: boolean;
  careersUpdates?: boolean;
  unubscribeFromAll?: boolean;
};

type QueryData = {
  getEmailPreferences?: {
    contactid: string;
    emailaddress1: string;
    firstname: string;
    lastname: string;
    ibm_careers: boolean;
    ibm_learn: boolean;
    ibm_news: boolean;
    ibm_play: boolean;
    ibm_relax: boolean;
    ibm_shop: boolean;
  };
};

type LocationState = {
  emailAddress: string;
};
