/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React, { useContext, useEffect, useRef } from 'react';
import { emitCustomEvent } from 'react-custom-events';
import { LayoutSpacing } from '@exo/frontend-components-core';
import { useHistory } from 'react-router-dom';
import { LoadingIndicator } from '@exo/frontend-components-base';
import { ButtonUI, ButtonWrapper, NotificationComponent } from '../../../../index';
import { MyDetailsReview } from './components/MyDetailsReview/MyDetailsReview';
import * as S from './Review.styles';
import { CaddieContext } from '../../context/CaddieContext';
import { useCaddieSubmit } from '../../hooks/useCaddieSubmit';
import { BookingDetailsReview } from './components/BookingDetailsReview/BookingDetailsReview';
import { CaddieDetails } from './components/CaddieDetails/CaddieDetails';
import { scrollToElement } from '../../utils';

export const Review = () => {
  const {
    myDetails,
    itinerary,
    teeTimeDetails,
    additionalInformation,
    setGoToReview,
    steps,
    currentStep,
    onStepBack
  } = useContext(CaddieContext);
  const pageRef = useRef(null);

  const { submitPressArea, loading } = useCaddieSubmit();
  const history = useHistory();

  const handleSubmit = () => {
    submitPressArea({
      variables: {
        emailPayload: {
          templateId: 'd-5c77402b1abc4d0296ab7c71427b829a',
          data: JSON.stringify({
            itinerary,
            teeTimeDetails,
            additionalInformation,
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
        history.push({ pathname: '/golf/caddie-services/request-caddie/submitted' });
      }
    });

  };


  useEffect(() => {
    setGoToReview(false);
    scrollToElement(pageRef);

  }, []);

  const onRemove = () => { };
  const notification = {
    id: 'caddie_request',
    kind: 'info',
    title: 'Payment for caddie',
    subtitle: 'Full payment will be required on the day of play and is to be paid in cash (GBP) directly to the caddie'
  } as Notifications;
  return (
    <S.ReviewAndSubmitContainer>
      <S.PageContentContainer>
        <S.Header ref={pageRef}>Review &#38; Submit Application</S.Header>

        <BookingDetailsReview
          bookingRef={itinerary}
        />
        <CaddieDetails
          additionalInformation={additionalInformation}
          teeTime={teeTimeDetails}
        />
        <MyDetailsReview
          name={`${myDetails?.firstName}  ${myDetails?.lastName}`}
          email={myDetails?.email}
          phone={myDetails?.phoneNumber}
        />

        <LayoutSpacing size='l' />
        <NotificationComponent notification={notification} onRemove={onRemove} />
        {loading && <LoadingIndicator />}
      </S.PageContentContainer>
      <ButtonWrapper variation={'space-between'}>
        <S.Button
          variant="primary"
          label="Submit application"
          disabled={loading}
          icon="ArrowRight20"
          onClick={handleSubmit}
        />
        <ButtonUI
          variant="ghost"
          type="button"
          label={`Back to ${steps[currentStep - 1]?.title}`}
          onClick={onStepBack}
          className="backButton"
        />
      </ButtonWrapper>
    </S.ReviewAndSubmitContainer>
  );
};

type Notifications = {
  id: string;
  kind?: 'info' | 'error' | 'info-square' | 'success' | 'warning' | 'warning-alt';
  title: string;
  subtitle: string;
  cta?: React.ReactElement;
};
