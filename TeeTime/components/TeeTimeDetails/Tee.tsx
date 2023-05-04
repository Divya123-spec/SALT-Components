/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import {
  DateInput,
  Field,
  FieldRow,
  isRequired,
  RadioButtonGroup
} from '@exo/frontend-components-forms';
import { CmsContainer, CmsSpot } from '@exo/frontend-content-api';
import React, { useEffect, useRef, useState } from 'react';
import { ButtonUI } from '../../../../ButtonUI/ButtonUI';
import { addDays, getMinDate } from '../../../GolfPackage/utils/calendarUtilis';
import { GetCMSData } from '../../utils/getCMSData';
import { generateTime } from '../../utils/timeOptions';
import { TeeReview } from '../TeeReview/TeeReview';
import * as S from './TeeTimeDetails.styles';

export const Tee = ({
  id,
  setTeeNumber,
  register,
  control,
  teeDetails,
  formState,
  schema,
  watchCourse,
  adults,
  watchAvailability,
  watchOtherStart,
  isValid,
  setConfirmed,
  confirmedTee,
  teeNr,
  setTeeDetails,
  setRemovedTee,
  allTees
}) => {
  const [minimumGolfers, setMinimumGolfers] = useState(2);
  // maximumGolfers was useState(4) maximum 4 golfers per TeeTime
  const [maximumGolfer, setMaxGolfers] = useState(100);
  const [nrOfGolfers, setNrOfGolfers] = useState<Array<{ value; name }>>();
  const [minorsGolfers, setMinors] = useState<Array<{ value; name }>>();
  const [startDate, setStartDate] = useState(new Date().toISOString());
  const [endDate, setEndDate] = useState('');
  // Nu vin din CMS
  const [timeStart, setStartTime] = useState('09:00');
  const [timeEnd, setEndTime] = useState('17:00');
  const [cmscourseName, setCourseName] = useState('');
  const titleRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    const tempArray: Array<{ value: any; name: any }> = [];
    // eslint-disable-next-line no-plusplus
    for (let i = minimumGolfers; i <= maximumGolfer; i++) {
      tempArray.push({
        value: String(i),
        name: String(i)
      });
    }
    setNrOfGolfers(tempArray);
  }, [maximumGolfer, minimumGolfers]);

  useEffect(() => {
    const tempMinors: Array<{ value: any; name: any }> = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i <= maximumGolfer; i++) {
      tempMinors.push({
        value: String(i),
        name: String(i)
      });
    }
    setMinors(tempMinors);
  }, [minimumGolfers]);


  useEffect(() => {
    const listener = document.addEventListener('cms_tee_time', (e) => {
      // @ts-ignore
      const { minGolfers, maxGolfers, maxTees, start, end, endTime, startTime } = e.detail;
      minGolfers && setMinimumGolfers(Number(minGolfers));
      end && setEndDate(end);
      start && setStartDate(start);
      maxGolfers && setMaxGolfers(Number(maxGolfers));
      startTime?.length > 0 && setStartTime(startTime);
      endTime?.length > 0 && setEndTime(endTime);
    });
    return () => {
      // @ts-ignore
      document.removeEventListener('cms_tee_time', listener);
    };
  }, []);
  useEffect(() => {
    const listener = document.addEventListener('cms_tee_time', (e) => {
      // @ts-ignore
      const { courseName } = e.detail;
      courseName && setCourseName(courseName);
    });
    return () => {
      // @ts-ignore
      document.removeEventListener('cms_tee_time', listener);
    };
  }, [watchCourse]);


  const buildCourseDropDownItems = (items: any) => {
    const dropDownItems: Array<{ name: string; value: string }> = [];
    for (const item of items) {
      if (item.elements?.excluded_in_form?.value[0]?.codename !== 'yes' && allTees.filter(tee => tee.course.value === item.system.codename).length < item.elements?.max_number_tee_times?.value) {
        dropDownItems.push({ name: item.elements.title.value, value: item.system.codename });
      }
    }

    return dropDownItems;
  };


  return (
    <S.TeeContainer key={`teeTime_Nr_${id}_${teeDetails?.course?.value}`}>
      {!confirmedTee[id]?.isConfirmed ? (
        <>
          <S.TeeTitle ref={titleRef}>Tee Time {id + 1}</S.TeeTitle>
          <Field className="golf_dropdown">
            <CmsContainer name="" spec={{ content_type: 'courses', limit: '99' }}>
              <CmsSpot
                name=""
                spec={{ content_type: 'courses' }}
                render={({ items }) => (
                  <S.StyledDropdown
                    id={`course_${id}_golf_dropdown`}
                    {...register(id === 0 ? 'course' : `course_${id}`)}
                    control={control}
                    isRequired={
                      isRequired(schema, id === 0 ? 'course' : `course_${id}`, true) ?? true
                    }
                    value={teeDetails?.course?.name}
                    errorText={formState?.errors[id === 0 ? 'course' : `course_${id}`]?.message}
                    labelText="Golf course"
                    placeholderText="Select Golf Course"
                    items={buildCourseDropDownItems(items)}
                  />
                )}
              />
            </CmsContainer>
            {watchCourse && (
              <>
                <CmsContainer name={watchCourse} key={`${watchCourse}_container`}>
                  <CmsSpot
                    name=""
                    spec={{ content_type: 'courses', richTextFieldName: 'table' }}
                    key={`${watchCourse}_spot`}
                  />
                </CmsContainer>
                <GetCMSData content_type="courses" name={watchCourse} />
              </>
            )}
          </Field>
          <Field className="golf_dropdown">
            <S.Description>
              Proof of age may be required at the starter for golfers under 16. Please refer to
              green fees table for the total price of the booking based on dates selected.
            </S.Description>
            <FieldRow widths={['50%', '50%']}>
              {nrOfGolfers && (
                <S.StyledDropdown
                  id={`total_adult_golfers_${id}`}
                  {...register(id === 0 ? 'adultGolfers' : `adultGolfers_${id}`)}
                  control={control}
                  isRequired={
                    isRequired(schema, id === 0 ? 'adultGolfers' : `adultGolfers_${id}`, true) ??
                    true
                  }
                  value={teeDetails?.adultGolfers?.toString()}
                  errorText={
                    formState.errors[id === 0 ? 'adultGolfers' : `adultGolfers_${id}`]?.message
                  }
                  labelText="Total adult golfers"
                  placeholderText="Select total adult golfers"
                  items={nrOfGolfers}
                />
              )}

              {minorsGolfers && (
                <S.StyledDropdown
                  id={`total_minor_golfers_${id}`}
                  {...register(id === 0 ? 'under16Golfers' : `under16Golfers_${id}`)}
                  control={control}
                  isRequired={
                    isRequired(
                      schema,
                      id === 0 ? 'under16Golfers' : `under16Golfers_${id}`,
                      true
                    ) ?? true
                  }
                  value={String(teeDetails?.under16Golfers) || minorsGolfers[0].value}
                  errorText={
                    formState.errors[id === 0 ? 'under16Golfers' : `under16Golfers_${id}`]?.message
                  }
                  labelText="Total golfers under 16"
                  placeholderText="Select total golfers under 16"
                  items={
                    adults
                      ? minorsGolfers.slice(0, maximumGolfer - Number(adults) + 1)
                      : minorsGolfers
                  }
                />
              )}
            </FieldRow>
          </Field>
          <Field className="golf_dropdown">
            <S.Description>
              Please specify you the date and time you are interested in playing. Please be aware
              that specific dates and times may be unavailable. Find out more about our busy dates.
            </S.Description>
            <FieldRow widths={['50%', '50%']}>
              <DateInput
                id={`date_of_play_${id}`}
                {...register(id === 0 ? 'dateOfPlay' : `dateOfPlay_${id}`)}
                minDate={
                  addDays(startDate) > new Date().getTime()
                    ? getMinDate(startDate)
                    : getMinDate(new Date())
                }
                maxDate={endDate}
                value={teeDetails?.dateOfPlay}
                control={control}
                isRequired={
                  isRequired(schema, id === 0 ? 'dateOfPlay' : `dateOfPlay_${id}`, true) ?? true
                }
                errorText={formState.errors[id === 0 ? 'dateOfPlay' : `dateOfPlay_${id}`]?.message}
                labelText="Date of play"
                placeholderText="Select date"
                className="formDate"
                shouldDisableWeekends={false}
              />

              {timeStart && (
                <S.StyledDropdown
                  id={`tee_time_${id}`}
                  {...register(id === 0 ? 'timeOfPlay' : `timeOfPlay_${id}`)}
                  control={control}
                  isRequired={
                    isRequired(schema, id === 0 ? 'timeOfPlay' : `timeOfPlay_${id}`, true) ?? true
                  }
                  value={teeDetails?.timeOfPlay}
                  errorText={
                    formState.errors[id === 0 ? 'timeOfPlay' : `timeOfPlay_${id}`]?.message
                  }
                  labelText="Tee time"
                  placeholderText="Select time"
                  items={generateTime('30', timeStart, timeEnd)}
                />
              )}
            </FieldRow>
            <Field>
              <RadioButtonGroup
                id={`otherAvailability_${id}`}
                {...register(id === 0 ? 'otherAvailability' : `otherAvailability_${id}`)}
                isRequired={isRequired(
                  schema,
                  id === 0 ? 'otherAvailability' : `otherAvailability_${id}`,
                  true
                )}
                control={control}
                value={teeDetails?.otherAvailability?.valueOf?.toString()}
                labelText="If your selected tee time is unavailable, is there a time range you are available to play?"
                errorText={
                  formState.errors[id === 0 ? 'otherAvailability' : `otherAvailability_${id}`]
                    ?.message
                }
                items={[
                  { value: 'true', name: 'Yes' },
                  { value: 'false', name: 'No' }
                ]}
              />

              {watchAvailability === 'true' && (
                <FieldRow widths={['50%', '50%']}>
                  {timeStart && (
                    <S.StyledDropdown
                      id={`otherAvailabilityStart_${id}`}
                      {...register(
                        id === 0 ? 'otherAvailabilityStart' : `otherAvailabilityStart_${id}`
                      )}
                      control={control}
                      isRequired={
                        isRequired(
                          schema,
                          id === 0 ? 'otherAvailabilityStart' : `otherAvailabilityStart_${id}`,
                          true
                        ) ?? true
                      }
                      value={teeDetails?.otherAvailabilityStart}
                      errorText={
                        formState.errors[
                          id === 0 ? 'otherAvailabilityStart' : `otherAvailabilityStart_${id}`
                        ]?.message
                      }
                      labelText="Earliest Availability"
                      placeholderText="Earliest Availability"
                      items={generateTime('30', timeStart, timeEnd)}
                    />
                  )}
                  {timeEnd && (
                    <S.StyledDropdown
                      id={`otherAvailabilityEnd_${id}`}
                      {...register(
                        id === 0 ? 'otherAvailabilityEnd' : `otherAvailabilityEnd_${id}`
                      )}
                      control={control}
                      isRequired={
                        isRequired(
                          schema,
                          id === 0 ? 'otherAvailabilityEnd' : `otherAvailabilityEnd_${id}`,
                          true
                        ) ?? true
                      }
                      value={teeDetails?.otherAvailabilityEnd}
                      errorText={
                        formState.errors[
                          id === 0 ? 'otherAvailabilityEnd' : `otherAvailabilityEnd_${id}`
                        ]?.message
                      }
                      labelText="Latest Availability"
                      placeholderText="Latest Availability"
                      items={generateTime('30', watchOtherStart, timeEnd)}
                    />
                  )}
                </FieldRow>
              )}
            </Field>
          </Field>
          <ButtonUI
            variant="tertiary"
            type="button"
            key="confirm-tee-details-button"
            icon="ArrowRight16"
            label={'Confirm tee time'}
            disabled={!isValid}
            onClick={() => {
              titleRef !== null && titleRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              const items = [...allTees];
              if (id > 0 && items.length < id + 1) {
                items.push({
                  course: {
                    name: cmscourseName,
                    value: watchCourse
                  }
                });
              }
              const item = { ...items[id] };
              item.course.name = cmscourseName;
              items[id] = item;
              setTeeDetails({ teeDetails: items });
              setConfirmed(({ confirmedTees }) => ({
                confirmedTees: [
                  ...confirmedTees.slice(0, id),
                  {
                    ...confirmedTees[id],
                    isConfirmed: true
                  },
                  ...confirmedTees.slice(id + 1)
                ]
              }));
            }}
          />
        </>
      ) : (
        <TeeReview
          id={id}
          title={`Tee time ${id + 1}`}
          course={teeDetails?.course?.name}
          date={teeDetails?.dateOfPlay}
          teeTime={teeDetails?.timeOfPlay}
          adultGolfers={String(teeDetails?.adultGolfers)}
          youngGolfers={String(teeDetails?.under16Golfers)}
          otherAvailability={`${teeDetails?.otherAvailabilityStart || ''} - ${teeDetails?.otherAvailabilityEnd || ''
            }`}
          // @ts-ignore
          onClick={() =>
            setConfirmed(({ confirmedTees }) => ({
              confirmedTees: [
                ...confirmedTees.slice(0, id),
                {
                  ...confirmedTees[id],
                  isConfirmed: false
                },
                ...confirmedTees.slice(id + 1)
              ]
            }))
          }
          onRemoveTee={() => {
            setTeeDetails(prev => ({ ...prev, teeDetails: prev.teeDetails.filter((_, teeID) => teeID !== id) }));
            setConfirmed(({ confirmedTees }) => ({ confirmedTees: confirmedTees.filter((_, teeID) => teeID !== id) })
            );
            setTeeNumber((prev) => prev - 1);
            setRemovedTee(true);
          }}
          // eslint-disable-next-line react/no-array-index-key
          key={`tee_review_${id}_${teeDetails?.course?.value}`}
        />
      )}
      {
        // This was teeNr < 4 (Maximum 4 TeeTimes)
        confirmedTee[id]?.isConfirmed && teeNr < 999 && id + 1 === teeNr && (
          <>
            <ButtonUI
              variant="tertiary"
              type="button"
              key="confirm-tee-details-button"
              icon="ArrowRight16"
              label={'Add another tee time'}
              disabled={!isValid}
              onClick={() => {
                // @ts-ignore
                setTeeNumber((prev) => prev + 1);
              }}
            />
          </>
        )
      }
    </S.TeeContainer>
  );
};
