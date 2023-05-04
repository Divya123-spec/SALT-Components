/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import React, { useContext, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import {
  FormHeader,
  FormBody,
  isRequired,
  Field,
  FormFooter,
  RadioButtonGroup
} from '@exo/frontend-components-forms';
import { useIsAuthenticated } from '@azure/msal-react';
import * as S from './MyDetails.styles';
import { TeeTimeContext } from '../../context/TeeTimeContext';
import { ButtonWrapper } from '../../../../ButtonWrapper/ButtonWrapper';
import { ButtonUI } from '../../../../ButtonUI/ButtonUI';
import { GolferDetails } from '../GolferDetails/GolferDetails';
import { scrollToElement } from '../../utils';

const schema = yup
  .object()
  .shape({
    my_firstName: yup.string().required('Please enter your first name'),
    my_lastName: yup.string().required('Please enter your last name'),
    my_email: yup
      .string()
      .email('Please enter a valid email address')
      .required('Please enter a valid email address'),
    my_phoneNumber: yup
      .string()
      .matches(/^(\+|00)[0-9][0-9 \-().]{4,32}$/, 'Please enter a valid format')
      .required('Please enter your phone number'),
    my_country: yup.string().required('Please select your country'),
    my_address: yup.string().notRequired(),
    isLeadGolfer: yup.string().required('Please specify your tee time request'),
    leadGolfer_firstName: yup.string().when('isLeadGolfer', {
      is: 'false',
      then: yup.string().required('Please enter lead golfer first name'),
      otherwise: yup.string().notRequired()
    }),
    leadGolfer_lastName: yup.string().when('isLeadGolfer', {
      is: 'false',
      then: yup.string().required('Please enter lead golfer last name'),
      otherwise: yup.string().notRequired()
    }),
    leadGolfer_email: yup.string().when('isLeadGolfer', {
      is: 'false',
      then: yup
        .string()
        .email('Please enter a valid email address')
        .required('Please enter lead golfer email'),
      otherwise: yup.string().notRequired()
    })
  })
  .required();

export const MyDetails = React.forwardRef<HTMLFormElement>(({ idPrefix = 'myDetails' }, ref) => {
  const pageRef = useRef(null);

  const {
    onNextStep,
    steps,
    currentStep,
    goToReview,
    myDetails,
    onStepBack,
    setMyDetails,
    goToReviewPage
  } = useContext(TeeTimeContext);

  const isAuthenticated = useIsAuthenticated();
  const detailsForAuthUser = {
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    country: ''
  };

  if(isAuthenticated) {
    if (typeof window !== 'undefined') {
      const userInfo = window.sessionStorage.profileData ? JSON.parse(window.sessionStorage.profileData) : '';
      if(userInfo) {
        detailsForAuthUser.firstName =  userInfo.firstname ? userInfo.firstname : '';
        detailsForAuthUser.lastName =  userInfo.lastname ? userInfo.lastname : '';
        detailsForAuthUser.email =  userInfo.email;
        detailsForAuthUser.address =  userInfo.address;
        detailsForAuthUser.country =  userInfo.country ? userInfo.country : '';
      }
    }
  }

  const { register, handleSubmit, formState, control, watch, reset, getValues, setValue } = useForm(
    {
      mode: 'all',
      defaultValues: {
        my_firstName: detailsForAuthUser.firstName,
        my_lastName: detailsForAuthUser.lastName,
        my_email: detailsForAuthUser.email,
        my_phoneNumber: myDetails.myDetails?.phoneNumber,
        my_country: detailsForAuthUser.country,
        my_address: detailsForAuthUser.address,
        isLeadGolfer: myDetails?.isLeadGolfer?.valueOf()?.toString(),
        leadGolfer_firstName: myDetails.leadGolfer?.firstName,
        leadGolfer_lastName: myDetails.leadGolfer.lastName,
        leadGolfer_email: myDetails.leadGolfer?.email
      },
      resolver: yupResolver(schema)
    }
  );


  const { isValid } = formState;
  const showContinueButton = isValid;
  const watchLeadGolfer = watch('isLeadGolfer', myDetails?.isLeadGolfer?.valueOf.toString());

  const onError = (err) => {
    throw new Error(err);
  };


  const onSubmit = (formData) => {
    const myDetailsForm = myDetails.myDetails;
    const leadGolferForm = myDetails.leadGolfer;
    const { isLeadGolfer } = formData;
    Object.entries(formData).forEach(([key, value]) => {
      if (key.startsWith('my_')) {
        myDetailsForm[key.split('my_')[1]] = value;
      } else if (key.startsWith('leadGolfer_')) {
        leadGolferForm[key.split('leadGolfer_')[1]] = value;
      }
    });

    if (isLeadGolfer === 'true') {
      setMyDetails({
        myDetails: { ...myDetailsForm },
        isLeadGolfer: true,
        leadGolfer: { ...myDetailsForm }
      });
    } else {
      setMyDetails({
        myDetails: { ...myDetailsForm },
        isLeadGolfer: false,
        leadGolfer: { ...leadGolferForm }
      });
    }

    if (goToReview) {
      goToReviewPage();
    } else {
      onNextStep();
    }
  };

  const setLeaderData = (
    firstName = '',
    lastName = '',
    email = ''
  ) => {
    setValue('leadGolfer_firstName', firstName, { shouldDirty: true });
    setValue('leadGolfer_lastName', lastName, { shouldDirty: true });
    setValue('leadGolfer_email', email, { shouldDirty: true });
  };
  useEffect(() => {
    if (watchLeadGolfer === 'true') {
      setLeaderData(
        getValues('my_firstName'),
        getValues('my_lastName'),
        getValues('my_email')
      );
    }

    if (watchLeadGolfer === 'false') {
      setLeaderData(
        myDetails.leadGolfer?.firstName,
        myDetails.leadGolfer?.lastName,
        myDetails.leadGolfer?.email
      );
    }
  }, [watchLeadGolfer]);
  useEffect(() => {
    scrollToElement(pageRef);
  }, []);
  return (
    <S.MyDetails
      onSubmit={(event) => handleSubmit(onSubmit)(event)}
      onError={onError}
      data={{
        my_firstName: myDetails.myDetails?.firstName,
        my_lastName: myDetails.myDetails?.lastName,
        my_email: myDetails.myDetails?.email,
        my_phoneNumber: myDetails.myDetails?.phoneNumber,
        my_country: myDetails.myDetails?.country,
        my_address: myDetails.myDetails?.address,
        isLeadGolfer: myDetails?.isLeadGolfer?.valueOf()?.toString(),
        leadGolfer_firstName: myDetails.leadGolfer?.firstName,
        leadGolfer_lastName: myDetails.leadGolfer.lastName,
        leadGolfer_email: myDetails.leadGolfer?.email
      }}
      form={{ reset, handleSubmit, formState }}
      ref={ref}
    >
      <FormHeader>
        <S.Heading ref={pageRef}>My Details</S.Heading>
      </FormHeader>

      <FormBody>
        <GolferDetails
          id={idPrefix}
          // eslint-disable-next-line react/no-array-index-key
          key="my_details"
          idPrefix="my"
          control={control}
          formState={formState}
          register={register}
          schema={schema}
          golfersDetails={myDetails?.myDetails}
          title=""
        />
        <Field>
          <RadioButtonGroup
            id={`${idPrefix}_isLeadGolfer`}
            {...register('isLeadGolfer')}
            isRequired={isRequired(schema, 'isLeadGolfer', true)}
            control={control}
            value={myDetails?.isLeadGolfer?.valueOf.toString()}
            name="isLeadGolfer"
            labelText="Please specify your tee time request"
            errorText={formState.errors.isLeadGolfer?.message}
            items={[
              { value: 'true', name: 'I am requesting to book as lead golfer' },
              {
                value: 'false',
                name: 'I am requesting to book on behalf of someone else (this includes commercial operators)'
              }
            ]}
          />
        </Field>

        <GolferDetails
          id={'leadGolfer'}
          // eslint-disable-next-line react/no-array-index-key
          key="leadGolfer"
          idPrefix="leadGolfer"
          control={control}
          formState={formState}
          register={register}
          schema={schema}
          golfersDetails={
            watchLeadGolfer === 'true' ? { ...myDetails.myDetails } : { ...myDetails.leadGolfer }
          }
          isLeadGolfer={watchLeadGolfer === 'true'}
          title="Lead Golfer"
        />

      </FormBody>

      <FormFooter>
        <ButtonWrapper variation={showContinueButton ? 'space-between' : 'right'}>
          <>
            {showContinueButton && (
              <ButtonUI
                variant="primary"
                type="submit"
                key="go-to-golfer-details-button"
                icon="ArrowRight16"
                label={`Continue to ${goToReview ? steps[3]?.title : steps[currentStep + 1]?.title}`}
              />
            )}
            <S.BackButton
              variant="ghost"
              type="button"
              key="go-back-button"
              onClick={onStepBack}
              label={`Back to ${steps[currentStep - 1]?.title}`}
            />
          </>
        </ButtonWrapper>
      </FormFooter>
    </S.MyDetails>
  );
});
