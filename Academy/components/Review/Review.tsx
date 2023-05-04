/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React, { useContext, useEffect, useRef } from 'react';
import { emitCustomEvent } from 'react-custom-events';
import { useHistory } from 'react-router-dom';
import { LoadingIndicator } from '@exo/frontend-components-base';
import { ButtonUI, ButtonWrapper } from '../../../../index';
import { MyDetailsReview } from './components/MyDetailsReview/MyDetailsReview';
import * as S from './Review.styles';
import { AcademyContext } from '../../context/AcademyContext';
import { AcademyLessonReview } from './components/AcademyLessonReview/AcademyLessonReview';
import { useGolfAcademySubmit } from '../../hooks/useGolfAcademySubmit';
import { scrollToElement } from '../../utils';

export const Review = () => {
  const pageRef = useRef(null);

  const {
    myDetails,
    academyLessonDetails,
    setGoToReview,
    steps,
    currentStep,
    onStepBack
  } = useContext(AcademyContext);

  const { submitAcademy, loading } = useGolfAcademySubmit();
  const history = useHistory();

  const handleSubmit = () => {
    const tempDetails = { ...academyLessonDetails, howLongPlaying: academyLessonDetails.HowLongPlaying };
    submitAcademy({
      variables: {
        emailPayload: {
          templateId: 'd-728c6ecc076045c0be31b60ecacd56f5',
          data: JSON.stringify({
            academyLessonDetails: tempDetails,
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
        history.push({ pathname: '/academy/golf-lessons/book-an-academy-lesson/submitted' });
      }
    });

  };


  useEffect(() => {
    setGoToReview(false);
    scrollToElement(pageRef);

  }, []);

  return (

    <S.ReviewAndSubmitContainer>
      <S.PageContentContainer>
        <S.Header ref={pageRef}>Review &#38; Submit Application</S.Header>
        <AcademyLessonReview
          date={academyLessonDetails.dateOfLesson}
          instructor={academyLessonDetails?.specificInstructor}
          handicap={academyLessonDetails.handicap}
          experience={academyLessonDetails.HowLongPlaying}
          goals={academyLessonDetails.lessonGoals}
          other={academyLessonDetails.otherInformation}
        />

        <MyDetailsReview
          name={`${myDetails.firstName}  ${myDetails.lastName}`}
          email={myDetails.email}
          phone={myDetails.phoneNumber}
          address={myDetails.address}
        />
        {loading && <LoadingIndicator />}

      </S.PageContentContainer>

      <ButtonWrapper variation={'space-between'}>
        <>
          <S.Button
            variant="primary"
            label="Submit application"
            disabled={loading}
            icon="ArrowRight20"
            onClick={handleSubmit}
          />
        </>
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

