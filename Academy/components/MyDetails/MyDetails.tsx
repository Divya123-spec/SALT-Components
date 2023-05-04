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
  FormFooter
} from '@exo/frontend-components-forms';
import { useIsAuthenticated } from '@azure/msal-react';
import * as S from './MyDetails.styles';
import { AcademyContext } from '../../context/AcademyContext';
import { ButtonWrapper } from '../../../../ButtonWrapper/ButtonWrapper';
import { ButtonUI } from '../../../../ButtonUI/ButtonUI';
import { GolferDetails } from '../GolferDetails/GolferDetails';
import { scrollToElement } from '../../utils';

const schema = yup
  .object()
  .shape({
    firstName: yup.string().required('Please enter your first name'),
    lastName: yup.string().required('Please enter your last name'),
    email: yup
      .string()
      .email('Please enter a valid email address')
      .required('Please enter a valid email address'),
    phoneNumber: yup
      .string()
      .matches(/^(\+|00)[0-9][0-9 \-().]{4,32}$/, 'Please enter a valid format')
      .required('Please enter your phone number'),
    address: yup.string().notRequired()
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
    setMyDetails,
    onStepBack,
    goToReviewPage
  } = useContext(AcademyContext);

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
        detailsForAuthUser.firstName =  userInfo.firstname;
        detailsForAuthUser.lastName =  userInfo.lastname;
        detailsForAuthUser.email =  userInfo.email;
        detailsForAuthUser.address =  userInfo.address;
      }
    }
  }

  const { register, handleSubmit, formState, control, reset } = useForm(
    {
      mode: 'all',
      defaultValues: {
        firstName: detailsForAuthUser.firstName,
        lastName: detailsForAuthUser.lastName,
        email: detailsForAuthUser.email,
        phoneNumber: myDetails?.phoneNumber,
        address: detailsForAuthUser.address
      },
      resolver: yupResolver(schema)
    }
  );
  const { isValid } = formState;
  const showContinueButton = isValid;

  const onError = (err) => {
    throw new Error(err);
  };
  const onSubmit = (formData) => {
    const myDetailsForm = { ...formData };

    setMyDetails({ ...myDetailsForm });


    if (goToReview) {
      goToReviewPage();
    } else {
      onNextStep();
    }
  };

  useEffect(() => {
    scrollToElement(pageRef);

  }, []);


  return (
    <S.MyDetails
      onSubmit={(event) => handleSubmit(onSubmit)(event)}
      onError={onError}
      data={{
        firstName: myDetails?.firstName,
        lastName: myDetails?.lastName,
        email: myDetails?.email,
        phoneNumber: myDetails?.phoneNumber,
        address: myDetails?.address
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
          key="my_details"
          control={control}
          formState={formState}
          register={register}
          schema={schema}
          golfersDetails={myDetails}
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
                label={`Continue to ${goToReview ? steps[2]?.title : steps[currentStep + 1]?.title}`}
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
