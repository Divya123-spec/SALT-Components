/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import {
  FormBody,
  FormFooter,
  FormHeader
} from '@exo/frontend-components-forms';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import mapValues from 'lodash/mapValues';
import { LayoutSpacing } from '@exo/frontend-components-core';
import { ButtonUI, ButtonWrapper } from '../../../../index';
import * as S from './TeeTime.styles';
import { GolfPackageContext } from '../../context/GolfPackageContext';
import { GetCMSData } from '../../utils/getCMSData';
import { Tee } from './Tee';
import { scrollToElement } from '../../utils';

const schema = yup.lazy((obj) =>
  yup.object(
    // @ts-ignore
    mapValues(obj, (val, key) => {
      if (key.toString().startsWith('otherAvailability')) {
        return yup.string();
      } else if (key.toString().startsWith('dateOfPlay')) {
        return yup.string().nullable();
      }

      return yup.string().required('Please fill this field');
    })
  )
);
export const TeeTime = React.forwardRef<HTMLFormElement>(({ idPrefix = 'tee_time' }, ref) => {

  const [maxNrOfTees, setMaxTees] = useState(0);
  const [courses, setCourses] = useState<Array<{ value; name }>>([]);
  const [mandCourse, setMandCourse] = useState<Array<{ value; name }>>([]);
  const [requiredDate, setRequiredDate] = useState(true);
  const [requiredTime, setRequiredTime] = useState('yes30');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [startTime, setstartTime] = useState('06:00');
  const [endTime, setendTime] = useState('18:00');
  const pageRef = useRef(null);

  const {
    packageDetails,
    teeTimes,
    nrOfTees,
    setNrOfTees,
    setTeeTimes,
    onNextStep,
    onStepBack,
    steps,
    currentStep,
    goToReview,
    goToReviewPage
  } = useContext(GolfPackageContext);

  const createTeeFieldNames = (
    id = 0,
    course = '',
    timeOfPlay = '',
    dateOfPlay,
    otherAvailability = '',
    otherAvailabilityStart = '',
    otherAvailabilityEnd = ''
  ) => ({
    [`courseRequested_${id}`]: course,
    [`timeOfPlay_${id}`]: timeOfPlay,
    [`dateOfPlay_${id}`]: dateOfPlay,
    [`hasOtherAvailability_${id}`]: otherAvailability.valueOf().toString(),
    [`otherAvailability_start_${id}`]: otherAvailabilityStart,
    [`otherAvailability_end_${id}`]: otherAvailabilityEnd
  });

  const { register, handleSubmit, formState, watch, control, reset, setValue } = useForm({
    mode: 'all',
    defaultValues: Object.assign({}, ...teeTimes.map((item, id) => (
      createTeeFieldNames(
        id,
        item.course.value,
        item.timeOfPlay,
        item.dateOfPlay,
        item.otherAvailability.valueOf().toString(),
        item.otherAvailabilityStart,
        item.otherAvailabilityEnd
      )
    ))),
    resolver: async (data, context, options) => yupResolver(schema)(data, context, options)
  });
  const { isValid } = formState;

  const onError = (err) => {
    throw new Error(err);
  };

  const getTeeTimeObject = (
    course = {
      value: '',
      name: ''
    },
    timeOfPlay = '',
    dateOfPlay = '',
    otherAvailability = '',
    otherAvailabilityStart = '',
    otherAvailabilityEnd = ''
  ) => ({
    course,
    timeOfPlay,
    dateOfPlay,
    otherAvailability,
    otherAvailabilityStart,
    otherAvailabilityEnd
  });
  const onSubmit = (formData) => {
    const formTeeTimes = Array.from({ length: nrOfTees }, (_, i) =>
      getTeeTimeObject(
        {
          value: formData[`courseRequested_${i}`],
          name: document.getElementById(`${i}_courseRequested_${i}`)?.innerText || ''
        },
        formData[`timeOfPlay_${i}`],
        formData[`dateOfPlay_${i}`],
        formData[`hasOtherAvailability_${i}`],
        formData[`otherAvailability_start_${i}`],
        formData[`otherAvailability_end_${i}`]
      )
    );
    setTeeTimes(formTeeTimes);
    if (goToReview) {
      goToReviewPage();
    } else {
      onNextStep();
    }
  };

  const onGoBack = () => {
    onStepBack();
  };

  useEffect(() => {
    scrollToElement(pageRef);
    const listener = document.addEventListener('cms_golf_package', (e) => {
      // @ts-ignore
      const { reqDate, reqTime, start, end, cmsCourse, mandatoryCourse, maxTees, start_Time, end_Time } = e.detail;
      setMaxTees(Number(maxTees));
      mandatoryCourse && setMandCourse(mandatoryCourse);
      cmsCourse && setCourses(cmsCourse);
      start && setStartDate(start);
      end && setEndDate(end);
      reqDate && setRequiredDate(reqDate);
      reqTime && setRequiredTime(reqTime);
      start_Time && setstartTime(start_Time);
      end_Time && setendTime(end_Time);

    });
    return () => {
      // @ts-ignore
      document.removeEventListener('cms_golf_package', listener);
    };
  }, []);


  return (
    <S.TeeTime
      onSubmit={(event) => handleSubmit(onSubmit)(event)}
      onError={onError}
      data={Object.assign({}, ...teeTimes.map((item, id) => (
        createTeeFieldNames(
          id,
          item.course.value,
          item.timeOfPlay,
          item.dateOfPlay || '',
          item.otherAvailability.valueOf().toString(),
          item.otherAvailabilityStart,
          item.otherAvailabilityEnd
        )
      )))}
      intlPrefix={'form'}
      form={{ reset, handleSubmit, formState }}
      ref={ref}
    >
      <FormHeader>
        <S.Heading ref={pageRef}>Tee time details</S.Heading>
        <S.HeadlineDescription>
          You are required to book a tee time in advance for the package selected. Select the date
          and time you’d like to play.
        </S.HeadlineDescription>
      </FormHeader>
      <FormBody>
        <GetCMSData name={packageDetails.golfPackage.value} content_type="offers_and_packages" />

        {Array.from({ length: nrOfTees }).map((_tee, id) => (
          <Tee
            id={id}
            courses={courses}
            mandCourse={mandCourse}
            register={register}
            watch={watch}
            formState={formState}
            teeTimes={teeTimes}
            control={control}
            schema={schema}
            setValue={setValue}
            requiredDate={requiredDate}
            requiredTime={requiredTime}
            startDate={startDate}
            endDate={endDate}
            startTime={startTime}
            endTime={endTime}
            // eslint-disable-next-line react/no-array-index-key
            key={`${idPrefix}_tee_nr_${id}`}
          />
        ))}

        <LayoutSpacing size="sm" />
        {nrOfTees < maxNrOfTees && (
          <>
            <S.HeadlineDescription>
              You can request to book additional tee times on other courses in this request form.
              You can add up to {maxNrOfTees - nrOfTees} additional tee times.
            </S.HeadlineDescription>
            <ButtonUI
              variant="tertiary"
              label="Add another tee time"
              onClick={() => setNrOfTees(nrOfTees + 1)}
              icon="Add32"
            />
          </>
        )}
      </FormBody>
      <FormFooter>
        <ButtonWrapper variation={isValid ? 'space-between' : 'right'}>
          <>
            {isValid && (
              <ButtonUI
                variant="primary"
                type="submit"
                label={`Continue to ${goToReview ? steps[3]?.title : steps[currentStep + 1]?.title}`}
                icon="ArrowRight32"
              />
            )}
          </>
          <ButtonUI
            variant="ghost"
            type="button"
            label={`Back to ${steps[currentStep - 1]?.title}`}
            onClick={onGoBack}
            className="backButton"
          />
        </ButtonWrapper>
      </FormFooter>
    </S.TeeTime>
  );
});
