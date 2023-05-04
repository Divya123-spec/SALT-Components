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
  RadioButtonGroup,
  TextArea,
  TextInput
} from '@exo/frontend-components-forms';
import { CmsContainer, CmsSpot } from '@exo/frontend-content-api';
import { useIsAuthenticated } from '@azure/msal-react';
import * as S from './LessonDetails.styles';
import { AcademyContext } from '../../context/AcademyContext';
import { ButtonWrapper } from '../../../../ButtonWrapper/ButtonWrapper';
import { ButtonUI } from '../../../../ButtonUI/ButtonUI';
import { scrollToElement } from '../../utils';
import { useGetUserDetails } from '../../../Profile/hooks/useGetUserDetails';

export const LessonDetails = React.forwardRef<HTMLFormElement>(
  ({ idPrefix = 'LessonDetails' }, ref) => {
    const pageRef = useRef(null);

    const schema = yup
      .object()
      .shape({
        dateOfLesson: yup.string().required('Please select  Date'),
        haveSpecificInstructor: yup.string().notRequired(),
        specificInstructor: yup.string().notRequired(),
        lessonGoals: yup.string().required('Please tell us your goal'),
        otherInformation: yup.string().notRequired(),
        handicap: yup.string().required('Please enter handicap'),
        HowLongPlaying: yup.string().notRequired()

      })
      .required();
    const {
      onNextStep,
      steps,
      academyLessonDetails,
      setAcademyLessonDetails,
      currentStep,
      goToReview,
      goToReviewPage
    } = useContext(AcademyContext);

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
    const { register, handleSubmit, formState, control, reset, watch } = useForm({
      mode: 'all',
      defaultValues: {
        dateOfLesson: academyLessonDetails?.dateOfLesson,
        haveSpecificInstructor: academyLessonDetails?.haveSpecificInstructor?.valueOf.toString(),
        specificInstructor: academyLessonDetails?.specificInstructor,
        lessonGoals: academyLessonDetails?.lessonGoals,
        otherInformation: academyLessonDetails?.otherInformation,
        handicap: academyLessonDetails?.handicap,
        HowLongPlaying: academyLessonDetails?.HowLongPlaying
      },
      resolver: yupResolver(schema)
    });
    const { isValid } = formState;
    const showContinueButton = isValid;
    const watchInstructor = watch('haveSpecificInstructor', academyLessonDetails?.haveSpecificInstructor?.valueOf.toString());
    const onError = (err) => {
      throw new Error(err);
    };

    const onSubmit = (formData) => {
      const {
        dateOfLesson,
        haveSpecificInstructor,
        lessonGoals,
        specificInstructor,
        otherInformation,
        handicap,
        HowLongPlaying } = formData;
      setAcademyLessonDetails({
        dateOfLesson,
        haveSpecificInstructor,
        specificInstructor,
        lessonGoals,
        otherInformation,
        handicap,
        HowLongPlaying
      });
      if (goToReview) {
        goToReviewPage();
      } else {
        onNextStep();
      }
    };

    useEffect(() => {
      goToReview || academyLessonDetails.lessonGoals && scrollToElement(pageRef);
    }, []);

    return (
      <S.LessonDetails
        onSubmit={(event) => handleSubmit(onSubmit)(event)}
        onError={onError}
        data={{
          dateOfLesson: academyLessonDetails?.dateOfLesson,
          haveSpecificInstructor: academyLessonDetails?.haveSpecificInstructor?.valueOf.toString(),
          specificInstructor: academyLessonDetails?.specificInstructor,
          lessonGoals: academyLessonDetails?.lessonGoals,
          otherInformation: academyLessonDetails?.otherInformation,
          handicap: academyLessonDetails?.handicap,
          HowLongPlaying: academyLessonDetails?.HowLongPlaying
        }}
        form={{ reset, handleSubmit, formState }}
        ref={ref}
      >
        <FormHeader>
          <S.Heading ref={pageRef}>Academy lesson details</S.Heading>
        </FormHeader>

        <FormBody>
          <Field>
            <TextInput
              id={`dateOfLesson_${idPrefix}`}
              {...register('dateOfLesson')}
              value={academyLessonDetails?.dateOfLesson.toString()}
              control={control}
              // @ts-ignore
              isRequired={isRequired(schema, 'dateOfLesson', true) ?? true}
              errorText={formState.errors?.dateOfLesson?.message}
              labelText="Please specify your preferred date and time for a lesson at the golf academy"
              placeholderText="Enter date and time"
              className="formDate"
              key={`dateOfLesson_${idPrefix}`}
            />
          </Field>
          <Field >
            <RadioButtonGroup
              id={`haveSpecificInstructor_${idPrefix}`}
              {...register('haveSpecificInstructor')}
              // @ts-ignore
              isRequired={isRequired(schema, 'haveSpecificInstructor', false)}
              control={control}
              value={academyLessonDetails?.haveSpecificInstructor?.valueOf.toString()}
              labelText="Would you like to request a specific instructor?"
              items={[
                { value: 'true', name: 'Yes' },
                { value: 'false', name: 'No' }
              ]}
              key={`haveSpecificInstructor_${idPrefix}`}
            />
          </Field>
          {watchInstructor === 'true' &&
            <Field className="golf_dropdown">
              <CmsContainer name="" spec={{ content_type: 'employee', filter: 'instructor', limit: '999' }}>
                <CmsSpot
                  name=""
                  spec={{ content_type: 'employee' }}
                  render={({ items }) => (
                    <S.StyledDropdown
                      id={`${idPrefix}_specificInstructor`}
                      {...register('specificInstructor')}
                      control={control}
                      isRequired={isRequired(schema, 'specificInstructor', false)}
                      value={academyLessonDetails?.specificInstructor}
                      errorText={formState.errors.specificInstructor?.message}
                      labelText="Which instructor would you like to request?"
                      placeholderText="Select Instructor"
                      items={items.map((item) => ({
                        value: item.elements.name.value,
                        name: item.elements.name.value
                      })).sort((a, b) => {
                        const nameA = a.name.toUpperCase();
                        const nameB = b.name.toUpperCase();
                        if (nameA < nameB) {
                          return -1;
                        }
                        if (nameA > nameB) {
                          return 1;
                        }
                        return 0;
                      })}
                      key={`${idPrefix}_specificInstructor`}
                    />
                  )}
                />
              </CmsContainer>
            </Field>
          }

          <Field>
            <TextInput
              id={`${idPrefix}_handicap`}
              {...register('handicap')}
              control={control}
              errorText={formState.errors?.handicap?.message}
              isRequired={isRequired(schema, 'handicap', true)}
              value={academyLessonDetails?.handicap}
              labelText="Handicap"
              placeholderText="Enter handicap"
              key={`${idPrefix}_handicap`}
            />
          </Field>
          <Field>
            <TextInput
              id={`${idPrefix}_HowLongPlaying`}
              {...register('HowLongPlaying')}
              control={control}
              errorText={formState.errors?.HowLongPlaying?.message}
              isRequired={isRequired(schema, 'HowLongPlaying', false)}
              value={academyLessonDetails?.HowLongPlaying}
              labelText="How many years have you been playing golf? "
              placeholderText="Enter years"
              key={`${idPrefix}_HowLongPlaying`}
            />
          </Field>
          <Field>
            <TextArea
              id={`${idPrefix}_lessonGoals`}
              {...register('lessonGoals')}
              control={control}
              errorText={formState.errors?.lessonGoals?.message}
              isRequired={isRequired(schema, 'lessonGoals', true)}
              value={academyLessonDetails?.lessonGoals}
              labelText="What would you like to achieve from this lesson?"
              placeholderText="Enter lesson goals"
              key={`lessonGoals_${idPrefix}`}

            />
          </Field>
          <Field>
            <TextArea
              id={`${idPrefix}_otherInformation`}
              {...register('otherInformation')}
              control={control}
              errorText={formState.errors?.otherInformation?.message}
              isRequired={isRequired(schema, 'otherInformation', true)}
              value={academyLessonDetails?.otherInformation}
              labelText="Is there anything else you'd like to tell us?"
              placeholderText="Enter extra information"
              key={`otherInformation_${idPrefix}`}

            />
          </Field>
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
            </>
          </ButtonWrapper>
        </FormFooter>
      </S.LessonDetails>
    );
  }
);
