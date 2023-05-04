/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React, { useEffect, useContext, useRef } from 'react';
import { emitCustomEvent } from 'react-custom-events';
import { useHistory } from 'react-router-dom';
import { LoadingIndicator } from '@exo/frontend-components-base';
import { LayoutSpacing } from '@exo/frontend-components-core';
import { useTeeTimeSubmit } from '../../hooks/useTeeTimeSubmit';
import * as S from './Review.styles';
import { ButtonWrapper, ButtonUI } from '../../../../index';
import { TeeTimeContext } from '../../context/TeeTimeContext';
import { TeeTimeReview } from './components/TeeTimesReview/TeeTimeReview';
import { NotificationComponent } from '../../../../NotificationComponent/NotificationComponent';
import { ExtrasReview } from './components/ExtrasReview/ExtrasReview';
import { GolferDetailsReview } from './components/GolferDetailsReview/GolferDetailsReview';
import { MyDetailsReview } from './components/MyDetailsReview/MyDetailsReview';
import { scrollToElement } from '../../utils';

export const Review = () => {
  const {
    teeDetails,
    myDetails,
    steps,
    currentStep,
    setGoToReview,
    onStepBack,
    setConfirmed,
    setTeeDetails,
    setTeeNumber,
    onAnyStepBack,
    setRemovedTee,
    setMyDetails
  } = useContext(TeeTimeContext);
  const pageRef = useRef(null);

  useEffect(() => {
    setGoToReview(false);
    scrollToElement(pageRef);

  }, []);

  const { submitTeeTime, loading } = useTeeTimeSubmit();
  const history = useHistory();

  const onRemove = () => { };

  const notification = {
    id: 'packageRequest',
    kind: 'info',
    title: 'Payment for tee time',
    subtitle:
      'Full payment will be required when the booking is confirmed and should be made using the secure payment link on the email confirmation or by the lead golfer contacting the Reservations Department on + 44 1334 466718. Please note that Green fees are non refundable.'
  } as Notifications;

  const handleSubmit = () => {
    teeDetails.teeDetails.forEach((item) => Object.assign(item, { course: item.course.name }));
    submitTeeTime({
      variables: {
        emailPayload: {
          templateId: 'd-58c98b02b54441e19968a152d010dff3',
          data: JSON.stringify({
            teeDetails: teeDetails.teeDetails,
            myDetails
          })
        }
      },
      errorPolicy: 'all'
    }).then(({ errors }) => {
      if (errors) {
        emitCustomEvent('salt-submission-error', {
          title: 'Submission Error',
          message: 'Please try again later'
        });
      } else {
        history.push({ pathname: '/request-a-tee-time/submitted' });
      }
    });
  };
  useEffect(() => {
    // @ts-ignore
    setMyDetails((prev) => ({ ...prev, otherDetailsAboutBooking: teeDetails.optionalDetails }));
  }, []);

  return (
    <S.Review>
      <S.Heading ref={pageRef}>Review &#38; Submit</S.Heading>
      {teeDetails.teeDetails && (
        <TeeTimeReview
          teeTime={teeDetails.teeDetails}
          setConfirmed={setConfirmed}
          setTeeDetails={setTeeDetails}
          setTeeNumber={setTeeNumber}
          goToStep={onAnyStepBack}
          setRemovedTee={setRemovedTee}
          setGoToReview={setGoToReview}
        />
      )}

      <MyDetailsReview
        name={`${myDetails.myDetails.firstName}  ${myDetails.myDetails.lastName}`}
        email={myDetails.myDetails.email}
        phone={myDetails.myDetails?.phoneNumber}
        country={myDetails.myDetails?.country}
        homeClub={myDetails.myDetails?.address}
      />
      <GolferDetailsReview leadGolfer={myDetails?.leadGolfer} />
      <ExtrasReview teeTime={teeDetails} />
      <LayoutSpacing size="sm" />
      <NotificationComponent notification={notification} onRemove={onRemove} />
      <S.NotificationSpacer />
      {loading && <LoadingIndicator />}

      <ButtonWrapper variation="space-between">
        <ButtonUI
          variant="primary"
          label="Submit booking request"
          icon="ArrowRight20"
          onClick={handleSubmit}
          disabled={loading}
        />
        <ButtonUI
          variant="ghost"
          type="button"
          label={`Back to ${steps[currentStep - 1]?.title}`}
          onClick={onStepBack}
          className="backButton"
        />
      </ButtonWrapper>
    </S.Review>
  );
};

type Notifications = {
  id: string;
  kind?: 'info' | 'error' | 'info-square' | 'success' | 'warning' | 'warning-alt';
  title: string;
  subtitle: string;
  cta?: React.ReactElement;
};
