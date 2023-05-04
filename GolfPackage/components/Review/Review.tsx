/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React, { useContext, useEffect, useRef } from 'react';
// import { emitCustomEvent } from 'react-custom-events';
import { emitCustomEvent } from 'react-custom-events';
import { useHistory } from 'react-router-dom';
import { LoadingIndicator } from '@exo/frontend-components-base';
import { ButtonUI, ButtonWrapper, NotificationComponent } from '../../../../index';
import { GolferDetailsReview } from './components/GolferDetailsReview/GolferDetailsReview';
import { MyDetailsReview } from './components/MyDetailsReview/MyDetailsReview';
import * as S from './Review.styles';
import { GolfPackageContext } from '../../context/GolfPackageContext';
import { PackageDetailsReview } from './components/PackageDetails/PackageDetailsReview';
import { TeeTimeReview } from './components/TeeTimesReview/TeeTimeReview';
import { useGolfPackageSubmit } from '../../hooks/useGolfPackageSubmit';
import { scrollToElement } from '../../utils';

export const Review = () => {
  const pageRef = useRef(null);

  const {
    packageDetails,
    myDetails,
    isLeadGolfer,
    leadGolfer,
    otherGolfers,
    teeTimes,
    setGoToReview,
    steps,
    currentStep,
    onStepBack
  } = useContext(GolfPackageContext);

  const { submitPressArea, loading } = useGolfPackageSubmit();
  const history = useHistory();

  const handleSubmit = () => {
    const packageName = packageDetails.golfPackage.name;
    Object.assign(packageDetails, { golfPackage: packageDetails.golfPackage.name });
    teeTimes.forEach((item) => Object.assign(item, { course: item.course.name }));
    otherGolfers.unshift(leadGolfer);
    submitPressArea({
      variables: {
        emailPayload: {
          templateId: (packageName === 'Winter Package') ? 'd-049ab86e81e6427f9c1b6127042a6b35' : 'd-ffa6a132046d41f38d40e64348345063',
          data: JSON.stringify({
            packageDetails,
            myDetails,
            isLeadGolfer,
            otherGolfers,
            teeTimes
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
        history.push({ pathname: '/offers-and-packages/book-a-golf-package/submitted' });
      }
    });
  };

  useEffect(() => {
    setGoToReview(false);
    scrollToElement(pageRef);

  }, []);

  const onRemove = () => { };
  const notification = {
    id: 'packageRequest',
    kind: 'info',
    title: 'Payment for tee time',
    subtitle:
      'Full payment will be required when the booking is confirmed and should be made using the secure payment link on the email confirmation or by the lead golfer contacting the Reservations Department on + 44 1334 466718. Please note that Green fees are non refundable.'
  } as Notifications;
  return (
    <S.ReviewAndSubmitContainer>
      <S.PageContentContainer>
        <S.Header ref={pageRef}>Review &#38; Submit Application</S.Header>
        <PackageDetailsReview
          name={packageDetails.golfPackage.name}
          adults={packageDetails.adultGolfers.toString()}
          minors={packageDetails.under16Golfers.toString()}
        />
        {teeTimes[0]?.course.value && <TeeTimeReview teeTime={teeTimes} />}
        <MyDetailsReview
          name={`${myDetails.firstName}  ${myDetails.lastName}`}
          email={myDetails.email}
          phone={myDetails.phoneNumber}
          country={myDetails.country}
          address={myDetails.address}
        />
        <GolferDetailsReview leadGolfer={leadGolfer} golfers={otherGolfers} />
        {loading && <LoadingIndicator />}
        <S.CustomSpacer />
        <NotificationComponent notification={notification} onRemove={onRemove} />
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
