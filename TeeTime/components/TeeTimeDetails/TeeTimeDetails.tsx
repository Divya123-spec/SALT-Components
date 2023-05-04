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
import { FormHeader, FormBody, FormFooter } from '@exo/frontend-components-forms';
import mapValues from 'lodash/mapValues';
import { useIsAuthenticated } from '@azure/msal-react';
import * as S from './TeeTimeDetails.styles';
import { TeeTimeContext } from '../../context/TeeTimeContext';
import { ButtonWrapper } from '../../../../ButtonWrapper/ButtonWrapper';
import { ButtonUI } from '../../../../ButtonUI/ButtonUI';
import { Tee } from './Tee';
import { scrollToElement } from '../../utils';
import { useGetUserDetails } from '../../../Profile/hooks/useGetUserDetails';

const schema = yup
  .object()
  .shape({
    course: yup.string().required('Please select a golf course'),
    adultGolfers: yup.string().required('Please select at least 1 golfer'),
    under16Golfers: yup.string().required('Please select at least 1 golfer'),
    dateOfPlay: yup.string().required('Please select date of play'),
    timeOfPlay: yup.string().required('Please select time of play'),
    otherAvailability: yup.string().required(),
    otherAvailabilityStart: yup.string().when('otherAvailability', {
      is: 'true',
      then: yup
        .string()
        .required('Earliest Availability is a required field if a time range is acceptable'),
      otherwise: yup.string().notRequired()
    }),
    otherAvailabilityEnd: yup.string().when('otherAvailability', {
      is: 'true',
      then: yup
        .string()
        .required('Latest Availability is a required field if a time range is acceptable'),
      otherwise: yup.string().notRequired()
    })
  })
  .required();

const generatedSchema = yup.lazy((obj) =>
  yup
    .object(
      // @ts-ignore
      // eslint-disable-next-line consistent-return
      mapValues(obj, (val, key) => {
        if (key.toString().includes('Start_') || key.toString().includes('End_')) {
          return yup.string().notRequired();
        } else if (key.toString().includes('_')) {
          return yup.string().required();
        }
      })
    )
    .concat(schema)
);

export const TeeTimeDetails = React.forwardRef<HTMLFormElement>(
  (formID: 'teeTime_details', ref) => {
    const pageRef = useRef(null);

    const {
      onNextStep,
      steps,
      currentStep,
      teeDetails,
      setTeeDetails,
      teeNumber,
      setTeeNumber,
      goToReview,
      goToReviewPage,
      confirmed,
      setConfirmed,
      removedTee,
      setRemovedTee
    } = useContext(TeeTimeContext);
    const createTeeFieldNames = (
      id = 0,
      course = 'course_example',
      adultGolfers = '0',
      under16Golfers = '0',
      dateOfPlay,
      timeOfPlay = '00:00',
      otherAvailability = 'false',
      otherAvailabilityStart = '00:00',
      otherAvailabilityEnd = '00:00'
    ) => ({
      [id === 0 ? 'course' : `course_${id}`]: course,
      [id === 0 ? 'adultGolfers' : `adultGolfers_${id}`]: adultGolfers,
      [id === 0 ? 'under16Golfers' : `under16Golfers_${id}`]: under16Golfers,
      [id === 0 ? 'dateOfPlay' : `dateOfPlay_${id}`]: dateOfPlay,
      [id === 0 ? 'timeOfPlay' : `timeOfPlay_${id}`]: timeOfPlay,
      [id === 0 ? 'otherAvailability' : `otherAvailability_${id}`]: otherAvailability
        ?.valueOf()
        ?.toString(),
      [id === 0 ? 'otherAvailabilityStart' : `otherAvailabilityStart_${id}`]:
        otherAvailabilityStart,
      [id === 0 ? 'otherAvailabilityEnd' : `otherAvailabilityEnd_${id}`]: otherAvailabilityEnd
    });

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
    const { register, handleSubmit, formState, watch, control, reset } = useForm({
      mode: 'onChange',
      reValidateMode: 'onChange',
      defaultValues: Object.assign(
        {},
        ...teeDetails.teeDetails?.map((item, id) =>
          createTeeFieldNames(
            id,
            item.course?.value,
            item.adultGolfers?.toString(),
            String(item.under16Golfers) || '0',
            item.dateOfPlay,
            item.timeOfPlay,
            item.otherAvailability?.valueOf()?.toString(),
            item.otherAvailabilityStart,
            item.otherAvailabilityEnd
          )
        )
      ),
      resolver: yupResolver(generatedSchema)
    });

    const { isValid } = formState;
    const onError = (err) => {
      throw new Error(err);
    };

    const getTeeObject = (
      course = {
        name: '',
        value: ''
      },
      adultGolfers = 1,
      under16Golfers = 0,
      dateOfPlay = '',
      timeOfPlay = '',
      otherAvailability = false,
      otherAvailabilityStart = '',
      otherAvailabilityEnd = ''
    ) => ({
      course,
      adultGolfers,
      under16Golfers,
      dateOfPlay,
      timeOfPlay,
      otherAvailability,
      otherAvailabilityStart,
      otherAvailabilityEnd
    });

    const onSubmit = (formData) => {
      const firstTee = getTeeObject(
        {
          value: formData.course,
          name: teeDetails.teeDetails[0].course.name
        },
        Number(formData.adultGolfers),
        Number(formData.under16Golfers),
        formData.dateOfPlay,
        formData.timeOfPlay,
        formData.otherAvailability === 'true',
        formData.otherAvailabilityStart,
        formData.otherAvailabilityEnd
      );

      const otherTees = Array.from({ length: teeDetails.teeDetails.length - 1 }, (_, i) =>
        getTeeObject(
          {
            value: formData[`course_${i + 1}`],
            name: teeDetails.teeDetails[i + 1].course.name
          },
          Number(formData[`adultGolfers_${i + 1}`]),
          Number(formData[`under16Golfers_${i + 1}`]),
          formData[`dateOfPlay_${i + 1}`],
          formData[`timeOfPlay_${i + 1}`],
          formData[`otherAvailability_${i + 1}`] === 'true',
          formData[`otherAvailabilityStart_${i + 1}`],
          formData[`otherAvailabilityEnd_${i + 1}`]
        )
      );

      otherTees.unshift(firstTee);
      setTeeDetails({
        teeDetails: otherTees,
        optionalDetails: teeDetails.optionalDetails
      });
      if (goToReview) {
        goToReviewPage();
      } else {
        onNextStep();
      }
    };

    const getConfirmedData = () => {
      if (removedTee) {
        return teeDetails.teeDetails;
      }
      return Array.from({ length: confirmed.confirmedTees.length }, (_, id) => {
        const course =
          watch(id === 0 ? 'course' : `course_${id}`, teeDetails.teeDetails[id]?.course.value) ||
          teeDetails.teeDetails[id]?.course.value;

        const adultGolfers = Number(
          watch(
            id === 0 ? 'adultGolfers' : `adultGolfers_${id}`,
            teeDetails.teeDetails[id]?.adultGolfers
          ) || teeDetails.teeDetails[id]?.adultGolfers
        );

        const under16Golfers = Number(
          watch(
            id === 0 ? 'under16Golfers' : `under16Golfers_${id}`,
            teeDetails.teeDetails[id]?.under16Golfers
          ) || teeDetails.teeDetails[id]?.under16Golfers
        );

        const dateOfPlay =
          watch(
            id === 0 ? 'dateOfPlay' : `dateOfPlay_${id}`,
            teeDetails.teeDetails[id]?.dateOfPlay?.toString()
          ) || teeDetails.teeDetails[id]?.dateOfPlay?.toString();

        const timeOfPlay =
          watch(
            id === 0 ? 'timeOfPlay' : `timeOfPlay_${id}`,
            teeDetails.teeDetails[id]?.timeOfPlay
          ) || teeDetails.teeDetails[id]?.timeOfPlay;

        const otherAvailability =
          watch(
            id === 0 ? 'otherAvailability' : `otherAvailability_${id}`,
            teeDetails.teeDetails[id]?.otherAvailability
          ) || teeDetails.teeDetails[id]?.otherAvailability;

        const otherAvailabilityStart =
          watch(
            id === 0 ? 'otherAvailabilityStart' : `otherAvailabilityStart_${id}`,
            teeDetails.teeDetails[id]?.otherAvailabilityStart
          ) || teeDetails.teeDetails[id]?.otherAvailabilityStart;

        const otherAvailabilityEnd =
          watch(
            id === 0 ? 'otherAvailabilityEnd' : `otherAvailabilityEnd_${id}`,
            teeDetails.teeDetails[id]?.otherAvailabilityEnd
          ) || teeDetails.teeDetails[id]?.otherAvailabilityEnd;
        return {
          course: {
            name: teeDetails.teeDetails[id]?.course?.name,
            value: course
          },
          adultGolfers,
          under16Golfers,
          dateOfPlay,
          timeOfPlay,
          otherAvailability,
          otherAvailabilityStart,
          otherAvailabilityEnd
        };
      });
    };

    useEffect(() => {
      goToReview || (teeDetails.teeDetails[0].course.name && scrollToElement(pageRef));
      // @ts-ignore
      setTeeDetails((prev) => ({ ...prev, teeDetails: getConfirmedData() }));
      setRemovedTee(false);
    }, [confirmed.confirmedTees]);

    const renderFirstTee = (nr, item, confTees) => (
      <Tee
        setRemovedTee={setRemovedTee}
        setTeeNumber={setTeeNumber}
        id={0}
        register={register}
        control={control}
        teeDetails={item[0]}
        formState={formState}
        schema={generatedSchema}
        watchCourse={watch('course')}
        adults={watch('adultGolfers')}
        watchOtherStart={watch('otherAvailabilityStart', '06:00')}
        watchAvailability={watch('otherAvailability')}
        isValid={isValid}
        setConfirmed={setConfirmed}
        // eslint-disable-next-line react/no-array-index-key
        key={`${formID}_0`}
        confirmedTee={confTees}
        setTeeDetails={setTeeDetails}
        teeNr={nr}
        allTees={teeDetails.teeDetails}
      />
    );

    const renderTees = (nr, item, confTees) => {
      const tempArray: Array<JSX.Element> = [];
      // eslint-disable-next-line no-plusplus
      for (let id = 1; id < nr; id++) {
        confTees[id - 1]?.isConfirmed &&
          tempArray.push(
            <Tee
              setRemovedTee={setRemovedTee}
              setTeeNumber={setTeeNumber}
              id={id}
              register={register}
              control={control}
              teeDetails={item[id]}
              formState={formState}
              schema={generatedSchema}
              watchCourse={watch(`course_${id}`)}
              watchOtherStart={watch(`otherAvailabilityStart_${id}`, '06:00')}
              adults={watch(`adultGolfers_${id}`)}
              watchAvailability={watch(`otherAvailability_${id}`)}
              isValid={isValid}
              setConfirmed={setConfirmed}
              setTeeDetails={setTeeDetails}
              // eslint-disable-next-line react/no-array-index-key
              key={`${formID}_${id}`}
              confirmedTee={confTees}
              teeNr={nr}
              allTees={teeDetails.teeDetails}
            />
          );
      }
      return tempArray.map((tees) => tees);
    };

    return (
      <S.TeeTimeDetails
        onSubmit={(event) => handleSubmit(onSubmit)(event)}
        onError={onError}
        data={Object.assign(
          {},
          ...teeDetails.teeDetails?.map((item, id) =>
            createTeeFieldNames(
              id,
              item.course.value,
              item.adultGolfers?.toString(),
              String(item.under16Golfers) || '0',
              item.dateOfPlay,
              item.timeOfPlay,
              item.otherAvailability?.valueOf()?.toString(),
              item.otherAvailabilityStart,
              item.otherAvailabilityEnd
            )
          )
        )}
        form={{ reset, handleSubmit, formState }}
        ref={ref}
      >
        <FormHeader>
          <S.Heading ref={pageRef}>Tee Time Details</S.Heading>
        </FormHeader>

        <FormBody>
          {teeDetails.teeDetails &&
            confirmed.confirmedTees &&
            renderFirstTee(teeNumber, teeDetails.teeDetails, confirmed.confirmedTees)}
          {teeDetails.teeDetails &&
            confirmed.confirmedTees &&
            teeNumber > 1 &&
            renderTees(teeNumber, teeDetails.teeDetails, confirmed.confirmedTees)}
        </FormBody>

        <FormFooter>
          <ButtonWrapper variation={isValid ? 'space-between' : 'right'}>
            <>
              {isValid && confirmed.confirmedTees[0].isConfirmed && (
                <ButtonUI
                  variant="primary"
                  type="submit"
                  key="go-to-golfer-details-button"
                  icon="ArrowRight16"
                  label={`Continue to ${
                    goToReview ? steps[3]?.title : steps[currentStep + 1]?.title
                  }`}
                />
              )}
            </>
          </ButtonWrapper>
        </FormFooter>
      </S.TeeTimeDetails>
    );
  }
);
