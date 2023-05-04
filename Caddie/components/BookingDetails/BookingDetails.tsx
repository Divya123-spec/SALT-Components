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
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  FormHeader,
  FormBody,
  FormFooter,
  Field,
  TextInput,
  isRequired
} from '@exo/frontend-components-forms';
import { LoadingIndicator } from '@exo/frontend-components-base';
import { emitCustomEvent } from 'react-custom-events';
import { useIsAuthenticated } from '@azure/msal-react';
import * as S from './BookingDetails.styles';
import { CaddieContext } from '../../context/CaddieContext';
import { ButtonWrapper } from '../../../../ButtonWrapper/ButtonWrapper';
import { ButtonUI } from '../../../../ButtonUI/ButtonUI';
import { useBookingRef } from '../../hooks/useBookingRef';
import { scrollToElement, isoDateToUkTime } from '../../utils';
import { useGetUserDetails } from '../../../Profile/hooks/useGetUserDetails';

const schema = yup
  .object()
  .shape({
    itinerary: yup.string().required('Please enter your booking reference')
  })
  .required();


export const BookingDetails = React.forwardRef<HTMLFormElement>(({ idPrefix = 'myDetails' }, ref) => {
  const pageRef = useRef(null);

  const {
    onNextStep,
    steps,
    currentStep,
    goToReview,
    itinerary,
    setItinerary,
    setTeeTimeDetails,
    goToReviewPage
  } = useContext(CaddieContext);

  const isAuthenticated = useIsAuthenticated();
    if(isAuthenticated) {
      if (typeof window !== 'undefined' && window.sessionStorage.userDetails) {
        const result = JSON.parse(window.sessionStorage.userDetails);
        const userValues = result.idTokenClaims; 
        let emailID = '';
        if(result && userValues){
          emailID = userValues && userValues.email ? userValues.email: userValues.emails[0];
        }
        // eslint-disable-next-line 
        const { userDetails, loading } = useGetUserDetails(emailID)!;
        if(userDetails && !loading) {
          window.sessionStorage.setItem('profileData', JSON.stringify(userDetails));
        }
      }
    }
  const { register, handleSubmit, formState, control, reset, getValues, watch } = useForm(
    {
      mode: 'all',
      defaultValues: {
        itinerary
      },
      resolver: yupResolver(schema)
    }
  );
  const { data, loading, error, getBookingDetails } = useBookingRef();

  const { isValid } = formState;

  const onError = (err) => {
    throw new Error(err);
  };

  const getTeeObject = (
    bookingRef = '',
    date = '',
    time = '',
    course = '',
    numberOfGolfers = 1,
    numberOfCaddies = 1
  ) => ({
    bookingRef,
    date: new Date(date).toLocaleDateString('en-GB', { timeZone: 'Europe/London' }).split(',')[0],
    time: isoDateToUkTime(date, time),
    course,
    numberOfGolfers,
    numberOfCaddies
  });
  // eslint-disable-next-line consistent-return
  const onSubmit = () => {
    if (itinerary) {
      return onNextStep();
    }
    const formItinerary = data.getBookingDetails.itinerary || data.getBookingDetails.name.split(':')[1].trim();
    const teeTimeDetails = data.getBookingDetails.tees.map(tee => getTeeObject(
      tee?.bookingRef,
      tee?.date,
      tee?.time,
      tee?.course?.courseName,
      tee?.numberOfGolfers,
      tee?.numberOfCaddies
    ));

    setItinerary(formItinerary);
    setTeeTimeDetails(teeTimeDetails);

    if (goToReview) {
      goToReviewPage();
    } else {
      onNextStep();
    }
  };

  useEffect(() => {
    goToReview || itinerary && scrollToElement(pageRef);
    emitCustomEvent('bypass-gql', true);


  }, []);


  const [hasToFetch, setHasToFetch] = useState(false);
  const showContinueButton = itinerary.length > 0 || !hasToFetch && data && isValid;

  const handleBlur = (e) => {
    getBookingDetails({ variables: { itinerary: e } });
    setHasToFetch(false);
  };
  useEffect(() => {
    !itinerary && watch('itinerary') !== undefined && watch('itinerary')?.length > 0 && setHasToFetch(true);
  }, [watch('itinerary')]);

  return (
    <S.MyDetails
      onSubmit={(event) => handleSubmit(onSubmit)(event)}
      onError={onError}
      data={{
        itinerary
      }}
      form={{ reset, handleSubmit, formState }}
      ref={ref}
    >
      <FormHeader>
        <S.Heading ref={pageRef}>Booking details</S.Heading>
      </FormHeader>

      <FormBody>
        <S.Description>Enter your itinerary or individual booking confirmation so we can retrieve your confirmed tee times.</S.Description>
        <Field>
          {
            loading && <LoadingIndicator />
          }
          <TextInput
            id={`${idPrefix}_itinerary`}
            {...register('itinerary')}
            control={control}
            errorText={error && 'Your booking reference number cannot be found'}
            isRequired={isRequired(schema, 'itinerary', true)}
            value={itinerary}
            labelText=""
            placeholderText="Enter Itinerary / Booking confirmation"
            key={`${idPrefix}_itinerary`}
          />

        </Field>
      </FormBody>

      <FormFooter>
        <ButtonWrapper variation={'space-between'}>
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
            {!showContinueButton && hasToFetch && (
              <ButtonUI
                variant="primary"
                type="button"
                key="go-to-golfer-details-button"
                icon="ArrowRight16"
                label='Retrieve booking'
                onClick={() => (handleBlur(getValues('itinerary')))}
              />
            )}
          </>
        </ButtonWrapper>
      </FormFooter>
    </S.MyDetails>
  );
});
