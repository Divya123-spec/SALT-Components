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
import React, { useContext, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import {
  FormHeader,
  FormBody,
  FormFooter,
  Field,
  isRequired,
  TextArea
} from '@exo/frontend-components-forms';
import mapValues from 'lodash/mapValues';
import * as S from './CaddieDetails.styles';
import { CaddieContext } from '../../context/CaddieContext';
import { ButtonWrapper } from '../../../../ButtonWrapper/ButtonWrapper';
import { ButtonUI } from '../../../../ButtonUI/ButtonUI';
import { TeeTimeReview } from '../TeeTimeReview/TeeTimeReview';
import { scrollToElement } from '../../utils';

const additionalSchema = yup.object().shape({
  additionalInformation: yup.string().notRequired()
});
const schema = yup.lazy(obj => yup.object(
  // @ts-ignore
  mapValues(obj, (val, key) => {
    if (key.toString().startsWith('caddie')) {
      return yup.string().required('Please select desired number of caddies').nullable();
    } else { return additionalSchema[key]; }
  })
));

export const CaddieDetails = React.forwardRef<HTMLFormElement>(({ idPrefix = 'CaddieDetails' }, ref) => {
  const pageRef = useRef(null);

  const {
    onNextStep,
    steps,
    currentStep,
    goToReview,
    teeTimeDetails,
    additionalInformation,
    setAdditionalInformation,
    setTeeTimeDetails,
    goToReviewPage,
    onStepBack
  } = useContext(CaddieContext);

  const createTeeFieldNames = (
    id = 0,
    caddie = ''
  ) => ({
    [`caddie_${id}`]: caddie

  });
  const { register, handleSubmit, formState, control, reset } = useForm(
    {
      mode: 'all',
      defaultValues: {
        additionalInformation,
        ...Object.assign({}, ...teeTimeDetails.map((item, id) => (
          createTeeFieldNames(
            id,
            String(item?.numberOfCaddies)
          )
        )))
      },
      resolver: yupResolver(schema)
    }
  );
  const { isValid } = formState;
  const showContinueButton = isValid;

  const onError = (err) => {
    throw new Error(err);
  };

  const onSubmit = (formData) => {
    const teesCopy = teeTimeDetails.map((tee, id) => ({ ...tee, numberOfCaddies: Number(formData[`caddie_${id}`]) }));
    setTeeTimeDetails(teesCopy);
    setAdditionalInformation(formData?.additionalInformation);
    if (goToReview) {
      goToReviewPage();
    } else {
      onNextStep();
    }
  };

  useEffect(() => {
    scrollToElement(pageRef);

  }, []);



  return (
    <S.MyDetails
      onSubmit={(event) => handleSubmit(onSubmit)(event)}
      onError={onError}
      data={{
        additionalInformation,
        ...Object.assign({}, ...teeTimeDetails.map((item, id) => (
          createTeeFieldNames(
            id,
            String(item?.numberOfCaddies)
          )
        )))
      }}
      form={{ reset, handleSubmit, formState }}
      ref={ref}
      key={idPrefix}
    >
      <FormHeader>
        <S.Heading ref={pageRef}>Caddie details</S.Heading>
      </FormHeader>

      <FormBody>

        {teeTimeDetails && teeTimeDetails.map((tee, id) =>
          // eslint-disable-next-line react/no-array-index-key
          <Field key={`caddie_field_${id}`} className='caddie_field'>
            <TeeTimeReview
              course={tee?.course}
              date={tee?.date}
              tee_time={tee?.time}
              golfers={tee?.numberOfGolfers}
              id={id}
              // eslint-disable-next-line react/no-array-index-key
              key={`${idPrefix}_tee_${id}`}
            />
            <S.StyledDropdown
              id={`${idPrefix}_select_caddie_${id}`}
              {...register(`caddie_${id}`)}
              control={control}
              // @ts-ignore
              isRequired={isRequired(schema, 'specificInstructor', true)}
              value={String(tee?.numberOfCaddies)}
              errorText={formState.errors[`caddie_${id}`]?.message}
              labelText={`Caddies required for tee time ${id + 1}`}
              placeholderText="Select"
              items={Array.from({ length: tee?.numberOfGolfers ? tee?.numberOfGolfers + 1 : 2 }, (_, i) => ({
                value: i.toString(),
                name: i.toString()
              }))}
              // eslint-disable-next-line react/no-array-index-key
              key={`${idPrefix}_select_caddie_${id}`}
            />
          </Field>

        )}
        <Field>
          <TextArea
            id={`${idPrefix}_additionalInformation`}
            {...register('additionalInformation')}
            control={control}
            errorText={formState.errors?.additionalInformation?.message}
            isRequired={isRequired(additionalSchema, 'additionalInformation', false)}
            value={additionalInformation}
            labelText="Additional information"
            placeholderText="Please detail any specific caddie requests"
            key={`additionalInformation_${idPrefix}`}

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
                label={`Continue to ${goToReview ? steps[3]?.title : steps[currentStep + 1]?.title}`}
              />
            )}
            <S.BackButton
              variant="ghost"
              type="button"
              key="go-back-button"
              onClick={onStepBack}
              label={`Back to ${steps[currentStep - 1]?.title}`}

            />
          </>
        </ButtonWrapper>
      </FormFooter>
    </S.MyDetails>
  );
});
