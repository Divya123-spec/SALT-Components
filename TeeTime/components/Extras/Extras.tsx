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
  isRequired,
  Field,
  FormFooter,
  TextArea
} from '@exo/frontend-components-forms';

import * as S from './Extras.styles';
import { TeeTimeContext } from '../../context/TeeTimeContext';
import { ButtonWrapper } from '../../../../ButtonWrapper/ButtonWrapper';
import { ButtonUI } from '../../../../ButtonUI/ButtonUI';
import { scrollToElement } from '../../utils';

const schema = yup
  .object()
  .shape({
    optionalDetails: yup.string().notRequired()
  });


export const Extras = React.forwardRef<HTMLFormElement>(({ idPrefix = 'extras' }, ref) => {

  const pageRef = useRef(null);

  const { onNextStep, steps, currentStep, goToReview, teeDetails, setTeeDetails, goToReviewPage, onStepBack } =
    useContext(TeeTimeContext);

  const { register, handleSubmit, formState, control, reset } = useForm({
    mode: 'all',
    defaultValues: {
      optionalDetails: teeDetails?.optionalDetails
    },
    resolver: yupResolver(schema)
  });
  const onError = (err) => {
    throw new Error(err);
  };


  const onSubmit = (formData) => {
    const { optionalDetails } = formData;

    // @ts-ignore

    setTeeDetails(prev => ({ ...prev, optionalDetails }));
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
    <S.Extras
      onSubmit={(event) => handleSubmit(onSubmit)(event)}
      onError={onError}
      data={{
        optionalDetails: teeDetails?.optionalDetails
      }}
      form={{ reset, handleSubmit, formState }}
      ref={ref}
    >
      <FormHeader>
        <S.Heading ref={pageRef}>Extras &#38; Add-Ons</S.Heading>
      </FormHeader>
      <FormBody>

        <Field>
          <TextArea
            id={`${idPrefix}_optionalDetails`}
            {...register('optionalDetails')}
            control={control}
            errorText={formState.errors?.optionalDetails?.message}
            isRequired={isRequired(schema, 'optionalDetails', false)}
            value={teeDetails?.optionalDetails}
            labelText="Please use the comment box below if you wish to include any additional information about your tee time request?"
            placeholderText="Is there anything else you want to tell us ?"
          />
        </Field>
      </FormBody>

      <FormFooter>
        <ButtonWrapper variation={'space-between'}>
          <>
            <ButtonUI
              variant="primary"
              type="submit"
              key="go-to-golfer-details-button"
              icon="ArrowRight16"
              label={`Continue to ${goToReview ? steps[3]?.title : steps[currentStep + 1]?.title}`}
            />
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
    </S.Extras>
  );
});
