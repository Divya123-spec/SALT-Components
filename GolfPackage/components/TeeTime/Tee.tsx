/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { DateInput, Field, FieldRow, RadioButtonGroup, isRequired } from '@exo/frontend-components-forms';
import React, { useEffect } from 'react';
import { generateTime } from '../../../TeeTime/utils/timeOptions';
import { addDays, getMinDate } from '../../utils/calendarUtilis';
import * as S from './TeeTime.styles';

export const Tee = ({
    id,
    register,
    control,
    formState,
    schema,
    teeTimes,
    watch,
    courses,
    mandCourse,
    setValue,
    requiredDate,
    requiredTime,
    startDate,
    endDate,
    startTime,
    endTime

}) => {

    const watchHasOtherAvailability = (i) => watch(`hasOtherAvailability_${i}`, 'false');
    const watchStartTime = (i) => watch(`otherAvailability_start_${i}`, startTime);
    useEffect(() => {
        if (!teeTimes[id]?.course.value && id === 0 && mandCourse) {
            setValue('courseRequested_0', mandCourse[id]?.value);
        }
    }, [mandCourse]);

    const renderTime = (req, label, index, otherAvailability, status = '') => {
        if (otherAvailability) {
            switch (req) {
                case 'yes10':
                    return (
                        <S.StyledDropdown
                            id={`${id}_otherAvailability_${index}`}
                            {...register(`otherAvailability_${status}_${index}`)}
                            control={control}
                            isDisabled={req === 'no'}
                            // @ts-ignore
                            isRequired={isRequired(schema, `otherAvailability_${status}_${index}`, false)}
                            value={teeTimes[index]?.timeOfPlay || undefined}
                            errorText={formState.errors[`otherAvailability_${status}_${index}`]?.message}
                            labelText={label}
                            placeholderText="Select time"
                            items={status === 'start' ? generateTime('10', startTime, endTime) : generateTime('10', watchStartTime(index), endTime)}
                            key={`otherAvailability_${label}_${index}`}
                        />
                    );
                case 'yes8':
                    return (
                        <S.StyledDropdown
                            id={`${id}_otherAvailability_${index}`}
                            {...register(`otherAvailability_${status}_${index}`)}
                            control={control}
                            isDisabled={req === 'no'}
                            // @ts-ignore
                            isRequired={isRequired(schema, `otherAvailability_${status}_${index}`, false)}
                            value={teeTimes[index]?.timeOfPlay || undefined}
                            errorText={formState.errors[`otherAvailability_${status}_${index}`]?.message}
                            labelText={label}
                            placeholderText="Select time"
                            items={status === 'start' ? generateTime('8', startTime, endTime) : generateTime('8', watchStartTime(index), endTime)}
                            key={`otherAvailability_${label}_${index}`}
                        />
                    );
                case 'yes30':
                    return (
                        <S.StyledDropdown
                            id={`${id}_otherAvailability_${index}`}
                            {...register(`otherAvailability_${status}_${index}`)}
                            control={control}
                            isDisabled={req === 'no'}
                            // @ts-ignore
                            isRequired={isRequired(schema, `otherAvailability_${status}_${index}`, false)}
                            value={teeTimes[index]?.timeOfPlay || undefined}
                            errorText={formState.errors[`otherAvailability_${status}_${index}`]?.message}
                            labelText={label}
                            placeholderText="Select time"
                            items={status === 'start' ? generateTime('30', startTime, endTime) : generateTime('30', watchStartTime(index), endTime)}
                            key={`otherAvailability_${label}_${index}`}
                        />
                    );
                default:
                    return (
                        <S.StyledDropdown
                            id={`${id}_otherAvailability_${index}`}
                            {...register(`otherAvailability_${status}_${index}`)}
                            control={control}
                            isDisabled={req === 'no'}
                            // @ts-ignore
                            isRequired={isRequired(schema, `otherAvailability_${status}_${index}`, false)}
                            value={teeTimes[index]?.timeOfPlay || undefined}
                            errorText={formState.errors[`otherAvailability_${status}_${index}`]?.message}
                            labelText={label}
                            placeholderText="Select time"
                            items={status === 'start' ? generateTime('30', startTime, endTime) : generateTime('30', watchStartTime(index), endTime)}
                            key={`otherAvailability_${label}_${index}`}
                        />
                    );
            }
        } else {
            switch (req) {
                case 'yes10':
                    return (
                        <S.StyledDropdown
                            id={`${id}_timeOfPlay_${index}`}
                            {...register(`timeOfPlay_${index}`)}
                            control={control}
                            isDisabled={req === 'no'}
                            // @ts-ignore
                            isRequired={isRequired(schema, `timeOfPlay_${index}`, true)}
                            value={teeTimes[index]?.timeOfPlay || undefined}
                            errorText={formState.errors[`timeOfPlay_${index}`]?.message}
                            labelText={label}
                            placeholderText="Select time"
                            items={generateTime('10', startTime, endTime)}
                            key={`timeOfPlay_${index}_${label}`}
                        />
                    );
                case 'yes8':
                    return (
                        <S.StyledDropdown
                            id={`${id}_timeOfPlay_${index}`}
                            {...register(`timeOfPlay_${index}`)}
                            control={control}
                            isDisabled={req === 'no'}
                            // @ts-ignore
                            isRequired={isRequired(schema, `timeOfPlay_${index}`, true)}
                            value={teeTimes[index]?.timeOfPlay || undefined}
                            errorText={formState.errors[`timeOfPlay_${index}`]?.message}
                            labelText={label}
                            placeholderText="Select time"
                            items={generateTime('8', startTime, endTime)}
                            key={`timeOfPlay_${index}_${label}`}
                        />
                    );
                case 'yes30':
                    return (
                        <S.StyledDropdown
                            id={`${id}_timeOfPlay_${index}`}
                            {...register(`timeOfPlay_${index}`)}
                            control={control}
                            isDisabled={req === 'no'}
                            // @ts-ignore
                            isRequired={isRequired(schema, `timeOfPlay_${index}`, true)}
                            value={teeTimes[index]?.timeOfPlay || undefined}
                            errorText={formState.errors[`timeOfPlay_${index}`]?.message}
                            labelText={label}
                            placeholderText="Select time"
                            items={generateTime('30', startTime, endTime)}
                            key={`timeOfPlay_${index}_${label}`}
                        />
                    );
                default:
                    return (
                        <S.StyledDropdown
                            id={`${id}_timeOfPlay_${index}`}
                            {...register(`timeOfPlay_${index}`)}
                            control={control}
                            isDisabled={req === 'no'}
                            // @ts-ignore
                            isRequired={isRequired(schema, `timeOfPlay_${index}`, true)}
                            value={teeTimes[index]?.timeOfPlay || undefined}
                            errorText={formState.errors[`timeOfPlay_${index}`]?.message}
                            labelText={label}
                            placeholderText="Select time"
                            items={generateTime('30', startTime, endTime)}
                            key={`timeOfPlay_${index}_${label}`}
                        />
                    );
            }
        }

    };
    return (
        <>
            <S.TeeTitle key={`tee_title_${id}`}>{`Tee time ${id + 1}`}</S.TeeTitle>
            <fieldset disabled={courses.length === 1 || (id === 0 && mandCourse.length !== 0)}>
                <Field key={`tee_courseRequested_field_${id}`}>
                    <S.StyledDropdown
                        id={`${id}_courseRequested_${id}`}
                        {...register(`courseRequested_${id}`)}
                        // @ts-ignore
                        isRequired={isRequired(schema, `courseRequested_${id}`, true)}
                        control={control}
                        // eslint-disable-next-line no-nested-ternary
                        value={teeTimes[id]?.course.name ? teeTimes[id]?.course.name : (id === 0 && mandCourse.length !== 0 ? mandCourse[id]?.value : teeTimes[id]?.course.name)}
                        placeholderText="Select  Package Course"
                        labelText="Course"
                        isDisabled={courses.length === 1 || (id === 0 && mandCourse.length !== 0)}
                        items={id === 0 && mandCourse.length > 0 ? mandCourse : courses}
                        key={`tee_dropdown_${id}`}
                    />
                </Field>
            </fieldset>


            {
                id === 0 && (
                    <S.Description key={`tee_description_${id}`}>
                        Please specify you the date and time you are interested in playing. Please be aware
                        that specific dates and times may be unavailable. Find out more about our busy dates.
                    </S.Description>
                )
            }
            <FieldRow widths={['50%', '50%']} key={`tee_row_${id}`}>
                <DateInput
                    id={`${id}_dateOfPlay_${id}`}
                    {...register(`dateOfPlay_${id}`)}
                    minDate={
                        addDays(startDate) > new Date().getTime()
                            ? getMinDate(startDate)
                            : getMinDate(new Date(Date.now()))
                    }
                    maxDate={endDate}
                    isDisabled={requiredDate && new Date(endDate).getTime() < new Date().getTime()}
                    value={teeTimes[id]?.dateOfPlay?.toString()}
                    control={control}
                    // @ts-ignore
                    isRequired={isRequired(schema, `dateOfPlay_${id}`, true) ?? true}
                    errorText={formState.errors[`dateOfPlay_${id}`]?.message}
                    labelText="Date of play"
                    placeholderText="Select date"
                    className="formDate"
                    key={`tee_date_${id}`}
                />
                {renderTime(requiredTime, 'Time of play', id, false)}
            </FieldRow>
            <Field key={`tee_hasOtherAvailability_${id}_row`}>
                <RadioButtonGroup
                    id={`${id}_hasOtherAvailability_${id}`}
                    {...register(`hasOtherAvailability_${id}`)}
                    // @ts-ignore
                    isRequired={isRequired(schema, `hasOtherAvailability_${id}`, true)}
                    control={control}
                    value={teeTimes[id]?.otherAvailability?.valueOf().toString()}
                    labelText="If your selected tee time is unavailable, is there a time range you are available to play?"
                    items={[
                        { value: 'true', name: 'Yes' },
                        { value: 'false', name: 'No' }
                    ]}
                    key={`tee_hasOtherAvailability_${id}`}
                />
            </Field>
            <FieldRow widths={['50%', '50%']} key={`tee_otherAvailability_${id}`}>
                {watchHasOtherAvailability(id) === 'true' &&
                    renderTime(requiredTime, 'Earliest available', id, true, 'start')}
                {watchHasOtherAvailability(id) === 'true' &&
                    renderTime(requiredTime, 'Latest available', id, true, 'end')}
            </FieldRow>
        </>
    );
};
